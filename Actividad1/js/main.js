//Area de la gráfica:
var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

// Deinir características del círculo
var circle = svg.append("circle")
    .attr("cx", 100)
    .attr("cy", 250)
    .attr("r", 70)
    .attr("fill", "#49b2e3");

// Deinir características del rectángulo
var rect = svg.append("rect")
    .attr("x", 20)
    .attr("y", 20)
    .attr("width", 20)
    .attr("height", 70)
    .attr("fill", "#49b2e3");
