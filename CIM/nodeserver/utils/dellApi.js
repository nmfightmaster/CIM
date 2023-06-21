const { get } = require("dottie");

require("dotenv").config({ path: "./.env" });

const getAuthToken = async () => {
  const clientId = process.env.DELL_CLIENT_ID;
  const clientSecret = process.env.DELL_CLIENT_SECRET;

  const tokenUrl = process.env.DELL_API_AUTH_URL;

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${encodeURIComponent(
      clientId
    )}&client_secret=${encodeURIComponent(clientSecret)}`,
  });

  if (!response.ok) {
    throw new Error("Failed to obtain authorization token");
  }
  const data = await response.json();
  const authToken = data.access_token;
  return authToken;
};

const getWarrantyInfo = async (serviceTag) => {
  const authToken = await getAuthToken();
  const warrantyUrl = process.env.DELL_API_URL;
  const response = await fetch(
    `${warrantyUrl}/asset-entitlement-components?servicetag=${serviceTag}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to obtain warranty info");
  }
  const data = await response.json();
  try {
    if (serviceTag.length < 8) {
      if (data.entitlements.length === 1) {
        var date = new Date(data.entitlements[0].endDate);
        date.setDate(date.getDate() + 1); //add 1 day to account for "23:59" end time
        const formattedDate = date.toLocaleDateString();
        console.log(
          "Service Tag: ",
          serviceTag,
          "Warranty End Date: ",
          formattedDate,
          " (only date available)"
        );
        return formattedDate;
      } else {
        for (let i = 0; i < data.entitlements.length; i++) {
          if (
            data.entitlements[i].serviceLevelDescription.includes("ProSupport")
          ) {
            var date = new Date(data.entitlements[i].endDate);
            date.setDate(date.getDate() + 1); //add 1 day to account for "23:59" end time
            const formattedDate = date.toLocaleDateString();
            console.log(
              "Service Tag: ",
              serviceTag,
              "Warranty End Date: ",
              formattedDate
            );
            return formattedDate;
          }
        }
      }
    } else {
      return "No Dell warranty in place.";
    }
  } catch (error) {
    console.log("Error getting warranty info for: ", serviceTag);
    console.log(error);
  }
};
module.exports = { getWarrantyInfo, getAuthToken };
