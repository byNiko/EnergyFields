<?php

/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package byniko
 */

?>
<? //= get_the_post_thumbnail($post, 'full', array('class' => 'img-fluid')); 
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="entry-content">
		<?= get_the_post_thumbnail($post, 'full', array('class' => 'img-fluid')); ?>
		<?php
		if (have_rows('page_content')) :
			while (have_rows('page_content')) : the_row();
				$section_title  = get_sub_field('section_title');
				$section_link_text  = get_sub_field('section_link_text');
				$section_link = sanitize_title($section_link_text);

				if (have_rows('section_content')) : ?>
					<section id="<?= $section_link; ?>" class="scroll-target">
						<header>
							<h2 class="h2 section-title"><?= $section_title; ?></h2>
						</header>
					<?php
					while (have_rows('section_content')) : the_row();

						get_template_part('/template-parts/flexible-content/page', get_row_layout());

					endwhile;
				endif;
					?>
					</section>
			<?php
			endwhile;
		endif;

			?>
	</div><!-- .entry-content -->

	<?php if (get_edit_post_link()) : ?>
		<footer class="entry-footer">
			<?php
			edit_post_link(
				sprintf(
					wp_kses(
						/* translators: %s: Name of current post. Only visible to screen readers */
						__('Edit <span class="screen-reader-text">%s</span>', 'byniko'),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					wp_kses_post(get_the_title())
				),
				'<span class="edit-link">',
				'</span>'
			);
			?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
</article><!-- #post-<?php the_ID(); ?> -->