import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import NotificationService from "@Services/NotificationService";

export async function uploadOnS3(
    stream: string,
    credentials: any,
    onChange?: (value: any) => void,
    currentValue?: any
) {
    const s3 = new S3Client({
        region: credentials.Region,
        credentials: {
            accessKeyId: credentials.AccessKeyId,
            secretAccessKey: credentials.SecretAccessKey,
            sessionToken: credentials.SessionToken
        }
    });

    const params = {
        Bucket: credentials.Bucket,
        ACL: "public-read-write",
        Key: credentials.Path,
        Body: stream
    };
    const upload = new Upload({
        client: s3,
        params,
        leavePartsOnError: false
    });

    upload.on("httpUploadProgress", (progress) => {
        if (!Boolean(currentValue && onChange)) return;
        const { loaded, total } = progress;
        const percentage = Math.round((loaded / total) * 100);
        let tempValue = [...currentValue];
        tempValue[0].progress = percentage;
        onChange(tempValue);
    });

    try {
        const response = await upload.done();
        return response;
    } catch (error) {
        NotificationService.error("Something Went Wrong");
        throw error;
    }
}
