
README.md
README.md

# Ruby on Rails chat-space
これはプログラミングスクールTECH::CAMPのカリキュラムで作成したチャットアプロケーションです。

## 使い方
このアプリケーションを動かす場合は、まずはリポジトリを手元にクローンしてください。 その後、次のコマンドで必要になる RubyGems をインストールします。

$ bundle install --without production
$ rails db:create
その後、データベースへのマイグレーションを実行します

$ rails db:migrate
Railsサーバーを立ち上げて下さい

$ rails server

## 技術内容
・言語：Ruby
・テンプレートエンジン：Haml
・フレームワーク：Ruby on Rails
・DB:MySQL
・バージョン管理：Git

## 実装されている機能
・ユーザーログイン・ログアウト機能
・ユーザー新規会員登録( gem'devise'使用 )
・グループ作成・編集機能（ インクリメンタルサーチを使った実装 ）
・メッセージ送信機能( 非同期通信を使った送信機能と自動更新機能 )
・画像送信機能( 同上 )

## DB設計


## user テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
|password confirmation|string|null: false|

<!-- パスワードは8文字以上と制限をつける -->
### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## messages テーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
### Association
belongs_to :group
belongs_to :user

## group テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
### Association
has_many :groups_users
has_many :users, through: :groups_users
has_many :messages


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user



