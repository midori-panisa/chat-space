$(function(){
  function buildHTML(message){
    if ( message.image ){
      var html = 
        `<div class=".wrapper__chat-main__messages">
          <div class=".wrapper__chat-main__messages__message">
            <div class=".wrapper__chat-main__messages__message__upper-info">
              <p class=".wrapper__chat-main__messages__message__upper-info__talker">
                ${message.user_name}
              </p>
              <p class=".wrapper__chat-main__messages__message__upper-info__date">
                ${message.time}
              </p>
            </div>
            <div class=".wrapper__chat-main__messages__message__lower-info">
              <p class=".wrapper__chat-main__messages__message__lower-info__text">
                ${message.content}
              </p>
              <p class=".wrapper__chat-main__messages__message__lower-info__image">
                ${message.image.url}
              <p>
            </div>
          </div>
        </div>`
      return html;
    } else {
      var html = 
        `<div class=".wrapper__chat-main__messages">
          <div class=".wrapper__chat-main__messages__message">
            <div class=".wrapper__chat-main__messages__message__upper-info">
              <p class=".wrapper__chat-main__messages__message__upper-info__talker">
                ${message.user_name}
              </p>
              <p class=".wrapper__chat-main__messages__message__upper-info__date">
                ${message.time}
              </p>
            </div>
            <div class=".wrapper__chat-main__messages__message__lower-info">
              <p class=".wrapper__chat-main__messages__message__lower-info__text">
                ${message.content}
              </p>
            </div>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    // サーバへのリクエスト記述
    $.ajax({
      url: url,
      type: "POST",
      // 送信するデータ内容
      data: formData,

      // 帰ってくるデータ形式
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // 非同期通信成功時
    // 引数dataにはcreate.json.jbuilderのデータが含まれてる
    .done(function(data){
      var html = buildHTML(data);
      // メッセージを送信した時にclass=.wrapper__chat-main__messagesに入れるようにする
      $('.wrapper__chat-main__messages').append(html);
      $('.wrapper__chat-main__messages').animate({ scrollTop: $('.wrapper__chat-main__messages')[0].scrollHeight});
      // メッセージと画像を一気にリセット（初期値に戻す）
      $('#new_message')[0].reset();
      // 連続で送信ボタンを押せるようにした
      $('.wrapper__chat-main__message-form__new-text__submit-btn').prop("disabled", false);
    })
    // 非同期通信失敗時
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});