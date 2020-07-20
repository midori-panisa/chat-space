

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



