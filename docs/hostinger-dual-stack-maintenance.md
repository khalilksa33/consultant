# Dual-stack maintenance plan: MERN + Yii 2.0 on Hostinger

## Current project status

This workspace already contains a working MERN stack:

- Backend API: [backend/package.json](../backend/package.json)
- Frontend app: [frontend/package.json](../frontend/package.json)
- Docker setup: [docker-compose.yml](../docker-compose.yml)
- Nginx proxy: [nginx/default.conf](../nginx/default.conf)

I verified the current state in this workspace:

- `npm install` in the backend completed successfully.
- `npm install && npm run build` in the frontend completed successfully with a production build.

This means the current MERN application is valid and should remain the primary active version unless a Yii 2.0 app is explicitly introduced for a parallel deployment.

---

## Recommended architecture

### Option A — Keep both versions active

Use two separate deployment targets:

1. MERN app
   - Main public app: `https://www.example.com`
   - API: `https://api.example.com`
   - Best hosted on a Hostinger VPS / Cloud / Node plan

2. Yii 2.0 app
   - Admin panel or business portal: `https://admin.example.com`
   - Host on Hostinger shared hosting (PHP + Apache)

This is the safest option because Hostinger shared hosting supports PHP and Apache well, while a full MERN runtime usually needs a Node-compatible server or VPS.

### Option B — Use one app as the main production site

If the business wants a single public domain, keep the MERN build live on the main domain and host the Yii 2.0 version on a subdomain or backup environment.

---

## Maintenance model for both versions

### 1. Keep source code separated

Structure the repo like this:

- `backend/` and `frontend/` = current MERN version
- `yii2-app/` = Yii 2.0 version
- `docs/` = deployment and maintenance guides

This prevents the Laravel-like or Yii 2.0 code from blending with the Express/Next code.

### 2. Use a versioned branch strategy

Suggested flow:

- `main` = stable MERN production
- `yii2` = stable Yii 2.0 production
- `develop` = active cross-version testing and shared fixes

### 3. Share only common business logic

If the same business rules exist in both apps, centralize things like:

- user roles
- feature flags
- session/auth contract
- project status values
- email templates

Do not duplicate business logic blindly across both stacks.

### 4. Define feature parity checks

For each major feature, confirm:

- backend API contract
- validation rules
- permissions and admin roles
- dashboard screens
- email notifications
- file upload behavior

---

## Yii 2.0 deployment on Hostinger

### Requirements

Hostinger shared hosting supports:

- PHP 8.x
- Apache/Nginx-based web server
- MySQL database
- Composer support on some plans

For Yii 2.0, the usual setup is:

- upload the Yii 2.0 project files to the public directory
- create a MySQL database in Hostinger
- configure `config/db.php`
- run the migrations through the terminal/SSH or hosting panel

### Example `config/db.php`

```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=your_db_name',
    'username' => 'your_db_user',
    'password' => 'your_db_password',
    'charset' => 'utf8mb4',
];
```

### Example migration command

```bash
php yii migrate
```

### Example URL setup

- Main site: `https://example.com`
- Yii admin: `https://admin.example.com`

If the Yii app is the main website, make sure the hosting root points to the project `web/` folder.

---

## MERN deployment on Hostinger

### Important note

A standard Hostinger shared web hosting plan is not the best host for a Node/Express production app. For MERN, use one of these:

- Hostinger VPS
- Hostinger Cloud hosting
- a Node.js hosting plan
- a separate VM or PaaS such as Render, Railway, or DigitalOcean

### Recommended Node production setup

- API on `api.example.com`
- PM2 process manager
- `.env` values managed in the server environment
- MongoDB hosted on Atlas or a managed database

Example PM2 config is included in `deploy/hostinger/mern-pm2.config.js`.

---

## Deployment map

| App | Stack | Recommended Host | Domain pattern |
| --- | --- | --- | --- |
| Main public website | MERN / Next.js | Hostinger VPS or Cloud | `https://www.example.com` |
| API | Express + MongoDB | Hostinger VPS / Cloud | `https://api.example.com` |
| Admin CRM / business portal | Yii 2.0 | Hostinger shared hosting | `https://admin.example.com` |

---

## Security and production checklist

For both apps, confirm:

- use strong secrets in `.env`
- enable HTTPS and redirect HTTP to HTTPS
- validate CORS origins
- restrict admin routes
- use MongoDB Atlas or a managed database
- keep Composer and npm packages updated
- schedule dependency audits quarterly

---

## Recommended release flow

1. Update the MERN app in `main`
2. Test using local Docker or local Node runtime
3. Deploy MERN to the Node server
4. Update Yii 2.0 in `yii2`
5. Test the Yii 2.0 database migrations
6. Deploy Yii 2.0 to Hostinger public_html
7. Validate admin login, roles, and business workflows

---

## Recommended next step

The best practical plan is:

- keep the current MERN project fully working
- add a separate Yii 2.0 app only where needed for admin or legacy business workflows
- deploy the Yii app to Hostinger shared hosting
- deploy the MERN app to a Node-capable Hostinger environment or VPS

This keeps the existing project stable while giving you a clean path to Yii 2.0 support without losing the current codebase.
