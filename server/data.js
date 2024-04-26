let users = [
    {
        "name": "John Doe",
        "number": "1234567890",
        "email": "john@example.com",
        "password": "password123"
    }, 
];
let leads = [
    {
        lead_Id: "",
        u_id: "",
        fullName: "John Doe",
        mobileNo: "1234567890",
        email: "john@example.com",
        address: "123 Main Street",
        inquiryType: "SMM",
        nextFollowDate: "",
        nextFollowPhase: "",
    }, 
];
const FollowUpReport =  [
    {   
        lead_Id: "",
        u_Id: "",
        followUpDate: "",
        followUpPhase: "",
        followUpReport: "",
        status: "",
    },
]

module.exports = {users, leads};
