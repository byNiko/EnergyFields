<?php
$art = new Artwork($post);
?>

<article>
	<div class="container">
		<div class="flex-row gap-2">
			<div class="main">
				<div class="content columns ">
					<?= $art->get_description(); ?>
				</div>
			</div>
			<?= get_sidebar('art-work', $art); ?>
		</div>
	</div>
	<?php
	$artists = $art->get_artists();
	if ($artists) :
		foreach ($artists as $as) :
			$a = new Artist($as);
	?>
			<div class="container">
				<div class="flex-row gap-2">
					<div class="main">
						<header>
							<h2 class="h2 normal-font">
								<?= $a->get_post('post_title'); ?>
							</h2>
						</header>
						<div class="content columns">
							<?= $a->get_post('post_content'); ?>
						</div>
					</div>
					<?= get_sidebar('artist', $a); ?>
				</div>
			</div>
	<?php
		endforeach;
	endif;
	?>
</article>