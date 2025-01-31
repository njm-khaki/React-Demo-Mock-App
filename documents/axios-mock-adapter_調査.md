# axios-mock-adapter 調査

- [axios-mock-adapter 調査](#axios-mock-adapter-調査)
  - [概要](#概要)
  - [導入手順](#導入手順)
  - [モックの実装方法](#モックの実装方法)
    - [モックを起動する](#モックを起動する)
    - [API仕様に合わせてモックを実装する](#api仕様に合わせてモックを実装する)
    - [クエリパラメータを取得する](#クエリパラメータを取得する)
    - [動的パスに対応する](#動的パスに対応する)
  - [開発/本番環境用に使い分けをする](#開発本番環境用に使い分けをする)
  - [運用ルール](#運用ルール)
    - [パスの記載方法](#パスの記載方法)
    - [ディレクトリ構造](#ディレクトリ構造)

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
const mockAxios = new MockAdapter(axios);
```

### API仕様に合わせてモックを実装する

- APIのパスとメソッドを指定してモックを実装する

- 呼び出し時の処理をコールバック関数に実装する
  - 戻り値でAPIの呼び出し結果を記載する

```typescript
// GETメソッドで呼び出したときの動作
mockAxios.onGet(`/api/path`).reply((config) => {

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
mockAxios.onPost(`/api/path`).reply((config) => {
    // 両略
});

// PUTメソッドで呼び出したときの動作
mockAxios.onPut(`/api/path`).reply((config) => {
    // 省略
});

// DELETEメソッドで呼び出したときの動作
mockAxios.onDelete(`/api/path`).reply((config) => {
    // 省略
});
```

### クエリパラメータを取得する

- 記載中

### 動的パスに対応する

- 記載中

## 開発/本番環境用に使い分けをする

- 記載中

## 運用ルール

- 記載中

### パスの記載方法

- 記載中

### ディレクトリ構造

- 記載中
