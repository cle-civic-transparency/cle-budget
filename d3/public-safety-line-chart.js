    var parseDate = d3.time.format("%Y").parse;

    var margin = {
      left: 70,
      right: 0,
      top: 20,
      bottom: 50
    };

    var width = 700 - margin.left - margin.right;
    var height = 300 - margin.top - margin.bottom;

    var min = 0;
    var max = 0;

    var xNudge = 60;
    var yNudge = 20;

    var minDate = new Date();
    var maxDate = new Date();

    d3.csv("d3/data/line-graph-police.csv")
      .row(function(d) {
        return {
          month: parseDate(d.month),
          price: Number(d.price.trim().slice(1))
        };
      })
      .get(function(error, rows) {
        min = d3.min(rows, function(d) {
          return d.price;
        });
        max = d3.max(rows, function(d) {
          return d.price;
        });
        minDate = d3.min(rows, function(d) {
          return d.month;
        });
        maxDate = d3.max(rows, function(d) {
          return d.month;
        });


        var y = d3.scale.linear()
          .domain([min, max])
          .range([height, 0]);

        var x = d3.time.scale()
          .domain([minDate, maxDate])
          .range([0, width - 10]);

        var yAxis = d3.svg.axis()
          .orient("left")
          .scale(y);

        var xAxis = d3.svg.axis()
          .orient("bottom")
          .scale(x);

        var line = d3.svg.line()
          .x(function(d) {
            return x(d.month);
          })
          .y(function(d) {
            return y(d.price);
          })
          .interpolate("cardinal");

        var chart2 = d3.select("#police-chart2").append("svg").attr("id", "svg").attr("height", "100%").attr("width", "100%");
        var chartGroup = chart2.append("g").attr("class", "chartGroup").attr("transform", "translate(" + xNudge + "," + yNudge + ")");

        chartGroup.append("path")
          .attr("class", "line")
          .attr("d", function(d) {
            return line(rows);
          })

        chartGroup.append("g")
          .attr("class", "axis x")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        chartGroup.append("g")
          .attr("class", "axis y")
          .call(yAxis);

        chart2.append("text")
          .attr("class", "y-label")
          .attr("text-anchor", "center")
          .attr("y", 12)
          .attr("x", -265)
          .attr("yAxis", "1em")
          .attr("transform", "rotate(-90)")
          .text("Department of Safety Budget (millions)");
      });
