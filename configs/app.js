module.exports = {
    /**
     * Application Name
     * This is our application name.
     * @var string
     */
    name: process.env.APP_NAME,

    /**
     * Application URL
     * This is our applications url.
     * @var string
     */
    url: process.env.APP_URL,

    /**
     * Application Version
     * Here we store our application version.
     * @var string
     */
    version: process.env.APP_VERSION,

    /**
     * Application Debug State
     * This is used to determine whether the application is
     * in a debug state, this is useful for when displaying
     * errors for different environments
     * @var boolean
     */
    debug: process.env.APP_DEBUG,

    /**
     * Application Port
     * Ther port our aplication will be running on when
     * in a local environment
     * @var number
     */
    port: process.env.APP_PORT,
};