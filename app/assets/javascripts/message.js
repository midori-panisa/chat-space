$(function(){
  function buildHTML(message){
    console.log(message)
    if ( message.image ){
      var html = 
        `<div class="wrapper__chat-main__messages__message" data-message-id="${message.id}">
          <div class="wrapper__chat-main__messages__message__upper-info">
            <p class="wrapper__chat-main__messages__message__upper-info__talker">
              ${message.user_name}
            </p>
            <p class="wrapper__chat-main__messages__message__upper-info__date">
              ${message.time}
            </p>
          </div>
          <div class="wrapper__chat-main__messages__message__lower-info">
            <p class="wrapper__chat-main__messages__message__lower-info__text">
              ${message.content}
            </p>
            <img class="lower-info__image" src=${message.image}>
          </div>
        </div>`
      return html;
    } else {
      var html = 
        `<div class="wrapper__chat-main__messages__message" data-message-id="${message.id}">
          <div class="wrapper__chat-main__messages__message__upper-info">
            <p class="wrapper__chat-main__messages__message__upper-info__talker">
              ${message.user_name}
            </p>
            <p class="wrapper__chat-main__messages__message__upper-info__date">
              ${message.time}
            </p>
          </div>
          <div class="wrapper__chat-main__messages__message__lower-info">
            <p class="wrapper__chat-main__messages__message__lower-info__text">
              ${message.content}
            </p>
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
      // 連続で送信ボタンを押せるようにした
      $('.wrapper__chat-main__message-form__new-text__submit-btn').prop("disabled", false);
      // メッセージと画像を一気にリセット（初期値に戻す）
      $('#new_message')[0].reset();

    })
    // 非同期通信失敗時
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
  var reloadMessages = function(){
    // 最新メッセージidを取得
    var last_message_id = $('.wrapper__chat-main__messages__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0){
        // 追加されたHTMLが入る
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML += buildHTML(message)
        });
        $('.wrapper__chat-main__messages').append(insertHTML);
        $('.wrapper__chat-main__messages').animate({ scrollTop: $('.wrapper__chat-main__messages')[0].scrollHeight});
      }

    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});