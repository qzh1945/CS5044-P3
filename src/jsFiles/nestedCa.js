var dataPath = "../csv/emission-nestedchart.csv"

var margin = {top: 60, right: 100, bottom: 20, left: 80},
    width = 850 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

// Parse the month variable
var parseMonth = d3.timeParse("%b");
var formatMonth = d3.timeFormat("%b");

// Set the ranges
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
var y = d3.scaleLinear().range([height, 0]);


// Create the svg canvas in the "graph" div
var svg = d3.select("#graph")
    .append("svg")
    .style("width", width + margin.left + margin.right + "px")
    .style("height", height + margin.top + margin.bottom + "px")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "svg");

// Import the CSV data
d3.csv("../csv/emission-nestedchart.csv", function(error, data) {
    if (error) throw error;



    var nest = d3.nest()
        .key(function(d){
            return d.GeoName;
        })

        .rollup(function(leaves){
            return d3.mean(leaves, function(d) {return (d.CO2EmissionsTonnesPerPerson)});
        })
        .entries(data)

    console.log(nest)
    // Scale the range of the data
    x.domain(nest.map(function(d) { return d.key; }));
    y.domain([0, d3.max(nest, function(d) { return d.value; })]);

    // Set up the x axis
    var xaxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x)
            //.ticks(d3.timeMonth)
            .tickSize(0, 0)
            //.tickFormat(d3.timeFormat("%B"))
            .tickSizeInner(0)
            .tickPadding(10));

    // Add the Y Axis
    var yaxis = svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y)
            .ticks(5)
            .tickSizeInner(0)
            .tickPadding(6)
            .tickSize(0, 0));

    // yaxis.select(".domain").style("display","none")

    // Add a label to the y axis


    // Draw the bars
    svg.selectAll(".rect")
        .data(nest)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); });



    d3.selectAll("rect")
        .on("mouseenter", function(d, i){

            d3.select(this)
                .transition()
                .duration(500)
                .style("fill", "#C506AB")



            d3.select("svg")
                .append("text")
                .attr("class", "tooltip")
                .attr("x", i*80 + 130)
                .attr("y", 50)
                .text(Math.round(d.value*10) / 10)
                .attr("font-size", 20);

        })

        .on("mouseout", function(d) {
            d3.select(this)
                .transition()
                .duration(500)
                .style("fill", "#890377");

            d3.selectAll(".tooltip")
                .remove();

        })


})