<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('create-constant', function ($user) {
            return $user->confirmed;
        });
        Gate::define('delete-constant', function ($user, $constant) {
            return $user->email === $constant->authorEmail;
        });
        Gate::define('confirm-users', function ($user) {
            return $user->isAdmin;
        });
    }
}
