<?php

namespace app\controllers;

use app\models\Project;
use app\models\User;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class ProjectController extends Controller
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
        if (Yii::$app->user->identity->role !== 'admin') {
            return $this->redirect(['dashboard/index']);
        }

        $projects = Project::find()->with('client')->all();

        return $this->render('index', ['projects' => $projects]);
    }

    public function actionCreate()
    {
        if (Yii::$app->user->identity->role !== 'admin') {
            throw new NotFoundHttpException('Only administrators can create projects.');
        }

        $model = new Project();
        $clients = User::find()->where(['role' => 'client'])->all();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            Yii::$app->session->setFlash('success', 'Project created successfully.');
            return $this->redirect(['project/index']);
        }

        return $this->render('form', ['model' => $model, 'clients' => $clients, 'isUpdate' => false]);
    }

    public function actionUpdate($id)
    {
        if (Yii::$app->user->identity->role !== 'admin') {
            throw new NotFoundHttpException('Only administrators can update projects.');
        }

        $model = Project::findOne($id);
        if (!$model) {
            throw new NotFoundHttpException('Project not found.');
        }

        $clients = User::find()->where(['role' => 'client'])->all();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            Yii::$app->session->setFlash('success', 'Project updated successfully.');
            return $this->redirect(['project/index']);
        }

        return $this->render('form', ['model' => $model, 'clients' => $clients, 'isUpdate' => true]);
    }
}
