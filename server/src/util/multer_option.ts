import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, basename } from 'path';

export const MulterOption: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath: string = 'markdown';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const base = basename(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, base + '-' + uniqueSuffix + ext);
    },
  }),
};
