import axios from 'axios';

// Maybe move this to a backend function "getClientID"
const CLIENT_ID = "77b3bc10c94c47fb1d84"
const BACKEND_URL = "http://flask-env.eba-i9adddxn.us-east-2.elasticbeanstalk.com";



export function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
}

export async function getAccessTokenFromCode(code: string) {
  const response = await axios.get(BACKEND_URL + "/getAccessToken", {
    params: {
      code: code
    }
  });
  return response.data.access_token;
}


export async function getUserData(authorization: string) {
    const response = await axios.get(BACKEND_URL + "/getUserData", {
      headers: {
        Authorization: "Bearer " + authorization
      }
    });
    return response.data;
}


