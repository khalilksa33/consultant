<?php

return [
    'adminEmail' => getenv('ADMIN_EMAIL') ?: 'admin@yourdomain.com',
    'senderEmail' => getenv('SMTP_FROM_EMAIL') ?: 'noreply@yourdomain.com',
    'senderName' => getenv('SMTP_FROM_NAME') ?: '26i Consulting',
    'hostingerRemoteDir' => getenv('HOSTINGER_REMOTE_DIR') ?: '/public_html/consultant',
    'siteUrl' => getenv('APP_BASE_URL') ?: 'https://www.example.com',
    'adminPassword' => getenv('ADMIN_PASSWORD') ?: 'Admin123!',
];
