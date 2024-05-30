const svg = d3.select("svg")
    .attr("width", 600)
    .attr("height", 400);

const margin = {top: 10, right: 10, bottom: 100, left: 100},
      width = 600 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.json("data/buildings.json").then(data => {
    data.forEach(d => d.height = +d.height);

    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    const y = d3.scaleLinear()
        .domain([0, 828])
        .range([height, 0]);

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.height))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.height))

    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("y", 10)
        .attr("x", -5)
        .attr("dy", ".35em")
        .attr("transform", "rotate(-40)")
        .style("text-anchor", "end");

    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d} m`));

    g.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 60)
        .attr("text-anchor", "middle")
        .text("The world's tallest buildings");

    g.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -(height / 2))
        .attr("y", -60)
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Height (m)");
}).catch(error => {
    console.error('Error loading the data:', error);
});
