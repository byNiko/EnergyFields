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

<div id="overlay-map-info-container" class="overlay-map-info-container">
	<div class="inner-map-info-container">

		<div id="mapInfoBox" class="mapInfoBoxContainer">
			<div class="map_ui_el">
				<div class="infoBox"></div>
			</div>
		</div>

		<div class="slider-container">
			<div class="map_ui_el">
				<div class="d-flex slider-row">
					<div class="slide-cont">
						<div id="map-slider" class="map-slider"></div>
						<div id="dateRange" class="date-range d-flex justify--space-between">
							<span id="event-start"></span><span id="event-end"></span>
						</div>
					</div>
					<button class="button--infoIcon"><?php get_template_part('/template-parts/info_Icon'); ?></button>
				</div>


			</div>
		</div>
	</div>
</div>
<div id="map-filter" class="map-filter">
	<?php get_template_part('/template-parts/map/map', 'filters'); ?>
</div>
<?php

get_footer();
