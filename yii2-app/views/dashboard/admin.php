<?php

use yii\bootstrap5\Html;

$this->title = 'Admin Dashboard';
?>
<div class="mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1><?= Html::encode($this->title) ?></h1>
        <?= Html::a('Create project', ['project/create'], ['class' => 'btn btn-primary']) ?>
    </div>

    <div class="row g-4 mb-4">
        <div class="col-md-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">Client accounts</h5>
                    <p class="card-text"><?= count($clients) ?> registered clients</p>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">Projects</h5>
                    <p class="card-text"><?= count($projects) ?> total projects</p>
                </div>
            </div>
        </div>
    </div>

    <div class="card shadow-sm">
        <div class="card-header"><strong>Project overview</strong></div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-striped mb-0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Client</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Updated</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($projects as $project): ?>
                            <tr>
                                <td><?= Html::encode($project->title) ?></td>
                                <td><?= Html::encode($project->client ? $project->client->name : 'N/A') ?></td>
                                <td><?= Html::encode($project->status) ?></td>
                                <td><?= (int) $project->progress ?>%</td>
                                <td><?= Yii::$app->formatter->asDatetime($project->updated_at) ?></td>
                                <td><?= Html::a('Edit', ['project/update', 'id' => $project->id], ['class' => 'btn btn-sm btn-outline-primary']) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
