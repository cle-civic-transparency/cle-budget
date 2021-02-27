// Setup svg using Bostock's margin convention

var margin = {
  top: 20,
  right: 250,
  bottom: 35,
  left: 30
};

var width = 760 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var svg = d3.select("#chart2")
  .append("svg")
  .attr("id", "stacked-bar")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

var data = [{
    year: "2020",
    nonrenewable:"1300",
    hydro:"224",
    solar:"1.1",
    wind:"10",
    quasar:"1"
  }
];

var parse = d3.time.format("%Y").parse;


// Transpose the data into layers
var dataset = d3.layout.stack()(["nonrenewable","hydro","solar", "wind","quasar"].map(function(fruit) {
  return data.map(function(d) {
    return {
      x: parse(d.year),
      y: +d[fruit]
    };
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) {
    return d.x;
  }))
  .rangeRoundBands([10, width - 10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {
    return d3.max(d, function(d) {
      return d.y0 + d.y;
    });
  })])
  .range([height, 0]);

var colorsBar = ["var(--stacked-gray)", "var(--stacked-pale-blue)","var(--stacked-light-blue)", "var(--stacked-blue)", "var(--stacked-dark-blue)"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat(function(d) {
    return d
  });

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.time.format("%Y"));

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);


// Create groups for each series, rects for each segment
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) {
    return colorsBar[i];
  });

var rect = groups.selectAll("rect")
  .data(function(d) {
    return d;
  })
  .enter()
  .append("rect")
  .attr("x", function(d) {
    return x(d.x);
  })
  .attr("y", function(d) {
    return y(d.y0 + d.y);
  })
  .attr("height", function(d) {
    return y(d.y0) - y(d.y0 + d.y);
  })
  .attr("width", x.rangeBand());


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colorsBar)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) {
    return "translate(30," + i * 19 + ")";
  });

legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {
    return colorsBar.slice().reverse()[i];
  });

legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) {
    switch (i) {
      case 0:
        return "Biogas";
      case 1:
        return "Wind";
      case 2:
        return "Solar";
      case 3:
        return "Hydro";
      case 4:
        return "Non-renewable Sources";
    }
  });
