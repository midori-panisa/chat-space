require 'rails_helper'
describe MessagesController, type: :controller do
  let(:group){ create(:group) }
  let(:user){ create(:user) }
  describe '#index' do
  end
  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
    context 'ログインしている場合' do
      before do
        login user
      end
      context '保存に成功' do
        subject {
          post :create,
          params: params
        }
        it 'メッセージが保存されている' do
          expect{ subject }.to change(Message, :count).by(1)
        end
        it '遷移したいページにリダイレクトしている' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
      context '保存できなかった' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }
        it 'メッセージが保存されていない' do
          expect{ subject }.not_to change(Message, :count)
        end
        it '意図した画面に遷移している' do
          subject
          expect(response).to render_template :index
        end
      end
    end
    context 'ログインしていない場合' do
      it 'ログイン画面にリダイレクトすること' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end