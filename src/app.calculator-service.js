const axios = require('axios');

const candidateBenefitValues = axios.get('/benefit-values').then(response => {
  console.log(response);
  return response;
}).catch(error => {
  console.log(error);
});

export candidateBenefitValues;
