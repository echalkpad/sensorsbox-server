/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://links.sailsjs.org/docs/config/connections
 */

module.exports.connections = {

	mongodbServer: {
		adapter: 'sails-mongo',
		url : process.env.DATABASE_URL || 'mongodb://localhost:27017/sensorsbox'
	},
	redis: {
		adapter: 'sails-redis',
		port: process.env.REDIS_PORT || 6379,
		host: process.env.REDIS_HOST || 'localhost',
		db: process.env.REDIS_DB || null,
		password: process.env.REDIS_PASSWORD || null
	}
};
