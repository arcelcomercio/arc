//const { IncomingWebhook } = require("@slack/client");
const axios = require("axios");
const fetch = require('node-fetch');
const FormData = require("form-data");
const fs = require("fs");

const pbVersion = "latest";
const environment = process.env.ENV;
const endpoint = process.env.ARC_DOMAIN;
const bundleName = process.env.BUNDLE_NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const token_sandbox=process.env.TOKEN_ARC;

const baseURL = `https://${username}:${password}@${endpoint}/deployments/fusion/`;
const newBaseURL = `https://${endpoint}/deployments/fusion/`

console.log("Logging environment variables:");
console.log("Environment:", environment);
console.log("PageBuilder Version:", pbVersion);

const form = new FormData();
form.append("name", bundleName);
form.append("bundle", fs.createReadStream("bundle.zip"));

const notifySideEffect = (logMessage, slackMessage) => () => {
  logMessage && console.log(logMessage);
  //slackMessage && webhook.send(slackMessage);
};

const deploy = () =>
   fetch(`${newBaseURL}services?bundle=${bundleName}&version=${pbVersion}`,{
     method: 'post',
     headers: { 'Content-Type': 'text/plain', 'Authorization': `Bearer ${token_sandbox}` },
       
   })
    .catch(err => {
        console.log("error-->",err.response);
    });
    
    
const handleError = error => {
  console.log("Error encountered during deployment");
  if (error.response) {
    console.log("An Error in the response.");
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log("An error in the request occurred");
    console.log(error.request);
  } else {
    console.log("An unknown error occured");
    error && console.log(error);
  }
};

const headers = form.getHeaders();
headers["Authorization"] =`Bearer ${token_sandbox}`;
console.log(headers);
fetch(`${newBaseURL}bundles`, {
        method: 'post',
        body: form,
        headers,
        maxContentLength: Infinity
    })
	.catch(err => console.error("error-->",err))
	.then(res => res.json())
  	.then(response => {
  		console.log(response);
  	})
  .then(deploy)
  .then((response) => { console.log("response deploy-->",response)})
  .then(
    notifySideEffect(
      "Notifying Slack channel of promotion.",
      `PageBuilder bundle \`${bundleName}\` has been promoted in the \`${environment}\` environment! :partyparrot: :philosoraptor:`
    )
  )
  .catch(console.error);