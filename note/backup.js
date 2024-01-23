for (var i = 0; i < resultData.length; i++) {
    // did, uname, uurl, dname, durl, salary, salaryUrl, lastCriterion, rateOfThisYear, change, examURL, riskIndex
    addData(resultData[i].did, resultData[i].uname, resultData[i].uurl,
        resultData[i].dname, resultData[i].durl, resultData[i].salary, resultData[i].salaryUrl,
        resultData[i].lastCriterion, resultData[i].rateOfThisYear, resultData[i].change,
        resultData[i].examURL, resultData[i].riskIndex);

}

function addData(did, uname, uurl, dname, durl, salary, salaryUrl, lastCriterion, rateOfThisYear, change, examURL, riskIndex) {
    if (salary == 0) {
        salary = '樣本不足';
    }

    var table_result = $("#table-result-suggest-school-departments");
    var table_result_body = table_result.find("tbody");

    var trClass = '';
    // if(yourScore < minScore) {
    //   trClass += ' warning';
    // }
    if (uname == '中華大學') {
        trClass += ' chu';
    }
    var tr = '<tr data-item-id="' + did + '" class="' + trClass + '">';

    var content = '<th data-title="校系代碼">' + '<a href="' + examURL + '" target="_blank" data-tooltip aria-haspopup="true" data-tooltip-title="連結至簡章頁面">' + formatNumberLength(did, 4) + '</a>' + '</th>';
    content += '<td data-title="校名"><a href="' + uurl + '" target="_blank" data-tooltip aria-haspopup="true" data-tooltip-title="連結至學校首頁">' + uname + '</a></td>';

    if(durl == "0") {
        content += '<td data-title="科系名稱">' + dname + '</a></td>';
    } else {
        content += '<td data-title="科系名稱"><a href="' + durl + '" target="_blank" data-tooltip aria-haspopup="true" data-tooltip-title="連結至科系首頁">' + dname + '</a></td>';
    }

    if (salaryUrl === null) {
        content += '<td data-title="畢業校友平均薪資">' + salary + '</td>';
    } else {
        content += '<td data-title="畢業校友平均薪資"><a href="' + salaryUrl + '" target="_blank" data-tooltip aria-haspopup="true" data-tooltip-title="連結至104升學就業地圖">' + salary + '</a></td>';
    }

    var rateOfThisYear_tooltip, rateOfThisYear_info_icon, rateOfThisYear_change_class;
    if (change !== null && change !== "") {
        rateOfThisYear_tooltip = ' data-tooltip aria-haspopup="true" data-tooltip-title="' + change + '"';

        rateOfThisYear_change_class = ' change';
    } else {
        rateOfThisYear_tooltip = '';

        rateOfThisYear_change_class = '';
    }
    content += '<td data-title="今年篩選倍率" class="' + rateOfThisYear_change_class + '"><span' + rateOfThisYear_tooltip + '>' + rateOfThisYear + '</span></td>';

    if (riskIndex == true) {
        content += '<td data-title="去年通過倍率篩選最低級分" class="warning">' + '<span data-tooltip aria-haspopup="true" data-tooltip-title="換算去年級分低於\n去年通過倍率篩選最低級分">' + lastCriterion + '</span>' + '&nbsp;</td>';
    } else {
        content += '<td data-title="去年通過倍率篩選最低級分">' + lastCriterion + '&nbsp;</td>';
    }

    table_result_body.append(tr + content + '</tr>');

    // $('#table-result-suggest-school-departments tr[data-item-id="'+did+'"]').foundation('tooltip', 'reflow');
}
