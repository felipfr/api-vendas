import fs from 'fs';
import mime from 'mime';
import path from 'path';
import sanitizeFilename from 'sanitize-filename';
import uploadConfig from '@config/upload';
import { S3 } from '@aws-sdk/client-s3';

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const sanitizedFile = sanitizeFilename(file);
    const originalPath = path.resolve(uploadConfig.tmpFolder, sanitizedFile);
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File Not Found');
    }

    const fileContent = await fs.promises.readFile(originalPath);
    const s3Key = `avatar/${sanitizedFile}`;
    await this.client.putObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: s3Key,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    });

    await fs.promises.unlink(originalPath);
    return sanitizedFile;
  }

  public async deleteFile(file: string): Promise<void> {
    const sanitizedFile = sanitizeFilename(file);
    const s3Key = `avatar/${sanitizedFile}`;
    await this.client.deleteObject({
      Bucket: uploadConfig.config.aws.bucket,
      Key: s3Key,
    });
  }
}
