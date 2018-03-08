var basePredictSystemScoreGradeUrl = "api/GSAT/aquireAllSubjectStandar";
var max_input_score = 15;

function getScoreGradeData() {
  var input_gsat_chinese  = document.getElementById('input-gsat-chinese');
  var input_gsat_english  = document.getElementById('input-gsat-english');
  var input_gsat_math     = document.getElementById('input-gsat-math');
  var input_gsat_social   = document.getElementById('input-gsat-social');
  var input_gsat_nature   = document.getElementById('input-gsat-nature');
  var input_gsat_engLis   = document.getElementById('input-gsat-english-listen');

  // TODO: 後端架構無法改的權宜之計作法: 把不合法的值通通變成-1給後端（後端只能接受-1資料）
  if(input_gsat_chinese.value == "" || input_gsat_chinese.value > max_input_score || input_gsat_chinese.value < 0)
    { var gsat_chinese = -1; }
  else { var gsat_chinese = parseInt(input_gsat_chinese.value); }
  if(input_gsat_english.value == "" || input_gsat_english.value > max_input_score || input_gsat_english.value < 0)
    { var gsat_english = -1; }
  else { var gsat_english = parseInt(input_gsat_english.value); }
  if(input_gsat_math.value == "" || input_gsat_math.value > max_input_score || input_gsat_math.value < 0)
    { var gsat_math = -1; }
  else { var gsat_math = parseInt(input_gsat_math.value); }
  if(input_gsat_social.value == "" || input_gsat_social.value > max_input_score || input_gsat_social.value < 0)
    { var gsat_social = -1; }
  else { var gsat_social = parseInt(input_gsat_social.value); }
  if(input_gsat_nature.value == "" || input_gsat_nature.value > max_input_score || input_gsat_nature.value < 0)
    { var gsat_nature = -1; }
  else { var gsat_nature = parseInt(input_gsat_nature.value); }

  // 製作JSON
  var data = {

    "grades": {
      "gsat": {
        "Chinese": gsat_chinese,
        "English": gsat_english,
        "Math": gsat_math,
        "Society": gsat_social,
        "Science": gsat_nature
      }
    }
  };

  return data;
}

function setScoreGradeData(inputData, resultData) {
  var string_err = "";
  var gsat_total_grade  = document.getElementById('gsat-total-grade');
  var gsat_chinese_grade  = document.getElementById('gsat-chinese-grade');
  var gsat_english_grade  = document.getElementById('gsat-english-grade');
  var gsat_math_grade     = document.getElementById('gsat-math-grade');
  var gsat_social_grade   = document.getElementById('gsat-social-grade');
  var gsat_nature_grade   = document.getElementById('gsat-nature-grade');

  var gsatScoreData = inputData.grades.gsat;
  gsat_total_grade.innerHTML   = resultData.TotalScore;

  if(gsatScoreData.Chinese == -1) { gsat_chinese_grade.innerHTML = string_err; }
  else { gsat_chinese_grade.innerHTML = resultData.Chinese; }
  if(gsatScoreData.English == -1) { gsat_english_grade.innerHTML = string_err; }
  else { gsat_english_grade.innerHTML = resultData.English; }
  if(gsatScoreData.Math == -1) { gsat_math_grade.innerHTML = string_err; }
  else { gsat_math_grade.innerHTML    = resultData.Math; }
  if(gsatScoreData.Society == -1) { gsat_social_grade.innerHTML = string_err; }
  else { gsat_social_grade.innerHTML  = resultData.Society; }
  if(gsatScoreData.Science == -1) { gsat_nature_grade.innerHTML = string_err; }
  else { gsat_nature_grade.innerHTML  = resultData.Science; }

}

function setScoreGradeWaitData() {
  var string_wait = '請稍候';

  var gsat_total_grade  = document.getElementById('gsat-total-grade');
  var gsat_chinese_grade  = document.getElementById('gsat-chinese-grade');
  var gsat_english_grade  = document.getElementById('gsat-english-grade');
  var gsat_math_grade     = document.getElementById('gsat-math-grade');
  var gsat_social_grade   = document.getElementById('gsat-social-grade');
  var gsat_nature_grade   = document.getElementById('gsat-nature-grade');

  gsat_total_grade.innerHTML   = string_wait;
  gsat_chinese_grade.innerHTML = string_wait;
  gsat_english_grade.innerHTML = string_wait;
  gsat_math_grade.innerHTML    = string_wait;
  gsat_social_grade.innerHTML  = string_wait;
  gsat_nature_grade.innerHTML  = string_wait;
}

