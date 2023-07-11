import {Auth } from 'aws-amplify';

const getNameFromUser = () => {
     return localStorage.getItem('userName');
  };

export default getNameFromUser;