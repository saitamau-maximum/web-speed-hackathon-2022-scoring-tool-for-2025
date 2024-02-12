# デプロイ方法

1. <https://github.com/CyberAgentHack/web-speed-hackathon-2022> をクローンします。
(フォークでもいいですが、プライベートリポジトリにできないので、cloneしてから作成したプライベートリポジトリにremoteを書き換えてそちらにpushするのが良いです)

2. `.git/config`を開く

```txt
[remote "origin"]
	url = [ここに自分のリポジトリのURLを入れる]
	fetch = +refs/heads/*:refs/remotes/origin/*
```

3. `git push origin main` で自分のリポジトリにpushします。

4. `yarn install` で依存関係をインストールします。もし`yarn`がない場合は`npm install -g yarn`を実行するか、`node v20`をインストールすると良いです。

5. `yarn init:seeds 2024-02-01 2024-03-01` でシードデータを作成します。

6. seedが更新されるので`git add .` + `git commit -m "init seeds"` + `git push origin main` でpushします。

7. `flyctl` を導入します。<https://fly.io/docs/hands-on/install-flyctl/>の手順に従ってください。

8. `flyctl auth signup` でFly.ioにサインアップします。この時クレジットカードの登録が求められる場合がありますが、料金はかからないので登録してください。

9. `flyctl launch` でアプリケーションをデプロイします。設定項目は適当で良いです。（デプロイに20分程度かかることがあります。もしローカルにDockerをインストールしている場合は、`flyctl launch --local-only`でローカルでビルドしてデプロイすることもできます）
