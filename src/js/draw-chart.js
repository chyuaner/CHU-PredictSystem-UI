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
  var avg_score = ['平均分數'];
  avg_score = avg_score.concat( data.map(function(d,i) {return d['平均分數']}) );
  var avg_money = ['平均薪資'];
  avg_money = avg_money.concat( data.map(function(d,i) {return d['平均薪資']}) );
  var cp = ['CP值'];
  cp = cp.concat(data.map(function(d,i) {return d['CP值']}));

  var chart = c3.generate({
    bindto: element_name,
    data: {
      columns: [
        cp, avg_score, avg_money
      ],
      types: {
        '平均分數': 'bar',
        '平均薪資': 'bar'
      }
    },
    axis: {
        x: {
            type: 'category',
            categories: data.map(function(d,i) {return d['學群']})
        },
        y: {
          min: 0,
          padding: {bottom: 0}
        }
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
}

d3.json("js/sample-chart.json").then(function(data) {
  chart_data = data;
  // renderChart(data);
});
