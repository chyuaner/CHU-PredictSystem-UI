var basePredictSystemUrl = "api/Prediction/analysis";

// http://stackoverflow.com/questions/1127905/how-can-i-format-an-integer-to-a-specific-length-in-javascript
function formatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function getData() {
  // 網頁介面對應
  var input_salary        = document.getElementById('input-expect-salary');

  var input_ast_chinese   = document.getElementById('input-ast-chinese');
  var input_ast_english   = document.getElementById('input-ast-english');
  var input_ast_mathA     = document.getElementById('input-ast-math-a');
  var input_ast_mathB     = document.getElementById('input-ast-math-b');
  var input_ast_history   = document.getElementById('input-ast-history');
  var input_ast_geography = document.getElementById('input-ast-geography');
  var input_ast_citizen   = document.getElementById('input-ast-citizen-and-social');
  var input_ast_physics   = document.getElementById('input-ast-physics');
  var input_ast_chemistry = document.getElementById('input-ast-chemistry');
  var input_ast_organism  = document.getElementById('input-ast-organism');

  var input_gsat_chinese  = document.getElementById('input-gsat-chinese');
  var input_gsat_english  = document.getElementById('input-gsat-english');
  var input_gsat_math     = document.getElementById('input-gsat-math');
  var input_gsat_social   = document.getElementById('input-gsat-social');
  var input_gsat_nature   = document.getElementById('input-gsat-nature');
  var input_gsat_engLis   = document.getElementById('input-gsat-english-listen');

  var input_departmentGroup = document.getElementsByName('input-department-group');

  // 取得使用者填寫的表單資料
  if(input_salary.value == "") {
    var salary = parseFloat(0);
  }
  else {
    var salary = parseFloat(input_salary.value);
  }
  var ast_chinese = parseInt(input_ast_chinese.value);
  var ast_english = parseInt(input_ast_english.value);
  var ast_mathA = parseInt(input_ast_mathA.value)
  var ast_mathB = parseInt(input_ast_mathB.value);
  var ast_history = parseInt(input_ast_history.value);
  var ast_geography = parseInt(input_ast_geography.value);
  var ast_citizen = parseInt(input_ast_citizen.value);
  var ast_physics = parseInt(input_ast_physics.value);
  var ast_chemistry = parseInt(input_ast_chemistry.value);
  var ast_organism = parseInt(input_ast_organism.value);

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

  var departmentGroup = [];
  for(var i=0; i<input_departmentGroup.length; i++) {
    if(input_departmentGroup[i].checked) {
      departmentGroup.push(input_departmentGroup[i].value);
    }
  }
  // 若沒選擇的話，就全選
  if(departmentGroup.length == 0) {
    for(var i=0; i<input_departmentGroup.length; i++) {
      departmentGroup.push(input_departmentGroup[i].value);
    }
  }

  // 製作JSON
  var data = {

    "grades": {
      "ast": {
        "Chinese": ast_chinese,
        "English": ast_english,
        "Math_A": ast_mathA,
        "Math_B": ast_mathB,
        "History": ast_history,
        "Geographic":ast_geography,
        "Citizen_and_Society": ast_citizen,
        "Physics": ast_physics,
        "Chemistry": ast_chemistry,
        "Biology": ast_organism
      },
      "gsat": {
        "Chinese": gsat_chinese,
        "English": gsat_english,
        "Math": gsat_math,
        "Society": gsat_social,
        "Science": gsat_nature,
        "EngListeningLevel": gsat_engLis
      }
    },
    "groups": departmentGroup,
    "expect_salary": salary
  };

  return data;
}

function setData(inputData, resultData) {

  // 網頁介面對應
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  // 有沒有資料
  if(resultData.length > 0) {
    table_result_body.empty();
    for(var i=0; i<resultData.length; i++) {
      addData(resultData[i].did, resultData[i].uname, resultData[i].uurl,
              resultData[i].dname, resultData[i].durl, resultData[i].salary, resultData[i].salaryUrl,
              resultData[i].minScore, resultData[i].yourScore);
    }
  }
  else {
    table_result_body.empty();
    table_result_body.append('<tr><td colspan="6">沒有你要的資料喔～</td></tr>');
  }
}

function addData(did, uname, uurl, dname, durl, salary, salaryUrl, minScore, yourScore) {
  if(salary == 0) { salary = '樣本不足';}

  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  var trClass = '';
  if(yourScore < minScore) {
    trClass += ' warning';
  }
  if(uname == '中華大學') {
    trClass += ' chu';
  }
  var tr = '<tr data-item-id="'+did+'" class="' + trClass + '">';

  var content = '<th data-title="校系代碼">'+formatNumberLength(did, 4)+'</th>';
  content += '<td data-title="校名"><a href="'+uurl+'" target="_blank" data-tooltip aria-haspopup="true" title="連結至學校首頁">'+uname+'</a></td>';
  content += '<td data-title="科系名稱"><a href="'+durl+'" target="_blank" data-tooltip aria-haspopup="true" title="連結至科系首頁">'+dname+'</a></td>';
  if(salaryUrl == null) {
    content += '<td data-title="畢業生平均薪資">'+salary+'</td>';
  }
  else {
    content += '<td data-title="畢業生平均薪資"><a href="'+salaryUrl+'" target="_blank" data-tooltip aria-haspopup="true" title="連結至104升學就業地圖">'+salary+'</a></td>';
  }
  content += '<td data-title="去年最低錄取分數">'+minScore+'</td>';
  if(yourScore < minScore) {
    content += '<td data-title="您的加權分數" class="warning">'+yourScore+'</td>';
  }
  else {
    content += '<td data-title="您的加權分數">'+yourScore+'</td>';
  }

  table_result_body.append(tr+content+'</tr>');

  $('#table-result-suggest-school-departments tr[data-item-id="'+did+'"]').foundation('tooltip', 'reflow');
}

function cleanData() {
  // 網頁介面對應
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  table_result_body.empty();
  table_result_body.append('<tr><td colspan="6">沒有你要的資料喔～</td></tr>');
}

function errorData() {
  // 網頁介面對應
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  table_result_body.empty();
  table_result_body.append('<tr><td colspan="6">錯誤！沒有網路連線。</td></tr>');
}

function queryResult() {
  var inputData = getData();
  var resultData = [];

  var div_loading = document.getElementById('loading-area');

  $.ajax({
//    type: "GET",
    type: "POST",
    url: basePredictSystemUrl,
    headers: {
      "content-type": "application/json"
    },
    dataType: "json",
    data: JSON.stringify(inputData),
    beforeSend: function() {
      // 顯示處理中畫面
      div_loading.classList.remove('hidden');
    },
    success: function(data){
      // 隱藏處理中畫面
      div_loading.classList.add('hidden');
      setData(inputData, data.result);
    },
    error: function(data){
      // 隱藏處理中畫面
      div_loading.classList.add('hidden');
      errorData();
    }
  });
}

//window.onload = function() {

  var form_input = document.getElementById('input-form');
  form_input.onsubmit = function(e) {
    e.preventDefault();
    queryResult();
    return 0;
  }


//}
