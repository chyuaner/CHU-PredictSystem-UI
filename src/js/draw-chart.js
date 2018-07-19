// function renderChart(data) {
//   var m_charts = d3.selectAll(".chart-image-area");
//
//   var nor_arr = Object.keys(data.一般分類);
//   for(i=0; i<nor_arr.length; i++) {
//     renderTheChart(m_charts.filter('[data-name='+nor_arr[i]+']'), data.一般分類[nor_arr[i]]);
//   }
//
//   var sg_arr = Object.keys(data.學群分類);
//   for(i=0; i<sg_arr.length; i++) {
//     renderTheChart(m_charts.filter('[data-name='+sg_arr[i]+']'), data.學群分類[sg_arr[i]]);
//   }
// }

var chart_data;
var debug_data;
var rotate = false;
// if(document.documentElement.clientWidth <= 640) {
if(screen.width <= 640) {
  rotate = true;
}

var chart = c3.generate({
  bindto: '#render-chart',
  padding: {
    // top: 40,
    // right: 100,
    bottom: 15,
    // left: 100,
  },
  data: {
    x: 'name',
    json: [{
      "name": "工程學群 資訊工程學系",
      "平均分數": 48.13508108108107,
      "平均薪資": 49.726702702702674,
      "CP值": 77.77777777777777
    }],
    keys: {
      value:['name', '平均分數', '平均薪資', 'CP值']
    },
    labels: true
  },
  axis: {
    x: {
        type: 'category'
    },
    y: {
      min: 0,
      padding: {bottom: 0}
    },
    rotated: rotate
  },
  legend: {
    // position: 'right'
  },
  bar: {
    width: {
        ratio: 0.5 // this makes bar width 50% of length between ticks
    }
    // or
    //width: 100 // this makes bar width 100px
  },
  size: {
      height: 500
  },
});

function selectChart(group, name) {
  var m_title = d3.select('#render-area').select('h2');

  // console.log(chart_data[group][name]);
  m_title.text(name);
  var data = array_get_count(chart_data[group][name], 0,10)

  renderTheChart('#render-chart', data);
  // alert('test');
}

function array_get_count(array, min, max) {
  var result = [];
  for(i=min; i<max; i++) {
	result.push(array[i]);
  }
  return result;
}

function renderTheChart(element_name, data) {
  console.log(data);
  debug_data = data;

  chart.load({
    x: 'name',
    json: data,
    keys: {
      value:['name', '平均分數', '平均薪資', 'CP值']
    },
    types: {
      '平均分數': 'bar',
      '平均薪資': 'bar'
    }
  });
}

d3.json("docs/107-CP-public.json").then(function(data) {
  chart_data = data;

  // 切換顯示動作
  var thisUrl = window.location.href;
  var requestId = thisUrl.split("#")[1];
  var goto_string = requestId;
  if(goto_string) {
    var goto_group = decodeURI(goto_string.split("-")[0]);
    var goto_name = decodeURI(goto_string.split("-")[1]);
    selectChart(goto_group, goto_name);
  }
  else {
    selectChart('一般分類', '學校平均值');
    var link_chartItems = document.getElementsByClassName("chart-link");
    link_chartItems[0].classList.add("active");
  }
});


// 當按鈕按下去的時候
var link_chartItems = document.getElementsByClassName("chart-link");
for(var i=0; i<link_chartItems.length; i++) {
  link_chartItems[i].onclick = function() {

    // 更改按鈕狀態
    for(var j=0; j<link_chartItems.length; j++) {
      link_chartItems[j].classList.remove("active");
    }
    this.classList.add("active");

    // 切換顯示動作
    var goto_string = this.href.split("#")[1];
    var goto_group = decodeURI(goto_string.split("-")[0]);
    var goto_name = decodeURI(goto_string.split("-")[1]);
    selectChart(goto_group, goto_name);

    // 偵測視窗高度有沒有超過底下區域
    if(window.innerHeight > $("#container").get(0).offsetTop) {
      return true;
    }
    else {
      window.scroll(0, $("#container").get(0).offsetTop-convertRem(6));
      return true;
    }
  }
}
