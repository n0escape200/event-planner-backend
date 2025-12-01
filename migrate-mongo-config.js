/**
 * migrate-mongo config file
 * See: https://github.com/seppevs/migrate-mongo
 */
module.exports = {
  mongodb: {
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/event-planner',

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: 'migrations',
  changelogCollectionName: 'migrations_changelog',
  migrationFileExtension: '.js',
};
