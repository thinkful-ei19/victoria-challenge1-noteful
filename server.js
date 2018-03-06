'use strict';

  const express = require('express');
  const { PORT } = require('./config');
  const requestLogger = require('./middleware/logger');
  const data = require('./db/notes');
  const simDB = require('./db/simDB');  // <<== add this
  const notes = simDB.initialize(data); // <<== and this
  const morgan = require('morgan');

  const app = express();
  app.use(express.static('public'));
  app.use(express.json());
  app.use(requestLogger);
  app.use(morgan('common'));

  app.get('/api/notes', (req, res, next) => {
    const { searchTerm } = req.query;
    notes.filter(searchTerm, (err, list) => {
      if (err) {
        return next(err);
      }
      res.json(list);
    });
  });

  app.get('/api/notes/:id', (req, res, next) => {
   const { id } = req.params;
     notes.find(id, (err, item) => {
      if (err) {
        return next(err);
      }
      if (item) {
        res.json(item);
      } else {
        next()
      }
    });
  });


  app.put('/api/notes/:id', (req, res, next) => {
    const id = req.params.id;

    const updateObj = {};
    const updateFields = ['title', 'content'];

    updateFields.forEach(field => {
      if (field in req.body) {
        updateObj[field] = req.body[field];
      }
    });

    notes.update(id, updateObj, (err, item) => {
      if (err) {
        return next(err);
      }
      if (item) {
        res.json(item);
      } else {
        next();
      }
    });
  });

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
  // Listen for incoming connections
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