function cleanScoreGradeData() {

  var gsat_total_grade  = document.getElementById('gsat-total-grade');
  var gsat_chinese_grade  = document.getElementById('gsat-chinese-grade');
  var gsat_english_grade  = document.getElementById('gsat-english-grade');
  var gsat_math_grade     = document.getElementById('gsat-math-grade');
  var gsat_social_grade   = document.getElementById('gsat-social-grade');
  var gsat_nature_grade   = document.getElementById('gsat-nature-grade');

  gsat_total_grade.innerHTML = '';
  gsat_chinese_grade.innerHTML = '';
  gsat_english_grade.innerHTML = '';
  gsat_math_grade.innerHTML = '';
  gsat_social_grade.innerHTML = '';
  gsat_nature_grade.innerHTML = '';

}

function getGsatTotalScore() {
  var input_gsat_chinese  = document.getElementById('input-gsat-chinese');
  var input_gsat_english  = document.getElementById('input-gsat-english');
  var input_gsat_math     = document.getElementById('input-gsat-math');
  var input_gsat_social   = document.getElementById('input-gsat-social');
  var input_gsat_nature   = document.getElementById('input-gsat-nature');

  if(input_gsat_chinese.value == "") { var gsat_chinese = parseInt(0); }
  else { var gsat_chinese = parseInt(input_gsat_chinese.value); }
  if(input_gsat_english.value == "") { var gsat_english = parseInt(0); }
  else { var gsat_english = parseInt(input_gsat_english.value); }
  if(input_gsat_math.value == "") { var gsat_math = parseInt(0); }
  else { var gsat_math = parseInt(input_gsat_math.value); }
  if(input_gsat_social.value == "") { var gsat_social = parseInt(0); }
  else { var gsat_social = parseInt(input_gsat_social.value); }
  if(input_gsat_nature.value == "") { var gsat_nature = parseInt(0); }
  else { var gsat_nature = parseInt(input_gsat_nature.value); }

  var totalScore;
  if(gsat_chinese>max_input_score ||
     gsat_english>max_input_score ||
     gsat_math>max_input_score ||
     gsat_social>max_input_score ||
     gsat_nature>max_input_score
   ) {
    totalScore = null;
  }
  else {
    totalScore = gsat_chinese + gsat_english + gsat_math + gsat_social + gsat_nature;
  }


  return totalScore;
}


function updateGsatTotalScore() {
  var gsat_total  = document.getElementById('gsat-total');

  var totalScore = getGsatTotalScore();
  if(totalScore == null) {
    gsat_total.innerHTML = "??";
  }
  else {
    gsat_total.innerHTML = totalScore;
  }
}

function queryScoreGrade() {

  updateGsatTotalScore();

  var inputData = getScoreGradeData();
  $.ajax({
    type: "POST",
    url: basePredictSystemScoreGradeUrl,
    headers: {
      "content-type": "application/json"
    },
    dataType: "json",
    data: JSON.stringify(inputData),
    beforeSend: function() {
      // setScoreGradeWaitData();
    },
    success: function(data){
      setScoreGradeData(inputData, data.step);
    },
    error: function(data){
      cleanScoreGradeData();
    }
  });
  // alert("test");
}

var input_gsat_chinese  = document.getElementById('input-gsat-chinese');
var input_gsat_english  = document.getElementById('input-gsat-english');
var input_gsat_math     = document.getElementById('input-gsat-math');
var input_gsat_social   = document.getElementById('input-gsat-social');
var input_gsat_nature   = document.getElementById('input-gsat-nature');
var input_gsat_engLis   = document.getElementById('input-gsat-english-listen');

input_gsat_chinese.onchange = function(){ queryScoreGrade(); };
input_gsat_english.onchange = function(){ queryScoreGrade(); };
input_gsat_math.onchange = function(){ queryScoreGrade(); };
input_gsat_social.onchange = function(){ queryScoreGrade(); };
input_gsat_nature.onchange = function(){ queryScoreGrade(); };
input_gsat_engLis.onchange = function(){ queryScoreGrade(); };

queryScoreGrade();