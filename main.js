// set frame height, frame width, and margins
const FRAME_WIDTH = 200;
const FRAME_HEIGHT = 500;
const MARGINS = {left: 100, right: 50, top: 50, bottom: 50};

// list of data points
const data = [55000, 48000, 27000, 66000, 90000];


// minus top and bottom margin
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.bottom;

const FRAME3 = d3.select("#vis1")
					.append("svg")
						.attr("height", FRAME_HEIGHT)
						.attr("width", FRAME_WIDTH)
						.attr("class", "frame");

// scaling functions 
// max looks through all the dataset points
const MAX_Y = d3.max(data, (d) => {return d;});
console.log("Max x: " + MAX_Y);

// scale function
// scale linear used for quantitative data
// domain is input, range is output
const Y_SCALE = d3.scaleLinear()
					.domain([0, (MAX_Y + 10000)])
					.range([VIS_HEIGHT, 0]);

//plot
FRAME3.selectAll("points")
		.data(data)
		.enter()
		.append("circle")
			.attr("cx", MARGINS.left + 50)
			.attr("cy", (d) => {
				return(Y_SCALE(d) + MARGINS.top)
			})
			.attr("r", 10)
			.attr("class", "point")



// add an axis
// g is used for a placeholder
FRAME3.append("g")
		// attribute transform - moves horizontal and vertically
		.attr("transform", 
			// how far to translate horizontal (move over past the left margin) and vertical move past viz heights plus the margin
			"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
		// call the axisBottom function and make an axis for the x_scale function and make 4 ticks
		.call(d3.axisLeft(Y_SCALE).ticks(4))
			// technically not in-line but you can also give it a class and style it in css
			.attr("font-size", "10px");