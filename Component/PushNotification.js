export const PushNotification = async (Lon, Lat, TypeWork) => {
  console.log(TypeWork);
  console.log(Lon);
  console.log("Lat");

  await fetch(
    `http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/distanceToNotification?lon1=${Lon}&lat1=${Lat}&typejob=${TypeWork}`,
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
      //console.log(data);
      console.log("done");
    })
    .catch(function (err) {
      console.error(err);
    });
};
