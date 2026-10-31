<?php

use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;

$this->title = 'Login';
?>
<div class="row justify-content-center mt-5">
    <div class="col-md-5">
        <h1><?= Html::encode($this->title) ?></h1>

        <?php $form = ActiveForm::begin(['id' => 'login-form']); ?>
            <?= $form->field($model, 'email')->textInput(['autofocus' => true]) ?>
            <?= $form->field($model, 'password')->passwordInput() ?>
            <?= $form->field($model, 'rememberMe')->checkbox() ?>

            <div class="d-grid gap-2">
                <?= Html::submitButton('Login', ['class' => 'btn btn-primary']) ?>
            </div>
        <?php ActiveForm::end(); ?>

        <div class="mt-3">
            <?= Html::a('Register as client', ['auth/register'], ['class' => 'me-3']) ?>
            <?= Html::a('Forgot password?', ['auth/forgot-password']) ?>
        </div>
    </div>
</div>
