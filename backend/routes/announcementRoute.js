const express = require('express');
const router = express.Router();

const { updateAnnouncement, newAnnouncement, getAnnouncements, getAnnouncement, deleteAnnouncement, toggleAnnouncementStatus } = require('../controllers/announcementController')

router.post('/', newAnnouncement);

router.get('/', getAnnouncements);
router.get('/:id', getAnnouncement);

router.patch('/:id', updateAnnouncement);
router.patch('/status/:id', toggleAnnouncementStatus);

router.delete('/:id', deleteAnnouncement);

module.exports = router;
