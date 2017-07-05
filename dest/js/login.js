var baseRegisterSystemSingUpUrl = "api/Account/SingUp";
var baseRegisterSystemLoginUrl = "api/Account/Login";

function getLoginData() {
  var login_email      = document.getElementById('singin-email');
  return login_email;
}

function getRegisterData() {
  //取得資料
  var input_email      = document.getElementById('register-email');
  var select_location  = document.getElementById('select-location');
  var select_school    = document.getElementById('select-school');
  var select_identity  = document.getElementById('select-identity');

  // 製作JSON
  var register_data = {

    "person":{
      "email": login_email,
      "location": select_location,
      "schoolName": select_school,
      "identity": select_identity
    }
  };

  return register_data;
}

$('#sign-btn').click(function(e) {
    $(e.currentTarget).closest('ul').hide();
    $('form#signin').fadeIn('fast');
});

$('#register-btn').click(function(e){
    $(e.currentTarget).closest('ul').hide();
    $('form#register').fadeIn('fast');
});

$('#return').click(function(e) {
    $(e.currentTarget).closest('form').hide();
    $('ul#first').fadeIn('fast');
});

$('#return-btn').click(function(e){
    $(e.currentTarget).closest('form').hide();
    $('ul#first').fadeIn('fast');
});



function registerResult() {
  var inputRegisterData = getRegisterData();
  if(loginbtnclicked)
  {
    $.ajax({
      // type: "GET",
      type: "POST",
      url:baseRegisterSystemLoginUpUrl,
      header: {
        "content-type": "text/plain"
      },
      dataType: "text",
      data: "email="+getLoginData(),
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

}


$('#sendbtn').click(function (e){
  e.preventDefault();
  $.ajax({
    // type: "GET",
    type: "POST",
    url:baseRegisterSystemLoginUpUrl,
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

});
