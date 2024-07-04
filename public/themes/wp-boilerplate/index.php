<?php
	get_header();
?>
<?php
if (have_rows('flexible_content')):
	while (have_rows('flexible_content')) : the_row();
		include 'components/_'.get_row_layout().'.php';
	endwhile;
endif;
?>
<?php
	get_footer();
?>