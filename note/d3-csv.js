d3.dsv(",", "docs/106-CP-Public.csv", function(d) {
  data = {
    學群: d['學群'],
    平均分數: d['平均分數'],
    model: d.Model,
    length: +d.Length // convert "Length" column to number
  };
}).then(function(data) {
  console.log(data);
});
