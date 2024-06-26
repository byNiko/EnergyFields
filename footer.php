<?php if(!is_front_page()) : ?>
</div><!-- inner-page -->
</div>
<?php endif; ?>

<footer id="colophon" class="site-footer">
	<div class="container">
	<div class="site-info d-flex">
		<?php if(!is_front_page()): ?>
		<button class="button button-accent ml-a">Back to top</button>
		<?php endif; ?>
	</div><!-- .site-info -->
	</div>
</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>

</html>