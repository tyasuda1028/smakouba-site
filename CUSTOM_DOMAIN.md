# 独自ドメイン設定手順（sumakouba.com／Xserver → GitHub Pages）

GitHub公式ドキュメント（docs.github.com）と Xserver公式マニュアル（xserver.ne.jp）で裏取り・反証検証した手順です。

- **GitHubユーザー名**: `tyasuda1028`
- **リポジトリ**: `smakouba-site`（main / root から配信）
- **独自ドメイン**: `sumakouba.com`（apex＝ルートドメイン／取得済み）
- **主ドメイン（ブランドURL）**: **`www.sumakouba.com`**（GitHub推奨・最も安定）。apex `sumakouba.com` は `www` へ自動リダイレクト。
- **DNS管理**: Xserver（ネームサーバーが `ns1〜ns5.xserver.jp` の前提）

> **重要な順序**：GitHub公式は「DNSを設定する前に、まずGitHub側に独自ドメインを追加せよ」と案内しています（第三者によるサブドメイン乗っ取り防止のため）。これを安全に満たすため、本手順では **先にドメイン所有権検証（TXT）を済ませてから** DNS→Pages設定の順に進めます。検証を先にやると乗っ取りリスクが消えるので、DNSを先に入れても安全で、かつ現行URLのダウンタイムも避けられます。

---

## 設定するDNSレコード（Xserver）

| 種別 | ホスト名 | 内容（値） | 用途 |
|---|---|---|---|
| A | （空欄＝apex） | `185.199.108.153` | GitHub Pages |
| A | （空欄） | `185.199.109.153` | GitHub Pages |
| A | （空欄） | `185.199.110.153` | GitHub Pages |
| A | （空欄） | `185.199.111.153` | GitHub Pages |
| AAAA | （空欄） | `2606:50c0:8000::153` | IPv6（推奨） |
| AAAA | （空欄） | `2606:50c0:8001::153` | IPv6（推奨） |
| AAAA | （空欄） | `2606:50c0:8002::153` | IPv6（推奨） |
| AAAA | （空欄） | `2606:50c0:8003::153` | IPv6（推奨） |
| CNAME | `www` | `tyasuda1028.github.io` | wwwを apex へ寄せる |
| TXT | `_github-pages-challenge-tyasuda1028` | （GitHubが表示する検証コード） | ドメイン所有権検証 |

- apex（`sumakouba.com` 自体）には **CNAMEを使えません**（DNS仕様上、apexはSOA/NSと共存できないため）。必ず **Aレコード4本**で設定します。
- `www` のCNAMEの向き先は `tyasuda1028.github.io`。**リポジトリ名（/smakouba-site）は付けない**こと。
- AレコードのIP・AAAAのIPv6は GitHub公式値（2026-06時点）。

---

## 手順

### 1. ドメインを取得（Xserver）
`sumakouba.com` をXserverで取得。Xserverで取得すればネームサーバーは自動で `ns1〜ns5.xserver.jp` になります（他社管理の場合のみ、Xserverのネームサーバーへ変更。反映最大24時間）。

### 2. GitHubでドメイン所有権検証を開始（TXT値を取得）
1. GitHub右上 → **Settings**（アカウント設定） → 左メニュー **Pages** → **Add a domain**。
2. `sumakouba.com` を入力すると、`_github-pages-challenge-tyasuda1028` という名前のTXTレコードと**検証コード**が表示される。これを控える。

### 3. XserverでDNSレコードを設定
1. [サーバーパネル](https://secure.xserver.ne.jp/xapanel/login/xserver/server/)にログイン → **ドメイン** 欄の **DNSレコード設定** → `sumakouba.com` を選択。
2. **既定レコードの掃除**：Xserverが自動登録した apex・`www`・ワイルドカード `*` の **Aレコード（XserverサーバーIP向け）を削除**。
   - メールをXserverで使う予定がなければ、そのまま不要なAレコードのみ削除でOK。
   - `NS` レコードは残す。Xserverメールを使う場合のみ `MX`・SPFの `TXT` も残す。
3. 上の表のレコードを **DNSレコード設定の追加** から登録（A×4、AAAA×4、www CNAME×1、検証TXT×1）。apexはホスト名を空欄に。

### 4. 伝播を待って dig で確認（最大24時間／通常は数時間）
```bash
dig sumakouba.com +noall +answer -t A          # → 185.199.108〜111.153 が返る
dig www.sumakouba.com +noall +answer            # → tyasuda1028.github.io + 上記IP
dig _github-pages-challenge-tyasuda1028.sumakouba.com +noall +answer -t TXT  # → 検証コード
```

### 5. GitHubでドメインを検証（Verify）
Settings → Pages の該当ドメインで **Verify** をクリック。これで乗っ取り防止が恒久的に有効化（**検証TXTは今後も削除しない**）。

### 6. リポジトリに独自ドメインを設定
`smakouba-site` の **Settings → Pages → Custom domain** に **`www.sumakouba.com`** を入力して **Save**。
→ mainブランチ直下に `CNAME` ファイル（中身 `www.sumakouba.com`）が自動コミットされる。apexと www の両レコードが揃っているので、`sumakouba.com` は自動で `www.sumakouba.com` へリダイレクトされる。DNSが既に解決済みなので、現行 `tyasuda1028.github.io/smakouba-site/` も問題なく新ドメインへ転送される。

### 7. HTTPSを有効化
DNS検証が通ると GitHub が Let's Encrypt証明書を自動発行（利用可能まで最大24時間）。発行後、Settings → Pages の **Enforce HTTPS** にチェック。

### 8. 最終確認
- ブラウザで `https://www.sumakouba.com/` が表示される（主ドメイン）。
- `https://sumakouba.com/`（apex）が `www.sumakouba.com` へリダイレクトされる。
- `http://` が `https://` へリダイレクトされる。

---

## 注意・落とし穴
- **apexにCNAME禁止**（A×4で設定）。`www` のみCNAME。同一ホスト名にCNAMEとA/AAAA/MXは併存不可。
- **Enforce HTTPSがグレーアウト**する場合は、(a) 最大24時間待つ、(b) 余分な/誤ったA・AAAA・CNAMEを掃除、(c) CAAを使うなら `letsencrypt.org` を許可、(d) Custom domainを一度Remove→再追加で再発行をトリガー。
- **将来このドメインの利用をやめる時**は、**先にXserverのA/CNAMEレコードを削除**してから Pages を無効化する（dangling DNSによる乗っ取り防止）。ただし検証用TXTは検証維持のため残す。
- 本構成では **`www.sumakouba.com` を主**に採用（GitHub推奨。wwwはGitHubのIP変更の影響を受けず最も安定）。apexのAレコードは `sumakouba.com` → `www` リダイレクトのために必要なので残す。

## 出典（公式一次情報）
- GitHub Pages: Managing / About / Verifying / Securing(HTTPS) / Troubleshooting custom domains（docs.github.com）
- Xserver: DNSレコード設定・ネームサーバー設定マニュアル（xserver.ne.jp）
