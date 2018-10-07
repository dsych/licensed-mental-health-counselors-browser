const path = require('path');
const app = require('express')();

// Setup parcel bundler /w entry index
const Bundler = require('parcel-bundler');
const entry = path.resolve(__dirname, 'src/index.html');

// Setup the lowdb database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('.data/db.json');

const db = low(adapter);

db.defaults({ data: [], updated: '' }).write();

if (!db.get('updated').value()) {
  // const axios = require('axios');
  console.log('loading data');
  // axios.get('ftp://ftppub.doh.state.fl.us/ldo/data/').then(result => {
  // console.log('result', result);
  // });
  const FTP = require('ftp');
  const client = new FTP();

  const file = '/ldo/data/LIC_5203-P.txt';
  client.on('ready', () => {
    client.lastMod(file, (err, lastModified) => {
      if (err) {
        throw err;
      }
      console.info('Last modified ', lastModified);
    });

    client.get(file, false, (err, stream) => {
      if (err) {
        throw err;
      }

      const chunks = [];

      stream.on('data', chunk => {
        chunks.push(chunk.toString());
      });
      stream.on('error', err => {
        throw err;
      });
      stream.on('end', () => {
        const data = chunks.join('');
        db.set('data', data).write();
        console.log('file written. ', chunks.length, ' chunks written to db');
        delete chunks;
        client.end();
      });
    });
  });
  client.connect({ host: 'ftppub.doh.state.fl.us' });
}

// add db to app context
app.use((req, res, next) => {
  req.db = db;
  next();
});

console.log('Starting server...');

const bundler = new Bundler(entry);

//Provide data when requested
app.use('/data', require('./routes/data'));

app.use(bundler.middleware());

//the server object listens on port 8080
app.listen(8080);

console.log('Server started at 8080');
