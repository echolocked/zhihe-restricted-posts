<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('posts', 'is_restricted')) {
            $schema->table('posts', function (Blueprint $table) {
                $table->boolean('is_restricted')->default(false);
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->table('posts', function (Blueprint $table) {
            $table->dropColumn('is_restricted');
        });
    }
];