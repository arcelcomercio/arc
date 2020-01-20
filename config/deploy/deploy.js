//const { IncomingWebhook } = require("@slack/client");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

//const webhook = new IncomingWebhook(process.env.SLACK_NOTIFY_WEBHOOK);

const pbVersion = "latest";
const environment = "sandbox";
const endpoint = "api.sandbox.elcomercio.arcpublishing.com";
//const username = "juan.quevedo@comercio.com.pe";
//const password = "Linux-982079";
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const bundleName = process.env.BUNDLE_NAME;

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
  axios.post(`${baseURL}services?bundle=${bundleName}&version=${pbVersion}`,{
    headers: {        
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer HMO2U3MQHUJOSNKN25OMKKQKQQ72HMIOasPsMxbqoVpZ8C+P+duoUDjRhyfnzF7qWYUHW6no'
    }});

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
  /*
  webhook
    .send(
      `Deployment of PageBuilder bundle \`${bundleName}\` to \`${environment}\` \
has had a *failure*. Please see the CircleCI logs for more details. :angryparrot: :facepalm:`
    )
    .then(() => {
      console.log("Slack channel notified of failure.");
      process.exitCode = 1;
    })
    .catch(() => {
      console.log("Error in sending a slack message");
      process.exitCode = 1;
    });
    */
};


const headers = form.getHeaders();
headers["Authorization"] =
  "Bearer HMO2U3MQHUJOSNKN25OMKKQKQQ72HMIOasPsMxbqoVpZ8C+P+duoUDjRhyfnzF7qWYUHW6no";
console.log(headers);
axios
  .post(`${newBaseURL}bundles`, form, {
    headers,
    maxContentLength: Infinity
  })
  .then(
    notifySideEffect(
      `Bundle ${bundleName} has successfully been uploaded. Deployment beginning.`
    )
  )
  .then(deploy)
  .then(
    notifySideEffect(
      "Notifying Slack channel of promotion.",
      `PageBuilder bundle \`${bundleName}\` has been promoted in the \`${environment}\` environment! :partyparrot: :philosoraptor:`
    )
  )
  .catch(console.error);
