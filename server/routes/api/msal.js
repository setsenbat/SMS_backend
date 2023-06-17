const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const msal = require("@azure/msal-node");
const axios = require("axios");
const MsalToken = require("../../models/MsalToken");
// Configurations
var config = {
  auth: {
    clientId: "b636605a-de1d-423c-b9bc-1451054786c1",
    authority:
      "https://login.microsoftonline.com/50d5359f-6cef-497c-9388-e851dd7a762d",
    clientSecret: "sLX8Q~-KCDeEogysjd5USLXM45YCJh6wxv-3yb0V",
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};
// Create MSAL application
// console.log("1");
try {
  var pca = new msal.ConfidentialClientApplication(config);
  // console.log(pca);
} catch (error) {
  console.log(error);
}

var accessToken;

// get token from msal
router.get("/msalauthenticate", async (req, res, next) => {
  try {
    let response = await msalAuth();
    accessToken = response.accessToken;
    res.json(response);
    next();
  } catch (error) {
    console.log(error);
  }
});

function msalAuth() {
  return new Promise(async (resolve, reject) => {
    token = await MsalToken.findOne();
    const tokenRequest = {
      scopes: ["https://graph.microsoft.com/.default"],
    };
    if (!token) {
      // Acquire an access token
      try {
        const response = await pca.acquireTokenByClientCredential(tokenRequest);
        if (response) {
          let newToken = new MsalToken(response);
          await newToken.save();
          accessToken = response.accessToken;
          resolve(response);
        } else {
          console.log("Error acquiring token: null token");
          reject();
        }
      } catch (error) {
        console.log("Error acquiring token:", error);
        reject(error);
      }
    } else {
      // ehleed token date shalgah
      let dateNow = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      let dateExpiry = moment
        .unix(token.expiresOn)
        .format("YYYY-MM-DD HH:mm:ss");
      if (dateNow > dateExpiry) {
        console.log(dateNow, dateExpiry);
        try {
          const response = await pca.acquireTokenByClientCredential(
            tokenRequest
          );
          if (response) {
            await MsalToken.updateOne({}, response, { upsert: true });
            accessToken = response.accessToken;
            resolve(response);
          } else {
            console.log("Error acquiring token: null token");
            reject();
          }
        } catch (error) {
          console.log("Error acquiring token:", error);
          reject(error);
        }
      } else {
        console.log("date is ok");
        resolve(token);
      }
    }
  });
}

// get usertasks
router.post("/getusertasks", async (req, res, next) => {
  let response = await msalAuth();
  accessToken = response.accessToken;
  // const accessToken
  try {
    let response = await getUserTasks(accessToken, req.body.username);
    console.log(response);
    res.json(response.accessToken);
    next();
  } catch (error) {
    console.log(error);
  }
});

function getUserTasks(accessToken, user) {
  return new Promise((resolve, reject) => {
    let apiEndpoint = `https://graph.microsoft.com/v1.0/users/${user}/planner/tasks`;

    // Set the headers for the request
    let headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    // Make the Graph API request using Axios
    axios
      .get(apiEndpoint, { headers })
      .then((response) => {
        console.log(response.data, "tasks");
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        reject(error.response.data);
      });
  });
}

// get applicants
router.get("/getapplicants", async (req, res, next) => {
  let response = await msalAuth();
  accessToken = response.accessToken;
  try {
    let response = await getApplicants(accessToken);
    console.log(response.length);
    res.json(response);
    next();
  } catch (error) {
    console.log(error);
  }
});

function getApplicants(accessToken) {
  var applicants = [];
  return new Promise((resolve, reject) => {
    let api =
      "https://graph.microsoft.com/v1.0/sites/citiedu.sharepoint.com:/sites/surgaltiinalba";

    // Set the headers for the request
    let headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    // Make the Graph API request using Axios
    axios
      .get(api, { headers })
      .then(async (response) => {
        // Set the site domain name and list name
        let siteId = response.data.id;
        let apiEndpoint = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/1a50df3b-7a13-4bd6-aa82-80e44df39642/items?expand=fields`;
        applicants = await downloadSPStudentList(apiEndpoint, { headers }, []);
        resolve(applicants);
      })
      .catch((error) => {
        console.log(error.response.data, "Dun aldaa");
        reject(error.response.data);
      });
  });
}

function downloadSPStudentList(link, headers, students) {
  let url = link;
  return new Promise((resolve, reject) => {
    axios
      .get(url, headers)
      .then(async (response) => {
        // console.log(response.data)
        students = response.data.value;
        if (response.data["@odata.nextLink"] != undefined) {
          url = response.data["@odata.nextLink"];
          // console.log(response.data['@odata.nextLink'], "test")
          let studento = await downloadSPStudentList(url, headers, students);
          students = students.concat(studento);
        }
        resolve(students);
      })
      .catch((error) => {
        console.log(error.response.data, "ENE aldaa");
        reject(error.response.data);
      });
  });
}

// Insert applicant
router.post("/applicant", async (req, res, next) => {
  let response = await msalAuth();
  accessToken = response.accessToken;
  const applicant = req.body;
  try {
    let response = await createApplicant(applicant, accessToken);
    console.log(response.length);
    res.json(response);
    next();
  } catch (error) {
    console.log(error);
  }
});

function createApplicant(applicant, accessToken) {
  return new Promise((resolve, reject) => {
    // End zugeer shuud item line uusgeh uu
    // Esvel ehleed Applicant uusgeh uu
  });
}

module.exports = router;
