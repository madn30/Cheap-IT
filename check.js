import React from "react";
let url =
  "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/login";
export const checkStudentDetils = async (Email, Password) => {
  let returnedObj = null;
  return await fetch(url + `?email=${Email}&password=${Password}`, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  })
    .then((resp) => resp.json())
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
