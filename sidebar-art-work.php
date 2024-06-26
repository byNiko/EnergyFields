<?php
$art = $args;
$locations = $art->get_locations();
// we're only taking the first location
$location = new Location($locations[0]);
?>
<aside class="sidebar sidebar__art-work">
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
	<?php if ($hours = $location->get_hours()) : ?>
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
	<?php 
	if ($address = $location->get_address()) : 	
		
		$str = 
		urlencode($address['street_number']) . "+" 
		. urlencode($address['street_name']). "%2C+"
		. urlencode($address['city']) . "%2C+" 
		. urlencode($address['state']) . "+" 
		. urlencode($address['zip_code']);
		$map_url = "//maps.google.com/?q=$str";
		$map_url = "https://www.google.com/maps/dir/?api=1&destination=$str";
		// $map_url = "https://www.google.com/maps/search/?api=1&$str";
	?>
		<div class="sidebar__section ">
			<div class="sidebar__title">
				Address
			</div>
			<a href="<?= $map_url;?> " class="sidebar__content">
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
				</a>
		</div>
	<?php endif; ?>

</aside>