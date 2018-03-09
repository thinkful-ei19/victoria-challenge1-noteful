'use strict';

  const express = require('express');
  const { PORT } = require('./config'); // <<== and this
  const morgan = require('morgan');
  const notesRouter = require('./router/notes.router');


  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use('/api', notesRouter);

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found' });
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });

  if (require.main === module) {
    app.listen(PORT, function () {
      console.info(`Server is listening on ${this.address().port}`);
    }).on('error', err => {
      console.error(err);
    });
  }

module.exports = app;
