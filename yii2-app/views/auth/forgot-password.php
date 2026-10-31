<?php

use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;

$this->title = 'Forgot Password';
?>
<div class="row justify-content-center mt-5">
    <div class="col-md-5">
        <h1><?= Html::encode($this->title) ?></h1>

        <?php $form = ActiveForm::begin(); ?>
            <?= $form->field($model, 'email')->textInput(['autofocus' => true]) ?>
            <div class="d-grid gap-2">
                <?= Html::submitButton('Send reset link', ['class' => 'btn btn-primary']) ?>
            </div>
        <?php ActiveForm::end(); ?>
    </div>
</div>
