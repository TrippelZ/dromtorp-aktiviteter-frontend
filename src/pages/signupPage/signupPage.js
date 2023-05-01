import { useLoaderData, useNavigate } from 'react-router-dom';
import './signupPage.css';
import { useEffect, useState } from 'react';
import { SignupRequest } from '../../api';

function SignupPage() {
  const navigate    = useNavigate();
  const sessionInfo = useLoaderData();

  useEffect(() => {
    if (sessionInfo.valid) {
      navigate("/home");
    }
  }, [sessionInfo, navigate]);


  const [submitDisabled      , SetSubmitDisabled      ] = useState(true);
  const [submitError         , SetSubmitError         ] = useState("");

  const [firstName           , SetFirstName           ] = useState("");
  const [firstNameError      , SetFirstNameError      ] = useState("");

  const [lastName            , SetLastName            ] = useState("");
  const [lastNameError       , SetLastNameError       ] = useState("");

  const [email               , SetEmail               ] = useState("");
  const [emailError          , SetEmailError          ] = useState("");

  const [password            , SetPassword            ] = useState("");
  const [passwordError       , SetPasswordError       ] = useState("");
  const [passwordConfirmError, SetPasswordConfirmError] = useState("");

  useEffect(() => {
    if (emailError || passwordError || email === "" || password === "") {
      SetSubmitDisabled(true);
    } else {
      SetSubmitDisabled(false);
    }
  }, [emailError, passwordError, email, password]);


  function FirstNameChange(event) {
    const input = event.target.value;

    SetFirstName(input);

    if (input === "") {
      SetFirstNameError("Fyll inn fornavn.");
    } else {
      SetFirstNameError("");
    }
  }

  function FirstNameFocusLost(event) {
    const input = event.target.value;

    SetFirstName(input);

    if (input === "") {
      SetFirstNameError("Fyll inn fornavn.");
    }
  }

  function LastNameChange(event) {
    const input = event.target.value;

    SetLastName(input);

    if (input === "") {
      SetLastNameError("Fyll inn etternavn.");
    } else {
      SetLastNameError("");
    }
  }

  function LastNameFocusLost(event) {
    const input = event.target.value;

    SetLastName(input);

    if (input === "") {
      SetLastNameError("Fyll inn etternavn.");
    }
  }

  function EmailChange(event) {
    const input = event.target.value;

    SetEmail(input);

    if (input !== "" && !input.includes("@")) {
      SetEmailError("Ugyldig epost.");
    } else if (input === "") {
      SetEmailError("Fyll inn epost.");
    } else {
      SetEmailError("");
    }
  }

  function EmailFocusLost(event) {
    const input = event.target.value;

    SetEmail(input);

    if (input === "") {
      SetEmailError("Fyll inn epost.");
    }
  }

  function PasswordChange(event) {
    const input = event.target.value;

    SetPassword(input);

    if (input === "") {
      SetPasswordError("Fyll inn passord.");
    } else {
      SetPasswordError("");
    }
  }

  function PasswordFocusLost(event) {
    const input = event.target.value;

    SetPassword(input);

    if (input === "") {
      SetPasswordError("Fyll inn passord.");
    } else {
      SetPasswordError("");
    }
  }

  function PasswordConfirmChange(event) {
    const input = event.target.value;

    if (input !== "" && input !== password) {
      SetPasswordConfirmError("Passord er ikke likt.");
    } else if (input === "") {
      SetPasswordConfirmError("Fyll inn passord.");
    } else {
      SetPasswordConfirmError("");
    }
  }

  function PasswordConfirmFocusLost(event) {
    const input = event.target.value;

    if (input !== "" && input !== password) {
      SetPasswordConfirmError("Passord er ikke likt.");
    } else if (input === "") {
      SetPasswordConfirmError("Fyll inn passord.");
    } else {
      SetPasswordConfirmError("");
    }
  }


  async function SignupAttempt(event) {
    event.preventDefault();

    const signupAttempt = await SignupRequest(firstName, lastName, email, password);
    
    if (!signupAttempt) {
      SetSubmitError("Problemer med å nå serveren!");
    } else if (signupAttempt.Error) {
      SetSubmitError(signupAttempt.Error);
    } else {
      navigate("/home");
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-content">
        <h1 className="signup-title">Drømtorp Aktiviteter</h1>

        <div className="signup-form-container">
          <h2 className="signup-form-title">Registrer deg nå for å se aktivitetene!</h2>
          <form onSubmit={SignupAttempt}>
            <label className="signup-label">Fornavn:</label>
            <input name="firstName" type="text" required className={(!firstNameError && "signup-input") || "signup-input signup-error"} onChange={FirstNameChange} onBlur={FirstNameFocusLost} />
            <p className="signup-error-message" id="signup-error-firstName">{firstNameError}</p>

            <label className="signup-label">Etternavn:</label>
            <input name="lastName" type="text" required className={(!lastNameError && "signup-input") || "signup-input signup-error"} onChange={LastNameChange} onBlur={LastNameFocusLost} />
            <p className="signup-error-message" id="signup-error-lastName">{lastNameError}</p>

            <label className="signup-label">Epost:</label>
            <input name="email" type="email" required className={(!emailError && "signup-input") || "signup-input signup-error"} onChange={EmailChange} onBlur={EmailFocusLost} />
            <p className="signup-error-message" id="signup-error-email">{emailError}</p>

            <label className="signup-label">Passord:</label>
            <input name="password" type="password" required className={(!passwordError && "signup-input") || "signup-input signup-error"} onChange={PasswordChange} onBlur={PasswordFocusLost} />
            <p className="signup-error-message" id="signup-error-password">{passwordError}</p>

            <label className="signup-label">Bekreft Passord:</label>
            <input name="passwordConfirm" type="password" required className={(!passwordConfirmError && "signup-input") || "signup-input signup-error"} onChange={PasswordConfirmChange} onBlur={PasswordConfirmFocusLost} />
            <p className="signup-error-message" id="signup-error-passwordConfirm">{passwordConfirmError}</p>

            <br />

            <button type="submit" className="signup-submit" disabled={submitDisabled}>Opprett Bruker</button>
            <p className="signup-error-message" id="signup-error-submit">{submitError}</p>
            <button type="button" className="signup-submit" onClick={() => {navigate("/login")}} >Logg Inn</button>
          </form>
        </div>
        
        <div className="signup-footer-container">
          <hr className="signup-footer-hr" />
          <footer className="signup-footer">
            ©{new Date().getFullYear()} Zander Øyjordet Christensen
          </footer>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
