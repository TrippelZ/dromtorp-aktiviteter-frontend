import { useLoaderData, useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import './profilePage.css';
import { useEffect, useState } from 'react';
import Activity from '../../components/activity/activity';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';

function ProfilePage() {
  const navigate    = useNavigate();
  const sessionInfo = useLoaderData();

  useEffect(() => {
    if (!sessionInfo.valid) {
      navigate("/login");
    }
  }, [sessionInfo, navigate]);


  const [sortType   , SetSortingType] = useState("activityDate");
  const [filterValue, SetFilterValue] = useState("");
  const [filterType , SetFilterType ] = useState("activityName");

  let activities;

  if (sessionInfo.activities) {
    activities = sessionInfo.activities.filter(activity => activity.activityDate >= Date.now()).filter(activity => filterValue === "" ||
    (filterType === "activityName" && activity.activityName.toLowerCase().includes(filterValue.toLowerCase())) ||
    (filterType === "activityHost" && (activity.firstName + " " + activity.lastName).slice(0, filterValue.length).toLowerCase() === filterValue.toLowerCase()) ||
    (filterType === "activityDate" && activity.activityDate === new Date(filterValue).getTime())).sort((a, b) => a[sortType] > b[sortType] ? 1 : -1).map(activity =>
      <li key={activity.activityID}>
        <Activity
          id={activity.activityID}
          title={activity.activityName}
          host={activity.firstName + " " + activity.lastName}
          date={activity.activityDate}
          description={activity.activityDescription}
        />
      </li>
    )
  }

  return (
    <>
    <Menu />

    <div className="content profile-content">
        <h1 className="content-title">Drømtorp Aktiviteter</h1>

        {sessionInfo.data ? <>
        
            <h2 className="profile-title">{sessionInfo.data.firstName} {sessionInfo.data.lastName} <EditIcon onClick={() => navigate("/user/"+sessionInfo.userId+"/configure")} className={!sessionInfo.canEdit ? "profile-edit-icon" : "profile-edit-icon profile-edit-icon-visible"} /></h2>
            <br />
            <h3 className="profile-email-title">Epost:</h3> <p className="profile-email">{sessionInfo.data.email}</p>
            
            <h3 className="profile-activities-title">Bruker Aktiviteter</h3>
            

            {activities ? <>

                <h3 className="activities-filter-title">Sorter etter:</h3>
                <select onChange={(event) => SetSortingType(event.target.value)} >
                    <option value={"activityDate"}>Dato</option>
                    <option value={"activityHost"}>Holder</option>
                    <option value={"activityName"}>Navn</option>
                </select>

                <br />

                <h3 className="activities-filter-title">Filtrer:</h3>
                <input onChange={(event) => SetFilterValue(event.target.value)} onBlur={(event) => SetFilterValue(event.target.value)} type={
                    (filterType === "activityDate" && "datetime-local") || "text"
                }></input>
                <select onChange={(event) => SetFilterType(event.target.value)} >
                    <option value={"activityName"}>Navn</option>
                    <option value={"activityDate"}>Dato</option>
                    <option value={"activityHost"}>Holder</option>
                </select>

                <br />

                <ul className="activities-list">{activities}</ul>

            </> : <>
            
                {sessionInfo.activities ? <>
                    
                    Ingen aktiviteter funnet!

                </> : <>
                
                    {sessionInfo.error}
                
                </>}
            </>}
        </> : <>

            <h2>{sessionInfo.error}</h2>

        </>}
      
    </div>
    </>
  );
}

export default ProfilePage;
