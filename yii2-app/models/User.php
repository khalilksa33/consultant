<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

class User extends ActiveRecord implements IdentityInterface
{
    public static function tableName()
    {
        return '{{%user}}';
    }

    public function rules()
    {
        return [
            [['name', 'email', 'role'], 'required'],
            [['name'], 'string', 'max' => 120],
            [['email'], 'email'],
            [['email'], 'unique'],
            [['role'], 'in', 'range' => ['admin', 'client']],
            [['password_hash'], 'string', 'max' => 255],
        ];
    }

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return null;
    }

    public static function findByEmail($email)
    {
        return static::findOne(['email' => strtolower(trim($email))]);
    }

    public static function findByPasswordResetToken($token)
    {
        if (empty($token)) {
            return null;
        }

        return static::findOne([
            'password_reset_token' => $token,
            'password_reset_expire' => null,
        ]);
    }

    public function getId()
    {
        return $this->id;
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString(64);
        $this->password_reset_expire = time() + 3600;

        return $this->password_reset_token;
    }

    public function clearPasswordResetToken()
    {
        $this->password_reset_token = null;
        $this->password_reset_expire = null;
    }

    public function getProjects()
    {
        return $this->hasMany(Project::class, ['client_id' => 'id']);
    }
}
