import source, {
  addResizedUrls
} from "@arc-core-components/content-source_content-api-v4";
import envVars from "fusion:environment";
import getProperties from "fusion:properties";

const resolve = key => {
  const requestUri = `/content/v4/stories/?website_url=${key.website_url ||
    key}&website=elcomercio`;
  return requestUri;
};

const transform = data => {
  const aspectRatios = ["3:2"];
  const { website } = data;
  const { resizerSecretKeyEnvVar, resizerUrl } = getProperties(website);
  const resizerSecretKey = envVars[resizerSecretKeyEnvVar];
  return addResizedUrls(data, resizerUrl, resizerSecretKeyEnvVar, aspectRatios);
};

export default {
  resolve,
  schemaName: "story",
  transform,
  params: {
    website_url: "text"
  }
};
