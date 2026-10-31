<?php

use yii\db\Migration;

class m000000_000001_create_user_table extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%user}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(120)->notNull(),
            'email' => $this->string(255)->notNull()->unique(),
            'password_hash' => $this->string(255)->notNull(),
            'role' => $this->string(20)->notNull()->defaultValue('client'),
            'auth_key' => $this->string(255)->null(),
            'password_reset_token' => $this->string(255)->null(),
            'password_reset_expire' => $this->integer()->null(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $adminEmail = getenv('ADMIN_EMAIL') ?: 'admin@yourdomain.com';
        $adminPassword = getenv('ADMIN_PASSWORD') ?: 'Admin123!';

        $this->insert('{{%user}}', [
            'name' => 'Admin User',
            'email' => $adminEmail,
            'password_hash' => Yii::$app->security->generatePasswordHash($adminPassword),
            'role' => 'admin',
            'auth_key' => Yii::$app->security->generateRandomString(),
            'created_at' => time(),
            'updated_at' => time(),
        ]);

        return true;
    }

    public function safeDown()
    {
        $this->dropTable('{{%user}}');

        return true;
    }
}
