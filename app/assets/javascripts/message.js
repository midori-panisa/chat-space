$(function(){
  function buildHTML(message){
    if ( message.image ){
      var html = 
        `<div class=".wrapper__chat-main__messages__message">
          <div class=".wrapper__chat-main__messages__message__upper-info">
            <p class=".wrapper__chat-main__messages__upper-info__talker">
              ${message.user_name}
            </p>
            <p class=".wrapper__chat-main__message-list__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <div class=".wrapper__chat-main__message-list__lower-info">
            <p class=".wrapper__chat-main__message-list__lower-info__text">
              ${message.content}
            </p>
            <p class=".wrapper__chat-main__message-list__lower-info__image">
              ${message.image}
            <p>
          </div>
        </div>`
      return html;
    } else {
      var html = 
        `<div class=".wrapper__chat-main__messages__message">
          <div class=".wrapper__chat-main__messages__message__upper-info">
            <p class=".wrapper__chat-main__messages__upper-info__talker">
              ${message.user_name}
            </p>
            <p class=".wrapper__chat-main__message-list__upper-info__date">
              ${message.created_at}
            </p>
          </div>
          <div class=".wrapper__chat-main__message-list__lower-info">
            <p class=".wrapper__chat-main__message-list__lower-info__text">
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
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.wrapper__chat-main__messages').append(html);
      $('.wrapper__chat-main__messages').animate({ scrollTop: $('.wrapper__chat-main__messages')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.wrapper__chat-main__message-form__new-text__submit-btn').prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});