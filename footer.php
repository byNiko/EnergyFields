</div> <!-- swup - page transition -->
<?php if (!is_front_page()) : ?>
	<div id="back-to-top-container" class="container button--back-to-top no-padding" style="display:none;">
		<div class=" d-flex mt-1">
			<a href="#page" class="button button--accent ml-a">Back to top <?php get_template_part('/template-parts/arrow');?></a>
	</div>
	</div>
<?php endif; ?>
<footer id="colophon" class="site-footer">
	<div class="container">
		<div class="site-info d-flex">

		</div><!-- .site-info -->
	</div>
</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>