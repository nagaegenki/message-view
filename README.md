# Message Formatter

任意のメッセージを表形式で整形できる Web アプリです。  
This is a web application that formats any protocol messages in a table format.

現在は、FIXメッセージのみに対応しています。  
Currently, only FIX messages are supported.

## 主な機能 / Features

- FIX メッセージのパースおよび整形表示（タグ定義付き）  
Parsing and formatted display of FIX messages (with tag definitions)
- 表形式での再整形  
Reformatting in a table format
- Vite + React による高速開発  
Vite + React for fast development
- Tailwind CSS によるモダンな UI  
Modern UI with Tailwind CSS

## セットアップ手順 / Getting Started

### 前提 / Prerequisites

- Node.js
- `npm` or `yarn`

### クローン / Clone the repo

```bash
git clone https://github.com/nagaegenki/message-view.git
cd message-view
```

### 依存関係のインストール / Install dependencies

```bash
npm install
# or
yarn install
```

### FIX 定義ファイルのカスタマイズ / Customize FIX Definitions

本アプリは、FIX メッセージの構造を理解・整形するために、`src/parser/tagDefs.json` および `groupTagDefs.json` を使用しています。  
これらのファイルは FIX バージョンや取り扱うメッセージタイプに応じて **自由に編集・拡張可能** です。

`tagDefs.json` では各タグの型・説明・enum 値などを定義し、  
`groupTagDefs.json` では繰り返し構造（NoLegs など）を定義します。

---

This application uses `src/parser/tagDefs.json` and `groupTagDefs.json`  
to define the structure and interpretation of FIX messages.

You can freely **customize and extend** these files according to your target FIX version or message types.

- `tagDefs.json` defines tag metadata such as type, label, and enum values.
- `groupTagDefs.json` defines repeating group structures (e.g., NoLegs, NoOrders).


### 開発サーバーの起動 / Run the development server

```bash
npm run dev
# or 
yarn dev
```

### ビルド / Build for production

```bash
npm run build
# or
yarn build
```

### 静的サーバーでの確認 / Preview production build

```bash
npm run preview
# or
yarn preview
```

## ディレクトリ構成 / Directory Structure

```plaintext
src/
├── components/     # UI Components
├── lib/            # Generic Logic
├── pages/          # Screens
├── parser/         # Message Processing Logic with Definition JSON
├── routes/         # Routing Definition
├── styles/         # CSS / Tailwind
└── main.jsx        # Application Entry Point
```

## ライセンス / License

This project is licensed under the [MIT License](./LICENSE).

## 使用技術 / Built With

- Vite
- React
- Tailwind CSS
