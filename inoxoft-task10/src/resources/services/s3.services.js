const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v1;
const path = require('path');

const {
    AWS_S3_REGION,
    AWS_S3_BUCKET,
    AWS_S3_ACCESS_KEY,
    AWS_S3_SECRET_KEY
} = require('../../common/config');
// const modelType.someModel = require('../../db/dbTablesEnum');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (image, modelType, modelId) => {
        const { name, data, mimetype } = image;
        const uploadPath = _imageNameBuilder(name, modelType, modelId.toString());

        return bucket.upload({
            Bucket: AWS_S3_BUCKET,
            Key: uploadPath,
            Body: data,
            ContentType: mimetype
        }).promise();
    },
};

function _imageNameBuilder(imageName, modelType, modelId) {
    const fileExtention = imageName.split('.').pop();

    return path.join(modelType, modelId, `${uuid()}.${fileExtention}`);
}
