import sha1 from './sha-1.js';

const API_URL = 'https://api.jwplatform.com/v1';
const BRAND_DEFAULT = 'gec';
const CREDENTIALS = {
    [BRAND_DEFAULT]: {
        SECRET_KEY: 'SaJhUab8N5TKM6Ol18IY0MLt',
        API_KEY: 'gy9LyhoT'
    },
    elcomercio: {
        SECRET_KEY: 'Ydhl3oYR887YuyPoYusoEObp',
        API_KEY: 'TfsFe9BN'
    },
    peru21: {
        SECRET_KEY: '8fBuD5eH27JBEM42TnJvJrQi',
        API_KEY: '3mpKulkb'
    }
}

export const getVideos = (text = '', brand = BRAND_DEFAULT) => {
    const url = `${API_URL}/videos/list?${buildRequest({text}, {brand})}`;
    const data =  getData(url);
    //console.log('data', data, url);
    // console.log('url', url);
    return data;
}

export const getConversionsVideo = (video_key, brand = BRAND_DEFAULT) => {
    const url = `${API_URL}/videos/conversions/list?${buildRequest({video_key}, {brand})}`;
    const data =  getData(url);
    // console.log('url', url);
    return data;
}

export const getVideo = (video_key, brand = BRAND_DEFAULT) => {
    const url = `${API_URL}/videos/show?${buildRequest({video_key}, {brand})}`;
    const data =  getData(url);
    // console.log('url', url);
    return data;
}

async function getData (url)  {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const getCredentials = (brand) => {
    return CREDENTIALS[brand] || {}
}

const buildRequest = (params = {}, { outputFormat = 'json', brand = BRAND_DEFAULT }) => {
    //api_format=xml&api_key=wXNxS2NB&api_nonce=80684843&api_timestamp=1602194850&text=testeDk1GDQrbtGlVlvPmsVeb9zR
    const { API_KEY, SECRET_KEY } = getCredentials(brand);
    let buildParams = `api_format=${outputFormat}&api_key=${API_KEY}&api_nonce=${generateNonce()}&api_timestamp=${getTimestamp()}`;
    const arrParams = Object.entries(params);
    arrParams.forEach(item => {
        if(item[1]!=='') buildParams += `&${item[0]}=${encodeURI(item[1])}`;
    });
    const signature = sha1(`${buildParams}${SECRET_KEY}`);
    buildParams += `&api_signature=${signature}`;
    return buildParams;
}
const generateNonce = () => {
    return Math.floor(Math.random() * 100000000)
}

const getTimestamp = () => {
    return ~~(Date.now() / 1000);
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

// console.log('getVideos', getVideos(), getTimestamp());
// console.log('getConversionsVideo', getConversionsVideo('UAQ4nFfx'));
// getVideo('UAQ4nFfx');