// set the dimensions and margins of the graph
var w = 700;
var h = 300;
var r = h/2;
var labelHeight = 18;
var aColor = [
    'rgb(239, 183, 182)',
    'rgb(230, 125, 126)',
    'rgb(213, 69, 70)',
    'rgb(178, 55, 56)'
]

var data = [
    {"label":"$215.4M: Sales and Use Tax", "value":75.9, "index":0},
    {"label":"$41.4M: Passenger Fares", "value":14.5, "index":1},
    {"label":"$21.5M: Reimbursed Expenditures", "value":7.6, "index":2},
    {"label":"$5.28M: Advertising + Other", "value":1.9, "index":3}
];

var vis = d3.select('#pie-chart')
.append("svg:svg")
.data([data])
.attr("width", w)
.attr("height", h)
.append("svg:g")
.attr("transform", "translate(" + r + "," + r + ")");

var pie = d3.layout.pie().value(function(d){return d.value;});

// Declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// Select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){return aColor[i];})
    .attr("d", function (d) {return arc(d);})
;

// Add the text
arcs.append("svg:text")
    .attr("transform", function(d){
        d.innerRadius = 100; /* Distance of label to the center*/
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}
    )
    .attr("text-anchor", "middle")
    .text( function(d, i) {return data[i].value + '%';})
;

// Add the legend
const legend = vis
    .append('g')
    .attr('transform', `translate(${r+10},${-r+20})`);

  legend
    .selectAll(null)
    .data(data)
    .enter()
    .append('rect')
    .attr('y', d => labelHeight * d.index * 1.8)
    .attr('width', labelHeight)
    .attr('height', labelHeight)
    .attr('fill', d => aColor[d.index])
    .attr('stroke', 'grey')
    .style('stroke-width', '1px');

  legend
    .selectAll(null)
    .data(data)
    .enter()
    .append('text')
    .text(d => d.label)
    .attr('x', labelHeight * 1.2)
    .attr('y', d => labelHeight * d.index * 1.8 + labelHeight)
    .style('font-family', 'Lato')
    .style('font-size', `${labelHeight}px`);
