import Styled, { createGlobalStyle } from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const defaultData = {
  followPhase: '',
  followUpReport: '',
  followUpDate: '',
  status: '',
}
function FollowUpPage() {
  const [followUp, setFollowUp] = useState([]);
  const [userData, setuserData] = useState({});
  const [leadReport, setLeadReport] = useState(defaultData);
  const [nowEffect, setNowEffect] = useState(true);
  
  const {lead_Id} = useParams();
  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(leadReport);
    setLeadReport(defaultData);
    setNowEffect(!nowEffect);
    axios.post('http://localhost:8080/insertfollowup', {u_Id: user.u_Id, lead_Id, ...leadReport})
      .then((res) => {
          console.log(res.data);
          return res.data;
      }).catch((err) => console.log(err, 'in the followPage'));
  }

  const handleReport = (e, prop) => {
        let value = e.target.value;
        console.log(leadReport);
        setLeadReport({...leadReport, [prop]: value});
  }
  useEffect(() => {
    axios.get(`http://localhost:8080/getlead/${user.u_Id}`)
      .then((res) => {
          let followUpArr = [...res.data.followUp];
          let leadArr = [...res.data.lead];
          let onlyLeadfollow = followUpArr.filter((followItem) => followItem.lead_Id == lead_Id);
          let {fullName, inquiryType} = leadArr.find((leadItem) => leadItem.lead_Id == lead_Id);
          setFollowUp([...onlyLeadfollow]);
          setuserData({fullName, inquiryType});
          console.log(followUp,userData);
          return res.data;
      }).catch((err) => console.log(err, 'Error in followuppage'))
  }, [nowEffect])
  return (
    <Wrapper>
      <div className="container">
        <div>
          <div className=' p-2 border rounded'>
            <div className=' p-2 m-4 '>
              <form onSubmit={handleSubmit}>
                  <div class="mx-3">
                    <label for="ClientName" class="form-label">Client Name</label>
                    <input type="email" value={userData.fullName} class="form-control" id="exampleInputEmail1" aria-describedby="Clientname" placeholder='Mansingh ' disabled />
                  </div>
                  <div class="mx-3">
                    <label for="inputdate" class="form-label">Select FollowUp Date</label>
                    <input required value={leadReport.followUpDate} type="date" onChange={(e) => handleReport(e, 'followUpDate')} class="form-control" id="inputdate" />
                  </div>
                  <div className='mx-3'>
                    <label for="phaseDataList" className="form-label">Select FolloUp Phase</label>
                    <select value={leadReport.followUpPhase} onChange={(e) => handleReport(e, 'followUpPhase')} className="form-select form-select-sm" aria-label=".form-select-sm status">
                    <option disabled value="">Open this select phase</option>
                    <option value="Phase 1">Phase 1</option>
                    <option value="Phase 2">Phase 2</option>
                    <option value="Phase 3">Phase 3</option>
                    </select>
                  </div>
                  <div class="mx-3">
                    <label  for="inputReport" class="form-label">Enter Follow Up Report</label>
                    <input value={leadReport.followUpReport} onChange={(e) => handleReport(e, 'followUpReport')} class="form-control" id="inputReport" required/>
                  </div>
                  <div className='mx-3'>
                    <label for="statusDataList" className="form-label">Select Status</label>
                    <select required value={leadReport.status} onChange={(e) => handleReport(e, 'status')} className="form-select form-select-sm" aria-label=".form-select-sm status">
                    <option disabled value="">Open this select menu</option>
                    <option value="In" className='bg-secondary'>In</option>
                    <option value="Done" className='bg-success'>Done</option>
                    <option value="Hold" className='bg-warning'>Hold</option>
                    <option value="W I P" className='bg-primary'>W I P</option>
                    <option value="Out" className='bg-danger'>Out</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-dark m-3 ">Submit</button>
              </form>

            </div>
          </div>
        </div><br /><br />

        {/* Fill Data Show in table format */}
        <div className="heading text-center mb-3">
          <h3>On the Report</h3>
        </div>
        <div className="table-responsive">
          <table class="table text-decoration-none table-hover">
            <thead>
              <tr className='text-center table-light  '>
                <th scope="col">S No.</th>
                <th scope="col">Client Name</th>
                <th scope="col">Service(s)</th>
                <th scope="col">FollowUp Date</th>
                <th scope="col">FollowUp Phase</th>
                <th scope="col" >FollowUp Report</th>
                <th scope="col">Status</th>
                <th scope="col" colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className='text-center table-group-divider'>
              {
                followUp.map((lead, index) => {
                  return <tr>
                          <th scope="row">{index+1}</th>
                          <td>{userData.fullName}</td>
                          <td>{userData.inquiryType}</td>
                          <td>{lead.followUpDate}</td>
                          <td>{lead.followUpPhase}</td>
                          <td >{lead.followUpReport}</td>
                          <td className='bg-warning'>{lead.status}</td>
                          <td ><span className='btn btn-primary' >Update</span></td>
                          <td ><span className='btn btn-danger' >Remove</span></td>
                      </tr>
                })
              }
              
            </tbody>
          </table>
        </div>
      </div>


    </Wrapper>
  );
};

export default FollowUpPage;

const Wrapper = Styled.section`


   `