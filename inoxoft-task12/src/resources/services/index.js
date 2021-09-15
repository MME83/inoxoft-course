module.exports = {
    authService: require('./auth.services'),
    jwtService: require('./jwt.services'),

    userService: require('./user.services'),
    buildingService: require('./building.services'),
    flatService: require('./flat.services'),

    emailService: require('./email.services'),

    s3Service: require('./s3.services'),
};
