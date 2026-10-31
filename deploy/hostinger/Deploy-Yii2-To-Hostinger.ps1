$ErrorActionPreference = 'Stop'

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$localAppRoot = Join-Path $projectRoot 'yii2-app'
$envFile = Join-Path $projectRoot '.env'

$settings = @{}
$envKeys = @(
    'HOSTINGER_FTP_SERVER',
    'HOSTINGER_FTP_USERNAME',
    'HOSTINGER_FTP_PASSWORD',
    'HOSTINGER_REMOTE_DIR',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USERNAME',
    'SMTP_PASSWORD',
    'SMTP_ENCRYPTION',
    'SMTP_FROM_EMAIL',
    'SMTP_FROM_NAME',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD',
    'APP_BASE_URL',
    'COOKIE_VALIDATION_KEY',
    'YII_ENV'
)

foreach ($key in $envKeys) {
    $value = [Environment]::GetEnvironmentVariable($key)
    if (-not [string]::IsNullOrWhiteSpace($value)) {
        $settings[$key] = $value.Trim()
    }
}

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^(.*?)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            if (-not [string]::IsNullOrWhiteSpace($key) -and -not $settings.ContainsKey($key)) {
                $settings[$key] = $value
            }
        }
    }
}

$server = $settings['HOSTINGER_FTP_SERVER']
$username = $settings['HOSTINGER_FTP_USERNAME']
$password = $settings['HOSTINGER_FTP_PASSWORD']
$remoteBase = $settings['HOSTINGER_REMOTE_DIR']

if (-not $server -or -not $username -or -not $password -or -not $remoteBase) {
    throw 'Hostinger FTP settings are missing from .env.'
}

$ftpRoot = '/'
try {
    $rootRequest = [System.Net.FtpWebRequest]::Create("ftp://$server/")
    $rootRequest.Credentials = New-Object System.Net.NetworkCredential($username, $password)
    $rootRequest.Method = [System.Net.WebRequestMethods+Ftp]::PrintWorkingDirectory
    $rootRequest.UseBinary = $true
    $rootResponse = $rootRequest.GetResponse()
    $rootStream = $rootResponse.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($rootStream)
    $ftpRoot = $reader.ReadToEnd().Trim()
    $reader.Close()
    $rootStream.Close()
    $rootResponse.Close()
} catch {
    $ftpRoot = '/public_html'
}

if ([string]::IsNullOrWhiteSpace($ftpRoot)) {
    $ftpRoot = '/public_html'
}

$remoteBase = $remoteBase.Trim('/')
if ($remoteBase -match '^public_html/') {
    $remoteBase = '/' + $remoteBase
}
if ($remoteBase -notmatch '^/') {
    $remoteBase = "/$remoteBase"
}

$normalizedFtpRoot = $ftpRoot.TrimEnd('/');
if (-not $normalizedFtpRoot.StartsWith('/')) {
    $normalizedFtpRoot = "/$normalizedFtpRoot"
}

if ($remoteBase.StartsWith($normalizedFtpRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    $remoteBase = $remoteBase.Substring($normalizedFtpRoot.Length).TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($remoteBase)) {
        $remoteBase = 'public_html'
    }
    else {
        $remoteBase = "public_html/$remoteBase"
    }
}
else {
    $remoteBase = ($remoteBase.TrimStart('/'))
    if ($remoteBase -and -not $remoteBase.StartsWith('public_html')) {
        $remoteBase = "public_html/$remoteBase"
    }
}

function Ensure-RemoteDirectory {
    param(
        [string]$DirectoryPath
    )

    $pathValue = $DirectoryPath.Trim('/')
    if ([string]::IsNullOrWhiteSpace($pathValue)) { return }

    $segments = $pathValue.Split('/') | Where-Object { $_ }
    $current = ''

    foreach ($segment in $segments) {
        $current = if ([string]::IsNullOrWhiteSpace($current)) { $segment } else { "$current/$segment" }
        $uri = "ftp://$server/$current/"
        $request = [System.Net.FtpWebRequest]::Create($uri)
        $request.Credentials = New-Object System.Net.NetworkCredential($username, $password)
        $request.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        $request.UseBinary = $true

        try {
            $response = $request.GetResponse()
            $response.Close()
        }
        catch {
            $message = $_.Exception.Message
            if ($message -notmatch 'already exists' -and $message -notmatch 'File exists' -and $message -notmatch '550') {
                throw
            }
        }
    }
}

function Upload-File {
    param(
        [string]$LocalFile,
        [string]$RemotePath
    )

    $uri = "ftp://$server/$RemotePath.TrimStart('/')"
    $request = [System.Net.FtpWebRequest]::Create($uri)
    $request.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $request.Credentials = New-Object System.Net.NetworkCredential($username, $password)
    $request.UseBinary = $true
    $request.KeepAlive = $false

    $fileBytes = [System.IO.File]::ReadAllBytes($LocalFile)
    $requestStream = $request.GetRequestStream()
    $requestStream.Write($fileBytes, 0, $fileBytes.Length)
    $requestStream.Close()

    $response = $request.GetResponse()
    $response.Close()
}

$relativeBase = $localAppRoot
Get-ChildItem $relativeBase -Recurse -File | Sort-Object FullName | ForEach-Object {
    $relativePath = $_.FullName.Substring($relativeBase.Length + 1) -replace '\\', '/'
    $remotePath = "$remoteBase/$relativePath"
    $remoteFolder = Split-Path $remotePath -Parent
    Ensure-RemoteDirectory -DirectoryPath $remoteFolder
    Upload-File -LocalFile $_.FullName -RemotePath $remotePath
}

Write-Host "Yii 2.0 app deployment to Hostinger FTP completed at $remoteBase."
