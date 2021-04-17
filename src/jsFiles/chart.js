var dataPath = "../csv/emission-chart.csv"



var mySVG = d3.select("body")
    .append("div")
    .attr("id", "myDiv")		//width, height, margins are specified in styleFile.css
    .append("svg")
    .attr("id", "mySVG")
    .attr("width", "100%")
    .attr("height", "100%");
initializeChart(dataPath);
// get the data
function initializeChart(dataPath) {
    d3.csv(dataPath)
        .then(function (myData) {
            var width = document.getElementById("mySVG").clientWidth;
            var height = document.getElementById("mySVG").clientHeight;
            var margin = 300;
            console.log(myData);
            var xScale = d3.scaleBand()
                .range([margin, width])
                .padding(0.4);
            var yScale = d3.scaleLinear()
                .range([height - margin, 0]);
            // console.log(width);
            // myData.sort(function(a,b){return d3.ascending(a.Year, b.Year);});
            xScale.domain(myData.map(function (d) {
                return d.GeoName
            }));
            yScale.domain([0, d3.max(myData, function (d) {
                return d.CO2EmissionsTonnesPerPerson;
            })]);

            var categoricalScale = d3.scaleOrdinal(d3.schemeTableau10);

            mySVG.selectAll(".bar")
                .data(myData)
                .enter()
                .append("rect")

                .attr("class", "bar")
                .attr("x", function (d) {
                    return xScale(d.GeoName);
                })
                .attr("width", xScale.bandwidth())
                .attr("y", function (d) {
                    return yScale(d.CO2EmissionsTonnesPerPerson);
                })
                .attr("height", function (d) {
                    return height - margin - yScale(d.CO2EmissionsTonnesPerPerson) - 10;
                })
                .style("fill", function (d) {
                    return categoricalScale(d.Year);
                });


            d3.selectAll("rect")
                .on("mouseenter", function (d, i) {

                    d3.select(this)
                        .transition()
                        .duration(500)
                        .style("fill", "silver")


                    d3.select("svg")
                        .append("text")
                        .attr("class", "tooltip")
                        .attr("x", 120)
                        .attr("y", 70)
                        .text("Tonnes of CO2 emissions per person in " + d.GeoName
                            + ": " + d.CO2EmissionsTonnesPerPerson)
                        .attr("font-size", 14);

                })

                .on("mouseout", function (d) {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .style("fill", function (d) {
                            return categoricalScale(d.Year);
                        });

                    d3.selectAll(".tooltip")
                        .remove();

                })


            mySVG.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0, " + (height - margin) + ")")
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .style("text-anchor", "end")
                .style("font-size", 8)
                .attr("dx", "-0.8em")
                .attr("dy", "-0.8em")
                .attr("transform", "rotate(-90)");


            mySVG.append("g")
                .attr("transform", "translate(" + margin + ",0)")
                .call(d3.axisLeft(yScale));

        });
}