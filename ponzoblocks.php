<?php

/**
 * version: 2.0.2
 */


class Ponzoblocks
{
    // create variable for __DIR__
    public $dir = false;
    public $version = '';
    public $icon_path = 'resources/svg';
    public $theme_dir = '';
    public $theme_uri = '';
    public $icon_uri = '';
    public $icon_dir = '';

    public function __construct()
    {
        $this->dir = __DIR__;
        $this->version = '1.0.6';
        $this->theme_dir = get_template_directory();
        $this->theme_uri = get_template_directory_uri();
        $this->icon_uri = $this->theme_uri . '/' . $this->icon_path;
        $this->icon_dir = $this->theme_dir . '/' . $this->icon_path;

        add_action('init', [$this, 'register']);
        add_action('rest_api_init', [$this, 'rest_api_init']);
        add_filter('block_categories_all', [$this, 'categories'], 10, 2);
        add_filter('posts_where', [$this, 'search_keyword'], 10, 2);
        add_action('admin_footer', [$this, 'inline_scripts_admin']);
        add_action('wp_head', [$this, 'inline_scripts_header']);
    }
    // register ponzoblocks
    public function register()
    {
        $blocks = [
            "advanced-button",
            "section",
            "counter",
            "icon",
            "heading",
            "grid",
            "visual",
            "group",
            "main"
        ];
        foreach ((array) $blocks as $key => $block) {
            register_block_type($this->theme_dir . '/build/blocks/' . $block);
        }
    }

    // assets are loaded from manifest

    public function categories($categories, $post)
    {
        $custom_block = array(
            'slug'  => 'ponzoblocks',
            'title' => __('ponzoblocks', 'ponzoblocks'),
        );
        // order
        $categories_sorted = array();
        $categories_sorted[0] = $custom_block;
        foreach ($categories as $category) {
            $categories_sorted[] = $category;
        }
        return $categories_sorted;
    }

    // hook icon folder
    public function rest_api_init()
    {
        register_rest_route('ponzoblocks/v1', '/get-icons', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_icons'],
            'permission_callback' => [$this, 'my_permission_callback'],
        ));
        // regster rest route for icon filename like icon.svg
        register_rest_route('ponzoblocks/v1', '/pick-icon/(?P<icon>\S+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'pick_icon'],
            'permission_callback' => [$this, 'my_permission_callback'],
        ));
        register_rest_route('ponzoblocks/v1', '/get-links/(?P<keyword>\S+)', array(
            'methods' => 'GET',
            'callback' => [$this, 'pick_link'],
            'permission_callback' => [$this, 'my_permission_callback'],
        ));

        register_rest_route('ponzoblocks/v1', '/save-styles', array(
            'methods' => 'POST',
            'callback' => [$this, 'save_styles'],
            'permission_callback' => [$this, 'my_permission_callback'],
        ));
    }

    public function my_permission_callback()
    {
        if (current_user_can('manage_options')) {
            return true;
        } else {
            return new WP_Error('rest_forbidden', esc_html__('baander' . is_admin() . 'You are not authorized to perform this action.', 'my-text-domain'), array('status' => 403));
        }
    }

    // get icons
    public function get_icons()
    {
        $icons = scandir($this->icon_dir);

        $safe_icons = [];

        if (is_array($icons)) {
            // check if $icons have a safe svg extension and push to $safe_icon
            foreach ($icons as $key => $icon) {
                if (strpos($icon, '.svg') !== false) {
                    // strip extension
                    $icon = str_replace('.svg', '', $icon);
                    // push only filename without /svg
                    $safe_icons[] = $icon;
                }
            }
        }


        return [
            'icon_url' => $this->icon_uri,
            'icons' => $safe_icons
        ];
    }


    // create function for rest route pick_icon
    public function pick_icon($request)
    {
        // add extension here
        $icon = $request['icon'] . '.svg';
        //
        if (!file_exists($this->icon_dir . '/' . $icon)) {
            return new WP_Error('icon_not_found', 'Icon not found', array('status' => 404));
        } else {
            $content = file_get_contents($this->icon_dir . '/' . $icon);
            // remove fills and class
            $icon_inline_format1 = str_replace('fill', 'data-fill', $content);
            $icon_inline_format2 = str_replace('class', 'data-class', $icon_inline_format1);
            $icon_inline = str_replace('<svg', '<svg fill="currentColor" stroke="currentColor"', $icon_inline_format2);

            return $icon_inline;
        }
    }

    // create function for rest route pick_link
    public function pick_link($request)
    {
        $search = $request['keyword'];

        $query = new WP_Query(array(
            'post_type' => ['post', 'page', 'blog', 'diensten'],
            'posts_per_page' => 30,
            'starts_with' => $search,
            'orderby' => 'title',
            'order' => 'ASC',
        ));

        $links = [];
        while ($query->have_posts()) {
            $query->the_post();
            $links[] = [
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'url' => get_the_permalink(),
            ];
        }
        wp_reset_postdata();

        return $links;
    }

    // search posts by title keyword
    public function search_keyword($where, $query)
    {
        global $wpdb;
        $starts_with = esc_sql($query->get('starts_with'));
        if ($starts_with) {
            $where .= " AND $wpdb->posts.post_title LIKE '$starts_with%'";
        }
        return $where;
    }

    // pass theme uri to ponzo-editor.js
    public function inline_scripts_admin()
    {
        echo '<script type="text/javascript">';
        echo 'window.block_theme = "' . $this->theme_uri . '"';
        echo '</script>';
    }


    public function inline_scripts_header()
    {

        $posts = [get_the_ID()];
        $css = null;
        

        // loop also reusable blocks
        if (count($posts) > 0) {
            $post_content = get_post_field('post_content', $posts[0]);
            $blocks = parse_blocks($post_content);
            foreach ($blocks as $block) {
                if (isset($block['attrs']['ref'])) {
                    $ref = $block['attrs']['ref'];
                    $reusable_block = get_post($ref);
 
                    $block_name = $reusable_block;
                    $posts[] = $block_name->ID;
                }
            }
        }

        foreach ($posts as $post) {           
            $css .= get_post_meta($post, 'tailwindcss', true);
        }
        // echo $css within <style>
        echo '<style>' . $css . '</style>';
    }

    // function to minify CSS file
    public static function minifyCSS($input)
    {
        // remove comments
        $output = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $input);
        // remove whitespace
        $output = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $output);
        return $output;
    }


    // save meta field
    public static  function save_styles($request)
    {
        $input = $request['css'];
        $post_id = $request['post_id'];
        $site_editor = $request['site_editor'];

        // minify css
        $css = self::minifyCSS($input);
        // save meta field 'tailwind' with content without stripping backslash
        update_post_meta($post_id, 'tailwindcss', addslashes($css));
    }
}


$blocks = new Ponzoblocks();
