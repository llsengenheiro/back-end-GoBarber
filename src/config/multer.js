import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err); // cb call back
        return cb(null, res.toString('hex') + extname(file.originalname)); // 3789hdhd3h8d.png ou qualquer outra extenção
      });
    }
  })
};
