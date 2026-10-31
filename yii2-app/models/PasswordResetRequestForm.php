<?php

namespace app\models;

use Yii;
use yii\base\Model;

class PasswordResetRequestForm extends Model
{
    public $email;

    public function rules()
    {
        return [
            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
        ];
    }

    public function sendResetLink()
    {
        if (!$this->validate()) {
            return false;
        }

        $user = User::findByEmail($this->email);
        if (!$user) {
            return false;
        }

        $token = $user->generatePasswordResetToken();
        if (!$user->save(false)) {
            return false;
        }

        return $token;
    }
}
