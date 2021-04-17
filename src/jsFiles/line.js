var dataPath = "../csv/emissions.csv";

var width = 800;
var height = 700;
var margin = 400;
var nestedData;

d3.select("body").append("div").attr("id", "dropDownMenu");
var svg = d3.select("body")
    .append("div")
    .attr("id", "linegraph")
    .append("svg")
    .attr("width", width + margin)
    .attr("height", height + margin);

var rowConverter = function(d)
{
    return{
        geo: d.GeoName,
        year: d.Year,
        value: d.CO2EmissionsTonnesPerPerson
    }
}
initializeLine(dataPath);
        function filterData(geo){
            var filteredData = JSON.parse(JSON.stringify(nestedData));
            filteredData.forEach(function (d) {
                d.values = (d.values).filter(function (e) {
                    return d.key === geo;
                })
            })
            console.log(filteredData);
            return filteredData;

        }

        function updateGeoLine(updatedData) {
            var leaves = new Array();
            updatedData.forEach(function (d) {
                (d.values).forEach(function (e) {
                    leaves.push(e);
                })
            });
            console.log(leaves);
            var timeExtent = d3.extent(leaves, function (d) {
                return (d.key);
            })
            var xScale = d3.scaleLinear().domain(timeExtent).range([0, width]);


            var sumExtent = d3.extent(leaves, function (d) {
                console.log(d.value);
                return (d.value);
            });
            var yScale = d3.scaleLinear().domain(sumExtent).range([height, 0]);

            var x_axis = d3.axisBottom(xScale);
            var y_axis = d3.axisLeft(yScale);

            //select all g element of class axis and remove
            d3.selectAll(".axis").remove();

            d3.select("svg")
                .append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(" + margin + "," + height + ")")
                .call(x_axis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

            d3.select("svg")
                .append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + margin + ", 0)")
                .call(y_axis);


            var line = d3.line()
                .x(function (d) {
                    return margin + xScale(d.key);
                })
                .y(function (d) {
                    return yScale(d.value)
                });

            var lincolnshire = updatedData[0];
            var boston = updatedData[1];
            var east_Lindsey = updatedData[2];
            var lincoln = updatedData[3];
            var north_Kesteven = updatedData[4];
            var south_Holland = updatedData[5];
            var south_Kesteven = updatedData[6];
            var west_Lindsey = updatedData[7];

            var linshireLine = d3.selectAll(".Lincolnshire").datum(lincolnshire.values);
            linshireLine.transition().duration(500).attr("d", line);
            var linshireLineCircles = d3.selectAll(".circleLincolnshire").data(lincolnshire.values);
            linshireLineCircles.exit().remove();
            linshireLineCircles.transition().duration(500).attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);});
            linshireLineCircles.enter().append("circle").attr("class", "circleLincolnshire").attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);}).attr("r", 9);


            var bostonLine = d3.selectAll(".Boston").datum(boston.values);
            bostonLine.transition().duration(500).attr("d", line);
            var bostonLineCircles = d3.selectAll(".circleBoston").data(boston.values);
            bostonLineCircles.exit().remove();
            bostonLineCircles.transition().duration(500).attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);});
            bostonLineCircles.enter().append("circle").attr("class", "circleBoston").attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);}).attr("r", 9);


            var east_LindseyLine = d3.selectAll(".East_Lindsey").datum(east_Lindsey.values);
            east_LindseyLine.transition().duration(500).attr("d", line);
            var east_LindseyLineCircles = d3.selectAll(".circleEast_Lindsey").data(east_Lindsey.values);
            east_LindseyLineCircles.exit().remove();
            east_LindseyLineCircles.transition().duration(500).attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);});
            east_LindseyLineCircles.enter().append("circle").attr("class", "circleEast_Lindsey").attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);}).attr("r", 9);

            var lincolnLine = d3.selectAll(".Lincoln").datum(lincoln.values);
            lincolnLine.transition().duration(500).attr("d", line);
            var lincolnLineCircles = d3.selectAll(".circleLincoln").data(east_Lindsey.values);
            lincolnLineCircles.exit().remove();
            lincolnLineCircles.transition().duration(500).attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);});
            lincolnLineCircles.enter().append("circle").attr("class", "circleLincoln").attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);}).attr("r", 9);

            var north_KestevenLine = d3.selectAll(".North_Kesteven").datum(north_Kesteven.values);
            north_KestevenLine.transition().duration(500).attr("d", line);
            var north_KestevenLineCircles = d3.selectAll(".circleNorth_Kesteven").data(north_Kesteven.values);
            north_KestevenLineCircles.exit().remove();
            north_KestevenLineCircles.transition().duration(500).attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);});
            north_KestevenLineCircles.enter().append("circle").attr("class", "circleNorth_Kesteven").attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);}).attr("r", 9);


            var south_HollandLine = d3.selectAll(".South_Holland").datum(south_Holland.values);
            south_HollandLine.transition().duration(500).attr("d", line);
            var south_HollandLineCircles = d3.selectAll(".circleSouth_Holland").data(south_Holland.values);
            south_HollandLineCircles.exit().remove();
            south_HollandLineCircles.transition().duration(500).attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);});
            south_HollandLineCircles.enter().append("circle").attr("class", "circleSouth_Holland").attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);}).attr("r", 9);


            var south_KestevenLine = d3.selectAll(".South_Kesteven").datum(south_Kesteven.values);
            south_KestevenLine.transition().duration(500).attr("d", line);
            var south_KestevenLineCircles = d3.selectAll(".circleSouth_Kesteven").data(south_Kesteven.values);
            south_KestevenLineCircles.exit().remove();
            south_KestevenLineCircles.transition().duration(500).attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);});
            south_KestevenLineCircles.enter().append("circle").attr("class", "circleSouth_Kesteven").attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);}).attr("r", 9);


            var west_LindseyLine = d3.selectAll(".West_Lindsey").datum(west_Lindsey.values);
            west_LindseyLine.transition().duration(500).attr("d", line);
            var west_LindseyLineCircles = d3.selectAll(".circleWest_Lindsey").data(west_Lindsey.values);
            west_LindseyLineCircles.exit().remove();
            west_LindseyLineCircles.transition().duration(500).attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);});
            west_LindseyLineCircles.enter().append("circle").attr("class", "circleWest_Lindsey").attr("cx", function (d) {return margin + xScale(d.key);}).attr("cy", function (d) {return yScale(d.value);}).attr("r", 9);
        }


