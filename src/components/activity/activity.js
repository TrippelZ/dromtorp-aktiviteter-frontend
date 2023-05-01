import { useNavigate } from 'react-router-dom';
import './activity.css';

function Activity(props) {
    const navigate    = useNavigate();

    const date = new Date(props.date);

    const day   = date.toLocaleString("nb-NO", {day: "2-digit"});
    const month = date.toLocaleString("nb-NO", {month: "long"});
    const year  = date.toLocaleString("nb-NO", {year: "numeric"});

    const hour   = date.toLocaleString("nb-NO", {hour12: false, hour: "numeric"});
    const minute = date.toLocaleString("nb-NO", {hour12: false, minute: "numeric"});

    return (
        <div className="activity" onClick={() => {navigate("/activities/"+props.id)}}>
            <h3 className="activity-title">{props.title}</h3>
            <p className="activity-host">{props.host}</p>
            <p className="activity-date">{day} {month}, {year} | {(hour === "24" && "00") || hour}:{(minute.length > 1 && minute) || "0"+minute}</p>
            <p className="activity-description">{props.description}</p>
        </div>
    );
}

export default Activity;
