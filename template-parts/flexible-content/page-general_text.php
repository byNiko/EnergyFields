<?php
if (get_row_layout() == 'general_text') :
?>
	<div class="content columns">
		<?php the_sub_field('text'); ?>
	</div>
<?php
endif;
