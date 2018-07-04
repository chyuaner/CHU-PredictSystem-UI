function renderChart(data) {
  var m_charts = d3.selectAll(".chart-image-area");

  var nor_arr = Object.keys(data.一般分類);
  for(i=0; i<nor_arr.length; i++) {
    renderTheChart(m_charts.filter('[data-name='+nor_arr[i]+']'), data.一般分類[nor_arr[i]]);
  }

  var sg_arr = Object.keys(data.學群分類);
  for(i=0; i<sg_arr.length; i++) {
    renderTheChart(m_charts.filter('[data-name='+sg_arr[i]+']'), data.學群分類[sg_arr[i]]);
  }
}

function renderTheChart(d3_element, data) {
  var svg = d3_element.append("svg");
  console.log(data);
}

var chart_data;
d3.json("js/sample-chart.json").then(function(data) {
  chart_data = data;
  renderChart(data);
});
