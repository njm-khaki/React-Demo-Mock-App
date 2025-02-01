# axios-mock-adapter 調査

- [axios-mock-adapter 調査](#axios-mock-adapter-調査)
  - [概要](#概要)
  - [導入手順](#導入手順)
  - [モックの実装方法](#モックの実装方法)
    - [モックを起動する](#モックを起動する)
    - [API仕様に合わせてモックを実装する](#api仕様に合わせてモックを実装する)
    - [クエリパラメータを取得する](#クエリパラメータを取得する)
    - [動的URLに対応する](#動的urlに対応する)
  - [運用ルール](#運用ルール)
    - [ディレクトリ構成](#ディレクトリ構成)
    - [パスの記載方法](#パスの記載方法)
    - [開発/本番環境用に使い分けをする](#開発本番環境用に使い分けをする)
  - [参考情報](#参考情報)

## 概要

- `axios-mock-adapter`の調査内容・運用方法の検討について記載

## 導入手順

- 以下のコマンドでパッケージをインストール

```bash
npm i axios-mock-adapter
```

## モックの実装方法

### モックを起動する

- インスタンスを生成することでモックを起動する

```typescript
// axiosのモック インスタンス生成
const mock = new MockAdapter(axios);
```

### API仕様に合わせてモックを実装する

- APIのパスとメソッドを指定してモックを実装する

- 呼び出し時の処理をコールバック関数に実装する
  - 戻り値でAPIの呼び出し結果を記載する

```typescript
// GETメソッドで呼び出したときの動作
mock.onGet(`/api/path`).reply((config) => {

    // APIの返却値
    // 以下のステータスコード、レスポンスボディとなる
    // 200 OK
    // {"id": "1", "name": "user1"}
    return [
        HttpStatusCode.Ok, 
        {
            id: `1`,
            name: `user1`
        },
    ];
});

// POSTメソッドで呼び出したときの動作
mock.onPost(`/api/path`).reply((config) => {
    // 両略
});

// PUTメソッドで呼び出したときの動作
mock.onPut(`/api/path`).reply((config) => {
    // 省略
});

// DELETEメソッドで呼び出したときの動作
mock.onDelete(`/api/path`).reply((config) => {
    // 省略
});
```

### クエリパラメータを取得する

- 以下の方法でクエリパラメータを取得する
  - 用途ごとにインターフェースを定義してあげて型変換すると安全

```typescript
mock.onGet(`/api/path`).reply((config) => {

    // クエリパラメータを取得
    // Any型なので用途に応じて型変換して用いる
    const params = config.params as SomeParamsType;
});
```

### 動的URLに対応する

- 動的URLに対応する場合は正規表現を用いる

```typescript
// 以下のパスに対応する場合
// /api/{variable path}/hoge
mock.onGet(/\/api\/[^/]+\/hoge/).reply((config) => {
    // URLに含まれる値を正規表現で抜き出す
    const values = config.url.match(/\/api\/(.+)\/hoge/);
});
```

## 運用ルール

- 運用ルールについて検討したのでメモ

### ディレクトリ構成

- APIのパスをディレクトリに見立てて配置すると管理し易そう
  - 動的URLの場合は`_id`など区別できるようにしておくと分かりやすそう

```text
api/v1/user
api/v1/login
api/v1/logout
api/v2/user

mocks
└─api
  ├─v1
  │ ├─user
  │ ├─login
  │ └─logout
  └─v2
    └─user
```

### パスの記載方法

- 動的URLに対応するごとに正規表現を書いていると効率が悪い
  - なのでパスの記載ルールを決めておく
  - パスは文字列で記載する
  - 動的URLの場合は正規表現に変換するようにしておく

- 記載ルールを設けて文字列から設定できるような関数を用意しておく
  - 以下は文字列から設定用の値に変換する関数の実装例

```typescript
/**
 * モックするURL
 * 静的/動的URLに応じたパスを返却
 * 動的URLの記載ルール
    * 可変部分は`:`から始まる文字列を割り当てる
    * 例 idの部分が可変
    * `api/:id/user`
 * @param path APIのパス(文字列) {string}
 * @returns モックに設定するパス {string | RegExp} 
 */
export const parseDynamicMockPath = (path: string) => {
    // URLの末端が可変のときは正規表現で指定する必要はない
    const trimedPath = path.replace(/:\w+$/, ``);

    // 動的URLを指定しているなら正規表現で返却
    return trimedPath.match(/:\w+/g)
        // :から始まる文字列を置き換える
        ? new RegExp(trimedPath.replace(/:\w+/g, `[^/]+`))
        // 静的なURLは文字列で指定して設定する
        : trimedPath
}

// :idの部分が可変になるようにモックを設定
mock.onGet(parseDynamicMockPath(`api/:id/hoge`)).reply((config) => {
    // URLに含まれる値を正規表現で抜き出す
    const values = config.url.match(/\/api\/(.+)\/hoge/);
});
```

### 開発/本番環境用に使い分けをする

- 環境変数を参照してモックのインスタンスを生成するか場合分けする
  - ソースコードに差分を出さずにモック/REST APIを切り替えることができる

```typescript
// モックを利用するか環境変数を参照
// App.tsxなどで呼び出せばOK
if (import.meta.env.VITE_APP_USE_MOCK === "true") {
  // axiosのモック インスタンス生成
  const mock = new MockAdapter(axios);
}
```

## 参考情報

- [React + TypeScriptでモックAPIを叩いてみる　〜axios-mockのAPIで固定値を取得〜](https://qiita.com/qq_kaq/items/efb3b41e3e5e2b862775)

- [axios-mock-adapterで動的なurlのリクエストを取得する方法](https://qiita.com/Sue_chan/items/d73a4e3a4856046bc296)
