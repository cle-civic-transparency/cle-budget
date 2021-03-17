var causes = ["Wind","Solar","Biogas","Hydro","Nonrenewable"]

var energy_total = 1536;
var margin_legend = 50;
var margin = {top: 20, right: 50, bottom: 30, left: 50},
    width = 660 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.linear()
            .range([0, width]);

var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1);

var z = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#chart2").append("svg")
    .attr("width", width + margin.left + 10)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var colorsBar = [ "var(--stacked-dark-blue)", "var(--stacked-pale-blue)","var(--stacked-blue)", "var(--stacked-gray)","var(--stacked-light-blue)"];


d3.csv("d3/data/utilities-stacked-bar-chart.csv", type, function(error, data) {
  if (error) throw error;
  var layers = d3.layout.stack()(causes.map(function(c) {
    return data.map(function(d) {
      return {x: d.date, y: d[c]};
    });
  }));

  y.domain(layers[0].map(function(d) {
     return d.x; }));
  x.domain([0, energy_total]).nice();

  var layer = svg.selectAll(".layer")
      .data(layers)
    .enter().append("g")
      .attr("class", "layer")

      .style("fill", function(d, i) { return colorsBar[i]; });

  layer.selectAll("rect")
      .data(function(d) { return d; })
    .enter().append("rect")

      .attr("y", function(d) { return y(d.x); })
      .attr("x", function(d) {return x(d.y0); })
      .attr("width", function(d) { return x(d.y0) + x(d.y + d.y0); })
      .attr("height", y.rangeBand());

  svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + 0 + ",0)")
      .call(yAxis);
});

function type(d) {
  causes.forEach(function(c) { d[c] = +d[c]; });
  return d;
}

// Draw legend
var legend = svg.selectAll(".legend")
  .data(colorsBar)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) {
    return "translate("+ i * 100 + ",0)";
  });

legend.append("rect")
  .attr("x", width - 500)
  .attr("width", 20)
  .attr("height", 18)
  .style("fill", function(d, i) {
    return colorsBar.slice()[i];
  });

legend.append("text")
  .attr("x", width - 475)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) {
    return causes[i];

  });
