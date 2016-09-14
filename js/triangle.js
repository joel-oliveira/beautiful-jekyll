triangle = null;

function Triangle() {
	canvasDiv = $("#canvas").get(0);
	this.canvas = Raphael(canvasDiv, 200, 200);
}

Triangle.prototype.setSides = function(s1, s2, s3) {
	this.s1 = parseInt(Number(escape(s1)));
	this.s2 = parseInt(Number(escape(s2)));
	this.s3 = parseInt(Number(escape(s3)));
	this.sorted_sides = [this.s1, this.s2, this.s3];
	this.sorted_sides = this.sorted_sides.sort(sortNumber);
	this.scale = 190/this.sorted_sides[2];
	this.scaledSide1 = parseInt(this.scale * this.s1);
	this.scaledSide2 = parseInt(this.scale * this.s2);
	this.scaledSide3 = parseInt(this.scale * this.s3);
	this.x1 = 5;
	this.y1 = 190;
	this.x3 = this.x1 + this.scaledSide1;
	this.y3 = this.y1;
	return this.scale;
}

Triangle.prototype.getX = function(x) {
	return x;
}

Triangle.prototype.getY = function(y) {
	return y;
}

Triangle.prototype.getApex = function() {
	//via http://mathforum.org/library/drmath/view/51836.html
	var b2 = Math.pow(this.scaledSide2, 2);
	var deltaX = parseInt((Math.pow(this.scaledSide1, 2) + Math.pow(this.scaledSide2, 2) - Math.pow(this.scaledSide3, 2)) / (2 * this.scaledSide1));
	var apexX = this.x1 + deltaX;
	var apexY = this.y3 - Math.sqrt(Math.abs(b2 - Math.pow(deltaX, 2)));
	return [apexX, apexY];
}

Triangle.prototype.getType = function() {
    var type = "Isosceles";
	if (this.sorted_sides[2] > this.sorted_sides[0] + this.sorted_sides[1]) {
		type = "Invalid";
	} else if (this.sorted_sides[2] == this.sorted_sides[0] + this.sorted_sides[1]) {
		type =  "Degenerate";
	} else if ((this.sorted_sides[0] == this.sorted_sides[1]) && (this.sorted_sides[1] == this.sorted_sides[2])) {
		type =  "Equilateral";
	} else if (Math.pow(this.sorted_sides[2], 2) == (Math.pow(this.sorted_sides[0], 2) + (Math.pow(this.sorted_sides[1], 2)))) {
		type =  "Right";
	} else if ((this.sorted_sides[2] != this.sorted_sides[1]) && (this.sorted_sides[1] != this.sorted_sides[0])) {
		type =  "Scalene";
	}
	return type;
}

Triangle.prototype.draw = function() {
	this.canvas.clear();
	this.type = this.getType();
	if (this.triangleType != "Invalid") {
		this.apexPoint = this.getApex();
	    this.x2 = parseInt(this.apexPoint[0]);
	    this.y2 = parseInt(this.apexPoint[1]);
		if ($.isNumeric(this.x2) && $.isNumeric(this.y2)) {
			this.center();
			this.triangleGraphic = this.canvas.path("M " + this.x1 + "," + this.y1 + " L " + this.x3 + "," + this.y3 + " L " + this.x2 + "," + this.y2 + " L " + this.x1 + "," + this.y1 + " Z");			
			this.triangleGraphic.attr("stroke", "#036");
			this.triangleGraphic.attr("fill", "#6699bb");
		}
		this.coordinates = "(" + this.x1 + "," + this.y1 + ") (" + this.x2 + "," + this.y2 + ") (" + this.x3 + "," + this.y3 + ")";
	} else {
		this.coordinates = "";
	}
}

Triangle.prototype.clear = function() {
	this.canvas.clear();
	//this = new Triangle();
}

Triangle.prototype.center = function() {
	//get the total width of the triangle
	var xVals = [this.x1, this.x2, this.x3];
	xVals.sort(sortNumber);
	var width = xVals[2] - xVals[0];
	var shiftBy = parseInt(100 - (0.5 * width));
	this.x1 = this.x1 + shiftBy;
	this.x2 = this.x2 + shiftBy;
	this.x3 = this.x3 + shiftBy;
}

function sortNumber(a, b) {
	return a - b;
}

function drawTriangle(skipAddToList) {
	var side1val = $("#side1").val();
	var side2val = $("#side2").val();
	var side3val = $("#side3").val();
	triangle.setSides(side1val, side2val, side3val);
	triangle.draw();
	$("#type").html("\n" + triangle.type + "\n");
	if(!skipAddToList) {
		addToList(triangle.s1, triangle.s2, triangle.s3, triangle.type, triangle.coordinates);
	}
	var list = $.jStorage.get("list");
	if(!list) {
		list = new Array();
	}
	list.push([triangle.s1, triangle.s2, triangle.s3, triangle.type, triangle.coordinates]);
	$.jStorage.set("list", list);
}

function addToList(s1, s2, s3, type, coordinates) {
	$("#list").prepend("<div class=\"triangle_row clearfloat\"><div class=\"triangle_data_cell narrow\">" + s1 + "</div><div class=\"triangle_data_cell narrow\">" + s2 + "</div><div class=\"triangle_data_cell narrow\">" + s3 + "</div><div class=\"triangle_data_cell wide\">" + type + "</div><div class=\"triangle_data_cell wide\">" + coordinates + "</div></div>");
}

function initializeTriangle() {
	triangle = new Triangle();
}

function resetSession() {
	$("#side1").val("");
	$("#side2").val("");
	$("#side3").val("");
	$("#list").html("");
	$("#type").html("");
	triangle.clear();
	$.jStorage.flush();
	return ($("#web").val() == 1);
}

function setBehavior(web) {
	switch(web) {
		case "1":
			$("#form").off("submit");
			$("input[type='submit']").removeClass("hide");
			$("input[id^='side']").off("change");
			break;
		case "2":
			$("#form").off("submit");
			$("input[type='submit']").removeClass("hide");
			$("#form").on("submit", function(event) {
				event.preventDefault();
				$.get($("#form").attr("action"), {web: $('#web').val(), side1: $('#side1').val(), side2: $('#side2').val(), side3: $('#side3').val()}, function(data) {
					drawTriangle();
				});
			});
			$("input[id^='side']").off("change");
			break;
		case "3":
			$("#form").off("submit");
			$("input[type='submit']").addClass("hide");
			$("#form").on("submit", function(event) {
				event.preventDefault();
			});
			$("input[id^='side']").on("change", function() {
				drawTriangle();
			});
			break;
		default:
			//default code block
	}
}

window.onload = function() {
	initializeTriangle();
	$('#reset').click(function(){ return resetSession(); });
	var url = $.url();
	var draw = false;
	var web = parseInt(Number(escape(url.param("web"))));
	if((web > 0) && (web < 4)) {
		$("#web").val(web);
		setBehavior("" + web);
	}
	for (var i = 1; i < 4; i++) {
		$("#side" + i).val(url.param("side" + i));
		draw = (draw || $.isNumeric($("#side" + i).val()));
	}
	if (draw) {
		drawTriangle(true);
	}
	var list = $.jStorage.get("list");
	if(list) {
		for (var l = 0; l < list.length; l++) {
			addToList(list[l][0], list[l][1], list[l][2], list[l][3], list[l][4]);
		}
	}
}
