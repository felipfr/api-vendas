import fs from 'fs';
import path from 'path';
import sanitizeFilename from 'sanitize-filename';
import uploadConfig from '@config/upload';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const sanitizedFile = sanitizeFilename(file);
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, sanitizedFile),
      path.resolve(uploadConfig.directory, sanitizedFile),
    );

    return sanitizedFile;
  }

  public async deleteFile(file: string): Promise<void> {
    const sanitizedFile = sanitizeFilename(file);
    const filePath = path.resolve(uploadConfig.directory, sanitizedFile);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
