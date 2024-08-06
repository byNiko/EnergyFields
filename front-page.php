<?php

/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package byniko
 */

get_header();
?>


<div id="map-slider" class="map-slider"></div>
<div id="hovered">
					<h2>
						<h4>
							<div>
								<span id="event-start">Jan, 1800</span> - <span id="event-end">Dec, 2020</span>
							</div>
						</h4>
						<h3 id="total">Total Events</h3><h2 id="event-total"></h2>
						<h3>
							<label> </label>
						</h3>
						<h3>
							<span class="count-label"></span>
							<span class="count"></span>
						</h3>
					</h2>
				</div>
<div id="map-filter" class="map-filter">
	<div class="map-filter__items d-flex">
		<button class="map-filter__item">Filter</button>
		<button class="map-filter__item">Filter</button>
		<button class="map-filter__item">Filter</button>
		<button class="map-filter__item">Filter</button>
		<button class="map-filter__item">Filter</button>
	</div>
</div>
<!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
	 <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script> -->
<?php

get_footer();
