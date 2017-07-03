var baseRegisterSystemUrl = "api/send";
var clicked = false;

function getData() {
  //取得資料
  var input_email      = document.getElementById('register-email');
  var login_email      = document.getElementById('singin-email');
  var select_location  = document.getElementById('select-location');
  var select_school    = document.getElementById('select-school');
  var select_identity  = document.getElementById('select-identity');

  // 製作JSON
  var data = {

    "person":{
      "email": login_email,
      "location": select_location,
      "schoolName": select_school,
      "identity": select_identity
    }
  };

  return data;
}

$(document).ready(function() {
    $('#contact form').on('submit', function(e) {
        e.preventDefault();
        var $form = $(e.currentTarget),
            $email = $form.find('#contact-email'),
            $button = $form.find('button[type=submit]');

        if($email.val().indexOf('@') == -1) {
            vaca = $email.closest('form-group')
            $email.closest('.form-group').addClass('has-error');
        } else {
            $form.find('.form-group').addClass('has-success').removeClass('has-error');
            $button.attr('disabled', 'disabled');
            $button.after('<span>訊息已送出。我們將盡快與你聯繫</span>');
        }
    });

    $('#sign-btn').on('click', function(e) {
        $(e.currentTarget).closest('ul').hide();
        $('form#signin').fadeIn('fast');
    });

    $('#register-btn').on('click', function(e) {
        $(e.currentTarget).closest('ul').hide();
        $('form#register').fadeIn('fast');
    });
});

$('#sendbtn').click(function(){
  clicked = true;
});

if(clicked)
{
  $.ajax({
    // type: "GET",
    type: "POST",
    url:baseRegisterSystemUrl,
    header: {
      "content-type": "application/json"
    },
    dataType: "json",
    data: JSON.stringify(inputData),
    beforeSend: function() {
      // 顯示處理中畫面
      $('input[type=submit]').prop( "disabled", true );
    },
    success: function(data){
      // 隱藏處理中畫面
      $('input[type=submit]').prop( "disabled", false );
      alert("<strong>註冊完成！</strong> 請到註冊的Email收信");
    },
    error: function(data){
      // 隱藏處理中畫面
      alert("<strong>錯誤！</strong> 沒有網路連線");
      $('input[type=submit]').prop( "disabled", false );
    }
  });
}
