<?php
$art = new Artwork($post);
?>

<article>
	<div class="container">
		<div class="flex-row gap-2">
			<div class="main">
				<div class="content ">
					<?= $art->get_description(); ?>
				</div>
				<?php
				$artists = $art->get_artists();
				if ($artists) :
					foreach ($artists as $as) :
						$a = new Artist($as);
				?>
						<div class="content">
							<header>
								<h2 class="h2 normal-font">
									<?= $a->get_post('post_title'); ?>
									<?php echo get_arrow("sm"); ?>
								</h2>
							</header>
							<?= $a->get_post('post_content'); ?>
						</div>
				<?php
					endforeach;
				endif;
				?>
			</div>
			<?= get_sidebar('art-work', $art); ?>
		</div>
	</div>

</article>
<?php
if ($works = get_field('related_art_work')) :
?>
	<section id="related-work" class="mt-4">
		<div class="container">
			<header>
				<h2 class="h2">More Works</h2>
				<?php echo get_arrow('sm'); ?>
			</header>
			<div class="flex-row __3x flex-wrap gap mt-1">
				<?php
				foreach ($works as $work) :
					$art = new Artwork($work);
					echo $art->get_card('box-shadow');
				endforeach;
				?>
			</div>
		</div>
	</section>
<?php
endif;
