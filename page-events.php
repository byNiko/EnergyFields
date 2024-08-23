<?php
get_header();
$future_events = (new Byniko())->get_all_future_events();
?>

	<header class="entry-header ">
		<?php //the_title('<h1 class="h1 entry-title has-arrow">', '</h1>'); 
		?>
	</header><!-- .entry-header -->


	<div class="flex-row gap">
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
			if ($future_events) : ?>
				<section class="event__cards" id="event-cards">
					<?php
					foreach ($future_events as $evt) :
						$artwork = new Artwork(get_post($evt['ID']));

						$start = new DateTime($evt['start']);
						$end = new DateTime($evt['end']);
					?>
						<a class="block-content-link" href="<?= $artwork->get_permalink(); ?>">
							<div id="<?= sanitize_title($artwork->get_title()); ?>" class="event-card has-matte">
								<div class="event-card__inner">
									<div class="event-card__daytime-wrap has-matte">
										<div class="event-card__day-of-week">
											<?php echo date_format($start, "l"); ?>
										</div>
										<div class="event-card__date">
											<span class="event-card__month month"><?php echo date_format($start, "M"); ?></span>
											<span class="event-card__date date"><?php echo date_format($start, "j"); ?>, <?php echo date_format($start, "Y"); ?></span>
										</div>
										<div class="event-card__time">
											<div class="event-card__time-start"><?php echo date_format($start, "gA"); ?></div>
											<?php if ($end) : ?>
												<div class="event-card__time-end">&nbsp;- <?php echo date_format($end, "gA"); ?></div>
											<?php endif; ?>
										</div>

									</div>
									<div class="event-card__info-wrapper">
										<header class="event-card__header">
											<div class="event-card__event-category"><?= $artwork->get_categories(); ?></div>
											<h2 class="event-card__event-name">
												<?= $artwork->get_title(); ?>
											</h2>
											<?php
											$artists = $artwork->get_artists();
											if ($artists) : ?>
												<div class="artist__names">
													<?php
													foreach ($artists as $artist) :
														$artist = new Artist(($artist));
														echo "<div class='artist__name'>" . $artist->get_name() . " </div>";
													endforeach;
													?>
												</div>
											<?php endif; ?>
										</header>
										<?php
										if ($loc = $artwork->get_locations()) :
											$loc = new Location($loc[0]);
										?>
											<div class="event-card__location">
												<?php echo $loc->get_name(); ?>
											</div>
										<?php endif; ?>
									</div>
									<div class="event-card__image__wrapper">
										<div class="inner-img-wrap" style="background-image: url(<?= $artwork->get_main_img_url('byniko-big-thumb') ;?>)">
										<?php
										// echo $artwork->get_main_image('medium', array('class' => "img-fluid")); ?>
										</div>
									</div>

								</div>
							</div>
						</a>
					<?php endforeach; ?>
				</section>
			<?php
			endif; ?>
		</main><!-- #main -->
	</div>

<?php


get_footer();
