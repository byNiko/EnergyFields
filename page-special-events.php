<?php
get_header();

$allEvents = byniko_get_events();

?>
<div class="container">
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
			if ($allEvents) : ?>
				<section class="event__cards" id="event-cards">
					<?php
					foreach ($allEvents as $evt) :
						$event = new Event($evt);
						$artwork = $event->get_artwork();
					?>
						<div id="<?= sanitize_title($event->get_title()); ?>" class="event-card has-matte">
							<div class="event-card__inner">
								<div class="event-card__daytime-wrap has-matte">
									<div class="event-card__day-of-week">
										Wednesday
									</div>
									<div class="event-card__date">
										<span class="event-card__month month">Jun</span>
										<span class="event-card__date date">1, 2024</span>
									</div>
									<div class="event-card__time">
										<div class="event-card__time-start">1pm</div>
										<div class="event-card__time-end">&nbsp;- 2pm</div>
									</div>

								</div>
								<div class="event-card__info-wrapper">
									<header>
										<div class="event-card__event-category">Category</div>
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
									<div class="event-card__location">
										Guttenberg Place
									</div>
								</div>
								<div class="event-card__image__wrapper">
									<?php
									echo $artwork->get_main_image('medium', array('class' => "img-fluid")); ?>
								</div>
							</div>
						</div>
					<?php endforeach; ?>
				</section>
			<?php
			endif; ?>
		</main><!-- #main -->
	</div>
</div>
<?php


get_footer();
