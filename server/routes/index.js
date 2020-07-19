const express = require('express');
const router = express.Router();


const { auth } = require('../middleware/auth');

const { login, register, Authh } = require('../controllers/auth');

const { getUser, deleteUser, editsubs} = require('../controllers/user');

const {
	getFilm,
	getDetailFilm,
	addFilm,
	editFilm,
	deleteFilm
} = require('../controllers/film');

const {
	getCategory,
	addCategory,
	editCategory,
	deleteCategory
} = require('../controllers/category');

const {
	addTransaction,
	getTransaction,
	editTransaction,
} = require('../controllers/transaction');

const {
	addEpisode,
	getEpisodesByFilm,
	getDetailEpisode,
	editEpisode,
	deleteEpisode
} = require('../controllers/episode');

// Authentication Routes
router.post('/register', register);
router.post('/login', login);
router.get('/auth', auth, Authh);

// User Routes
router.get('/user', auth,  getUser);
router.delete('/user/:id', auth,  deleteUser);
router.patch('/user/:id',  editsubs);

// Film Routes
router.get('/film', getFilm);
router.get('/film/:id', getDetailFilm);
router.post('/film',  addFilm);
router.patch('/film/:id', auth,  editFilm);
router.delete('/film/:id', deleteFilm);

// Category Routes
router.get('/category', getCategory);
router.post('/category', auth,  addCategory);
router.patch('/category/:id', auth,  editCategory);
router.delete('/category/:id', auth, deleteCategory);

// Transcation Routes
router.get('/transaction', getTransaction);
router.post('/transaction',  addTransaction);
router.patch('/transaction/:id', auth, editTransaction);

// Episode Routes
router.post('/episode', auth,  addEpisode);
router.get('/film/:id/episodes', auth, getEpisodesByFilm);
router.get('/episodes/:idEpisode', auth, getDetailEpisode);
router.patch('/episode/:id', auth, editEpisode);
router.delete('/episode/:id', auth, deleteEpisode);

module.exports = router;
