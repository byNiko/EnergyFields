<?php
$art = new Artwork($post);
?>
<div class="container">
	<header class="art-work__main-img-wrapper">
		<figure class='has-matte'>
			<?= $art->get_main_image(null, ["class" => "img-fluid"]); ?>
			<figcaption>
				<?= $art->get_image_caption(); ?>
			</figcaption>
		</figure>
		<h1 class="h1">
					<?php the_title(); 	?>
				</h1>
				<?php echo get_arrow("md");?>
	</header>
</div>