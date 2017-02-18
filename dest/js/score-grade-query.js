function getScoreGradeData() {
  var input_gsat_chinese  = document.getElementById('input-gsat-chinese');
  var input_gsat_english  = document.getElementById('input-gsat-english');
  var input_gsat_math     = document.getElementById('input-gsat-math');
  var input_gsat_social   = document.getElementById('input-gsat-social');
  var input_gsat_nature   = document.getElementById('input-gsat-nature');
  var input_gsat_engLis   = document.getElementById('input-gsat-english-listen');

  // 製作JSON
  var data = {

    "grades": {
      "gsat": {
        "Chinese": gsat_chinese,
        "English": gsat_english,
        "Math": gsat_math,
        "Society": gsat_social,
        "Science": gsat_nature,
        "EngListeningLevel": gsat_engLis
      }
    }
  };

  return data;
}

function setScoreGradeData(inputData, resultData) {
  var gsat_total_grade  = document.getElementById('gsat-total-grade');
  var gsat_chinese_grade  = document.getElementById('gsat-chinese-grade');
  var gsat_english_grade  = document.getElementById('gsat-english-grade');
  var gsat_math_grade     = document.getElementById('gsat-math-grade');
  var gsat_social_grade   = document.getElementById('gsat-social-grade');
  var gsat_nature_grade   = document.getElementById('gsat-nature-grade');
  var gsat_engLis_grade   = document.getElementById('gsat-english-listen-grade');


}

function cleanScoreGradeData() {

  var gsat_total_grade  = document.getElementById('gsat-total-grade');
  var gsat_chinese_grade  = document.getElementById('gsat-chinese-grade');
  var gsat_english_grade  = document.getElementById('gsat-english-grade');
  var gsat_math_grade     = document.getElementById('gsat-math-grade');
  var gsat_social_grade   = document.getElementById('gsat-social-grade');
  var gsat_nature_grade   = document.getElementById('gsat-nature-grade');
  var gsat_engLis_grade   = document.getElementById('gsat-english-listen-grade');

  gsat_total_grade.innerHTML = '';
  gsat_chinese_grade.innerHTML = '';
  gsat_english_grade.innerHTML = '';
  gsat_math_grade.innerHTML = '';
  gsat_social_grade.innerHTML = '';
  gsat_nature_grade.innerHTML = '';
  gsat_engLis_grade.innerHTML = '';

}

function updateGsatTotalScore() {
  var gsat_total  = document.getElementById('gsat-total');
  var input_gsat_chinese  = document.getElementById('input-gsat-chinese');
  var input_gsat_english  = document.getElementById('input-gsat-english');
  var input_gsat_math     = document.getElementById('input-gsat-math');
  var input_gsat_social   = document.getElementById('input-gsat-social');
  var input_gsat_nature   = document.getElementById('input-gsat-nature');
  var input_gsat_engLis   = document.getElementById('input-gsat-english-listen');

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
  var gsat_engLis = input_gsat_engLis.value;

  var totalScore = gsat_chinese + gsat_english + gsat_math + gsat_social + gsat_nature;
  gsat_total.innerHTML = totalScore;
}

function queryScoreGrade() {

  updateGsatTotalScore();
  // alert("test");
}

var input_gsat_chinese  = document.getElementById('input-gsat-chinese');
var input_gsat_english  = document.getElementById('input-gsat-english');
var input_gsat_math     = document.getElementById('input-gsat-math');
var input_gsat_social   = document.getElementById('input-gsat-social');
var input_gsat_nature   = document.getElementById('input-gsat-nature');
var input_gsat_engLis   = document.getElementById('input-gsat-english-listen');

input_gsat_chinese.onchange = function(){ queryScoreGrade() };
input_gsat_english.onchange = function(){ queryScoreGrade() };
input_gsat_math.onchange = function(){ queryScoreGrade() };
input_gsat_social.onchange = function(){ queryScoreGrade() };
input_gsat_nature.onchange = function(){ queryScoreGrade() };
input_gsat_engLis.onchange = function(){ queryScoreGrade() };
