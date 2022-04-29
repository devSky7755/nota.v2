import { S3 } from 'aws-sdk';

export async function emptyS3Directory(dir) {
    const listParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Prefix: dir
    };

    const s3 = new S3();
    const listedObjects = await s3.listObjectsV2(listParams).promise();

    if (listedObjects.Contents.length === 0) return;

    const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Delete: { Objects: [] }
    };

    listedObjects.Contents.forEach(({ Key }) => {
        deleteParams.Delete.Objects.push({ Key });
    });

    await s3.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await this.emptyS3Directory(dir);
}