<?php

use yii\db\Migration;

class m000000_000002_create_project_table extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%project}}', [
            'id' => $this->primaryKey(),
            'title' => $this->string(255)->notNull(),
            'description' => $this->text()->notNull(),
            'client_id' => $this->integer()->notNull(),
            'status' => $this->string(30)->notNull()->defaultValue('Pending'),
            'progress' => $this->integer()->notNull()->defaultValue(0),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        if (Yii::$app->db->driverName !== 'sqlite') {
            $this->addForeignKey(
                'fk_project_client',
                '{{%project}}',
                'client_id',
                '{{%user}}',
                'id',
                'CASCADE',
                'CASCADE'
            );
        }

        return true;
    }

    public function safeDown()
    {
        if (Yii::$app->db->driverName !== 'sqlite') {
            $this->dropForeignKey('fk_project_client', '{{%project}}');
        }

        $this->dropTable('{{%project}}');

        return true;
    }
}
