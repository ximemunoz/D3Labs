const margin = {top: 10, right: 10, bottom: 100, left: 100};
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
let flag = true; 

const g = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

const x = d3.scaleBand().range([0, width]).padding(0.2);
const xAxisGroup = g.append("g").attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

const y = d3.scaleLinear().range([height, 0]);
const yAxisGroup = g.append("g").attr("class", "y axis");

const yLabel = g.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue");

g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("text-anchor", "middle")
    .text("Month");

d3.json("data/revenues.json").then((data) => {
  data.forEach((d) => {
    d.revenue = +d.revenue;
    d.profit = +d.profit;
  });

  d3.interval(() => {
    update(data);
    flag = !flag;
  }, 1000);

  update(data);
}).catch((error) => {
  console.log(error);
});

function update(data) {
  const value = flag ? "revenue" : "profit";

  x.domain(data.map((d) => d.month));
  y.domain([0, d3.max(data, (d) => d[value])]);

  const xAxisCall = d3.axisBottom(x);
  const yAxisCall = d3.axisLeft(y).ticks(5).tickFormat((d) => d + "m");

  xAxisGroup.call(xAxisCall);
  yAxisGroup.call(yAxisCall);

  const label = flag ? "Revenue" : "Profit";
  yLabel.text(label);

  const rects = g.selectAll("rect").data(data);

  rects.exit().remove();

  rects
    .attr("x", (d) => x(d.month))
    .attr("y", (d) => y(d[value]))
    .attr("width", x.bandwidth)
    .attr("height", (d) => height - y(d[value]))
    .attr("fill", "#49b2e3");

  rects.enter().append("rect")
    .attr("x", (d) => x(d.month))
    .attr("y", (d) => y(d[value]))
    .attr("width", x.bandwidth)
    .attr("height", (d) => height - y(d[value]))
    .attr("fill", "#49b2e3");
}
