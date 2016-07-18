var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var utf8 = require('utf8');
var mongodb = require('mongodb').MongoClient;
var utils = require('../utils');
var deptNumber = 1;

exports.parseCourse = function(url) {
  request({'uri': url}, function(err, resp, html) {
    if (!err && resp.statusCode === 200) {
      var $ = cheerio.load(html);

      $('h3.deptcourseheader').each(function(i, e) {
        let dept = [];
        let node = $(this).next();
        let upper = false;
        let course = {};
        let end = $('p')[$('p').length - 3];

        while (!$(node).is('h3') && $(node).length !== 0) {
          if ($(node).is('h4')) {
            if ($(node).text().trim() === "Lower-Division Courses") {
              upper = false;
            }
            if ($(node).text().trim() === "Upper-Division Courses") {
              upper = true;
            }
          } else {
            if ($(node).is('h5')) {
              let title = $(node).text().trim();
              title = utils.fixSpace(title);

              if (!title.includes(',')) {
                let info = utils.parseCourseTitle(title);
                course['key'] = info['key'];
                course['name'] = info['name'];
                // TODO: handle multiple courses
              }
            }
            if ($(node).is('p') && !$(node).hasClass('coursetopic')) {
              if ('key' in course || 'name' in course) {
                course['description'] = $(node).text().trim();
                course['upper'] = upper;
                dept.push(course);
                course = {};
              }
            }
          }
          node = $(node).next();
        }

        let fname = deptNumber.toString();
        console.log('Exported Department #' + fname);
        fs.writeFileSync('../data/' + fname + '.json', JSON.stringify(dept));
        deptNumber++;

        dept.length = 0;
      });
    }
  });
}
