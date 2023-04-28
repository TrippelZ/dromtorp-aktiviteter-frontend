//const API_Address = "https://api.dromtorp-aktiviteter.com";
const API_Address = "http://127.0.0.1:3001";

function ValidateSession() {
    return new Promise(async (resolve) => {
        const response = await fetch(API_Address+"/validate", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            credentials: "include"
        });

        const data = await response.json();

        if (response.ok) {
            resolve(data.userId);
            return;
        }

        resolve(data);
    });
}

exports.ValidateSession = ValidateSession;