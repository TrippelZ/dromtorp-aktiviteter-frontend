import { useLoaderData, useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import './activityPage.css';
import { useEffect } from 'react';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';

function ActivityPage() {
    const navigate    = useNavigate();
    const sessionInfo = useLoaderData();

    useEffect(() => {
        if (!sessionInfo.valid) {
        navigate("/login");
        }
    }, [sessionInfo, navigate]);

    if (sessionInfo.data && sessionInfo.data.activityDate) {
        const date = new Date(sessionInfo.data.activityDate);

        const day   = date.toLocaleString("nb-NO", {day: "2-digit"});
        const month = date.toLocaleString("nb-NO", {month: "long"});
        const year  = date.toLocaleString("nb-NO", {year: "numeric"});

        const hour   = date.toLocaleString("nb-NO", {hour12: false, hour: "numeric"});
        const minute = date.toLocaleString("nb-NO", {hour12: false, minute: "numeric"});

        sessionInfo.data.dateString = `${day} ${month}, ${year} | ${(hour === "24" && "00") || hour}:${(minute.length > 1 && minute) || "0"+minute}`;
    }

    return (
    <>
    <Menu />

    <div className="content activityPage-content">
        <h1 className="content-title">Drømtorp Aktiviteter</h1>

        {(sessionInfo.data && <>
        
            <h2 className="activityPage-title">{sessionInfo.data.activityName}<EditIcon onClick={() => navigate("/activities/"+sessionInfo.data.activityID+"/configure")} className={!sessionInfo.canEdit ? "activity-edit-icon" : "activity-edit-icon activity-edit-icon-visible"} /></h2>
            <p>{sessionInfo.data.firstName + " " + sessionInfo.data.lastName}</p>
            <p>{sessionInfo.data.dateString}</p>
            <pre>{sessionInfo.data.activityDescription}</pre>

        

        </>) || "Aktivitet eksisterer ikke..."}

    </div>
    </>
  );
}

export default ActivityPage;
