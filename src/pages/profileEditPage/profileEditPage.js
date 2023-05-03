import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Menu from '../../components/menu/menu';
import './profileEditPage.css';
import { useEffect, useState } from 'react';
import { ReactComponent as ReturnIcon } from '../../assets/return.svg';
import { UpdateUserEmail, UpdateUserName, UpdateUserPassword } from '../../api';

function ProfileEditPage() {
  const navigate    = useNavigate();
  const sessionInfo = useLoaderData();
  const { userId }  = useParams();

  useEffect(() => {
    if (!sessionInfo.valid) {
      navigate("/login");
    }
  }, [sessionInfo, navigate]);


  const [titleFirstName, SetTitleFirstName] = useState(sessionInfo.data.firstName);
  const [titleLastName , SetTitleLastName ] = useState(sessionInfo.data.lastName);

  const [currentEmail, SetCurrentEmail] = useState(sessionInfo.data.email);

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

  const [nameSuccess    , SetNameSuccess    ] = useState("");
  const [emailSuccess   , SetEmailSuccess   ] = useState("");
  const [passwordSuccess, SetPasswordSuccess] = useState("");

  async function UpdateName() {
    const fName = firstName;
    const lName = lastName;

    if (fName === "") {
      SetNameSuccess("");
      SetNameError("Mangler fornavn.");
      return;
    }

    if (lName === "") {
      SetNameSuccess("");
      SetNameError("Mangler etternavn.");
      return;
    }

    if (fName === titleFirstName && lName === titleLastName) {
      SetNameSuccess("");
      SetNameError("Ingen forandring.");
      return;
    }

    const nameChanged = await UpdateUserName(userId, fName, lName);

    if (nameChanged.Error) {
      SetNameSuccess("");
      SetNameError(nameChanged.Error);
      return;
    }

    SetNameError("");
    SetNameSuccess("Navn oppdatert.");
    SetTitleFirstName(fName);
    SetTitleLastName(lName);
  }

  async function UpdateEmail() {
    const newEmail = email;

    if (newEmail === "") {
      SetEmailSuccess("");
      SetEmailError("Mangler epost.");
      return;
    }

    if (newEmail === currentEmail) {
      SetEmailSuccess("");
      SetEmailError("Ingen forandring.");
      return;
    }

    const emailChanged = await UpdateUserEmail(userId, newEmail);

    if (emailChanged.Error) {
      SetEmailSuccess("");
      SetEmailError(emailChanged.Error);
      return;
    }

    SetEmailError("");
    SetEmailSuccess("Epost oppdatert.");
    SetCurrentEmail(newEmail);
  }

  async function UpdatePassword() {
    if (oldPassword === "" && !sessionInfo.isAdmin) {
      SetPasswordSuccess("");
      SetPasswordError("Mangler gammelt passord.");
      return;
    }

    if (newPassword === "") {
      SetPasswordSuccess("");
      SetPasswordError("Mangler nytt passord.");
      return;
    }

    if (confirmPassword === "") {
      SetPasswordSuccess("");
      SetPasswordError("Mangler bekreftelse av nytt passord.");
      return;
    }

    if (newPassword !== confirmPassword) {
      SetPasswordSuccess("");
      SetPasswordError("Nytt passord og bekreftelse er ikke likt.");
      return;
    }

    const passwordChanged = await UpdateUserPassword(userId, oldPassword, newPassword);

    if (!passwordChanged) {
      SetPasswordSuccess("");
      SetPasswordError("Problemer ved oppdatering av passord.");
      return;
    }
    
    if (passwordChanged.Error) {
      SetPasswordSuccess("");
      SetPasswordError(passwordChanged.Error);
      return;
    }

    SetPasswordError("");
    SetPasswordSuccess("Passord oppdatert. Du blir bedt om å logge inn når siden laster på nytt!");
  }

  async function DeleteUser() {
    if (deleteConfirm === "") {
      SetDeleteError("Mangler passord bekreftelse.")
      return;
    }

    SetDeleteError("Ikke ferdig ennå...")

    // api call here
  }

  return (
    <>
    <Menu />

    <div className="content profile-content">
        <h1 className="content-title">Drømtorp Aktiviteter</h1>

        {sessionInfo.data ? <>
        
          <h2 className="profile-title">{titleFirstName} {titleLastName}
            <ReturnIcon onClick={() => navigate("/user/"+sessionInfo.userId)} className="profile-edit-return-icon" />
          </h2>
          <br />

          <h3 className="profile-edit-name-title">Navn:</h3>
          <input type="text" className="profile-firstName-edit" placeholder="Fornavn" value={firstName} onChange={(event) => SetFirstName(event.target.value)} />
          <input type="text" className="profile-lastName-edit" placeholder="Etternavn" value={lastName} onChange={(event) => SetLastName(event.target.value)} />
          <button type="button" onClick={UpdateName}>Oppdater</button>
          <p className="profile-edit-error">{!nameError ? "" : nameError}</p>
          <p className="profile-edit-success">{!nameSuccess ? "" : nameSuccess}</p>
          
          <br />
          <h3 className="profile-edit-email-title">Epost:</h3>
          <input type="email" className="profile-email-edit" value={email} onChange={(event) => SetEmail(event.target.value)} />
          <button type="button" onClick={UpdateEmail}>Oppdater</button>
          <p className="profile-edit-error">{!emailError ? "" : emailError}</p>
          <p className="profile-edit-success">{!emailSuccess ? "" : emailSuccess}</p>

          <br />
          <h3 className="profile-edit-password-title">Passord:</h3>
          {!sessionInfo.isAdmin && <input type="password" className="profile-password-edit" placeholder="Gammelt passord" onChange={(event) => SetOldPassword(event.target.value)} />}
          <input type="password" className="profile-password-edit" placeholder="Nytt passord" onChange={(event) => SetNewPassword(event.target.value)} />
          <input type="password" className="profile-password-edit" placeholder="Gjenta nytt passord" onChange={(event) => SetConfirmPassword(event.target.value)} />
          <button type="button" onClick={UpdatePassword}>Oppdater</button>
          <p className="profile-edit-error">{!passwordError ? "" : passwordError}</p>
          <p className="profile-edit-success">{!passwordSuccess ? "" : passwordSuccess}</p>

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
