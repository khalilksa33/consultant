<?php

use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;

$this->title = $isUpdate ? 'Update Project' : 'Create Project';
?>
<div class="row justify-content-center mt-5">
    <div class="col-md-8">
        <h1><?= Html::encode($this->title) ?></h1>

        <?php $form = ActiveForm::begin(); ?>
            <?= $form->field($model, 'title')->textInput(['autofocus' => true]) ?>
            <?= $form->field($model, 'description')->textarea(['rows' => 5]) ?>
            <?= $form->field($model, 'client_id')->dropDownList(
                \yii\helpers\ArrayHelper::map($clients, 'id', 'name'),
                ['prompt' => 'Select client']
            ) ?>
            <?= $form->field($model, 'status')->dropDownList([
                'Pending' => 'Pending',
                'In Design' => 'In Design',
                'Under Review' => 'Under Review',
                'Permitting' => 'Permitting',
                'Supervision' => 'Supervision',
                'Completed' => 'Completed',
            ]) ?>
            <?= $form->field($model, 'progress')->input('number', ['min' => 0, 'max' => 100]) ?>

            <div class="d-grid gap-2">
                <?= Html::submitButton($isUpdate ? 'Update project' : 'Create project', ['class' => 'btn btn-primary']) ?>
            </div>
        <?php ActiveForm::end(); ?>
    </div>
</div>
