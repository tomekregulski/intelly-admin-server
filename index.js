const express = require('express');
const sequelize = require('./config/connection');
const fileUpload = require('express-fileupload');
const csv = require('@fast-csv/parse');
const readXlsxFile = require('read-excel-file/node');
const { Test, WholeFoodsTimeframeData } = require('./models');
// const fs = require('fs');
const path = require('path');
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
  res.status(200).send({ msg: 'hello' });
});

app.post('/excel/upload', (req, res) => {
  try {
    if (!req.files) {
      return res.status(500).send({ msg: 'file is not found' });
    }

    if (
      req.files.file.mimetype !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return res.status(500).send({ msg: 'please only upload an Excel file' });
    }

    const myFile = req.files.file;

    myFile.mv(`${__dirname}/${myFile.name}`, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: 'error' });
      }
    });

    let path = `${__dirname}/${myFile.name}`;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let dataRows = [];

      rows.forEach((row) => {
        let newRow = {
          brand: row[0],
          category: row[1],
          upc: row[2],
          sku_name: row[3],
          unit_size: row[4],
          measurement: row[5],
          region: row[6],
          store_name: row[7],
          store_status: row[8],
          store_id: row[9],
          net_sales: row[10],
          net_sales_ly: row[11],
          p_net_sales_yoy: row[12],
          unit_sales: row[13],
          unit_sales_ly: row[14],
          p_unit_sales_yoy: row[15],
          p_cat_contribution: row[16],
          timeframe: row[17],
        };

        dataRows.push(newRow);
      });

      WholeFoodsTimeframeData.bulkCreate(dataRows)
        .then(() => {
          res.status(200).send({
            message: 'Uploaded the file successfully: ' + req.files.file.name,
          });
        })
        // .then(
        //   unlink(path).then(console.log(`successfully deleted file at ${path}`))
        // )
        .catch((error) => {
          console.log(error);
          res.status(500).send({
            message: 'Fail to import data into database!',
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Could not upload the file: ' + req.file.originalname,
    });
  }
});

app.post('/csv/upload', (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: 'file is not found' });
  }

  if (req.files.file.mimetype !== 'text/csv') {
    return res.status(500).send({ msg: 'please only upload a CSV file' });
  }

  console.log(req.files.file.mimetype);

  const myFile = req.files.file;
  console.log(myFile.name);

  myFile.mv(`${__dirname}/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: 'error' });
    }
  });

  let path = `${__dirname}/${myFile.name}`;

  console.log(path);

  let dataRows = [];

  fs.createReadStream(path)
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => console.error(error))
    // .on('data', (row) => console.log(row))
    .on('data', (row) => {
      dataRows.push(row);
    })
    .on('end', () => {
      console.log(dataRows);
      Test.bulkCreate(dataRows)
        .then(res.send('Data successfully uploaded!'))
        .then(
          unlink(path).then(console.log(`successfully deleted file at ${path}`))
        );

      // );
    });
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

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
});
