# デプロイ方法

1. <https://github.com/saitamau-maximum/web-speed-hackathon-2022-for-2025> をクローンします。
(フォークでもいいですが、プライベートリポジトリにできないので、cloneしてから作成したプライベートリポジトリにremoteを書き換えてそちらにpushするのが良いです)

2. 自分の新たなリポジトリ(例: `wsh-2022-practice`)を作成します。**空の作るだけでなにもしなくて良いです**

3. `.git/config`を開く

```txt
[remote "origin"]
	url = [ここに自分のリポジトリのURLを入れる]
	fetch = +refs/heads/*:refs/remotes/origin/*
```

4. `git push origin main` で自分のリポジトリにpushします。

5. `yarn install` で依存関係をインストールします。もし`yarn`がない場合は`npm install -g yarn`を実行するか、`node v20`をインストールすると良いです。

<!-- 5. <https://github.com/saitamau-maximum/web-speed-hackathon-2022-scoring-tool/releases/tag/competition-new-seed>ここからseed dbをダウンロードします。`./database/seeds.sqlite`をダウンロードしたファイルで置き換えます。 -->

6. `flyctl` を導入します。<https://fly.io/docs/hands-on/install-flyctl/>の手順に従ってください。

7. `flyctl auth signup` でFly.ioにサインアップします。この時クレジットカードの登録が求められる場合がありますが、料金はかからないので登録してください。

8. `flyctl launch` でアプリケーションをデプロイします。設定項目は適当で良いです。（デプロイに20分程度かかることがあります。もしローカルにDockerをインストールしている場合は、`flyctl launch --local-only`でローカルでビルドしてデプロイすることもできます）
