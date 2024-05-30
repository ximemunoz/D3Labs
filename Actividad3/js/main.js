var svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);


d3.csv("data/ages.csv").then((data) => {
    console.log("CSV Data:");
    console.log(data);
}).catch((error) => {
    console.error("Error loading CSV data:", error);
});

d3.tsv("data/ages.tsv").then((data) => {
    console.log("TSV Data:");
    console.log(data);
}).catch((error) => {
    console.error("Error loading TSV data:", error);
});

d3.json("data/ages.json").then((data) => {
    console.log("JSON Data:");
    console.log(data);

    data.forEach((d) => {
        d.age = +d.age;
    });

    console.log("Parsed JSON Data:");
    console.log(data);

    var circles = svg.selectAll("circle")
        .data(data);

    circles.enter().append("circle")
        .attr("cx", (d, i) => (i * 50) + 50)
        .attr("cy", 200)
        .attr("r", (d) => d.age * 2)
        .attr("fill", "#49b2e3");

}).catch((error) => {
    console.error("Error loading JSON data:", error);
});

d3.json("data/non_existing_file.json").then((data) => {
    console.log(data);
}).catch((error) => {
    console.error("Error handling test - File not found:", error);
});
