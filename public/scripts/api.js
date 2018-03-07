/* global $ */
'use strict';

const api = {

  search: function (query, callback) {
    $.ajax({
      type: 'GET',
      url: '/v1/notes/',
      dataType: 'json',
      data: query,
      success: callback
    });
  },

  details: function (id, callback) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `/v1/notes/${id}`,
      success: callback
    });
  },

  update: function (id, obj, callback) {
    $.ajax({
      type: 'PUT',
      url: `/v1/notes/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      success: callback
    });
  },

  create: function (obj, callback) {
     $.ajax({
       type: 'POST',
       url: '/v1/notes',
       contentType: 'application/json',
       dataType: 'json',
       processData: false,
       data: JSON.stringify(obj),
       success: callback
     });
   },

  delete: function (id, callback) {
    $.ajax({
      type: 'DELETE',
      url: `/v1/notes/${id}`,
      success: callback
    })
  }
};
