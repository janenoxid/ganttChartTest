 
 // --- I don't know what having d3 in front of this does or how it functions
 d3.gantt = function() {

	// --- Not sure what this does yet
    var FIT_TIME_DOMAIN_MODE = "fit";
    var FIXED_TIME_DOMAIN_MODE = "fixed";
    
    // --- Margin around chart
	var margin = { 
	top : 20,
	right : 40,
	bottom : 20,
	left : 150
    };

	// --- Setting time domain -- want to understand this better
    var timeDomainStart = d3.time.day.offset(new Date(),-3); // what is d3.time.day.offset? how does it work? -- new Date() makes it today
    var timeDomainEnd = d3.time.hour.offset(new Date(),+3);
    var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit --- what does this mean?

	// --- Initializing data variables
    let exhibitions = []; 
    let venueStatus = [];

	// --- Setting the dimensions of the chart
    let height = 400; //client is the window? used to be -->  document.body.clientHeight - margin.top - margin.bottom-5
    let width = document.body.clientWidth + 9000;

	// --- How the date (or time) shows up in the x axis
    let tickFormat = "%b '%y"; // I played with changing this, but it didn't reflect in the browser? -- done in app.js


	// --- I think this is meant to set up a primary key, which we don't really need with Salesforce since it has a unique ID already
    const keyFunction = function(d) {
	return d.startDate + d.exhibitionName + d.venueName + d.endDate; // in Salesforce I don't think I'll need this because there's a unique ID
    };

	// --- I don't fully get how this functions yet. I need to research "translate" -- I think that's how it gets moved? 
    let rectTransform = function(d) {
		return "translate(" + x(d.startDate) + "," + y(d.exhibitionName) + ")"; // what does this do??
		};


	// --- I don't fully understand this yet either. I need to research like every function in here. 
	// --- It looks like this variable helps set up the scale in the xAxis variable. 
	// --- I need to better understand the setup of those timeDomainStart and End variables. I also don't get "clamp"
    let x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);

	// --- Again - I don't really understand what's going on here. Need to research these functions.
	// --- This variable helps set up the yAxis variable
    let y = d3.scale.ordinal().domain(exhibitions).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1);
    
	// --- The original code assigned the variable here, but it doesn't seem like it really needs to be assigned until later? 
    // let xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(true)
	//     .tickSize(8).tickPadding(8); // this is the same as later in the code, but the later code actually seems to work? I guess this initializes the variable and the later code assigns it...? 
	

	let xAxis;

	// --- The original code assigned the variable here, but it doesn't seem like it really needs to be assigned until later? 
    // let yAxis = d3.svg.axis().scale(y).orient("left").tickSize(-width)

	let yAxis;

	let toolTip = d3.select("body").append("div")
					.attr("class", "tooltip")
					.style("opacity", 0)

	// --- This formats the dates for the tooltips or labels that show up
	let formatDate = function(date) {
		return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
	}
	

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

    let initAxis = function() {
	x = d3.time.scale().domain([ timeDomainStart, timeDomainEnd ]).range([ 0, width ]).clamp(true);
	y = d3.scale.ordinal().domain(exhibitions).rangeRoundBands([ 0, height - margin.top - margin.bottom ], .1); /// I don't like rangeRoundBands I don't think. Makes things dumbly tall
	xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(60).tickFormat(d3.time.format(tickFormat)).tickSubdivide(true) // this is where I can edit the number of x-axis ticks
		.tickSize(-height + margin.top + margin.bottom).tickPadding(8);

	yAxis = d3.svg.axis().scale(y).orient("left").tickSize(-width).tickPadding(8);
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
	

	// Add "Today" vertical line
	let today = new Date();
	svg.append("line")
		.attr("x1", x(today))  //<<== change your code here
		.attr("y1", 0)
		.attr("x2", x(today))  //<<== and here
		.attr("y2", height - margin.top - margin.bottom)
		.style("stroke-width", 2)
		.style("stroke", "red")
		.style("fill", "none");

	svg.append("g").attr("class", "y axis y-axis").transition().call(yAxis);



	let rect = svg.selectAll(".chart")
	 .data(venues, keyFunction).enter()
	 .append("rect")
	 .attr("rx", 2)
         .attr("ry", 2)
	 .attr("class", function(d){ 
	     if(venueStatus[d.stage] == null){ return "bar";}
	     return venueStatus[d.stage];
	     }) 
	 .attr("y", 12) // this is where to change the height of the bar vs. the label.
	 .attr("transform", rectTransform)
	 .attr("height", 20) // formerly ---> function(d) { return y.rangeBand(); }
	 .attr("width", function(d) { 
	     return (x(d.endDate) - x(d.startDate)); 
	     })
		 .on("mouseover", function(d){
			toolTip.transition()
			.duration(500)
			.style("opacity", .85)
			toolTip.html("<strong>" + d.exhibitionName + " at " + d.venueName + "</strong></br>Stage: " + d.stage + "</br>Start Date: " + formatDate(d.startDate) + "</br>End Date: " + formatDate(d.endDate))
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY - 28) + "px")
		})
		.on("mouseout", function(d){
			toolTip.transition()
				.duration(300)
				.delay(4000)
				.style("opacity",0);
		})



		let labels = svg.selectAll(".chart").data(venues).enter()
		.append("text")
		.attr({
			class: "labels",
			transform: rectTransform,
			y: 25,
			x: 5, 
			"max-width": function(d){return d.endDate - d.startDate}
		})		
		.text(function(d){return d.venueName + ": " + formatDate(d.startDate) + " - " + formatDate(d.endDate);})


	 
	 return gantt;

    }
    
    gantt.redraw = function(venues) { // when is this used? when do we have to redraw?? when the data is

	initTimeDomain();
	initAxis();
	
        var svg = d3.select("svg");

        var ganttChartGroup = svg.select(".gantt-chart");
        var rect = ganttChartGroup.selectAll("rect").data(venues, keyFunction);
        
        rect.enter()
         .insert("rect",":first-child")
         .attr("rx", 2)
         .attr("ry", 2)
	 .attr("class", function(d){ 
	     if(venueStatus[d.stage] == null){ return "bar";}
	     return venueStatus[d.stage];
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
    
    gantt.venueStatus = function(value) {
	if (!arguments.length)
	    return venueStatus;
	venueStatus = value;
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