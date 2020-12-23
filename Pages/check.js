import React from "react";
let url =
    "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/login";
export const checkStudentDetils = async (Email, Password) => {
    let returnedObj = null;
    return await fetch(
        url + `?email=${Email}&password=${Password}`,

        {
            method: "GET", // 'GET', 'POST', 'PUT', 'DELETE', etc.
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
        }
    ) // Call the fetch function passing the url of the API as a parameter
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            if (data != null) {
                returnedObj = data;
            } else {
                returnedObj = null;
            }
            return returnedObj;
        })
        .catch(function (err) {
            console.error(err);
        });
};
