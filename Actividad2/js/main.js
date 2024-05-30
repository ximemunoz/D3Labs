var data = [25, 20, 15, 10, 5];

var svg = d3.select("#chart-area").append("svg")
    .attr("width", 200)
    .attr("height", 200);

var rects = svg.selectAll("rect")
    .data(data);

// Defie the properties of the rectangles
rects.enter().append("rect")
    .attr("x", (d, i) => i * 50) 
    .attr("y", (d) => 200 - d)
    .attr("width", 40)
    .attr("height", (d) => d)
    .attr("fill", "#49b2e3");