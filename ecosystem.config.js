module.exports = {
  apps: [
    {
      name: 'NextJS_App',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_local: {
        APP_ENV: 'local' // APP_ENV=local
      },
      env_development: {
        APP_ENV: 'dev' // APP_ENV=dev
      },
      env_production: {
        APP_ENV: 'prod' // APP_ENV=prod
      }
    }
  ]
}
