const router = require('express').Router();

const buildingController = require('../controllers/building.controller');
// const buildingMiddleware = require('../../middleware/building.middleware');

// router.get('/:build_id', userMiddleware.isUserIdValid, userController.getUserById);
router.get('/', buildingController.getAllBuildings);
router.post('/', buildingController.createBuilding);

/*
router.patch(
    '/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isReqBodyUpdateValid,
    userMiddleware.isUserByIdExists,
    userController.updateUser
);
*/
// router.delete('/:user_id', userMiddleware.isUserIdValid, userMiddleware.isUserByIdExists, userController.deleteUser);

module.exports = router;
