<?php

use yii\bootstrap5\Html;

$this->title = 'My Projects';
?>
<div class="mt-4">
    <h1><?= Html::encode($this->title) ?></h1>

    <div class="card shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-striped mb-0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($projects as $project): ?>
                            <tr>
                                <td><?= Html::encode($project->title) ?></td>
                                <td><?= Html::encode($project->status) ?></td>
                                <td><?= (int) $project->progress ?>%</td>
                                <td><?= Yii::$app->formatter->asDatetime($project->updated_at) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
