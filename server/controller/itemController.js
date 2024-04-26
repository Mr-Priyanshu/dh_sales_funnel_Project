// const {leads} = require('../data');
// const { v4: uuidv4 } = require('uuid');
const {db} = require('../config/db');
const test = async (req, res) => {
    res.send({data: "Test Sucess Full"});
}

const addLead = async (req, res, next) => {
    try {
        const {u_Id,fullName, mobileNo, email, address, inquiryType} = req.body;
        console.log(u_Id,fullName, mobileNo, email, address, inquiryType);
        const insertLead = `INSERT INTO leads (
            u_Id, fullName, mobileNo, email, address, inquiryType) VALUES (?, ?, ?, ?, ?, ? )`;
        const insertLeadParams = [ u_Id,  fullName, mobileNo, email, address, inquiryType];

        db.query(
            insertLead, 
            insertLeadParams, 
            (err, result) => {
                if (err) {
                    res.status(500).json({ error: "Internal server error" });
                  } else {
                    console.log(result);
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
        const { lead_Id, fullName, mobileNo, email, address, inquiryType } = req.body;
        console.log(lead_Id, fullName, mobileNo, email, address, inquiryType)
        const updateLeadQuery = `
        UPDATE leads 
        SET fullName = ?, 
            mobileNo = ?, 
            email = ?, 
            address = ?, 
            inquiryType = ?
        WHERE lead_Id = ?
    `;
    
    db.query(updateLeadQuery, [fullName, mobileNo, email, address, inquiryType, lead_Id], (updateErr, updateResult) => {
        if (updateErr) {
            return res.status(500).json({ err: 'Internal server error' });
        }
        
        // Return success response
        console.log(updateResult);
        return res.status(200).json({
            message: "Lead updated successfully",
            result: updateResult
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
            const getFollowUp = 'SELECT * FROM followupreport WHERE u_Id = ?';
        
            db.query(getFollowUp, [u_Id], (followUpErr, followUpResult) => {
                if (followUpErr) {
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if(followUpResult.length == 0 && leadResult.length == 0){
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

const updateMeeting = (req, res, next) => {
    const { lead_Id, nextFollowDate, nextFollowPhase } = req.body; 

    const updateLeadQuery = `
        UPDATE leads 
        SET
            nextFollowDate = ?,
            nextFollowPhase = ?
        WHERE lead_Id = ?
    `;
    console.log('yes in the update meeting');
    db.query(updateLeadQuery, [nextFollowDate, nextFollowPhase, lead_Id], (updateErr, updateResult) => {
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