<?php
get_header();

// get all locations
$default_args = array(
	'numberposts' => -1,
	'post_type' => 'location',
	'post_status' => 'publish'
);

$allLocations = get_posts($default_args);
?>
<div class="container">
	<header class="entry-header ">
		<?php the_title('<h1 class="h1 entry-title">', '</h1>'); ?>
	</header><!-- .entry-header -->


	<div class="flex-row gap">

		<?php
		get_sidebar('inpage-links', $allLocations);
		?>

		<main id="primary" class="site-main">
			<?php if (have_posts()) : ?>
				<section>
					<?php
					while (have_posts()) : the_post();
						the_content();
					endwhile; // End of the loop.
					?>
				</section>
			<?php endif; ?>
			<?php
			if ($allLocations) :
				foreach ($allLocations as $l) :
					$location = new Location($l); ?>
					<section>
						<?php

						echo $location->get_featured_image('full', array('class' => "img-fluid")); ?>
						<h2 id="<?= sanitize_title($location->get_name());?>" class="h2">
							<?= $location->get_name(); ?>
						</h2>
						<div class="content">
							<div class="columns">
								<?= $location->get_description(); ?>
							</div>
						</div>
						<div class="content">
							<h6 class="h6">Directions</h6>
							<div class="columns">
								<?= $location->get_directions(); ?>
							</div>
						</div>
						<div class="content">
							<h6 class="h6">Parking</h6>
							<div class="columns">
								<?= $location->get_parking(); ?>
							</div>
						</div>
						<?php if ($hours = $location->get_hours()) : ?>
							<div class="content">
								<h6 class="h6">Hours</h6>
								<div class="">
									<?
									foreach ($hours as $hour) :
									?>
										<div class="location__hours">
											<span class="day"><?= $hour['days']; ?> </span>
											<span class="times">
												<span class="time open"><?= $hour['open']; ?> </span>
												-
												<span class="time close"><?= $hour['close']; ?> </span>
											</span>
										</div>
									<?php
									endforeach;
									?>
								</div>
							</div>
						<?php endif; ?>
						<?php if ($address = $location->get_address()) : 	?>
							<div class=" ">
								<h6 class="h6">
									Address
								</h6>
								<div class="">
									<?php if ($address['name']) : ?>
										<div class="address">
											<?= $address['name']; ?>
										</div>
									<?php endif; ?>
									<div class="address">
										<?= $address['street_number']; ?> <?= $address['street_name']; ?>
									</div>
									<div class="address">
										<?= $address['city']; ?> <?= $address['state']; ?>, <?= $address['zip_code']; ?>
									</div>
								</div>
							</div>
						<?php endif; ?>
					</section>
			<?php endforeach;
			endif; ?>
		</main><!-- #main -->
	</div>
</div>
<?php


get_footer();
