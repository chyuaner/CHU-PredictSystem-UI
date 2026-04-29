var basePredictSystemUrl = "api/gsat/analysis";
//var basePredictSystemUrl = "https://localhost:44314/api/gsat/analysis";
var querying = false;

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
    var input_salary = document.getElementById('input-expect-salary');

    var input_gsat_chinese = document.getElementById('input-gsat-chinese');
    var input_gsat_english = document.getElementById('input-gsat-english');
    var input_gsat_math_A = document.getElementById('input-gsat-math-A');
    var input_gsat_math_B = document.getElementById('input-gsat-math-B');
    var input_gsat_social = document.getElementById('input-gsat-social');
    var input_gsat_nature = document.getElementById('input-gsat-nature');
    var input_gsat_engLis = document.getElementById('input-gsat-english-listen');

    var input_departmentGroup = document.getElementsByName('input-department-group');
    var input_stateGroup = document.getElementsByName('input-state-group');
    var input_universityGroup = document.getElementsByName('input-university-group');

    // 取得使用者填寫的表單資料
    if (input_salary.value == "") {
        var salary = parseFloat(0);
    } else {
        var salary = parseFloat(input_salary.value);
    }

    if (input_gsat_chinese.value == "") {
        var gsat_chinese = parseInt(0);
    } else {
        var gsat_chinese = parseInt(input_gsat_chinese.value);
    }
    if (input_gsat_english.value == "") {
        var gsat_english = parseInt(0);
    } else {
        var gsat_english = parseInt(input_gsat_english.value);
    }
    if (input_gsat_math_A.value == "") {
        var gsat_math_A = parseInt(0);
    } else {
        var gsat_math_A = parseInt(input_gsat_math_A.value);
    }

    if (input_gsat_math_B.value == "") {
        var gsat_math_B = parseInt(0);
    } else {
        var gsat_math_B = parseInt(input_gsat_math_B.value);
    }

    if (input_gsat_social.value == "") {
        var gsat_social = parseInt(0);
    } else {
        var gsat_social = parseInt(input_gsat_social.value);
    }
    if (input_gsat_nature.value == "") {
        var gsat_nature = parseInt(0);
    } else {
        var gsat_nature = parseInt(input_gsat_nature.value);
    }
    var gsat_engLis = input_gsat_engLis.value;

    var departmentGroup = [];
    for (var i = 0; i < input_departmentGroup.length; i++) {
        if (input_departmentGroup[i].checked) {
            departmentGroup.push(input_departmentGroup[i].value);
        }
    }
    // 若沒選擇的話，就全選
    if (departmentGroup.length == 0) {
        for (var i = 0; i < input_departmentGroup.length; i++) {
            departmentGroup.push(input_departmentGroup[i].value);
        }
    }

    var stateGroup = [];
    for (var i = 0; i < input_stateGroup.length; i++) {
        if (input_stateGroup[i].checked) {
            stateGroup.push(input_stateGroup[i].value);
        }
    }
    // 若沒選擇的話，就全選
    if (stateGroup.length == 0) {
        for (var i = 0; i < input_stateGroup.length; i++) {
            stateGroup.push(input_stateGroup[i].value);
        }
    }

    var universityGroup = [];
    for (var i = 0; i < input_universityGroup.length; i++) {
        if (input_universityGroup[i].checked) {
            universityGroup.push(input_universityGroup[i].value);
        }
    }
    // 若沒選擇的話，就全選
    if (universityGroup.length == 0) {
        for (var i = 0; i < input_universityGroup.length; i++) {
            universityGroup.push(input_universityGroup[i].value);
        }
    }

    var data = {
        grades: {
            gsat: {
                Chinese: gsat_chinese,
                English: gsat_english,
                MathA: gsat_math_A,
                MathB: gsat_math_B,
                Society: gsat_social,
                Science: gsat_nature,
                EngListeningLevel: gsat_engLis
            }
        },
        groups: departmentGroup,
        location: stateGroup,
        property: universityGroup,
        expect_salary: salary
    };
    return data;
}

function setData(resultData) {

    // 網頁介面對應
    var table_result = $("#table-result-suggest-school-departments");
    var table_result_body = table_result.find("tbody");

    // 有沒有資料
    if (resultData.length > 0) {
        table_result_body.empty();
        resultData.forEach((item) => {
            addData(item);
        });
    } else {
        table_result_body.empty();
        table_result_body.append('<tr><td colspan="7">沒有符合您的校系，請修改條件後再次分析。</td></tr>');
    }
}

