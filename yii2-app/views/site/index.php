<?php

/** @var yii\web\View $this */

$this->title = '26i Consulting';
?>
<div class="site-index">
    <div class="jumbotron text-center bg-transparent mt-5 mb-5">
        <h1 class="display-4">26i Consulting</h1>
        <p class="lead">Project management, client portal, and consultation workflows powered by Yii 2.0.</p>
        <p>
            <a class="btn btn-lg btn-success me-2" href="/auth/register">Register as client</a>
            <a class="btn btn-lg btn-primary" href="/auth/login">Login</a>
        </p>
    </div>

    <div class="body-content">
        <div class="row">
            <div class="col-lg-4 mb-3">
                <h2>Project tracking</h2>
                <p>Manage consulting projects from initial design through supervision and completion with clear client status visibility.</p>
            </div>
            <div class="col-lg-4 mb-3">
                <h2>Client portal</h2>
                <p>Allow clients to log in and see their assigned projects, progress, and project status without extra admin support.</p>
            </div>
            <div class="col-lg-4">
                <h2>Admin dashboard</h2>
                <p>Keep client accounts, project progress, and project updates centralized in one admin CRM-like workspace.</p>
            </div>
        </div>
    </div>
</div>
