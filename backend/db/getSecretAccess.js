const AWS = require('aws-sdk');

const region = 'us-east-1';
const secretName = 'aws-access-keys';

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    sessionToken: process.env.SESSION_TOKEN,
});

const client = new AWS.SecretsManager({ region });

async function getSecrets() {
  const data = await client.getSecretValue({ SecretId: secretName }).promise();
  if ('SecretString' in data) {
    return JSON.parse(data.SecretString);
  } else {
    return Buffer.from(data.SecretBinary, 'base64').toString('ascii');
  }
}

module.exports = getSecrets;