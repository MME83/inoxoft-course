module.exports = {
    asyncWrapper: require('./asyncWrapper'),
    globalHandleErrors: require('./globalHandleErrors'),

    authMiddleware: require('./auth.middleware'),
    roleMiddleware: require('./role.middleware'),

    userMiddleware: require('./user.middleware'),
    buildingMiddleware: require('./building.middleware'),

    imageMiddleware: require('./image.middleware'),
};
