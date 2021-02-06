const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination(req, file, fn) {
    fn(null, 'uploads');
  },
  filename(req, file, fn) {
    const date = moment().format('DDMMYYYY-HHmmss');
    fn(null, `${date}-${file.originalname}`);
  }
});

const fileFilter = (req, file, fn) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    fn(null, true);
  } else {
    fn(null, false);
  }
};

const limits = {
  fileSize: 1024 * 1024 * 5
};

module.exports = multer({ storage, fileFilter, limits });