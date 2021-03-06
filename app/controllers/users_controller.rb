class UsersController < ApplicationController
  def index
    # user.jsで受け取った[:keyword]の内容で条件分岐
    # [:keyword]の中身がない時
    return nil if params[:keyword] == ""

    # [:keyword]の中身がある時、LIKE句を使った曖昧検索をする
    @users = User.where(['name like ?', "%#{params[:keyword]}%"]).where.not(id: current_user.id).limit(10)
    respond_to do |format|
      format.html
      format.json
    end
  end


  def edit
  end
  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end


  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
