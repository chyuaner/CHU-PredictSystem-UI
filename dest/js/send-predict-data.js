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

  var input_gast_chinese  = document.getElementById('input-gsat-chinese');
  var input_gast_english  = document.getElementById('input-gsat-english');
  var input_gast_math     = document.getElementById('input-gsat-math');
  var input_gast_social   = document.getElementById('input-gsat-social');
  var input_gast_nature   = document.getElementById('input-gsat-nature');
  var input_gast_engLis   = document.getElementById('input-gsat-english-listen');

  var input_departmentGroup = document.getElementsByName('input-department-group');

  // 取得使用者填寫的表單資料
  var salary = parseFloat(input_salary.value);
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

  var gast_chinese = parseInt(input_gast_chinese.value);
  var gast_english = parseInt(input_gast_english.value);
  var gast_math = parseInt(input_gast_math.value);
  var gast_social = parseInt(input_gast_social.value);
  var gast_nature = parseInt(input_gast_nature.value);
  var gast_engLis = input_gast_engLis.value;

  var departmentGroup = [];
  for(var i=0; i<input_departmentGroup.length; i++) {
    if(input_departmentGroup[i].checked) {
      departmentGroup.push(input_departmentGroup[i].value);
    }
  }

  // 製作JSON
  var data = {
    "salary": salary,
    "ast": {
      "chinese": ast_chinese,
      "english": ast_english,
      "mathA": ast_mathA,
      "mathB": ast_mathB,
      "history": ast_history,
      "geography":ast_geography,
      "citizen": ast_citizen,
      "physics": ast_physics,
      "chemistry": ast_chemistry,
      "organism": ast_organism
    },
    "gast": {
      "chinese": gast_chinese,
      "english": gast_english,
      "math": gast_math,
      "social": gast_social,
      "nature": gast_nature,
      "englishListen": gast_engLis
    },
    "departmentGroup": departmentGroup
  };

  return data;
}

function setData(inputData, resultData) {

  // 網頁介面對應
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  // 有沒有資料
  if(resultData.length > 0) {
  }
  else {
    table_result_body.empty();
    table_result_body.append('<tr><td colspan="6">沒有你要的資料喔～</td></tr>');
  }
}

function addData(did, uname, uurl, dname, durl, salary, salaryUrl, minScore, yourScore) {
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  if(table_result_body.html() == '<tr><td colspan="6">沒有你要的資料喔～</td></tr>') {
    table_result_body.empty();
  }

  table_result_body.append('<tr><th data-title="校系代碼">'+did+'</th><td data-title="校名"><a href="'+uurl+'">'+uname+'</a></td><td data-title="科系名稱"><a href="'+durl+'">'+dname+'</a></td><td data-title="畢業生平均薪資"><a href="'+salaryUrl+'">'+salary+'</a></td><td data-title="去年最低錄取分數">'+minScore+'</td><td data-title="您的加權分數">'+yourScore+'</td></tr>');
}

function cleanData() {
  // 網頁介面對應
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  table_result_body.empty();
  table_result_body.append('<tr><td colspan="6">沒有你要的資料喔～</td></tr>');
}

function queryResult() {
  var url = "demo/analysis.json";

  var inputData = getData();
  var resultData = [];

  // 顯示處理中畫面
  var div_loading = document.getElementById('loading-area');
  div_loading.classList.remove('hidden');
  window.setTimeout(function() { div_loading.classList.add('hidden'); }, 3000);
  setData(inputData, resultData);
}

//window.onload = function() {

  var form_input = document.getElementById('input-form');
  form_input.onsubmit = function(e) {
    e.preventDefault();
    alert(JSON.stringify(getData()));
    queryResult();
    return 0;
  }


//}
