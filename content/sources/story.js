import envVars from "fusion:environment"
import getProperties from "fusion:properties"
import {
  addResizedUrls
} from '../../resources/utilsJs/thumbs'

// Está así porque la intención es que acceda por token

const resolve = key => {
  const requestUri = `/content/v4/stories/?website_url=${key.website_url ||
    key}&website=${key.website}`;
  return requestUri;
};

const transform = data => {
  const {
    website
  } = data;
  const aspectRatios = ["3:4|895x514", "2:3|620x356"];
  const {
    resizerSecretKeyEnvVar,
    resizerUrl
  } = getProperties(website);
  // const resizerSecretKey = envVars[resizerSecretKeyEnvVar];
  return addResizedUrls(data, resizerUrl, resizerSecretKeyEnvVar, aspectRatios);

};

export default {
  resolve,
  schemaName: "story",
  transform,
  params: {
    website_url: "text",
    website: 'text'

  }
};