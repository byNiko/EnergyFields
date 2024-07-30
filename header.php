<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div class="bg"></div>

	<?php wp_body_open(); ?>
	<div id="map" class="map"></div>
	<div id="page" class="site">
		<div class="container--fluid">
			<header id="masthead" class="site-header">
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

				<nav id="site-navigation" class="main-navigation">
					<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e('Primary Menu', 'byniko'); ?></button>
					<?php
					wp_nav_menu(
						array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
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
						)
					);
					?>
				</nav>
			</header><!-- #masthead -->
		</div>
		<div class="transition-container">
			
			<?php if (!is_front_page()) : ?>
				<div class="container">
					<div class="inner-page">

					<?php endif; ?>