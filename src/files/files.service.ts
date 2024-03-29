import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { join } from 'path';
import { path as pathRoot } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { Mfile } from './mfile.class';

@Injectable()
export class FilesService {
    async saveFiles(files: Mfile[]): Promise<FileElementResponse[]> {
        const dateFolder = format(new Date(), 'yyyy-MM-dd');
        const uploadFolder = join(pathRoot, 'uploads', dateFolder); //`${path}/uploads/${dateFolder}`;
        await ensureDir(uploadFolder);
        const res: FileElementResponse[] = [];

        for (const file of files) {
            await writeFile(join(uploadFolder, file.originalname), file.buffer);
            res.push({ url: join(dateFolder, file.originalname), name: file.originalname });
        }
        return res;
    }

    async convertToWebP(file: Buffer): Promise<Buffer> {
        return sharp(file).webp().toBuffer();
    }
}
