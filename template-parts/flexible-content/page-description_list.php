<?php 
if (get_row_layout() == 'description_list') : ?>
	<h3 class="h3 content-title"><?= get_sub_field('section_header'); ?></h3>
	<?php
	if (have_rows('list_items')) : ?>
		<dl class="team-members">
			<?php
			while (have_rows('list_items')) : the_row();
			?>
				<div class="team-member">
					<dt class="team-member__name"><?php the_sub_field('title'); ?> </dt>
					<dd class="team-member__title"><?php the_sub_field('description'); ?> </dd>
				</div>
			<?php

			endwhile; ?>
		</dl>
<?php
	endif;
endif;