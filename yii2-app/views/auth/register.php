<?php

use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;

$this->title = 'Register';
?>
<div class="row justify-content-center mt-5">
    <div class="col-md-6">
        <h1><?= Html::encode($this->title) ?></h1>

        <?php $form = ActiveForm::begin(); ?>
            <?= $form->field($model, 'name')->textInput(['autofocus' => true]) ?>
            <?= $form->field($model, 'email')->textInput() ?>
            <?= $form->field($model, 'password')->passwordInput() ?>
            <?= $form->field($model, 'password_repeat')->passwordInput() ?>

            <div class="d-grid gap-2">
                <?= Html::submitButton('Create account', ['class' => 'btn btn-success']) ?>
            </div>
        <?php ActiveForm::end(); ?>
    </div>
</div>
