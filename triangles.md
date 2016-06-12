---
layout: page
title: Testing Triangles
subtitle: A classic testing exercise
css:
  - "/css/triangle.css"
js:
  #- "/js/raphael-2.2.0.min.js" # "https://raw.githubusercontent.com/DmitryBaranovskiy/raphael/master/raphael.min.js"
  - "/js/raphael.js"
  - "/js/triangle.js"
---

Inspired on the work done by [Elisabeth Hendrickson](http://testobsessed.com/2007/03/testing-triangles-a-classic-exercise-updated-for-the-web/) available [here](http://practice.agilistry.com/triangle).

<div id="triangle">
	<div id="triangle_form">
		<form action="/triangles" method="post" onsubmit="return false;">
			<p>
				<i>Please enter sizes for the sides of the triangle:</i>
			</p>
			<input id="triangle_category" name="triangle[category]" type="hidden" />
			<input id="triangle_coordinates" name="triangle[coordinates]" type="hidden" />
			<div id="triangle_frame">
				<div id="side2_container" class="side">
					Side 2<br />
					<input id="triangle_side2" name="triangle[side2]" onchange="drawTriangle();" size="5" type="text" />
				</div>
				<div id="side3_container" class="side">
					Side 3<br />
					<input id="triangle_side3" name="triangle[side3]" onchange="drawTriangle();" size="5" type="text" />
				</div>
				<div id="side1_container" class="side">
					Side 1<br />
					<input id="triangle_side1" name="triangle[side1]" onchange="drawTriangle();" size="5" type="text" />
				</div>
				<div id="triangle_type"></div>
				<div id="canvas">&nbsp;</div>
			</div>
		</form>
	</div>
	<div id="triangle_history">
	<p><i>Test Data History<br />(for this test session)</i></p>
	<b>
		<div class="triangle_row">
			<div class="triangle_data_cell narrow">Side 1</div>
			<div class="triangle_data_cell narrow">Side 2</div>
			<div class="triangle_data_cell narrow">Side 3</div>
			<div class="triangle_data_cell wide">Category</div>
			<div class="triangle_data_cell wide">Coordinates</div>
		</div></b>
		<br class="clearfloat" />
		<div id="triangles_list">
		</div>
	</div>
</div>