module.exports = {
  apps: [
    {
      name: "mabla-api",               // Nombre de tu app en PM2
      script: "./src/app.js",          // Ruta a tu archivo principal
      instances: 1,                    // Cambia a "max" para usar todos los núcleos
      autorestart: true,              // Reinicia si la app falla
      watch: false,                   // Desactiva reinicio por cambios en archivos
      max_memory_restart: "300M",     // Reinicia si supera el uso de memoria
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
