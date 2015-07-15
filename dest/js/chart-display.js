function toDisplayChart(chooseId) {
  // 從畫面中顯示出圖表
  var div_charts = document.getElementsByClassName("chart-content");

  for(var i=0; i<div_charts.length; i++) {
    if(div_charts[i].id == chooseId) {
      div_charts[i].classList.remove("hidden");
    }
    else {
      if(!div_charts[i].classList.contains("hidden")) {
        div_charts[i].classList.add("hidden");
      }
    }
  }

  // 介面選取按鈕
  var link_charts = document.getElementsByClassName("chart-link");
  for(var i=0; i<link_charts.length; i++) {
    var linkId = link_charts[i].href.split("#")[1];
    if(linkId == chooseId) {
      if(!link_charts[i].classList.contains("active")) {
        link_charts[i].classList.add("active");
      }
    }
    else {
      link_charts[i].classList.remove("active");
    }
  }
}


// 當按鈕按下去的時候
var link_chartItems = document.getElementsByClassName("chart-link");
for(var i=0; i<link_chartItems.length; i++) {
  link_chartItems[i].onclick = function() {
    var toId = this.href.split("#")[1];
    toDisplayChart(toId);

    // 偵測視窗高度有沒有超過底下區域
    if(window.innerHeight > $("#container").get(0).offsetTop) {
      return false;
    }
    else {
      window.scroll(0, $("#container").get(0).offsetTop-convertRem(6));
      return false;
    }
  }
}
