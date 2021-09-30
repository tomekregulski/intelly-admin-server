const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const extract = require('pdf-text-extract');
const { unlink } = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 4500;

app.use(cors());

app.use(express.static('/'));

app.use(fileUpload());

app.get('/', (req, res) => {
  return res.status(200).send({ msg: 'Hello' });
});

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: 'file is not found' });
  }

  const myFile = req.files.file;
  console.log(myFile);

  myFile.mv(`${__dirname}/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: 'error' });
    }
  });

  path = `${__dirname}/${myFile.name}`;

  let response = [];

  extract(path, { splitPages: false }, function (err, pages) {
    if (err) {
      console.dir(err);
      return;
    }

    const condensed = pages[0].replace(/\s/g, '/').split('/');
    for (var i = 0; i < condensed.length; i++) {
      condensed[i].includes('CLARM') && response.push(true + 'CLARM');
      condensed[i].includes('WHFDSCAN') && response.push(true + 'WHFDSCAN');
    }

    unlink(path).then(console.log(`successfully deleted file at ${path}`));
    console.log(response);
    res.status(200).send(response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
