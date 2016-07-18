var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var utils = require('../utils');

// TODO: add support for the college of pharmacy
// TODO: add support for the school of social work

var schools = [
  'http://catalog.utexas.edu/undergraduate/undergraduate-studies/courses',
  'http://catalog.utexas.edu/undergraduate/architecture/courses',
  'http://catalog.utexas.edu/undergraduate/business/courses',
  'http://catalog.utexas.edu/undergraduate/communication/courses',
  'http://catalog.utexas.edu/undergraduate/education/courses',
  'http://catalog.utexas.edu/undergraduate/engineering/courses',
  'http://catalog.utexas.edu/undergraduate/fine-arts/courses',
  'http://catalog.utexas.edu/undergraduate/geosciences/courses',
  'http://catalog.utexas.edu/undergraduate/information',
  'http://catalog.utexas.edu/undergraduate/liberal-arts/courses',
  'http://catalog.utexas.edu/undergraduate/natural-sciences/courses',
  'http://catalog.utexas.edu/undergraduate/nursing/courses',
  'http://catalog.utexas.edu/undergraduate/public-affairs'
];
var links = [];

for (var i = 0; i < schools.length; i++) {
  let url = schools[i];
  request({'uri': url}, function(err, resp, html) {
    if (!err && resp.statusCode === 200) {
      var $ = cheerio.load(html);
      if ($('h3').length === 1) {
        let c = $('h3').next().children();
        for (var j = 0; j < c.length; j++) {
          let href = $($(c)[j]).children().attr('href');
          let piece = utils.parseDeptLink(href);
          fs.appendFile('data.txt', url + '/' + piece + '\n', function(err) {
            if (err) console.error(err);
          });
        }
      } else {
        fs.appendFile('data.txt', url + '\n', function(err) {
          if (err) console.error(err);
        });
      }
    }
  });
}
