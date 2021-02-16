var colors = {
  'environment': 'var(--yellow)',
  'social': 'var(--stacked-light-blue)',
  'animals': 'var(--stacked-blue)',
  'fallback': 'var(--stacked-gray)'
};
d3.json("d3/data/sankey-police.json", function(error, json) {
  var chart = d3.select("#police-chart1").append("svg").chart("Sankey.Path");
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
});
