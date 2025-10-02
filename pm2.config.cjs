module.exports = {
  apps: [
    {
      name: 'dicescore',
      script: './bin/www',
      watch: true,
      ignore_watch: ['node_modules', 'public', 'logs'],
    },
  ],
};
