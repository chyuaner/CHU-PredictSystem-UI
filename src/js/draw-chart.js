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
  var margin = 40,
      width = parseInt(svg.style("width").split("px")[0]),
      height = parseInt(svg.style("height").split("px")[0]),
      chart_width = width - margin*2,
      chart_height = height - margin*2;

  // svg.attr('width', width + margin)
  //    .attr('height', height + margin * 2)
  //    .attr("transform", "translate(" + margin + "," + margin + ")");

  // 設定圖表的最大最小值
  var chartType = '平均分數',
      // max = d3.max(data, function(d){return d[chartType]}),
      max = d3.max(data, function (d) {
        return Math.max(d['平均分數'], d['平均薪資'], d['CP值']);
      })
      min = 0;

  // x 軸比例尺
  var xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, chart_width]);

  // y 軸比例尺 給繪製矩形用
  var yScale = d3.scaleLinear()
    .domain([min, max])
    .range([0, chart_height]);

  // y 軸比例尺 2 繪製座標軸用(高至低)
  var yScale2 = d3.scaleLinear()
    .domain([min, max])
    .range([chart_height, 0]);

  // x 軸
  var xAxis = d3.axisBottom(xScale)
    .ticks( data.length )
    .tickFormat(function(i){
      return (data[i]) ? data[i]['學群'] : '';   // 這裡控制坐標軸的單位
    });

  // y 軸
  var yAxis = d3.axisLeft(yScale2);

  console.log(svg);
  // 繪製 x 軸
  svg.append("g")
    .attr("class","x axis")
    .attr("transform", "translate(" + margin + "," + (chart_height + margin) + ")")
    .attr("fill", "#ffffff")
    .call(xAxis);

  // 繪製 y 軸
  svg.append("g")
    .attr("class","y axis")
    .attr("transform", "translate(" + margin + ", " + margin + ")")
    .attr("fill", "#ffffff")
    .call(yAxis);

  // 處理軸線位移
  svg.select('.x.axis').selectAll('.tick text').attr("dx", chart_width * 0.025);
  // svg.select('.x.axis').selectAll('.tick line').attr('transform', 'translate(' + chart_width * 0.025 + ', 0)');

  // 產生長條圖

  // g.append("g")
  //   .selectAll("g")
  //   .data(data)
  //   .enter().append("g")
  //     .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
  //   .selectAll("rect")
  //   .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
  //   .enter().append("rect")
  //     .attr("x", function(d) { return x1(d.key); })
  //     .attr("y", function(d) { return y(d.value); })
  //     .attr("width", x1.bandwidth())
  //     .attr("height", function(d) { return height - y(d.value); })
  //     .attr("fill", function(d) { return z(d.key); });

  // Old
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
      return chart_height - yScale(d[chartType])+ margin;
    })
    .attr('width', '10px')
    .attr('height', function(d, i) {
      return yScale(d[chartType]);
    })
    .attr('fill', '#2109e8')
    .attr('transform', "translate(" +  chart_width * (0.02) + ", " + 0 + ")");

}

d3.json("js/sample-chart.json").then(function(data) {
  chart_data = data;
  // renderChart(data);
});
