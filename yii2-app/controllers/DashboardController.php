<?php

namespace app\controllers;

use app\models\Project;
use app\models\User;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;

class DashboardController extends Controller
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    public function actionIndex()
    {
        if (Yii::$app->user->identity->role === 'admin') {
            $projects = Project::find()->with('client')->all();
            $clients = User::find()->where(['role' => 'client'])->all();

            return $this->render('admin', [
                'projects' => $projects,
                'clients' => $clients,
            ]);
        }

        $projects = Project::find()->where(['client_id' => Yii::$app->user->id])->all();

        return $this->render('client', [
            'projects' => $projects,
        ]);
    }
}
