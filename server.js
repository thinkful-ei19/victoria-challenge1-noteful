'use strict';

  const express = require('express');

  const data = require('./db/notes');

  const app = express();
  app.use(express.static('public'));

  app.get('/api/notes', (req, res) => {
    const searchTerm = req.query.searchTerm;
    if (searchTerm) {
      const found = data.filter(item => item.title.includes(searchTerm));
      res.status(200).json(found);
    }
    res.json(data);
  });


  app.get('/api/notes/:id', (req, res) => {
    const newID = req.params.id;
    const rightID = data.find(item => item.id === Number(newID));
    res.status(200).json(rightID);
  });


  // Listen for incoming connections
  app.listen(8080, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
