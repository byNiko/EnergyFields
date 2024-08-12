<?php

function byniko_make_inpage_link($link, $sanitized) {
	// Format the anchor tag
	$class = "inpage-link button--text";
	return sprintf(
		'<a href="%s"%s>%s</a>',
		$sanitized,
		$class ? ' class="' . esc_attr($class) . '"' : '',
		$link
	);
}

if (have_rows('page_content') || count($args)) :
?>
	<aside id="inpage-links" class="inpage-links has-matte sticky-top d-flex--med">
		<!-- <div class="position-container"> -->
		<?php
		if (have_rows('page_content')) :
			while (have_rows('page_content')) : the_row();
				$link = get_sub_field('section_link_text');
				$sanitized = "#" . sanitize_title($link);
				if($link && $sanitized)
				echo byniko_make_inpage_link($link, $sanitized);
			endwhile;

		elseif (count($args)) :
			foreach ($args as $l) :
				$location = new Location($l);
				$link = $location->get_short_name();
				$sanitized = "#" . sanitize_title($link);
				echo byniko_make_inpage_link($link, $sanitized);
			endforeach;
		endif;

		?>
		<!-- </div> -->
	</aside>
<?php

endif;
