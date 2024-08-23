<?php
get_header();

// get all locations
$default_args = array(
	'numberposts' => -1,
	'post_type' => 'location',
	'post_status' => 'publish',
	'meta_query' => array(
		array(
			'key' => 'hide_from_visit_page',
			'value' => '1'
		),
	),
);

$allLocations = get_posts($default_args);
?>
<div class="container">
	<header class="entry-header ">
		<div class="flex-column--sm justify--space-between">
			<?php
			$arrow = get_arrow();
			the_title('<h1 class="h1 entry-title -arrow">', "$arrow</h1>");
			?>
			<div class="callout">
				For event locations, <br>see address and hours on event page.
			</div>
		</div>
	</header><!-- .entry-header -->


	<div class="flex-row gap">

		<?php get_sidebar('inpage-links', $allLocations); ?>

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
			$classCount = 0;
			if ($allLocations) :
				foreach ($allLocations as $l) :
					$section_class = $classCount > 0 ? "mt-section" : 'mt-1';
					$classCount++;
					$location = new Location($l); ?>
					<section class="<?= $section_class; ?> ">
						<?php
						echo $location->get_featured_image('full', array('class' => "img-fluid"));
						?>
						<div id="<?= sanitize_title($location->get_short_name()); ?>" class="scroll-target">
							<h2 class="h2 section-title">
								<?= $location->get_name(); ?>
							</h2>
							<?php if ($hours = $location->get_hours()) : ?>
								<div class="content">
									<div class="h3 vert-heading-spacer--top">Hours</div>
									<!-- <div class=""> -->
									<?php foreach ($hours as $hour) : ?>
										<div class="location__hours">
											<span class="day"><?= $hour['days']; ?> </span>
											<span class="times">
												<span class="time open"><?= $hour['open']; ?> </span>
												-
												<span class="time close"><?= $hour['close']; ?> </span>
											</span>
										</div>
									<?php endforeach; ?>
									<!-- </div> -->
								</div>
							<?php endif; ?>
							<?php if ($address = $location->get_address()) : ?>
								<div class="content ">
									<div class="h3 vert-heading-spacer--top">
										Address
									</div>
									<!-- <div class=""> -->
									<div class="address-wrapper">
										<?= $location->get_address_block_with_link(); ?>
									</div>
									<!-- </div> -->
								</div>
							<?php endif; ?>
							<?php
							if (have_rows('content_repeater', $location->ID)) : while (have_rows('content_repeater', $location->ID)) : the_row();
							?>
									<div class="content">
										<div class="h3 vert-heading-spacer--top"><?php the_sub_field('section_title'); ?></div>
										<div class="columns">
											<?= get_sub_field('section_content'); ?>
										</div>
									</div>
							<?php
								endwhile;
							endif;
							?>

						</div>
					</section>
			<?php endforeach;
			endif; ?>
		</main><!-- #main -->
	</div>
</div>
<?php


get_footer();
