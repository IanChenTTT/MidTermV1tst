const sess_db_opt = {
	// Host name for database connection:
	host: process.env.Host,
	// Port number for database connection:
	port: process.env.DB_PORT,
	// Database user:
	user: process.env.DB_USER,
	// Password for the above database user:
	password: process.env.DB_PWD,
	// Database name:
	database: process.env.DB_NAME,
	// Whether or not to automatically check for and clear expired sessions:
	clearExpired: true,
	// How frequently expired sessions will be cleared; milliseconds:
	checkExpirationInterval: 900000,
	// The maximum age of a valid session; milliseconds:
	expiration: 1800000,
	// Whether or not to create the sessions database table, if one does not already exist:
	createDatabaseTable: false,
	// Whether or not to end the database connection when the store is closed.
	// The default value of this option depends on whether or not a connection was passed to the constructor.
	// If a connection object is passed to the constructor, the default value for this option is false.
	endConnectionOnClose: true,
	// // Whether or not to disable touch:
	disableTouch: false,
	charset: 'utf8mb4_bin',
	schema: {
		tableName: process.env.DB_TABLE,
		columnNames: {
			session_id: process.env.SESS_COL1,
			expires: process.env.SESS_COL2,
			data: process.env.SESS_COL3
		}
	}
};
module.exports = sess_db_opt;