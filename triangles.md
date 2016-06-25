---
layout: page
title: Testing Triangles
subtitle: A classic testing exercise
css:
  - "/css/triangle.css"
js:
  - "/js/raphael-2.2.0.min.js"
  - "/js/purl-2.3.1.min.js"
  - "/js/json2-20150503.min.js"
  - "/js/jstorage-0.4.12.min.js"
  - "/js/triangle.js"
---
<div id="triangle">
	<div id="triangle_form">
		<form id="form" method="get" action="">
			<i>Please enter sizes for the sides:</i>
			<div id="triangle_frame">
				<div class="side side2">
					Side 2<br />
					<input id="side2" name="side2" size="5" type="text" />
				</div>
				<div class="side side3">
					Side 3<br />
					<input id="side3" name="side3" size="5" type="text" />
				</div>
				<div class="side side1">
					Side 1<br />
					<input id="side1" name="side1" size="5" type="text" />
				</div>
				<div id="type">
				</div>
				<div id="canvas">&nbsp;</div>
			</div>
			<br />
			Web: <select id="web" name="web" onchange="setBehavior(this.value)">
				<option value="1" selected="selected">1.0</option>
				<option value="2">2.0</option>
				<option value="3">3.0</option>
			</select><input type="submit" class="submit" tabindex="-1" value="Draw Triangle">
		</form>
		<p>Inspired on the work done by <a href="http://testobsessed.com/2007/03/testing-triangles-a-classic-exercise-updated-for-the-web/">Elisabeth Hendrickson</a> available <a href="http://practice.agilistry.com/triangle">here</a>.</p>
	</div>
	<div id="triangle_history">
		<i>Test Data History (<a href="/triangles" id="reset">reset test session</a>)</i>
		<b>
			<div class="triangle_row">
				<div class="triangle_data_cell narrow">Side 1</div>
				<div class="triangle_data_cell narrow">Side 2</div>
				<div class="triangle_data_cell narrow">Side 3</div>
				<div class="triangle_data_cell wide">Category</div>
				<div class="triangle_data_cell wide">Coordinates</div>
			</div>
		</b>
		<br class="clearfloat" />
		<div id="list">
		</div>
	</div>
</div>