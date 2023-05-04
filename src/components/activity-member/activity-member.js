import { useNavigate } from 'react-router-dom';
import './activity-member.css';

function ActivityMember(props) {
    const navigate = useNavigate();

    return (
        <div className="activity-member" onClick={() => {navigate("/user/"+props.id)}}>
            <h4 className="member-name">{props.name}</h4>
        </div>
    );
}

export default ActivityMember;
