const express  = require('express');
const router = express.Router();
const {test, addLead,updateLead, createFollowUpReport , getLeadDetails, updateMeeting} = require('../controller/itemController.js');

router.get('/test', test);
router.post('/lead', addLead);
router.post('/insertfollowup', createFollowUpReport);
router.get('/getlead/:user_id', getLeadDetails);
router.post('/updateLead', updateLead);
router.put('/updateMeeting', updateMeeting)

module.exports = router;   