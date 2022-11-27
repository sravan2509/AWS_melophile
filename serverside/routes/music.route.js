const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const music_controller = require('../controllers/music.controller');


// a simple test url to check that all of our files are communicating correctly.
//router.get('/getallmusic', music_controller.test);

router.get('/getallmusic', music_controller.music_details);
router.post('/create', music_controller.music_create);
router.put('/update/:id', music_controller.music_update);
router.delete('/delete/:id', music_controller.music_delete);
module.exports = router;