function initializeLine(dataPath){
            d3.csv(dataPath, rowConverter)
                .then(function (data) {
                    var nestByGeo = d3.nest().key(function (d) {return (d.geo);})
                        .entries(data);
                    /*console.log(nestByGeo);*/
                    //create drop-down menu
                    var dropDownMenu = d3.select("#dropDownMenu");
                    dropDownMenu.append("select").selectAll("option").data(nestByGeo)
                        .enter()
                        .append("option")
                        .attr("value", function (d) {
                            return d.key;
                        })
                        .text(function (d) {
                            return d.key;
                        });

                    dropDownMenu.on('change', function () {
                            var menuItem = d3.select(this)
                                .select("select")
                                .property("value");
                            console.log(menuItem);
                            var filteredData = filterData(menuItem);
                            d3.selectAll("class").remove();
                            console.log(filteredData);
                            updateGeoLine(filteredData);
                        });
        nestedData = d3.nest()
            .key(function (d) {
                return d.geo;
            })
            .key(function (d) {
                return d.year;
            })
            .rollup(function (leaves) {
                return d3.sum(leaves, function (d) {
                    return d.value;
                });
            })
            .entries(data);

        var timeExtent = d3.extent(data, function (d) {
            return d.year;
        });
        var xScale = d3.scaleLinear().domain(timeExtent).range([0, width]);

        var emValues = new Array();
        nestedData.forEach(function(d){
            (d.values).forEach(function(e){
                emValues.push(e.value);
            })
        });
        var valueExtent = d3.extent(emValues, function (d) {
            return d;
        });
        var yScale = d3.scaleLinear().domain(valueExtent).range([height, 0]);

        var x_axis = d3.axisBottom(xScale);
        var y_axis = d3.axisLeft(yScale);

        d3.select("svg")
            .append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(" + margin + "," + height + ")")
            .call(x_axis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-0.8em")
            .attr("dy", "0.15em")
            .attr("transform", "rotate(-65)");

        d3.select("svg")
            .append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + margin + ", 0)")
            .call(y_axis);

        var line = d3.line()
            .x(function (d){
                return margin + xScale(d.key);
            })
            .y(function(d){
                return yScale(d.value);
            });

        var lincolnshire = nestedData[0];
        var boston = nestedData[1];
        var east_Lindsey = nestedData[2];
        var lincoln = nestedData[3];
        var north_Kesteven = nestedData[4];
        var south_Holland= nestedData[5];
        var south_Kesteven= nestedData[6];
        var west_Lindsey= nestedData[7];

        svg.append("path")
            .datum(lincolnshire.values)
            .attr("class", "line Lincolnshire")
            .attr("d", line);
        svg.append("path")
            .datum(boston.values)
            .attr("class", "line Boston")
            .attr("d", line);
        svg.append("path")
            .datum(east_Lindsey.values)
            .attr("class", "line East_Lindsey")
            .attr("d", line);
        svg.append("path")
            .datum(lincoln.values)
            .attr("class", "line Lincoln")
            .attr("d", line);
        svg.append("path")
            .datum(north_Kesteven.values)
            .attr("class", "line North_Kesteven")
            .attr("d", line);
        svg.append("path")
            .datum(south_Holland.values)
            .attr("class", "line South_Holland")
            .attr("d", line);
        svg.append("path")
            .datum(south_Kesteven.values)
            .attr("class", "line South_Kesteven")
            .attr("d", line);
        svg.append("path")
            .datum(west_Lindsey.values)
            .attr("class", "line West_Lindsey")
            .attr("d", line);

        svg.selectAll(".circleLincolnshire")
            .data(lincolnshire.values)
            .enter()
            .append("circle")
            .attr("class", "circleLincolnshire")
            .attr("cx", function(d){
                return margin + xScale(d.key);
            })
            .attr("cy", function(d){
                return yScale(d.value);
            })
            .attr("r", 2);
        svg.selectAll(".circleBoston").data(lincolnshire.values).enter().append("circle").attr("class", "circleLincolnshire").attr("cx", function(d){
                            return margin + xScale(d.key);
                        })
                        .attr("cy", function(d){
                            return yScale(d.value);
                        })
                        .attr("r", 2);
    })

}