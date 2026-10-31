<?php

namespace app\controllers;

use app\models\LoginForm;
use app\models\PasswordResetRequestForm;
use app\models\ResetPasswordForm;
use app\models\SignupForm;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class AuthController extends Controller
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'only' => ['logout'],
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->redirect(['dashboard/index']);
        }

        $model = new LoginForm();

        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->redirect(['dashboard/index']);
        }

        return $this->render('login', ['model' => $model]);
    }

    public function actionRegister()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->redirect(['dashboard/index']);
        }

        $model = new SignupForm();

        if ($model->load(Yii::$app->request->post()) && $model->signup()) {
            Yii::$app->session->setFlash('success', 'Registration complete. Please login.');
            return $this->redirect(['auth/login']);
        }

        return $this->render('register', ['model' => $model]);
    }

    public function actionForgotPassword()
    {
        $model = new PasswordResetRequestForm();

        if ($model->load(Yii::$app->request->post())) {
            $token = $model->sendResetLink();
            if ($token) {
                $resetUrl = Yii::$app->request->hostInfo . '/reset-password/' . $token;
                Yii::$app->session->setFlash('success', 'Password reset link generated: ' . $resetUrl);
                return $this->refresh();
            }

            Yii::$app->session->setFlash('error', 'No account found with that email address.');
        }

        return $this->render('forgot-password', ['model' => $model]);
    }

    public function actionResetPassword($token)
    {
        $model = new ResetPasswordForm();
        $model->token = $token;

        if ($model->load(Yii::$app->request->post()) && $model->resetPassword()) {
            Yii::$app->session->setFlash('success', 'Your password has been reset. You can now sign in.');
            return $this->redirect(['auth/login']);
        }

        return $this->render('reset-password', ['model' => $model]);
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->redirect(['site/index']);
    }
}
