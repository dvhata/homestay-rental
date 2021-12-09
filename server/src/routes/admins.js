const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController'); 
const signupCheckMiddleware = require('../app/middlewares/signupCheckMiddleware');
const adminMiddleware = require('../app/middlewares/adminMiddleware');

router.post('/orders/staying/search', adminMiddleware, adminController.stayingSearch);
router.post('/orders/confirmed/search', adminMiddleware, adminController.confirmedSearch);
router.post('/edit/:slugName', adminMiddleware, adminController.editApartment);
router.get('/delete-one/:slugName', adminMiddleware, adminController.deleteApartment);
router.post('/add-new', adminMiddleware, adminController.addApartment);
router.post('/orders/:id/cancel', adminMiddleware, adminController.cancel);
router.post('/orders/:id/check-out', adminMiddleware, adminController.checkout);
router.get('/orders/staying', adminMiddleware, adminController.staying);
router.post('/orders/:id/check-in', adminMiddleware, adminController.checkin);
router.get('/orders/confirmed', adminMiddleware, adminController.confirmed);
router.post('/orders/:id/confirm', adminMiddleware, adminController.confirm);
router.get('/orders/waiting', adminMiddleware, adminController.waiting);
router.post('/login', adminController.login);
router.post('/signup', signupCheckMiddleware, adminController.signup);
router.get('/:slugName', adminController.infor);

module.exports = router;