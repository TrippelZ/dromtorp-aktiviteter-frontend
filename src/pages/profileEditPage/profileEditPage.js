import { useLoaderData, useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import './profileEditPage.css';
import { useEffect, useState } from 'react';
import { ReactComponent as ReturnIcon } from '../../assets/return.svg';

function ProfileEditPage() {
  const navigate    = useNavigate();
  const sessionInfo = useLoaderData();

  useEffect(() => {
    if (!sessionInfo.valid) {
      navigate("/login");
    }
  }, [sessionInfo, navigate]);


  const [firstName      , SetFirstName      ] = useState(sessionInfo.data.firstName);
  const [lastName       , SetLastName       ] = useState(sessionInfo.data.lastName);
  const [email          , SetEmail          ] = useState(sessionInfo.data.email);
  const [oldPassword    , SetOldPassword    ] = useState("");
  const [newPassword    , SetNewPassword    ] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [deleteConfirm  , SetDeleteConfirm  ] = useState("");

  const [nameError    , SetNameError    ] = useState("");
  const [emailError   , SetEmailError   ] = useState("");
  const [passwordError, SetPasswordError] = useState("");
  const [deleteError  , SetDeleteError  ] = useState("");

  async function UpdateName() {
    if (firstName === "") {
      SetNameError("Mangler fornavn.");
      return;
    }

    if (lastName === "") {
      SetNameError("Mangler etternavn.");
      return;
    }

    if (firstName === sessionInfo.data.firstName && lastName === sessionInfo.data.lastName) {
      SetNameError("Ingen forandring.");
      return;
    }

    // api call here
  }

  async function UpdateEmail() {
    if (email === "") {
      SetEmailError("Mangler epost.");
      return;
    }

    if (email === sessionInfo.data.email) {
      SetEmailError("Ingen forandring.");
      return;
    }

    // api call here
  }

  async function UpdatePassword() {
    if (oldPassword === "") {
      SetPasswordError("Mangler gammelt passord.");
      return;
    }

    if (newPassword === "") {
      SetPasswordError("Mangler nytt passord.");
      return;
    }

    if (confirmPassword === "") {
      SetPasswordError("Mangler bekreftelse av nytt passord.");
      return;
    }

    if (newPassword !== confirmPassword) {
      SetPasswordError("Nytt passord og bekreftelse er ikke likt.");
      return;
    }

    // api call here
  }

  async function DeleteUser() {
    if (deleteConfirm === "") {
      SetDeleteError("Mangler passord bekreftelse.")
      return;
    }

    // api call here
  }

  return (
    <>
    <Menu />

    <div className="content profile-content">
        <h1 className="content-title">Drømtorp Aktiviteter</h1>

        {sessionInfo.data ? <>
        
          <h2 className="profile-title">{sessionInfo.data.firstName} {sessionInfo.data.lastName}
            <ReturnIcon onClick={() => navigate("/user/"+sessionInfo.userId)} className="profile-edit-return-icon" />
          </h2>
          <br />

          <h3 className="profile-edit-name-title">Navn:</h3>
          <input type="text" className="profile-firstName-edit" placeholder="Fornavn" value={firstName} onChange={(event) => SetFirstName(event.target.value)} />
          <input type="text" className="profile-lastName-edit" placeholder="Etternavn" value={lastName} onChange={(event) => SetLastName(event.target.value)} />
          <button type="button" onClick={UpdateName}>Oppdater</button>
          <p className="profile-edit-error">{!nameError ? "" : nameError}</p>
          
          <br />
          <h3 className="profile-edit-email-title">Epost:</h3>
          <input type="email" className="profile-email-edit" value={email} onChange={(event) => SetEmail(event.target.value)} />
          <button type="button" onClick={UpdateEmail}>Oppdater</button>
          <p className="profile-edit-error">{!emailError ? "" : emailError}</p>

          <br />
          <h3 className="profile-edit-password-title">Passord:</h3>
          <input type="password" className="profile-password-edit" placeholder="Gammelt passord" onChange={(event) => SetOldPassword(event.target.value)} />
          <input type="password" className="profile-password-edit" placeholder="Nytt passord" onChange={(event) => SetNewPassword(event.target.value)} />
          <input type="password" className="profile-password-edit" placeholder="Gjenta nytt passord" onChange={(event) => SetConfirmPassword(event.target.value)} />
          <button type="button" onClick={UpdatePassword}>Oppdater</button>
          <p className="profile-edit-error">{!passwordError ? "" : passwordError}</p>

          <br />
          <h3>Slett bruker:</h3>
          <input type="password" className="profile-delete-password" placeholder="Passord kreves for sletting!" onChange={(event) => SetDeleteConfirm(event.target.value)} />
          <button type="button" onClick={DeleteUser}>Slett</button>
          <p className="profile-edit-error">{!deleteError ? "" : deleteError}</p>
        </> : <>

          <h2>{sessionInfo.error}</h2>

        </>}
      
    </div>
    </>
  );
}

export default ProfileEditPage;
