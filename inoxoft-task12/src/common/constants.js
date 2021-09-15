module.exports = {
    AUTHORIZATION: 'Authorization',

    IMAGE_MAX_SIZE: (1024 * 1024) / 2,
    IMAGE_MIME_TYPES: [
        'image/jpeg',
        'image/png',
        'image/webp'
    ],

    // Server rate limits
    SERVER_RATELIMITS_PERIOD: (15 * 60 * 1000),
    SERVER_RATELIMITS_MAXREQUESTS: 1000,
};
