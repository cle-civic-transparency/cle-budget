var colors = {
  'id1': 'var(--dark-yellow)',
  'id2': 'var(--yellow)',
  'id3': 'var(--light-yellow)',
  'fallback': 'var(--light-gray)'
};
d3.json("d3/data/sankey-roads.json", function(error, json) {
  var chart = d3.select("#infrastructure-chart").append("svg").chart("Sankey.Path");
  chart
    .name(label)
    .colorNodes(function(name, node) {
      return color(node, 1) || colors.fallback;
    })
    .colorLinks(function(link) {
      return color(link.source, 4) || color(link.target, 1) || colors.fallback;
    })
    .nodeWidth(15)
    .nodePadding(10)
    .spread(true)
    .iterations(0)
    .draw(json);

  function label(node) {
    return node.name.replace(/\s*\(.*?\)$/, '');
  }

  function color(node, depth) {
    var id = node.id.replace(/(_score)?(_\d+)?$/, '');
    if (colors[id]) {
      return colors[id];
    } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
      return color(node.targetLinks[0].source, depth - 1);
    } else {
      return null;
    }
  }
  function drawChart() {
    currentWidth = parseInt(d3.select('#div_basicResize').style('width'), 10)
    chart.attr("width", currentWidth)

    x.range([20, currentWidth - 20]);
    xAxis.call(d3.axisBottom(x))

    chart
    .attr("cx", function(d){ return x(d)})
  }

  // Initialize the chart
drawChart()

// Add an event listener that run the function when dimension change
window.addEventListener('resize', drawChart );
});
