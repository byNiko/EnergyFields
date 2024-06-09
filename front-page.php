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
		<div class="flex-row gap">
			<div class="col">
				<?php echo wp_get_attachment_image(80, 'full'); ?>
			</div>
			<div class="col">
				<header>
					<h2 class="h2 color-black">
						co-presented by Fulcrum Artworks &
						Guggenheim Gallery at Chapman University
					</h2>
				</header>
				<div class="content">
					<p>Co-curated by Robert Takahashi Crouch and Lawrence English, Energy Fields presents a diverse and dynamic collection of works from artists working out of Japan, Australia, Canada, Chile, New Zealand, and the USA. These works trace a path of investigation that intersects the fluctuation of time and space through gravitational waves, the geologic dynamism of tectonic and seismic activities and examines how sound, light, and electro-magnetic spectra affect the body and perception. The exhibition recognizes the Pacific as a zone of entanglement where these energetic forces resonate amidst the world’s most seismically active continental plates.</p>
					<p>The exhibition is spread out across 3 locations. For the specific location of the work, please see the details on the work entry.</p>
				</div>

			</div>
		</div>
	</div>
	<section id="gallery" class="">
		<?php
		$args = array(
			'numberposts' => -1,
			'post_type' => 'location',
			'status' => 'publish'
		);
		$posts = get_posts($args);
		if ($posts) :
			foreach ($posts as $p) :
				$location = new Location($p);
		?>
				<div class="container mt-4">
					<header>
						<h2 class="h2 fz-md ff-display">
							<?= $location->get_name(); ?>
						</h2>
					</header>
					<div class="flex-row __3x flex-wrap gap">
						<?php
						$artworks = get_field('art_works', $location->ID);
						if ($artworks) :
							foreach ($artworks as $artwork) :
								$art = new Artwork($artwork);
						?>
						
								<a href="<?= $art->get_permalink() ?>" class="art-work__card ">
									<figure class="has-matte">
										<div class="art-work__main-img-wrapper">
											<?=  $art->get_main_image('medium', array('class'=>'img-fluid')); ?>
										</div>
										<figcaption class="art-work__title">
											<?= $art->get_title(); ?>
										</figcaption>
									</figure>
								</a>
						<?php
							endforeach;
						endif;
						?>
					</div>
				</div>
		<?php endforeach;
		endif;  ?>
	</section>

</main><!-- #main -->

<?php
get_footer();
