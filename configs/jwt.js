module.exports = {
    /**
     * JWT SECRET
     * The secret user to encode and 
     * decode the json web token
     * @var string
     */
    secret: process.env.JWT_SECRET,

    /**
     * JWT TTL
     * The lifespan of each generated 
     * json web token, in minutes.
     * @var number
     */
    ttl: process.env.JWT_TTL,
};