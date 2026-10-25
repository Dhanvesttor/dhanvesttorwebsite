// pm2 process file for the Hostinger VPS. Start with: pm2 start ecosystem.config.cjs
module.exports = {
  apps: [{
    name: "dhanvesttor-web",
    cwd: "/var/www/dhanvesttor/current",
    script: "server.js",
    env: { NODE_ENV: "production", PORT: 3000, HOSTNAME: "127.0.0.1" },
    instances: 1,
    max_memory_restart: "600M",
    time: true,
  }],
};
