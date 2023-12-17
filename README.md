# yuuka-bot

身内用のDiscord bot。

ブルーアーカイブの早瀬ユウカさんみたいな感じの口調で色々と作業をサポートしてくれるBotにするのが目標です。

## 機能

今後追加予定。

### スラッシュコマンド

- `ping`: pongと返す。疎通確認用。
- `pomodoro <work> <break> <repeat>`: ポモドーロタイマーを開始する。
  - `work`: 作業時間（分）
  - `break`: 休憩時間（分）
  - `repeat`: 繰り返し回数

## 開発者向け

### 一般

- `discord.js`によって開発しています。
  - [discord.js](https://discord.js.org/)
- eslintとprettierを導入しています。設定は`.eslintrc.yml`と`.prettierrc.yaml`を参照してください。

### Discordのトークンなど

プロジェクトのルートに`config.json`を作成し、以下のように記述してください。

（現状ギルドコマンドのみ対応、今後変更予定。）

```json
{
  "token": "Botのトークン",
  "clientId": "BotのクライアントID",
  "guildId": "参加させるサーバーID"
}
```

※もちろんgitignoreに含めてありますが、公開しないようにご注意ください。

### スラッシュコマンドについて

`commands`ディレクトリに各コマンド用のコードを追加してください。

`deploy-commands.js`を実行すると、`commands`ディレクトリ内のコマンドがDiscordに登録されます。

### 実行方法

`node index.js`でBot本体が実行されます。

ただし、スラッシュコマンドの登録のためには、`node deploy-commands.js`を実行する必要があります。初回実行時、またはコマンドを変更した場合はご注意ください。

## 参考

以下の記事を参考にさせていただきました。

- [【3日目】discord.jsでスラッシュコマンドを作ってみよう #discord - Qiita](https://qiita.com/narikakun/items/a897104e4bd55ca1e166)
- [サルでもわかる Discord Botの作り方 | なりかくんのブログ](https://narikakun.net/tag/dis-saru/)
