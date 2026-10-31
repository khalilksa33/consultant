<?php

use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;

$this->title = 'Reset Password';
?>
<div class="row justify-content-center mt-5">
    <div class="col-md-5">
        <h1><?= Html::encode($this->title) ?></h1>

        <?php $form = ActiveForm::begin(); ?>
            <?= $form->field($model, 'password')->passwordInput(['autofocus' => true]) ?>
            <?= $form->field($model, 'password_repeat')->passwordInput() ?>
            <div class="d-grid gap-2">
                <?= Html::submitButton('Update password', ['class' => 'btn btn-primary']) ?>
            </div>
        <?php ActiveForm::end(); ?>
    </div>
</div>
