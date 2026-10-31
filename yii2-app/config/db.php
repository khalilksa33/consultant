<?php

$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbPort = getenv('DB_PORT') ?: '3306';
$dbName = getenv('DB_NAME') ?: 'consultant_db';
$dbUser = getenv('DB_USER') ?: 'consultant_user';
$dbPassword = getenv('DB_PASSWORD') ?: '';

$dsn = "mysql:host={$dbHost};port={$dbPort};dbname={$dbName};charset=utf8mb4";

return [
    'class' => 'yii\db\Connection',
    'dsn' => $dsn,
    'username' => $dbUser,
    'password' => $dbPassword,
    'charset' => 'utf8mb4',
    'enableSchemaCache' => false,
];
