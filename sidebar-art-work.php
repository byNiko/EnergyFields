<?php
$art = $args;
$locations = $art->get_locations();
// we're only taking the first location
$location = new Location($locations[0]);
?>
<aside class="sidebar sidebar__art-work">
	<?php if ($art->has_events) : ?>
		<div class="sidebar__section ">
			<div class="sidebar__title">
				Event Times
			</div>
			<div class="sidebar__content">
				<?php
				$times = $art->get_event_times();

				foreach ($times as $time) :
					$start = $time['start'];
					$is_past = strtotime($start) < strtotime(date('Y-m-d H:i:s')) ? 'is-past' : '';
					echo "<div class='event__time $is_past'>$start</div>";
				endforeach;
				?>
			</div>
		</div>
	<?php endif; ?>
	<?php if ($location) : ?>
		<div class="sidebar__section ">
			<div class="sidebar__title">
				Location
			</div>
			<div class="sidebar__content">
				<?= $location->get_name(); ?>
			</div>
		</div>
	<?php endif; ?>
	<?php if ((!$art->has_events) && $hours = $location->get_hours()) : ?>
		<div class="sidebar__section ">
			<div class="sidebar__title">
				Hours
			</div>
			<div class="sidebar__content">
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
	<?php if ($address = $location->get_address()) :?>
		<div class="sidebar__section ">
			<div class="sidebar__title">
				Address
			</div>
			<div class="sidebar__content">
			<?= $location->get_address_block_with_link(); ?>
			</div>
		</div>
	<?php endif; ?>
	<?php if ($admission = get_field('admission')) : ?>
			<div class="sidebar__section">

				<div class="sidebar__title">
					Admission
				</div>
				<div class="sidebar__content">
					<div class="admission_text"><?= $admission; ?></div>
				</div>
			</div>
		<?php endif; ?>
	<?php if ($linkArr = get_field('admission_link')) : ?>
			<div class="sidebar__section">
				<div class="sidebar__content">
					<?php
						echo (new Byniko())->get_acf_link($linkArr, 'button button--accent fz-sm admission-button');
					?>
				</div>
			</div>
		<?php endif; ?>


</aside>