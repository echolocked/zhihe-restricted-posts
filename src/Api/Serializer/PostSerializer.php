<?php

namespace Zhihe\RestrictedPosts\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Post\Post;

class PostSerializer
{
    public function __invoke($serializer, $model, $attributes): array
    {
        if ($model instanceof Post) {
            $attributes['isRestricted'] = (bool) $model->is_restricted;
        }

        return $attributes;
    }
}