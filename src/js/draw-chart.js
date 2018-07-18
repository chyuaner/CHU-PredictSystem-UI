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
  var m_svg = d3.select('#render-area').select('svg');

  // console.log(chart_data[group][name]);
  m_title.text(name);
  renderTheChart(m_svg, chart_data[group][name]);
  // alert('test');
}

function renderTheChart(svg, data) {
  console.log(data);
  debug_data = data;

  // 設定畫布尺寸 & 邊距
  var margin = 80,
      width = 960 - margin * 0.7,
      height = 500 - margin * 2;

  svg.attr('width', width + margin)
     .attr('height', height + margin * 2)
     .attr("transform", "translate(" + margin + "," + margin + ")");

  // 設定圖表的最大最小值
  var chartType = '平均分數',
      max = d3.max(data, function(d){return d[chartType]}),
      min = 0;

  // x 軸比例尺
  var xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  // y 軸比例尺 給繪製矩形用
  var yScale = d3.scaleLinear()
    .domain([min, max])
    .range([0, height]);

  // y 軸比例尺 2 繪製座標軸用(高至低)
  var yScale2 = d3.scaleLinear()
    .domain([min, max])
    .range([height, 0]);

  // x 軸
  var xAxis = d3.axisBottom(xScale)
    .ticks( data.length )
    .tickFormat(function(i){
      return (data[i]) ? data[i].region : '';   // 這裡控制坐標軸的單位
    });

  // y 軸
  var yAxis = d3.axisLeft(yScale2);

  console.log(svg);
  // 繪製 x 軸
  svg.append("g")
    .attr("class","x axis")
    .attr("transform", "translate(" + margin + "," + (height + margin) + ")")
    .attr("fill", "#ffffff")
    .call(xAxis);

  // 繪製 y 軸
  svg.append("g")
    .attr("class","y axis")
    .attr("transform", "translate(" + margin + ", " + margin + ")")
    .attr("fill", "#ffffff")
    .call(yAxis);

  // 處理軸線位移
  // svg.select('.x.axis').selectAll('.tick text').attr("dx", width * 0.05);
  // svg.select('.x.axis').selectAll('.tick line').attr('transform', 'translate(' + width * 0.05 + ', 0)');

  // 產生長條圖
  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .classed('bar', true);

  svg.selectAll('.bar')
    .transition()
    .duration(700)
    .attr('x', function(d, i) {
      return xScale(i) + margin
    })
    .attr('y', function(d, i) {
      return height - yScale(d[chartType])+ margin;
    })
    .attr('width', '10px')
    .attr('height', function(d, i) {
      return yScale(d[chartType]);
    })
    .attr('fill', '#2109e8')
    .attr('transform', "translate(" +  width * (0.02) + ", " + 0 + ")");

}

d3.json("js/sample-chart.json").then(function(data) {
  chart_data = data;
  // renderChart(data);
});
