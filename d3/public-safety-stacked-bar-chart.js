// Setup svg using Bostock's margin convention

var margin = {
  top: 20,
  right: 250,
  bottom: 35,
  left: 30
};

var width = 960 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var svg = d3.select("#chart3")
  .append("svg")
  .attr("id", "stacked-bar")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

var data = [{
    year: "2020",
    police: "206",
    health: "10",
    sustainbility: "1",
    judicial: "10",
    public_works: "17",
    utilities:"0",
    transit:"0"
  },
  {
    year: "2021",
    police: "175",
    health: "20",
    sustainbility: "2",
    judicial: "10",
    public_works: "17",
    utilities:"20",
    transit:"0"
  },
  {
    year: "2023",
    police: "155",
    health: "20",
    sustainbility: "2",
    judicial: "10",
    public_works: "17",
    utilities:"30",
    transit:"10"
  },
  {
    year: "2025",
    police: "103",
    health: "20",
    sustainbility: "10",
    judicial: "20",
    public_works: "31",
    utilities:"40",
    transit:"20"
  }
];

var parse = d3.time.format("%Y").parse;


// Transpose the data into layers
var dataset = d3.layout.stack()(["police","utilities","transit", "judicial","health", "public_works" ,"sustainbility"].map(function(fruit) {
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

var colorsBar = ["var(--stacked-white)", "var(--stacked-pink-white)", "var(--stacked-gray)", "var(--stacked-pale-blue)","var(--stacked-light-blue)", "var(--stacked-blue)", "var(--stacked-dark-blue)"];


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
        return "Env. Justice: Fund Sustainability Office";
      case 1:
        return "Parks: Fund Dept. Public Works";
      case 2:
        return "Public Health: Fund Dept. of Health";
      case 3:
      return "Free Pre-trial Services: Fund Courts";
      case 4:
        return "Free Transit: Fund RTA";
      case 5:
        return "Free Utilities: Fund CPP";
      case 6:
        return "Division of Police";
    }
  });
