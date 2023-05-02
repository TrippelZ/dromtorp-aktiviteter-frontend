import { useLoaderData, useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import './activitiesPage.css';
import { useEffect } from 'react';
import Activity from '../../components/activity/activity';
import { useState } from 'react';

function ActivitiesPage() {
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

  if (sessionInfo.data) {
    activities = sessionInfo.data.filter(activity => activity.activityDate >= Date.now()).filter(activity => filterValue === "" ||
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

    <div className="content activities-content">
      <h1 className="content-title">Drømtorp Aktiviteter</h1>

      <h2>Alle oppkommende aktiviteter</h2>

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

      {
        ((!activities || activities.length <= 0) && "Ingen aktiviteter funnet!") || <ul className="activities-list">{activities}</ul>
      }
      
    </div>
    </>
  );
}

export default ActivitiesPage;
