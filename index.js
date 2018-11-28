import app from './server/config/express';
import config from './server/config/config';
// const app = require('./server/config/express');
// const config = require('./server/config/config');

app.listen(config.port, () => {
  console.log(`Server listen Port: ${config.port}`);
});

// app.listen(config.port, () => {
//     console.log('Server listen Port: 4000');
//   });

process.on('uncaughtException', (err) => {
  console.log('uncaughtException ', err);
})