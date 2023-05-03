//const API_ADDRESS = "https://api.dromtorp-aktiviteter.com";
const API_ADDRESS = "http://127.0.0.1:3001";

export function ValidateSession() {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/validate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        try {
            const data = await response.json();

            if (response.ok) {
                resolve(data.userId);
                return;
            }

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function LoginRequest(email, password) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/login", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        try {
            const data = await response.json();

            if (response.ok) {
                resolve(data.userId);
                return;
            }

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function Logout() {
    return new Promise(async (resolve) => {
        await fetch(API_ADDRESS+"/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        resolve();
    });
}

export function SignupRequest(firstName, lastName, email, password) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/register", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        });

        try {
            const data = await response.json();

            if (response.ok) {
                resolve(data.userId);
                return;
            }

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function GetActivities() {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/activity", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function GetActivityById(activityID) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/activity/"+activityID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function GetUserActivities(userID) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/user/"+userID+"/activities", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function GetPermissionLevel(userID) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/user/"+userID+"/permissions", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function JoinActivity(activityID) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/user/"+activityID+"/join", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function QuitActivity(activityID) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/user/"+activityID+"/quit", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function GetUserInfoFromId(userID) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/user/"+userID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve();
            return;
        }
    });
}

export function UpdateUserName(userID, firstName, lastName) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/user/"+userID+"/name", {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName
            })
        });

        if (response.ok) {
            resolve(true);
            return;
        }

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve(false);
        }
    });
}

export function UpdateUserEmail(userID, email) {
    return new Promise(async (resolve) => {
        const response = await fetch(API_ADDRESS+"/user/"+userID+"/email", {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: email
            })
        });

        if (response.ok) {
            resolve(true);
            return;
        }

        try {
            const data = await response.json();

            resolve(data);
            return;
        }
        catch(error) {
            resolve(false);
        }
    });
}