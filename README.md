# スマコウバ 企業サイト

中小製造業向けの現場アプリ「スマコウバ」シリーズ（積載・計画・負荷）を紹介する企業ホームページです。
ビルド不要の**静的サイト**（HTML / CSS / JavaScript）で、GitHub Pages でそのまま公開できます。

運営：スマコウバ運営事務局

## 製品

| アプリ | 概要 | URL |
|---|---|---|
| スマコウバ積載 | トラック積載の計画・可視化・指示 | https://sumakouba-truck-loader.vercel.app |
| スマコウバ計画 | 生産計画・所要量（MRP）・在庫の見える化 | https://sumakouba-production-plan.vercel.app |
| スマコウバ負荷 | 設備負荷・必要人員の自動計算、日報・品質管理 | https://sumakouba-production-load-calc.vercel.app |

## ファイル構成

```
.
├── index.html      # ページ本体（1ページ完結）
├── styles.css      # スタイル
├── script.js       # モバイルメニュー等
├── favicon.svg     # ブランドアイコン
├── .nojekyll       # GitHub Pages の Jekyll 処理を無効化
└── README.md
```

## ローカルで確認する

ビルド不要です。`index.html` をブラウザで開くだけで確認できます。
（相対パスのみ使用しているので、ファイルを直接開いても動作します。）

簡易サーバーで確認する場合：

```bash
# Python が入っていれば
python3 -m http.server 8000
# → http://localhost:8000 を開く
```

## GitHub で公開する（GitHub Pages）

1. GitHub で新しいリポジトリを作成（例：`smakouba-site`）。
2. このフォルダを push する：

   ```bash
   cd smakouba-site
   git init
   git add .
   git commit -m "スマコウバ 企業サイトを公開"
   git branch -M main
   git remote add origin https://github.com/<ユーザー名>/smakouba-site.git
   git push -u origin main
   ```

3. GitHub のリポジトリ → **Settings → Pages** を開く。
4. **Build and deployment** の **Source** を **Deploy from a branch** にする。
5. **Branch** を `main` ／ フォルダを `/ (root)` に設定して **Save**。
6. 数十秒〜数分で `https://<ユーザー名>.github.io/smakouba-site/` に公開されます。

> 独自ドメインを使う場合は、Settings → Pages の **Custom domain** に設定し、
> `CNAME` ファイルを追加してください。

## 内容の更新

- 文言・料金：`index.html` を直接編集
- 色・レイアウト：`styles.css` の `:root`（カラー定義）から調整
- 料金は**アプリごとに異なります**。各アプリの `/pricing` ページと整合させてください（税別）：
  - 積載：スタンダード ¥19,800／ビジネス ¥39,800／エンタープライズ ¥79,800〜（月額）
  - 計画：スタンダード ¥29,800／ビジネス ¥59,800／プレミアム ¥99,800／エンタープライズ ¥198,000〜（月額）
  - 負荷：スタンダード ¥19,800／ビジネス ¥39,800／エンタープライズ ¥79,800〜（月額）
  - 問い合わせは全アプリ各サイトの `/contact`
