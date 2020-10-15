import sha1 from './sha-1.js';

const SECRET_KEY = 'eDk1GDQrbtGlVlvPmsVeb9zR';
const API_KEY = 'wXNxS2NB';
const PLAYER_ID = 'BHYH7DVh';
const API_URL = 'http://api.jwplatform.com/v1'

export const getVideos = (text = '') => {
    const url = `${API_URL}/videos/list?${buildRequest({text})}`;
    const data =  getData(url);
    //console.log('data', data, url);
    // console.log('url', url);
    return data;
}


export const getConversionsVideo = (video_key) => {
    const url = `${API_URL}/videos/conversions/list?${buildRequest({video_key})}`;
    const data =  getData(url);
    // console.log('url', url);
    return data;
}

async function getData (url)  {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const buildRequest = (params = {}, outputFormat = 'json') => {
    //api_format=xml&api_key=wXNxS2NB&api_nonce=80684843&api_timestamp=1602194850&text=testeDk1GDQrbtGlVlvPmsVeb9zR
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