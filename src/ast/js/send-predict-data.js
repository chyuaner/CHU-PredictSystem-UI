var basePredictSystemUrl = "api/ast/analysis";
var max_input_score = 15;
var querying = false;

// http://stackoverflow.com/questions/1127905/how-can-i-format-an-integer-to-a-specific-length-in-javascript

// function formatNumberLength(num, length) {
//     var r = "" + num;
//     while (r.length < length) {
//         r = "0" + r;
//     }
//     return r;
// }

function transferToMobileSalaryURL(url) {
    let params = url.split('?');
    // https://guide.104.com.tw/career/view?degree=3&mid=520114&sid=5007000000
    let murl = "https://guide.104.com.tw/career/view?"+params[1];
    return murl;
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
  var input_gsat_socre    = getGsatTotalScore();

  var input_departmentGroup = document.getElementsByName('input-department-group');
  var input_stateGroup = document.getElementsByName('input-state-group');
  var input_universityGroup = document.getElementsByName('input-university-group');

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
  if(input_gsat_socre == "") { var gsat_score = parseInt(0); }
  else { var gsat_score = parseInt(input_gsat_socre); }

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

  var stateGroup = [];
  for(var i=0; i<input_stateGroup.length; i++) {
    if(input_stateGroup[i].checked) {
      stateGroup.push(input_stateGroup[i].value);
    }
  }
  // 若沒選擇的話，就全選
  if(stateGroup.length == 0) {
    for(var i=0; i<input_stateGroup.length; i++) {
      stateGroup.push(input_stateGroup[i].value);
    }
  }

  var universityGroup = [];
  for(var i=0; i<input_universityGroup.length; i++) {
    if(input_universityGroup[i].checked) {
      universityGroup.push(input_universityGroup[i].value);
    }
  }
  // 若沒選擇的話，就全選
  if(universityGroup.length == 0) {
    for(var i=0; i<input_universityGroup.length; i++) {
      universityGroup.push(input_universityGroup[i].value);
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
        "EngListeningLevel": gsat_engLis,
        "TotalScore": gsat_score
      }
    },
    "groups": departmentGroup,
    "location": stateGroup,
    "property": universityGroup,
    "expect_salary": salary
  };

  return data;
}

function setData(resultData) {
  // 網頁介面對應
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  // 有沒有資料
  if(resultData.length > 0) {
    table_result_body.empty();
    for(var i=0; i<resultData.length; i++) {
      addData(resultData[i].did, resultData[i].uname, resultData[i].uurl,
              resultData[i].dname, resultData[i].durl, resultData[i].salary, resultData[i].salaryUrl,
              resultData[i].minScore, resultData[i].yourScore, resultData[i].examURL);
    }
  }
  else {
    table_result_body.empty();
    table_result_body.append('<tr><td colspan="6">沒有符合您的校系，請修改條件後再次分析。</td></tr>');
  }
}

function addData(did, uname, uurl, dname, durl, salary, salaryUrl, minScore, yourScore, examURL) {
  let post_url = 'https://uac2.ncku.edu.tw/cross_search/index.php?c=search&m=detail';
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
  var tr = `<tr data-item-id="${did}" class="${trClass}">`;

  var content = '';
  /*
  <button class="button small" type="submit" name="dep_id" value="${did}">
                                      
                  </button>
  */
  content += `<td data-title="校系代碼">
                <form method="post" action=${post_url} target="_blank">
                  <span data-tooltip aria-haspopup="true" data-tooltip-title="連結至分科測驗校系分則網頁">
                    <input class="link" type="submit" name="dep_id" value="${did}">
                  </span>
                </form>
              </td>`;

  content += `<td data-title="校名">
                <a href="${uurl}" target="_blank" data-tooltip aria-haspopup="true" 
                    data-tooltip-title="連結至學校首頁">${uname}</a>
              </td>`;
  if(durl === null){
    content += `<td data-title="科系名稱">${dname}</td>`;
  }
  else {
    content += `<td data-title="科系名稱">
                  <a href="${durl}" target="_blank" data-tooltip aria-haspopup="true"
                      data-tooltip-title="連結至科系首頁">${dname}</a>
                </td>`;
  }
  if(salaryUrl === null) {
    content += `<td data-title="畢業生平均薪資">${salary}</td>`;
  }
  else {
      if(window.screen.height < 768) {
          salaryUrl = transferToMobileSalaryURL(salaryUrl);
      }
      content += `<td data-title="畢業生平均薪資">
                    <a href="${salaryUrl}" target="_blank" data-tooltip aria-haspopup="true" 
                        data-tooltip-title="連結至104升學就業地圖">${salary}</a>
                  </td>`;
  }
  content += `<td data-title="去年最低錄取分數">${minScore}</td>`;
  if(yourScore < minScore) {
    content += `<td data-title="換算去年加權分數" class="warning">
                  <span data-tooltip aria-haspopup="true" 
                      data-tooltip-title="換算去年加權分數\n低於去年最低錄取分數">${yourScore}</span>
                </td>`;
  }
  else {
    content += `<td data-title="換算去年加權分數">${yourScore}</td>`;
  }

  table_result_body.append(tr+content+'</tr>');
}

