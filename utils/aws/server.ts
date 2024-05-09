import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.NEXT_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_AWS_SECRET_KEY,
  region: process.env.NEXT_AWS_REGION,
});

export default s3;