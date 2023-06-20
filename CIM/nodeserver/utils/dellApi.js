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
    `${warrantyUrl}/asset-entitlements?servicetags=${serviceTag}`,
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
      for (let i = 2; i >= 0; i--) {
        try {
          const date = new Date(data[0].entitlements[i].endDate);
          const warrantyInfo = date.toLocaleDateString();
          console.log(
            "Service Tag:" + serviceTag + " Warranty: " + warrantyInfo
          );
          return warrantyInfo;
        } catch (error) {
          console.log("entitlements[" + i + "] is undefined");
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
