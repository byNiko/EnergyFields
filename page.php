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
<div class="container">
	<header class="entry-header ">
	<?php 
		$arrow = get_arrow();
		the_title('<h1 class="h1 entry-title -arrow">', "$arrow</h1>"); 
		?>
	</header><!-- .entry-header -->
	

	<div class="flex-row gap">
		<?php
		get_sidebar('inpage-links');
		// get_template_part('/template-parts/section-links');
		?>

		<main id="primary" class="site-main">
			<?php
			while (have_posts()) :
				the_post();

				get_template_part('template-parts/content', $post->post_type);

			endwhile; // End of the loop.
			?>

		</main><!-- #main -->
	</div>
</div>
<?php

get_footer();
