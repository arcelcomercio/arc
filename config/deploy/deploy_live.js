//const { IncomingWebhook } = require("@slack/client");
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


const deploy_live = (service) => fetch(`${newBaseURL}services/${service}/promote?force=true`,{
        method: 'post',
        headers: { 'Content-Type': 'text/plain', 'Authorization': `Bearer ${token_sandbox}` },
}).catch(err => {
        console.log("error-->",err.response);
    });


fetch(`${newBaseURL}services`,{
    method: 'get',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token_sandbox}` },
    })
   .then(res => res.json())
  .then(response => {
    var name="";
    console.log("deployment-->",response.lambdas[0]);
    var lambdas_list=response.lambdas;
    lambdas_list.forEach(function(entry){
        console.log(entry);
        if (entry.hasOwnProperty("Aliases") === false){
            name=entry.Version;
            console.log("name1--->",name);
        }
        });
    return name;
  }).then((name) => {
      console.log("name2-->",name);
      return deploy_live(name);
  })
  .then((status) => {
      console.log("status-->",status)
  })
  .catch(console.error);