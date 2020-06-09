import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';
import bluebird from 'bluebird';
import { S3 } from "aws-sdk";

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

@Injectable()
export class AWSService {

    private _createS3Instance(): S3 {
        return new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

    }

    // Upload file to S3 and return URL
    public async uploadFile(file: Express.Multer.File): Promise<any> {
        try {
            const s3 = this._createS3Instance();
            const params = {
                ACL: 'public-read',
                Body: file.buffer,
                Bucket: process.env.S3_BUCKET,
                Key: file.originalname
            };
            const uploadResult = await s3.upload(params).promise();
            return uploadResult.Location;
        } catch(error) {
            throw new Error(error);
        }

    };
}