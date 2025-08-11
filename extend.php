<?php

use Flarum\Extend;
use Zhihe\RestrictedPosts\Api\Controller\MarkRestrictedController;
use Zhihe\RestrictedPosts\Api\Controller\UnmarkRestrictedController;
use Zhihe\RestrictedPosts\Api\Serializer\PostSerializer;
use Zhihe\RestrictedPosts\Listener\ProcessRestrictedPostData;

return [

    (new Extend\Routes('api'))
        ->post('/posts/{id}/mark-restricted', 'posts.mark-restricted', MarkRestrictedController::class)
        ->delete('/posts/{id}/unmark-restricted', 'posts.unmark-restricted', UnmarkRestrictedController::class),

    (new Extend\ApiSerializer(\Flarum\Api\Serializer\PostSerializer::class))
        ->attributes(PostSerializer::class),

    (new Extend\Event())
        ->listen(\Flarum\Discussion\Event\Saving::class, [ProcessRestrictedPostData::class, 'handleDiscussion'])
        ->listen(\Flarum\Post\Event\Saving::class, [ProcessRestrictedPostData::class, 'handlePost']),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Locales(__DIR__.'/locale')),
];