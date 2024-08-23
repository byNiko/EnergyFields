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

<main id="primary" class="site-main">
	<div class="container">
		<?php echo get_arrow_with_date("<div>Sep 15,</div> <div>2024</div>", "<div>Jan 19,</div> <div>2025</div>"); ?>
		<div class="flex-row gap">
			<div class="col">
				<?php echo wp_get_attachment_image(190, 'full', false, array('alt' => 'Energy Fields: Vibrations of the Pacific')); ?>
			</div>
			<div class="col">
				<?php
				if (have_posts()) : while (have_posts()) : the_post();
						the_content();
					endwhile;
				endif;
				?>
			</div>
		</div>
	</div>
	<section id="gallery" class="flex-column">
		<?php
		$args = array(
			'numberposts' => -1,
			'post_type' => 'location',
			'status' => 'publish'
		);
		$locations = get_posts($args);
		$spotlights = [];
		if ($locations) :
			// order exhibits by location
			foreach ($locations as $l) :	
				$location = new Location($l);
				$artworks = get_field('art_works', $location->ID);
				

				$exhibits = [];
				if ($artworks) :
					foreach ($artworks as $artwork) :
						
						$art = new Artwork($artwork);
						if ($art->is_spotlight) :
							$spotlights[] = $art;
						elseif ($art->is_exhibition) :
							$exhibits[] = $art;
						endif;
					endforeach;
				endif;
				if (count($exhibits)) :
		?>
		<div class="container mt-section">
			<header>
				<h2 class="h2 color-black">
					<?= $location->get_name(); ?>
				</h2>
			</header>
			<div class="flex-row __3x flex-wrap gap">
				<?php
							foreach ($exhibits as $art) :
								echo $art->get_card('box-shadow');
							endforeach;
							?>
			</div>
		</div>
		<?php
				endif;
			endforeach;
		endif;
		?>
		<?php if (count($spotlights)) : ?>
		<div id="spotlights" class="spotlights-wrapper  mt-section">
			<div class="container">
				<header class="d-none">
					<h2 class="h2 color-black fz-lg">
						Spotlight
					</h2>
				</header>
				<div class="spotlight-items flex-column gap">
					<?php foreach ($spotlights as $art) : ?>

					<div class="flex-row gap">
						<div class="col flex-1-3">
							<?php echo $art->get_card(); ?>
						</div>

						<div class="col">
							<a class="no-underline" href="<?= $art->get_permalink();?> ">
								<h2 class="h2 color-black">
									<?= $art->get_locations()[0]->post_title ?>
								</h2>
							</a>
							<?php
										// get the first event
										$start = $art->get_event_times()[0]['start'];
										$end = array_pop($art->get_event_times())['end'];
										$start = date_format(date_create($start), "M d, Y");
										$end = date_format(date_create($end), "M d, Y");
										echo get_arrow_with_date($start, $end, 'heading-sm');
										?>
						</div>
					</div>
					<!-- </a> -->
					<?php endforeach; ?>
				</div>
			</div>
		</div>
		<?php endif; ?>

	</section>

</main><!-- #main -->

<?php
get_footer();