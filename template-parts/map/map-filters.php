<?php
$earthquake_icon = '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
<path d="M38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2C29.9411 2 38 10.0589 38 20Z" />
</svg>';

$tsunami_icon = '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
<path d="M33.2659 3.64715C34.6264 2.28173 37 3.22076 37 5.12436V34.88C37 36.0509 36.0265 37.0001 34.8256 37.0001H5.17875C3.25672 37.0001 2.27984 34.747 3.61909 33.4028L33.2659 3.64715Z" />
</svg>';

$volcano_icon = '<svg viewBox="0 0 40 40"  xmlns="http://www.w3.org/2000/svg">
<path d="M18.2515 4.14694C19.0135 2.77532 20.9862 2.77532 21.7482 4.14694L38.3491 34.0287C39.0897 35.3617 38.1258 37 36.6008 37H3.39887C1.8739 37 0.909968 35.3617 1.65056 34.0287L18.2515 4.14694Z" />
</svg>';

$weapon_icon = '<svg viewBox="0 0 40 40"  xmlns="http://www.w3.org/2000/svg">
<path d="M21.7483 36.853C20.9863 38.2247 19.0137 38.2247 18.2517 36.853L1.65071 6.97129C0.910126 5.63823 1.87406 4 3.39903 4L36.601 4C38.1259 4 39.0899 5.63822 38.3493 6.97129L21.7483 36.853Z" />
</svg>';
?>


<form  id="filters">
<div class="map-filter__items d-flex">
<div class="filterButton all">
			<input type="radio" id="filter-all" name="filter" value="all" checked>
			<label class="map-filter__item" for="filter-all"> <span class="filter-label">All</span></label>
		</div>
		<div class="filterButton earthquakes">
			<input type="radio" id="filter-earthquakes" name="filter" value="earthquakes">
			<label class="map-filter__item" for="filter-earthquakes"><span class="filter-icon"><?= $earthquake_icon ;?></span> <span class="filter-label">Earthquakes</span></label>
		</div>
		<div class="filterButton weapons">
			<input type="radio" id="filter-weapons" name="filter" value="weapons">
			<label class="map-filter__item" for="filter-weapons"><span class="filter-icon"><?= $weapon_icon ;?></span> <span class="filter-label">Weapons</span></label>
		</div>
		<div class="filterButton tsunamis">
			<input type="radio" id="filter-tsunamis" name="filter" value="tsunamis">
			<label class="map-filter__item" for="filter-tsunamis"><span class="filter-icon"><?= $tsunami_icon ;?></span> <span class="filter-label">Tsunamis</span></label>
		</div>
		<div class="filterButton volcanoes">
			<input type="radio" id="filter-volcanoes" name="filter" value="volcanoes">
			<label class="map-filter__item" for="filter-volcanoes"><span class="filter-icon"><?= $volcano_icon ;?></span> <span class="filter-label">Volcanoes</span></label>
		</div>
	</div>
</form>