<?php

namespace app\models;

use Yii;
use yii\base\Model;

class ResetPasswordForm extends Model
{
    public $token;
    public $password;
    public $password_repeat;

    public function rules()
    {
        return [
            [['token', 'password', 'password_repeat'], 'required'],
            ['password', 'string', 'min' => 6],
            ['password_repeat', 'compare', 'compareAttribute' => 'password', 'message' => 'Passwords do not match.'],
        ];
    }

    public function resetPassword()
    {
        if (!$this->validate()) {
            return false;
        }

        $user = User::findByPasswordResetToken($this->token);

        if (!$user || $user->password_reset_expire < time()) {
            $this->addError('token', 'This password reset link is invalid or expired.');
            return false;
        }

        $user->setPassword($this->password);
        $user->clearPasswordResetToken();
        $user->generateAuthKey();

        return $user->save(false);
    }
}
