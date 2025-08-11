<?php

namespace Zhihe\RestrictedPosts\Listener;

use Flarum\Discussion\Event\Saving as DiscussionSaving;
use Flarum\Post\Event\Saving as PostSaving;
use Illuminate\Support\Arr;

class ProcessRestrictedPostData
{
    public function handleDiscussion(DiscussionSaving $event)
    {
        $discussion = $event->discussion;
        $data = $event->data;
        $actor = $event->actor;

        // Handle isRestricted field for new discussions (first post)
        if (isset($data['attributes']['isRestricted']) && !$discussion->exists) {
            $discussion->afterSave(function ($discussion) use ($data, $actor) {
                // Set first post as restricted if requested
                $firstPost = $discussion->posts()->first();
                if ($firstPost && $firstPost->user_id === $actor->id) {
                    $isRestricted = (bool) Arr::get($data['attributes'], 'isRestricted', false);
                    $firstPost->is_restricted = $isRestricted;
                    $firstPost->save();
                }
            });
        }
    }

    public function handlePost(PostSaving $event)
    {
        $post = $event->post;
        $data = $event->data;
        $actor = $event->actor;

        // Handle isRestricted field for new posts
        if (isset($data['attributes']['isRestricted']) && !$post->exists) {
            // Only allow post author to set restriction
            if ($post->user_id === $actor->id) {
                $isRestricted = (bool) Arr::get($data['attributes'], 'isRestricted', false);
                $post->is_restricted = $isRestricted;
            }
        }
    }
}