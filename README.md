# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
##user テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
|password confirmation|string|null: false|
<!-- パスワードは8文字以上と制限をつける -->
### Association
- has_many :groups_users
- has_many :groups, through: groups_users
- has_many :photos

##photo テーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
has_many :photos_tags
has_many :tags, through: photos_tags

##group テーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|
### Association
has_many :groups_users
has_many :users, through: groups_users
has_many :photos


##groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


tags テーブル
|Column|Type|Options|
|------|----|-------|
|tags_id|integer|null: false, foreign_key: true|
|tags_name|string|null: false|
- has_many :photos_tags
- has_many :photos, through: photos_tags

photos_tags テーブル
|Column|Type|Options|
|------|----|-------|


- belongs_to :photo
- belongs_to :tag

