const announcementModel = require('../models/announcementModel');
const res = require("express/lib/response");
const announcementModel = require("../models/announcementModel");
const res = require("express/lib/response");
const res = require("express/lib/response");

exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementModel.find({});
        if(!announcements) {
            return res.status(400).send({
                message: 'No announcements found'
            })
        }
        if(announcements) {
            return res.status(200).send({
                announcement_count: announcements.length,
                announcements,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error getting all announcements',
            error: error,
        })
    }
}

exports.getAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;
        const announcement = await announcementModel.findById(id);
        if(!announcement) {
            return res.status(400).send({
                message: 'Announcement not found',
            })
        }
        if(announcement) {
            return res.status(200).send({
                announcement,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error getting announcement',
            error: error,
        })
    }
}

exports.newAnnouncement = async (req, res) => {
    try {
        const {title, subject, content, publish, priority, audience, isActive} = req.body;

        if(!title || !subject || !content || !priority || !audience) {
            return res.status(400).send({
                message: 'All fields are required',

            })
        }
        const announcement = new announcementModel({title, subject, content, publish, priority, audience, isActive});
        await announcement.save();
        return res.status(200).send({
            message: 'Announcement was saved successfully',
            announcement,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error saving an announcement',
            error: error,
        })
    }
}

exports.updateAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, subject, content, publish, priority, audience, isActive} = req.body;
        const announcement = await announcementModel.findByIdAndUpdate(id, req.body, {new: true});
        if (!announcement) {
            return res.status(400).send({
                message: "Announcement wasn't found",
            })
        } else {
            return res.status(200).send({
                message: 'Announcement was saved successfully',
                announcement,
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error updating an announcement',
            error: error,
        })
    }
}

exports.deleteAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;
        const announcement = await announcementModel.findByIdAndDelete(id);
        if(announcement) {
            return res.status(200).send({
                message: 'Announcement was deleted successfully',
            })
        } else {
            return res.status(400).send({
                message: 'Deleting announcement failed',
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error deleting an announcement',
            error: error,
        })
    }
}

exports.toggleAnnouncementStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const { isActive } = req.body;
        const announcementStatus = await announcementModel.findByIdAndUpdate(id, req.body , { new: true });
        if (!announcementStatus) {
            return res.status(400).send({
                message: "Announcement status update failed",
            });
        } else {
            return res.status(200).send({
                message: 'Announcement status updated successfully',
                announcementStatus,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error updating announcement status',
            error: error,
        })
    }

}