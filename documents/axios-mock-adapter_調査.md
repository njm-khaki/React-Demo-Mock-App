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
    - [パスの記載方法](#パスの記載方法)
    - [ディレクトリ構造](#ディレクトリ構造)
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
// axiosのモック　インスタンス生成
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

- 記載中

### パスの記載方法

- 記載中

### ディレクトリ構造

- 記載中

### 開発/本番環境用に使い分けをする

- 記載中

## 参考情報

- [React + TypeScriptでモックAPIを叩いてみる　〜axios-mockのAPIで固定値を取得〜](https://qiita.com/qq_kaq/items/efb3b41e3e5e2b862775)

- [axios-mock-adapterで動的なurlのリクエストを取得する方法](https://qiita.com/Sue_chan/items/d73a4e3a4856046bc296)
