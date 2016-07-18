var scraper = require('../scraper/course-scraper');
var fs = require('fs');

// TODO: move db authentication info somewhere else
fs.readFile('../scraper/departments.txt', 'utf-8', function(err, data) {
  if (err) console.error(err);
  var departments = data.split('\n');
  for (var i = 0; i < departments.length - 1; i++) {
    var link = departments[i].trim();
    scraper.parseCourse(link);
  }
});
