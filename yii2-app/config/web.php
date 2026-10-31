<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'name' => '26i Consulting Yii',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            'cookieValidationKey' => getenv('COOKIE_VALIDATION_KEY') ?: 'hostinger-consulting-cookie-key',
            'baseUrl' => getenv('APP_BASE_URL') ?: '',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
            'loginUrl' => ['/auth/login'],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => \yii\symfonymailer\Mailer::class,
            'viewPath' => '@app/mail',
            'useFileTransport' => false,
            'transport' => [
                'scheme' => getenv('SMTP_ENCRYPTION') === 'ssl' ? 'smtps' : 'smtp',
                'host' => getenv('SMTP_HOST') ?: 'smtp.hostinger.com',
                'username' => getenv('SMTP_USERNAME') ?: '',
                'password' => getenv('SMTP_PASSWORD') ?: '',
                'port' => getenv('SMTP_PORT') ?: 587,
                'encryption' => getenv('SMTP_ENCRYPTION') ?: 'tls',
            ],
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                '' => 'site/index',
                'dashboard' => 'dashboard/index',
                'projects' => 'project/index',
                'projects/create' => 'project/create',
                'projects/<id:\d+>/update' => 'project/update',
                'auth/login' => 'auth/login',
                'auth/register' => 'auth/register',
                'auth/logout' => 'auth/logout',
                'forgot-password' => 'auth/forgot-password',
                'reset-password/<token:[A-Za-z0-9_-]+>' => 'auth/reset-password',
            ],
        ],
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
}

return $config;
