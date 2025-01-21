<!-- example component named 'text block;' created with flexible content -->
<!-- shows how to bind fields named 'text_block_heading' and 'text_block_content' in a component template -->
<section class="text-block">
    <div class="container">
        <div class="container-inner">
            <h2><?php echo get_sub_field('text_block_heading'); ?></h2>
            <div class="wysiwyg"><?php echo get_sub_field('text_block_content'); ?></div>
        </div>
    </div>
</section>
