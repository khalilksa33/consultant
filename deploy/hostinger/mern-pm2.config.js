module.exports = {
  apps: [
    {
      name: 'consultant-api',
      script: 'server.js',
      cwd: '/home/username/consultant/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        MONGODB_URI: 'mongodb+srv://user:password@cluster.mongodb.net/consultant',
        JWT_SECRET: 'replace_with_strong_secret',
      },
      watch: false,
      autorestart: true,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
    },
  ],
};
