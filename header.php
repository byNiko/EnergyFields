<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1,  minimum-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div class="bg"></div>

	<?php wp_body_open(); ?>
	<?php if (is_front_page()) : ?>
		<div id="map" class="map"></div>
	<?php endif; ?>
	<div id="page" class="site">
		<div class="header-container">
			<header id="site-navigation" class="site-header">
				<div class="site-branding">
					<?php

					if (has_custom_logo()) :
						the_custom_logo();
					else :
					?>
						<h1 class="site-title"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
					<?php
					endif;
					$byniko_description = get_bloginfo('description', 'display');
					if ($byniko_description || is_customize_preview()) :
					?>
						<p class="site-description">
							<?php echo $byniko_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped 
							?>
						</p>
					<?php endif; ?>
				</div><!-- .site-branding -->
				<div class="site-navigation-wrapper">
					<!-- <div class="inner-site-navigation-wrapper"> -->
						<nav id="main-navigation" class="main-navigation">
							<?php
							wp_nav_menu(
								array(
									'theme_location' => 'menu-1',
									'menu_id'        => 'primary-menu',
									"link_before" => "<span class='nav-link__text'>",
									"link_after" => "</span>"
								)
							);
							?>
						</nav><!-- #site-navigation -->
						<nav id="site-secondary" class="secondary-navigation">
							<?php
							wp_nav_menu(
								array(
									'theme_location' => 'menu-2',
									'menu_id'        => 'secondary-menu',
									"link_before" => "<span class='nav-link__text'>",
									"link_after" => "</span>"
								)
							);
							?>
						</nav>
					<!-- </div> -->
				</div>
				<button class="mobile-nav-toggle hamburger hamburger--slider" type="button" aria-label="Menu" aria-expanded="false" aria-controls="site-navigation">
					<span class="hamburger-box">
						<span class="hamburger-inner"></span>
					</span>
					<span class="visually-hidden">Menu</span>
				</button>
			</header><!-- #masthead -->
		</div>
		<div class="transition-container">

			<?php if (!is_front_page()) : ?>
				<div class="container">
					<div class="inner-page">

					<?php endif; ?>