function addData(resultItem) {
    if (resultItem.salary == 0) {
        resultItem.salary = '樣本不足';
    }

    var table_result = $("#table-result-suggest-school-departments");
    var table_result_body = table_result.find("tbody");

    var trClass = '';
    // if(yourScore < minScore) {
    //   trClass += ' warning';
    // }
    if (resultItem.uname == '中華大學') {
        trClass += ' chu';
    }
    var tr = `<tr data-item-id="${resultItem.did}" class="${trClass}">`;

    var content = `<th data-title="校系代碼"><a href="${resultItem.examURL}" target="_blank" data-tooltip aria-haspopup="true" data-tooltip-title="連結至簡章頁面">${formatNumberLength(resultItem.did, 4)}</a></th>`;
    content += `<td data-title="校名"><a href="${resultItem.uurl}" target="_blank" data-tooltip aria-haspopup="true" data-tooltip-title="連結至學校首頁">${resultItem.uname}</a></td>`;

    if(resultItem.durl == "0") {
        content += `<td data-title="科系名稱">${resultItem.dname}</a></td>`;
    } else {
        content += `<td data-title="科系名稱"><a href="${resultItem.durl}" target="_blank" data-tooltip aria-haspopup="true" data-tooltip-title="連結至科系首頁">${resultItem.dname}</a></td>`;
    }

    if (resultItem.salaryUrl === null) {
        content += `<td data-title="畢業校友平均薪資">${resultItem.salary}</td>`;
    } else {
        content += `<td data-title="畢業校友平均薪資"><a href="${resultItem.salaryUrl}" target="_blank" data-tooltip aria-haspopup="true" data-tooltip-title="連結至104升學就業地圖">${resultItem.salary}</a></td>`;
    }

    var rateOfThisYear_tooltip, rateOfThisYear_change_class;
    if (resultItem.change !== null && resultItem.change !== "") {
        rateOfThisYear_tooltip = ` data-tooltip aria-haspopup="true" data-tooltip-title="${resultItem.change}"`;

        rateOfThisYear_change_class = ' change';
    } else {
        rateOfThisYear_tooltip = '';

        rateOfThisYear_change_class = '';
    }
    content += `<td data-title="今年篩選倍率" class="${rateOfThisYear_change_class}"><span${rateOfThisYear_tooltip}>${resultItem.rateOfThisYear}</span></td>`;

    if (resultItem.riskIndex == true) {
        content += `<td data-title="去年通過倍率篩選最低級分" class="warning"><span data-tooltip aria-haspopup="true" data-tooltip-title="換算去年級分低於去年通過倍率篩選最低級分">${resultItem.lastCriterion}</span>&nbsp;</td>`;
    } else {
        content += `<td data-title="去年通過倍率篩選最低級分">${resultItem.lastCriterion}&nbsp;</td>`;
    }

    table_result_body.append(tr + content + '</tr>');

    // $('#table-result-suggest-school-departments tr[data-item-id="'+did+'"]').foundation('tooltip', 'reflow');
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
    alertArea.append('<div data-alert class="alert-box alert">' + text + ' <a href="#" class="close">&times;</a></div>');
    $("#input-area .alerts-area").foundation();
}

function warningAlertMsg(text) {
    var alertArea = $("#input-area .alerts-area");
    alertArea.append('<div data-alert class="alert-box warning">' + text + ' <a href="#" class="close">&times;</a></div>');
    $("#input-area .alerts-area").foundation();
}

function cleanAlert() {

    var alertArea = $("#input-area .alerts-area");
    alertArea.empty();
}

function atLeast3(data) {
    var bool = false;
    var count = 0;

    for (const key in data) {
        if (count < 3) {
            if (data[key] > 0) count++;
        } else {
            bool = true;
        }
    }
    return bool;
}

function checkGradeIsAllBlank(grades) {
    let gsat_data = grades.gsat;
    if (
        isNaN(gsat_data.Chinese) &&
        isNaN(gsat_data.English) &&
        isNaN(gsat_data.MathA) &&
        isNaN(gsat_data.MathB) &&
        isNaN(gsat_data.Science) &&
        isNaN(gsat_data.Society)
    ) {
        return true;
    } else return false;
}

function fetchData(inputData, div_loading) {
    $.ajax({
        type: 'POST',
        url: basePredictSystemUrl,
        headers: {
            "content-type": "application/json"
        },
        dataType: "json",
        data: JSON.stringify(inputData),
        beforeSend: function () {
            // 顯示處理中畫面
            div_loading.classList.remove('hidden');
            $('#input-form > input[type=submit]').prop("disabled", true);
            $('#input-form > input[type=submit]').val('落點分析中...');
            querying = true;
        },
        success: function (data) {
            // 隱藏處理中畫面
            div_loading.classList.add('hidden');
            setData(data.result);
            $('#input-form > input[type=submit]').prop("disabled", false);
            $('#input-form > input[type=submit]').val('開始分析');
            querying = false;
        },
        error: function (data) {
            // 隱藏處理中畫面
            div_loading.classList.add('hidden');
            errorData();
            errorAlertMsg("<strong>錯誤！</strong> 沒有網路連線");
            $('input[type=submit]').prop("disabled", false);
            $('#input-form > input[type=submit]').val('開始分析');
            querying = false;
        }
    });
}

function queryResult() {
    var inputData = getData();
    var div_loading = document.getElementById('loading-area');
    cleanAlert();
    if (checkGradeIsAllBlank(inputData.grades)) {
        warningAlertMsg("你還沒填寫成績喔～");
    } else if (!atLeast3(inputData.grades.gsat)) {
        warningAlertMsg("請填入至少三科以上成績喔～");
    } else { // 沒有問題，開始向後端要資料
        if (!querying) {
            fetchData(inputData, div_loading);
        }
    }
}

var form_input = document.getElementById('input-form');
form_input.onsubmit = function (e) {
    e.preventDefault();
    queryResult();
    return 0;
}
