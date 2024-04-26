// const {leads} = require('../data');
// const { v4: uuidv4 } = require('uuid');
const {db} = require('../config/db');
const test = async (req, res) => {
    res.send({data: "Test Sucess Full"});
}

const addLead = async (req, res, next) => {
    try {
        const {u_Id,fullName, mobileNo, email, address, inquiryType, nextFollowDate, nextFollowPhase} = req.body;

        const insertLead = `INSERT INTO leads (
            u_Id, fullName, mobileNo, email, address, inquiryType, nextFollowDate, nextFollowPhase) VALUES (?, ?, ?, ?, ?, ? , ? ,? )`;
        const insertLeadParams = [ u_Id,  fullName, mobileNo, email, address, inquiryType, nextFollowDate, nextFollowPhase ];

        db.query(
            insertLead, 
            insertLeadParams, 
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: "Internal server error" });
                  } else {
                    return res.status(200).json({
                      success: true,
                      data: result,
                      message: "lead registered successfully",
                    });
                  }
            }
        )

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
const updateLead = async (req, res, next) => {
    try {
        const { lead_Id, fullName, mobileNo, email, address, inquiryType, nextFollowDate, nextFollowPhase } = req.body;

        // Construct the SQL query to find the lead
        const findLeadQuery = 'SELECT * FROM leads WHERE lead_Id = ?';
        
        // Execute the query to find the lead
        db.query(findLeadQuery, [lead_Id], (err, result) => {
            if (err) {
                return res.status(500).json({ err: 'Internal server error' });
            }
            
            if (result.length === 0) {
                // Lead not found
                return res.status(404).json({ error: 'Lead not found' });
            }

            // Construct the SQL query to update the lead
            const updateLeadQuery = `
                UPDATE leads 
                SET fullName = ?, 
                    mobileNo = ?, 
                    email = ?, 
                    address = ?, 
                    inquiryType = ?, 
                    nextFollowDate = ?, 
                    nextFollowPhase = ? 
                WHERE lead_Id = ?
            `;
            
            // Execute the query to update the lead
            db.query(updateLeadQuery, [fullName, mobileNo, email, address, inquiryType, nextFollowDate, nextFollowPhase, lead_Id], (updateErr, updateResult) => {
                if (updateErr) {
                    return res.status(500).json({ err: 'Internal server error' });
                }
                
                // Return success response
                return res.status(200).json({
                    message: "Lead updated successfully",
                    result: updateResult
                });
            });
        });
    } catch (e) {
        // Handle unexpected errors
        res.status(500).json({ error: e.message });
    }
}

const createFollowUpReport = async (req, res, next) => {
    try {
        const { lead_Id, u_Id, followUpDate, followUpPhase, followUpReport, status } = req.body;

        const insertFollowUpReport = 'INSERT INTO followupreport (lead_Id, u_Id, followUpDate, followUpPhase, followUpReport, status) VALUES (?, ?, ?, ?, ?, ?)';
        
        db.query(
            insertFollowUpReport,
            [ lead_Id, u_Id, followUpDate, followUpPhase, followUpReport, status ],
            (err, result) => {
                if(err){
                    res.status(500).json({
                        err: "Interval server error"
                    })
                }
                res.status(200).json({
                    result
                })
            }
         )
       
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

const getLeadDetails = async (req, res, next) => {
    try {
        const u_Id = req.params.user_id;
        console.log(u_Id);
        const getLead = 'SELECT * FROM leads WHERE u_Id = ?';
        db.query(getLead, [u_Id], (leadErr, leadResult) => {
            if (leadErr) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            if(leadResult.length == 0){
                return res.status(400).json({message: 'not found'})
            }

            const getFollowUp = 'SELECT * FROM followupreport WHERE u_Id = ?';
        
            db.query(getFollowUp, [u_Id], (followUpErr, followUpResult) => {
                if (followUpErr) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if(followUpResult.length == 0){
                    return res.status(400).json({message: 'not found'})
                }
        
                // Return the retrieved data
                // console.log(leadResult, followUpResult);
                return res.status(200).json({
                    lead: leadResult,
                    followUp: followUpResult
                });
            });
        });


    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

const updateMeeting = (req, res) => {
    const leadId = req.params.leadId;
    const { nextFollowDate, nextFollowPhase } = req.body; // Assuming you are sending these values in the request body

    const updateLeadQuery = `
        UPDATE leads 
        SET
            nextFollowDate = ?,
            nextFollowPhase = ?
        WHERE lead_Id = ?
    `;

    db.query(updateLeadQuery, [nextFollowDate, nextFollowPhase, leadId], (updateErr, updateResult) => {
        if (updateErr) {
            return res.status(500).json({ err: 'Internal server error' });
        }

        // Return success response
        return res.status(200).json({
            message: "Lead updated successfully",
            result: updateResult
        });
    });
};


module.exports = {test, addLead,updateLead ,createFollowUpReport , getLeadDetails, updateMeeting};