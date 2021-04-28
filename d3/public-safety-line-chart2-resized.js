//////////////////////////////////////////////
// Data //////////////////////////////////////
//////////////////////////////////////////////
// fake data
var data = [
	{year: "2002",officers: 2335},
	{year: "2003",officers: 2225},
	{year: "2004",officers: 1970},
	{year: "2005",officers: 2008},
	{year: "2006",officers: 2063},
	{year: "2007",officers: 2035},
	{year: "2008",officers: 1920},
	{year: "2009",officers: 1907},
	{year: "2010",officers: 1863},
	{year: "2011",officers: 1807},
	{year: "2012",officers: 1736},
	{year: "2013",officers: 1759},
	{year: "2014",officers: 1757},
	{year: "2015",officers: 1774},
	{year: "2016",officers: 1773},
	{year: "2017",officers: 1868},
	{year: "2018",officers: 1878},
	{year: "2019",officers: 1879},
	{year: "2020",officers: 1881}
];

// Parse the date / time
var timeParse = d3.time.format("%Y").parse;

// force types
function type(dataArray) {
	dataArray.forEach(function(d) {
		d.year = timeParse(d.year);
		d.retention = +d.officers;
	});
	return dataArray;
}
data = type(data);

//////////////////////////////////////////////
// Chart Config /////////////////////////////
//////////////////////////////////////////////

// Set the dimensions of the canvas / graph
var margin = {top: 5, right: 0, bottom: 30, left: 65},
		width, // width gets defined below
    height = 250 - margin.top - margin.bottom;

// Set the scales ranges
var xScale = d3.time.scale();
var yScale = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().orient("bottom").scale(xScale);
var yAxis = d3.svg.axis()
  .orient("left")
  .scale(yScale);

// create a line
var line = d3.svg.line();

// Add the svg canvas
var svg = d3.select("#police-chart3")
    .append("svg")
		.attr("height", height + margin.top + margin.bottom);

var artboard = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set the domain range from the data
xScale.domain(d3.extent(data, function(d) { return d.year; }));
yScale.domain([
		d3.min(data, function(d) { return Math.floor(d.officers - 200); }),
		d3.max(data, function(d) { return Math.floor(d.officers + 200); })
	]);

// draw the line created above
var path = artboard.append("path").data([data])
		.style('fill', 'none')
		.style('stroke', 'var(--light-blue)')
		.style('stroke-width', '3px');

// Add the X Axis
var xAxisEl = artboard.append("g")
		.attr("transform", "translate(0," + height + ")");

// Add the Y Axis
// we aren't resizing height in this demo so the yAxis stays static, we don't need to call this every resize
var yAxisEl = artboard.append("g")
		.call(yAxis);


// styling the line bars
svg.append("text")
	.attr("class", "y-label")
	.attr("text-anchor", "end")
	.attr("y", 12)
	.attr("x", -40)
	.attr("yAxis", "1em")
	.attr("transform", "rotate(-90)")
	.text("Number of Employees");;


//////////////////////////////////////////////
// Drawing ///////////////////////////////////
//////////////////////////////////////////////
function drawChart() {

	window_width = parseInt(d3.select('body').style('width'), 10)
	if (window_width < 500 )
		margin_right = 0.2 * window_width;
	else{
		margin_right = 0.5 * window_width;
	}

	// reset the width
	width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin_right;

	// set the svg dimensions
	svg.attr("width", width + margin.left + margin_right);

	// Set new range for xScale
	xScale.range([0, width]);

	// give the x axis the resized scale
	xAxis.scale(xScale);

	// draw the new xAxis
	xAxisEl.call(xAxis);

	// specify new properties for the line
	line.x(function(d) { return xScale(d.year); })
		.y(function(d) { return yScale(d.officers); });

	// draw the path based on the line created above
	path.attr('d', line);
}

// call this once to draw the chart initially
drawChart();


//////////////////////////////////////////////
// Resizing //////////////////////////////////
//////////////////////////////////////////////

// redraw chart on resize
window.addEventListener('resize', drawChart);
