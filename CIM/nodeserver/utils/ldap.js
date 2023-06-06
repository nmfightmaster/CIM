const ldap = require('ldapjs');
require('dotenv').config({ path: '../.env' });

const client = ldap.createClient({
  url: process.env.LDAP_PATH,
  referrals: true,
});

const bindDN="CN=Inventory Management LDAP,OU=Service Accounts,DC=chas,DC=local";
const bindCredentials="0OZwgg$hm16DCpB_nyv0%qd74mpm6VanvdE";

client.bind(bindDN, bindCredentials, (err) => {
  if (err) {
    console.error('LDAP bind error:', err);
    return;
  }

  const machineName='';
  
  const options = {
    scope: 'sub', // Search scope: 'base', 'one', or 'sub'
    filter: `(objectClass=*)`, // LDAP filter to retrieve specific entries
    attributes: ['*'],// Attributes to retrieve
    paged: true,
  };

  client.search('DC=chas,DC=local', options, (searchErr, searchRes) => {
    if (searchErr) {
      console.error('LDAP search error:', searchErr);
      return;
    }

    searchRes.on('searchEntry', (entry) => {
      console.log('Entry:', entry.object);
      //console.log('Entry: ', entry)
    });

    searchRes.on('error', (error) => {
      console.error('LDAP search result error:', error);
    });

    searchRes.on('end', (result) => {
      console.log('LDAP search finished. Status:', result.status);
      client.unbind();
    });
  });
});
