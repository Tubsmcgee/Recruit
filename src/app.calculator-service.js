const axios = require('axios');

export const candidateBenefitValues = axios
  .get('/benefit-values')
  .then(response => {
    console.log(response);
    return response;
  })
  .catch(error => {
    console.log(error);
  });
