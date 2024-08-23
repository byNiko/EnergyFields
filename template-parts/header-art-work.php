<?php
$art = new Artwork($post);
?>
<div class="container">
	<div class="breadcrumbs">
		<?php
		$root_link ='/exhibition';
		$root_text = "Exhibitions";
		if($art->is_event){
			$root_link = "/events";
			$root_text = "Events";
		}
		?>
		<div class="breadcrumb"><a href="<?= $root_link;?> "><?= $root_text;?> </a></div>
		<div class="breadcrumb"><?= $art->get_title();?></div>
	</div>
<!-- <button class='button button--accent button--back'><?php get_template_part('/template-parts/arrow');?> Back</button> -->
	<header class="art-work__main-img-wrapper">
	
		<figure class='has-matte'>
			<?= $art->get_main_image('byniko-xl', ["class" => "img-fluid"]); ?>
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