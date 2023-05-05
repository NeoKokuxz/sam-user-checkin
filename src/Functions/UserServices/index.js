const checkinService = require('./checkin.js');
const convertMsToHM = require('./timeHelper.js');

// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
async function lambdaHandler(event, context) {
  let user = event.pathParameters;

  //Call checkin service to validate checkin
  let response = await checkinService(user.id);
  let code = '';
  let bodyMessage = '';
  let resetCount = true;
  if (response.validation) {
    // Already Checked in
    code = 400;
    bodyMessage = true;
    resetCount = false;
  } else {
    code = 200;
    bodyMessage = false;
  }

  response = {
    statusCode: code,
    body: JSON.stringify({
      alreadyCheckin: bodyMessage,
      checkinTime: response.checkinTime,
      dailyResetTime: response.resetTime,
      resetPermission: resetCount,
      hoursBeforeReset: response.hoursBeforeReset,
    }),
  };

  return response;
}

module.exports = {
  lambdaHandler,
};
