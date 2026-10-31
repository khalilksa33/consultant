<?php

namespace app\models;

use yii\db\ActiveRecord;

class Project extends ActiveRecord
{
    public static function tableName()
    {
        return '{{%project}}';
    }

    public function rules()
    {
        return [
            [['title', 'description', 'client_id', 'status'], 'required'],
            [['title'], 'string', 'max' => 255],
            [['description'], 'string'],
            [['client_id'], 'integer'],
            [['progress'], 'integer', 'min' => 0, 'max' => 100],
            [['status'], 'in', 'range' => ['Pending', 'In Design', 'Under Review', 'Permitting', 'Supervision', 'Completed']],
            [['client_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['client_id' => 'id']],
        ];
    }

    public function getClient()
    {
        return $this->hasOne(User::class, ['id' => 'client_id']);
    }
}
