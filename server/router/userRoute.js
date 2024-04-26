const express  = require('express');
const router = express.Router();
const {test, addLead,updateLead, createFollowUpReport , getLeadDetails, updateMeeting} = require('../controller/itemController.js');

router.get('/test', test);
router.post('/lead', addLead);
router.post('/insertfollowup', createFollowUpReport);
router.get('/getlead/:user_id', getLeadDetails);
router.get('/updateLead', updateLead);
router.put('/updateMeeting/:leadId', updateMeeting)

module.exports = router;   