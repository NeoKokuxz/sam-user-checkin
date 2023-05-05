// const UserCheckinValidation = require('./dynamoHelper.js');
const convertMsToHM = require('./timeHelper.js');
const UserCheckinValidation = require('./dynamoHelper.js');

async function checkinService(userId) {
  // Check if user already checked in today
  let checkinTime = new Date().getTime();
  let resetTime = new Date().setUTCHours(24, 0, 0, 0); //Set the UTC next midnight
  let timeRemaining = resetTime - checkinTime;

  // return timeRemaining;
  let validation = await UserCheckinValidation(userId, checkinTime);

  return {
    userId: userId,
    validation: validation,
    checkinTime: convertMsToHM(checkinTime),
    resetTime: convertMsToHM(resetTime),
    hoursBeforeReset: convertMsToHM(timeRemaining), //Todos: Change the time to AWS time using AWS helper
  };
}

module.exports = checkinService;
