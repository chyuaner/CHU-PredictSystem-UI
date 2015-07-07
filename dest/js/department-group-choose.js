window.onload = function() {

  // 啟用學群選取區塊顯示/隱藏
  var btn_departmentGroupMore = document.getElementById('input-department-group-more');
  btn_departmentGroupMore.onclick = function() {
    var div_departmentGroupCheckboxArea = document.getElementById('input-department-group-choose-area');
    var divClassed = div_departmentGroupCheckboxArea.classList;
    divClassed.toggle('hidden');

    var btn_departmentGroupCheckbox_more = btn_departmentGroupMore.getElementsByClassName("more-button");
    if(divClassed.contains('hidden')) {
      btn_departmentGroupCheckbox_more[0].innerHTML = "&#x25BC;";
    }
    else {
      btn_departmentGroupCheckbox_more[0].innerHTML = "&#x25B2;";
    }
  }

  // 當有選項改變時
  getDepartmentGroupChoose();
  var checkbox_departmentGroup = document.getElementsByName('input-department-group');
  for(var i=0; i<checkbox_departmentGroup.length; i++) {
    checkbox_departmentGroup[i].onclick = function() {
      getDepartmentGroupChoose();
    }
  }

  function getDepartmentGroupChoose() {
    var chooseListString = '';
    var p_departmentGroupChooselist = document.getElementById('department-group-choose-list');

    // 所有選項
    var checkbox_departmentGroup = document.getElementsByName('input-department-group');
    for(var i=0; i<checkbox_departmentGroup.length; i++) {
      if(checkbox_departmentGroup[i].checked) {
        if(chooseListString != '') {chooseListString += ', '}
        chooseListString += checkbox_departmentGroup[i].value;
      }
    }
    if(chooseListString == '') { chooseListString = '請選擇學群'; }
    p_departmentGroupChooselist.innerHTML = chooseListString;
  }
}
