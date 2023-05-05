const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const convertMsToHM = require('./timeHelper.js');

const userCheckinTable = 'sam-user-checkin-UserCheckinTable-1BF58XDYCK3XZ';

async function UserCheckinValidation(userId, checkInTime) {
  console.log(
    'Start validating if user check in already. User:' +
      userId +
      ' Current checkin time: ' +
      convertMsToHM(checkInTime)
  );
  const params = {
    TableName: userCheckinTable,
    Key: {
      id: userId,
    },
    Item: {
      id: userId,
      checkInTime: checkInTime,
    },
    ConditionExpression: 'attribute_not_exists(id)',
  };

  //False - Not checkin today
  //True - Already checkin today
  let exist = false;

  try {
    let result = await dynamoDB.put(params).promise();
    console.log(result);
  } catch (error) {
    console.log('Logging:', error);
    exist = true;
  }

  return exist;
}

module.exports = UserCheckinValidation;
