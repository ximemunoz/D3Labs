const svg = d3.select("svg")
    .attr("width", 500)
    .attr("height", 500);

const margin = {top: 20, right: 30, bottom: 100, left: 40},
      width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

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

    // Eje X
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Eje Y
    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));
}).catch(error => {
    console.error('Error loading the data:', error);
});
