'use strict';
const request = require('request');
const _ = require('lodash');
const base_url = 'https://api.github.com/';
const r = request.defaults({'proxy':'http://wildansn:74647276@cache.itb.ac.id:8080'});
const options = {
  url: 'https://api.github.com/users/wildan3105/repos?type=owner',
  headers: {
    'User-Agent': 'request'
  }
};

// handle search and display statistics
exports.index = (req, res) => {
  const query = req.query.username
  const options = {
    url: `https://api.github.com/users/${query}/repos?type=owner`,
    headers: {
      'User-Agent': 'request'
    }
  }
  r.get(options, (err, response, body) => {
    const data = JSON.parse(response.body)
    const length = data.length;
    const total = length;
    let languages = {}, e;
    for (var i = 0,l=data.length; i < l; i++) {
        e = data[i];
        languages[e.language] = (languages[e.language] || 0) + 1;
    }
    res.render('index', {title: "Homepage", languages, total});
  })
}