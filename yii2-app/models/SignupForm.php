<?php

namespace app\models;

use Yii;
use yii\base\Model;

class SignupForm extends Model
{
    public $name;
    public $email;
    public $password;
    public $password_repeat;

    public function rules()
    {
        return [
            [['name', 'email', 'password', 'password_repeat'], 'required'],
            ['name', 'string', 'min' => 2, 'max' => 120],
            ['email', 'email'],
            ['email', 'unique', 'targetClass' => User::class],
            ['password', 'string', 'min' => 6],
            ['password_repeat', 'compare', 'compareAttribute' => 'password', 'message' => 'Passwords do not match.'],
        ];
    }

    public function signup()
    {
        if (!$this->validate()) {
            return false;
        }

        $user = new User();
        $user->name = trim($this->name);
        $user->email = strtolower(trim($this->email));
        $user->role = 'client';
        $user->setPassword($this->password);
        $user->generateAuthKey();

        return $user->save();
    }
}
