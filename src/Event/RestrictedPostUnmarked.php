<?php

namespace Zhihe\RestrictedPosts\Event;

use Flarum\Post\Post;

class RestrictedPostUnmarked
{
    public $post;
    
    public function __construct(Post $post)
    {
        $this->post = $post;
    }
}