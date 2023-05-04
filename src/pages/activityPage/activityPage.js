import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import './activityPage.css';
import { useEffect, useState } from 'react';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import ActivityMember from '../../components/activity-member/activity-member';
import { JoinActivity, QuitActivity } from '../../api';

function ActivityPage() {
    const navigate       = useNavigate();
    const sessionInfo    = useLoaderData();
    const { activityId } = useParams();

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


    const [buttonText   , SetButtonText   ] = useState("")
    const [buttonError  , SetButtonError  ] = useState("");
    const [buttonSuccess, SetButtonSuccess] = useState("");

    useEffect(() => {
        if (!sessionInfo.members) return;

        for (let i = 0; i < sessionInfo.members.length; ++i) {
            if (sessionInfo.members[i].userID == sessionInfo.userId) {
                SetButtonText("Meld av!")
            }
        }

        if (buttonText === "") {
            SetButtonText("Meld på!")
        }
    }, [sessionInfo, SetButtonText, buttonText])

    let members;

    if (sessionInfo.members) {
        if (typeof sessionInfo.members === "object") {
            members = sessionInfo.members.map(member =>
                <li key={member.userID}>
                    <ActivityMember
                        id={member.userID}
                        name={member.firstName + " " + member.lastName}
                    />
                </li>
            )
        } else {
            members = "Ingen medlemmer!"
        }
    }

    const [canToggle, SetCanToggle] = useState(true);

    async function ToggleActivity() {
        if (!canToggle) return;
        SetCanToggle(false);

        let response = {};

        if (buttonText === "Meld av!") {
            const success = await QuitActivity(activityId);
            if (success && success.error) {
                response.error   = success.error;
                response.success = false;
            } else {
                response.error   = false;
                response.success = "Meldt av.";
            }
        } else {
            const success = await JoinActivity(activityId);
            if (success && success.error) {
                response.error   = success.error;
                response.success = false;
            } else {
                response.error   = false;
                response.success = "Meldt på.";

            }
        }

        SetButtonError(response.error || "");
        SetButtonSuccess(response.success || "");

        setTimeout(() => navigate(0), 1_000)
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

            <button type="button" className="activity-button" onClick={ToggleActivity}>{buttonText}</button>
            <p className="activity-button-error">{buttonError}</p>
            <p className="activity-button-success">{buttonSuccess}</p>

            <h3 className="activity-members-title">Påmeldte brukere:</h3>

            {sessionInfo.members ?
                <ul className="member-list">
                    {members}
                </ul> : {members}
            }

        

        </>) || "Aktivitet eksisterer ikke..."}

    </div>
    </>
  );
}

export default ActivityPage;
