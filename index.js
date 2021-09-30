const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const extract = require('pdf-text-extract');
const { unlink } = require('fs/promises');

let fs = require('fs'),
  PDFParser = require('pdf2json');

const app = express();
const PORT = process.env.PORT || 4500;

app.use(cors());

app.use(express.static('/'));

app.use(fileUpload());

app.get('/', (req, res) => {
  let pdfParser = new PDFParser(this, 1);

  pdfParser.on('pdfParser_dataError', (errData) =>
    console.error(errData.parserError)
  );
  pdfParser.on('pdfParser_dataReady', (pdfData) => {
    fs.writeFile('./pdf-content.txt', pdfParser.getRawTextContent(), () => {
      console.log('Done.');
    });
  });

  pdfParser.loadPDF('./sample.pdf');

  res.status(200).send({ msg: 'done' });
});

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: 'file is not found' });
  }

  const myFile = req.files.file;
  console.log(myFile.name);

  myFile.mv(`${__dirname}/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: 'error' });
    }
  });

  path = `${__dirname}/${myFile.name}`;

  console.log(path);

  let response = [];

  let pdfParser = new PDFParser(this, 1);

  pdfParser.on('pdfParser_dataError', (errData) =>
    console.error(errData.parserError)
  );

  pdfParser.on('pdfParser_dataReady', (pdfData) => {
    data = pdfParser.getRawTextContent();
    data.includes('WHFDSCAN') && response.push('WHFDSCAN');
    fs.writeFile('./pdf-content.txt', pdfParser.getRawTextContent(), () => {
      console.log('Done.');
    });

    res.status(200).send(response);
    unlink(path).then(console.log(`successfully deleted file at ${path}`));
    unlink('./pdf-content.txt').then(
      console.log(`successfully deleted file at ./pdf-content.txt`)
    );
  });

  pdfParser.loadPDF(path);
});

// app.post('/upload', (req, res) => {
//   // res.header('Access-Control-Allow-Origin', '*');

//   if (!req.files) {
//     return res.status(500).send({ msg: 'file is not found' });
//   }

//   const myFile = req.files.file;
//   console.log(myFile.name);

//   myFile.mv(`${__dirname}/${myFile.name}`, function (err) {
//     if (err) {
//       console.log(err);
//       return res.status(500).send({ msg: 'error' });
//     }
//   });

//   path = `${__dirname}/${myFile.name}`;

//   console.log(path);

//   let response = [];

//   extract(path, { splitPages: false }, function (err, pages) {
//     if (err) {
//       console.dir(err);
//       return;
//     }

//     // const condensed = pages[0].replace(/\s/g, '/').split('/');
//     // for (var i = 0; i < condensed.length; i++) {
//     //   condensed[i].includes('CLARM') && response.push(true + 'CLARM');
//     //   condensed[i].includes('WHFDSCAN') && response.push(true + 'WHFDSCAN');
//     // }

//     //
//     // console.log(response);
//     // res.status(200).send(response);
//   });

//   console.log(path);
//   res.status(200).send(path);
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
