var mongodb = require('mongodb').MongoClient;
var fs = require('fs');

// TODO: move db authentication info somewhere else
fs.readdir('../data', function(err, files) {
  if (err) console.error(err);
  for (var i = 0; i < files.length; i++) {
    if (files[i].includes('.json')) {
      console.log('Parsing ' + files[i]);
      let content = JSON.parse(fs.readFileSync('../data/' + files[i], 'utf-8'));
      var uri = 'mongodb://shrey:test@ds015335.mlab.com:15335/utcourses';
      mongodb.connect(uri, function(err, db) {
        if (err) console.error(err);
        var collection = db.collection('departments');
        collection.insert(content);
        db.close();
      });
    }
  }
});