function cleanData() {
  // 網頁介面對應
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  table_result_body.empty();
  table_result_body.append('<tr><td class="big-row" colspan="˙">沒有符合您的校系，請修改條件後再次分析。</td></tr>');
}

function errorData() {
  // 網頁介面對應
  var table_result = $("#table-result-suggest-school-departments");
  var table_result_body = table_result.find("tbody");

  table_result_body.empty();
  table_result_body.append('<tr><td colspan="6">錯誤！沒有網路連線。</td></tr>');
}

function errorAlertMsg(text) {
  var alertArea = $("#input-area .alerts-area");
  alertArea.append('<div data-alert class="alert-box alert round">'+text+' <a href="#" class="close">&times;</a></div>');
  $("#input-area .alerts-area").foundation();
}

function warningAlertMsg(text) {
  var alertArea = $("#input-area .alerts-area");
  alertArea.append('<div data-alert class="alert-box warning round">'+text+' <a href="#" class="close">&times;</a></div>');
 $("#input-area .alerts-area").foundation();
}

function cleanAlert() {
  var alertArea = $("#input-area .alerts-area");
  alertArea.empty();
}

function atLeast3(data)
{
  var bool = false;
  var count = 0;

  for(var key in data)
  {
    if(count < 3)
    {
      if(data[key] > 0)
      {
        count++;
      }
    }
    else {
      bool = true;
    }
  }
  return bool;
}

function fetchPredictData(data, div_loading) {
  $.ajax({
    type: "POST",
    url: basePredictSystemUrl,
    headers: {
      "content-type": "application/json"
    },
    dataType: "json",
    data: JSON.stringify(data),
    beforeSend: function () {
      // 顯示處理中畫面
      div_loading.classList.remove('hidden');
      $('input[type=submit]').prop("disabled", true);
      $('input[type=submit]').val('落點分析中...');
      querying = true;
    },
    success: function (data) {
      // 隱藏處理中畫面
      div_loading.classList.add('hidden');
      setData(data.result);
      $('input[type=submit]').prop("disabled", false);
      $('input[type=submit]').val('開始分析');
      querying = false;
    },
    error: function (data) {
      // 隱藏處理中畫面
      div_loading.classList.add('hidden');
      errorData();
      errorAlertMsg("<strong>錯誤！</strong> 沒有網路連線");
      $('input[type=submit]').prop("disabled", false);
      $('input[type=submit]').val('開始分析');
      querying = false;
    }
  });
}

function queryResult(data) {
  let resultData = [];
  let div_loading = document.getElementById('loading-area');
  let astData = data.grades.ast;
  cleanAlert();
  if(isNaN(astData.Chinese) && isNaN(astData.English) && isNaN(astData.Math_A)
    && isNaN(astData.Math_B)  && isNaN(astData.History) && isNaN(astData.Geographic)
    && isNaN(astData.Citizen_and_Society) && isNaN(astData.Physics)
    && isNaN(astData.Chemistry) && isNaN(astData.Biology)) {
    warningAlertMsg("你還沒填寫指考成績喔～");
  } else if(!atLeast3(astData)) {
    warningAlertMsg("請填入至少三科以上的指考成績喔～");
  } else {
    // 沒有問題，開始向後端要資料
    if(!querying) {
      fetchPredictData(data, div_loading);
    }
  }
}

function mockPredictResult()
{
  let mock_result = [
    {
      did: '04302',
      uname: '中華大學',
      uurl: 'https://www1.chu.edu.tw',
      dname: '應用日語學系',
      durl: 'https://aj.chu.edu.tw/index.php?Lang=zh-tw',
      minScore: 300.25,
      yourScore: 400.25,
      salary: 50040,
      salaryUrl: 'https://www.104.com.tw/jb/career/department/view?degree=3&sid=5067000000&mid=520101'
    },
    {
      did: "04323",
      uname: "中華大學",
      uurl: "http://www1.chu.edu.tw",
      dname: "電機工程學系",
      durl: "http://ee.chu.edu.tw",
      minScore: 265.25,
      salary: 58180,
      salaryUrl: "https://www.104.com.tw/jb/career/department/view?degree=3&sid=5067000000&mid=520101",
      yourScore: 800,
      examURL: "https://campus4.ncku.edu.tw/uac/cross_search/dept_info/04323.html"
    },
  ];

  return mock_result;
}

var form_input = document.getElementById('input-form');
form_input.onsubmit = function(e) {
    e.preventDefault();
    // let studentGrade = getData();
    // queryResult(studentGrade);
    let mockData = mockPredictResult();
    setData(mockData);
}