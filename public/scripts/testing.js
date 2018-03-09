
    'use strict';
    /* global api $ */

      // test get all
      api.search({})
      .then(response => {
        console.log(response)
      });

      // test get all with search term
      api.search({searchTerm: 'cats'})
        .then(response => {
          console.log(response)
        });

      // test get by id
      api.details(1005)
        .then(response => {
          console.log(response)
        });

      api.create({
        title:'Dogs',
        content:'text'
      })
      .then(response => {
        console.log(response)
      });

      api.delete(1005)
      .then(response => {
        console.log('deleted')
      });
