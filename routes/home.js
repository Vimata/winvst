const express = require('express');
const router = express.Router();

// Require controller modules.
const club_controller = require('../controllers/clubController');
const user_controller = require('../controllers/userController');
const category_controller = require('../controllers/categoryController');

/// Club ROUTES ///

// GET catalog home page.
router.get('/', club_controller.index);

// GET request for creating a club. NOTE This must come before routes that display club (uses id).
router.get('/club/create', club_controller.club_create_get);

// POST request for creating club.
router.post('/club/create', club_controller.club_create_post);

// GET request to delete club.
router.get('/club/:id/delete', club_controller.club_delete_get);

// POST request to delete club.
router.post('/club/:id/delete', club_controller.club_delete_post);

// GET request to update club.
router.get('/club/:id/update', club_controller.club_update_get);

// POST request to update club.
router.post('/club/:id/update', club_controller.club_update_post);

// GET request for one club.
router.get('/club/:id', club_controller.club_detail);

// GET request for list of all club items.
router.get('/clubs', club_controller.club_list);

/// USER ROUTES ///

// GET request for creating user. NOTE This must come before route for id (i.e. display user).
router.get('/user/create', user_controller.user_create_get);

// POST request for creating user.
router.post('/user/create', user_controller.user_create_post);

// GET request to delete user.
router.get('/user/:id/delete', user_controller.user_delete_get);

// POST request to delete user.
router.post('/user/:id/delete', user_controller.user_delete_post);

// GET request to update user.
router.get('/user/:id/update', user_controller.user_update_get);

// POST request to update user.
router.post('/user/:id/update', user_controller.user_update_post);

// GET request for one user.
router.get('/user/:id', user_controller.user_detail);

// GET request for list of all users.
router.get('/users', user_controller.user_list);

/// category ROUTES ///

// GET request for creating a category. NOTE This must come before route that displays category (uses id).
router.get('/category/create', category_controller.category_create_get);

//POST request for creating category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all category.
router.get('/categorys', category_controller.category_list);

module.exports = router;
