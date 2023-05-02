import { useLoaderData, useNavigate } from 'react-router-dom';
import './loginPage.css';
import { useEffect, useState } from 'react';
import { LoginRequest } from '../../api';

function LoginPage() {
  const navigate    = useNavigate();
  const sessionInfo = useLoaderData();

  useEffect(() => {
    if (sessionInfo.valid) {
      navigate("/home");
    }
  }, [sessionInfo, navigate]);


  const [submitDisabled, SetSubmitDisabled] = useState(true);
  const [submitError   , SetSubmitError   ] = useState("");
  const [emailError    , SetEmailError    ] = useState("");
  const [passwordError , SetPasswordError ] = useState("");
  const [email         , SetEmail         ] = useState("");
  const [password      , SetPassword      ] = useState("");

  useEffect(() => {
    if (emailError || passwordError || email === "" || password === "") {
      SetSubmitDisabled(true);
    } else {
      SetSubmitDisabled(false);
    }
  }, [emailError, passwordError, email, password]);


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


  async function LoginAttempt(event) {
    event.preventDefault();

    const loginAttempt = await LoginRequest(email, password);
    
    if (!loginAttempt) {
      SetSubmitError("Problemer med å nå serveren!");
    } else if (loginAttempt.Error) {
      SetSubmitError(loginAttempt.Error);
    } else {
      navigate("/home");
    }
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <h1 className="login-title">Drømtorp Aktiviteter</h1>

        <div className="login-form-container">
          <h2 className="login-form-title">Logg inn for å se aktivitetene!</h2>
          <form className="login-form" onSubmit={LoginAttempt}>
            <label className="login-label">Epost:</label>
            <input name="email" type="email" required className={(!emailError && "login-input") || "login-input login-error"} onChange={EmailChange} onBlur={EmailFocusLost} />
            <p className="login-error-message" id="login-error-email">{emailError}</p>

            <label className="login-label">Passord:</label>
            <input name="password" type="password" required className={(!passwordError && "login-input") || "login-input login-error"} onChange={PasswordChange} onBlur={PasswordFocusLost} />
            <p className="login-error-message" id="login-error-password">{passwordError}</p>

            <br />

            <button type="submit" className="login-submit" disabled={submitDisabled}>Logg Inn</button>
            <p className="login-error-message" id="login-error-submit">{submitError}</p>
            <button type="button" className="login-submit" onClick={() => {navigate("/register")}} >Opprett Bruker</button>
          </form>
        </div>
        
        <div className="login-footer-container">
          <hr className="login-footer-hr" />
          <footer className="login-footer">
            ©{new Date().getFullYear()} Zander Øyjordet Christensen
          </footer>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
