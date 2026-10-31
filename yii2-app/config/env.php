<?php

$envCandidates = [
    dirname(__DIR__) . '/.env',
    dirname(__DIR__, 2) . '/.env',
];

foreach ($envCandidates as $rootEnvFile) {
    if (!file_exists($rootEnvFile)) {
        continue;
    }

    $lines = file($rootEnvFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || str_starts_with($trimmed, '#')) {
            continue;
        }

        [$key, $value] = array_pad(explode('=', $trimmed, 2), 2, '');
        $key = trim($key);
        $value = trim($value);

        if ($value !== '' && ($value[0] === '"' || $value[0] === "'")) {
            $value = substr($value, 1, -1);
        }

        if ($key !== '') {
            $_ENV[$key] = $value;
            $_SERVER[$key] = $value;
            putenv("{$key}={$value}");
        }
    }

    break;
}
