/**
 * @author Dimitry Kudrayvtsev
 * @version 2.0
 */

 d3.gantt = function() {
    var FIT_TIME_DOMAIN_MODE = "fit";
    var FIXED_TIME_DOMAIN_MODE = "fixed";
    
    var margin = {
	top : 20,
	right : 40,
	bottom : 20,
	left : 150
    };
    var timeDomainStart = d3.time.day.offset(new Date(),-3); // what is d3.time.day.offset? how does it work?
    var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
    var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit --- what does this mean?
    var exhibitions = []; // how are task types used?
    var taskStatus = [];
    var height = document.body.clientHeight - margin.top - margin.bottom-5; //client is the window?
    var width = document.body.clientWidth + 4500;

    var tickFormat = "%H:%M"; // I played with changing this, but it didn't reflect in the browser?

    var keyFunction = function(d) {
	return d.startDate + d.exhibitionName + d.endDate;
    };

	let formatDate = function(date) {
		return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
	}

    var rectTransform = function(d) {
	return "translate(" + x(d.startDate) + "," + y(d.exhibitionName) + ")";
    };

    var x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);

    var y = d3.scale.ordinal().domain(exhibitions).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
    
    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
	    .tickSize(8).tickPadding(8); // this is the same as line 65 but 65 actually seems to work?

    var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(-width);

	let toolTip = d3.select("body").append("div")
					.attr("class", "tooltip")
					.style("opacity", 0)

    var initTimeDomain = function() {
	if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
	    if (venues === undefined || venues.length < 1) {
		timeDomainStart = d3.time.day.offset(new Date(), -3);
		timeDomainEnd = d3.time.hour.offset(new Date(), +3);
		return;
	    }
	    venues.sort(function(a, b) {
		return a.endDate - b.endDate;
	    });
	    timeDomainEnd = venues[venues.length - 1].endDate;
	    venues.sort(function(a, b) {
		return a.startDate - b.startDate;
	    });
	    timeDomainStart = venues[0].startDate;
	}
    };

    var initAxis = function() {
	x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
	y = d3.scale.ordinal().domain(exhibitions).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1); /// I don't like rangeRoundBands I don't think. Makes things dumbly tall
	xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(60).tickFormat(d3.time.format(tickFormat)).tickSubdivide(true) // this is where I can edit the number of x-axis ticks
		.tickSize(-height).tickPadding(8);

	yAxis = d3.svg.axis().scale(y).orient("left").tickSize(-width);
    };
    
    function gantt(venues) {
	
	initTimeDomain();
	initAxis();
	
	var svg = d3.select("body")
	.append("svg")
	.attr("class", "chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
        .attr("class", "gantt-chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
	
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
	.transition()
	.call(xAxis);
	
	svg.append("g").attr("class", "y axis").transition().call(yAxis);

      svg.selectAll(".chart")
	 .data(venues, keyFunction).enter()
	 .append("rect")
	 .attr("rx", 5)
         .attr("ry", 5)
	 .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return taskStatus[d.status];
	     }) 
	 .attr("y", 15) // this is where to change the height of the bar vs. the label.
	 .attr("transform", rectTransform)
	 .attr("height", 20) // formerly ---> function(d) { return y.rangeBand(); }
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     })
		 .on("mouseover", function(d){
			toolTip.transition()
			.duration(500)
			.style("opacity", .85)
			toolTip.html("<strong>" + d.exhibitionName + " at " + d.venueName + "</strong></br>Start Date: " + formatDate(d.startDate) + "</br>End Date: " + formatDate(d.endDate))
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY - 28) + "px")
		})
		.on("mouseout", function(d){
			toolTip.transition()
				.duration(300)
				.style("opacity",0);
		});
	 
	 

	 
	 return gantt;

    };
    
    gantt.redraw = function(venues) {

	initTimeDomain();
	initAxis();
	
        var svg = d3.select("svg");

        var ganttChartGroup = svg.select(".gantt-chart");
        var rect = ganttChartGroup.selectAll("rect").data(venues, keyFunction);
        
        rect.enter()
         .insert("rect",":first-child")
         .attr("rx", 5)
         .attr("ry", 5)
	 .attr("class", function(d){ 
	     if(taskStatus[d.status] == null){ return "bar";}
	     return taskStatus[d.status];
	     }) 
	 .transition()
	 .attr("y", 0)
	 .attr("transform", rectTransform)
	 .attr("height", 20) //function(d) { return y.rangeBand(); }
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });

        rect.transition()
          .attr("transform", rectTransform)
	 .attr("height", 20) //function(d) { return y.rangeBand(); }
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     });
        
	rect.exit().remove();

	svg.select(".x").transition().call(xAxis);
	svg.select(".y").transition().call(yAxis);
	
	return gantt;
    };

    gantt.margin = function(value) {
	if (!arguments.length)
	    return margin;
	margin = value;
	return gantt;
    };

    gantt.timeDomain = function(value) {
	if (!arguments.length)
	    return [ timeDomainStart, timeDomainEnd ];
	timeDomainStart = +value[0], timeDomainEnd = +value[1];
	return gantt;
    };

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
    gantt.timeDomainMode = function(value) {
	if (!arguments.length)
	    return timeDomainMode;
        timeDomainMode = value;
        return gantt;

    };

    gantt.exhibitions = function(value) {
	if (!arguments.length)
	    return exhibitions;
	exhibitions = value;
	return gantt;
    };
    
    gantt.taskStatus = function(value) {
	if (!arguments.length)
	    return taskStatus;
	taskStatus = value;
	return gantt;
    };

    gantt.width = function(value) {
	if (!arguments.length)
	    return width;
	width = +value;
	return gantt;
    };

    gantt.height = function(value) {
	if (!arguments.length)
	    return height;
	height = +value;
	return gantt;
    };

    gantt.tickFormat = function(value) {
	if (!arguments.length)
	    return tickFormat;
	tickFormat = value;
	return gantt;
    };


    
    return gantt;
};