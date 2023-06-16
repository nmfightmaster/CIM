const ldap = require("ldapjs");
require("dotenv").config({ path: "../.env" });
const assert = require("assert");
const { get } = require("http");

const getOUFromDN = (dn) => {
  const matches = dn.match(/OU=([^,]+)/gi);
  if (matches && matches.length > 0) {
    const ous = matches.map((match) => match.split("=")[1]);
    return ous.reverse().splice(2).join("\\");
  }
  return null; // Return null if no OU component is found
};

const getOUFromDeviceName = (deviceName) => {
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({
      url: process.env.LDAP_PATH,
      referrals: true,
    });

    const bindDN = process.env.LDAP_USER.toString();
    const bindCredentials = process.env.LDAP_PASS.toString();

    client.bind(bindDN, bindCredentials, (err) => {
      if (err) {
        console.error("LDAP bind error:", err);
        reject(err);
        return;
      }

      const options = {
        scope: "sub", // Search scope: 'base', 'one', or 'sub'
        filter: `(cn=${deviceName})`, // LDAP filter to retrieve specific entries
        attributes: ["distinguishedName"], // Attributes to retrieve
      };

      client.search("OU=Workstations,DC=chas,DC=local", options, (err, res) => {
        assert.ifError(err);

        res.on("searchRequest", (searchRequest) => {});

        let ou = null;

        res.on("searchEntry", (entry) => {
          const attributes = entry.attributes;

          for (const attribute of attributes) {
            const attributeValues = attribute.values;
            const value = getOUFromDN(attributeValues[0]);
            ou = value;
          }
        });

        res.on("error", (err) => {
          console.error("error: " + err.message);
          reject(err);
        });

        res.on("end", (result) => {
          client.unbind();
          if (ou) {
            resolve(ou);
          } else {
            reject(new Error("OU not found"));
          }
        });
      });
    });
  });
};

module.exports = { getOUFromDeviceName };
