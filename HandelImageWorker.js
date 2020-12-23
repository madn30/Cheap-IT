export const HandelImageWorker = async (images, data) => {
  for (let i = 0; i <= images.length; i++) {
    let obj = {
      base64String: images[i]["uri"],
      name: i,
      path: data.ID,
    };
    await fetch(
      "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site11/api/Upload",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(obj),
      }
    )
      .then((response) => response.json())
      .then(function (data) {})

      .catch((err) => {
        console.error(err);
      });
  }

  return "done";
};
