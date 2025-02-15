# React Demo Mock App

- [React Demo Mock App](#react-demo-mock-app)
  - [概要](#概要)
  - [環境](#環境)
  - [環境構築・実行方法](#環境構築実行方法)

## 概要

- `axios-mock-adapter`を用いたモックの試作

- 調査内容は以下のファイルを参照

> documents/axios-mock-adapter_調査.md

## 環境

- 以下の環境で試作・動作確認

||バージョン|
|--|--|
|OS|windows11|
|node.js|v20.10.0|
|npm|10.2.3|

## 環境構築・実行方法

- 以下のコマンドでクローン

```bash
git clone https://github.com/njm-khaki/React-Demo-Mock-App.git
```

- `npm`で各パッケージをインストール

```bash
cd react-demo-mock-app
npm i
```

- 以下のコマンドでビルド

```bash
npm run build
```

- 以下のコマンドで開発サーバーを起動

  - <http://localhost:5173>で動作確認が可能

```bash
npm run dev
```
