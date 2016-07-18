exports.parseDeptName = function(title) {
  title = title.split(':');
  for (var i = 0; i < title.length; i++) {
    title[i] = title[i].trim();
  }
  return {
    'name': title[0],
    'key': title[1]
  };
}

exports.parseDeptLink = function(link) {
  var tokens = link.split('/');
  return tokens[tokens.length - 2];
}

exports.stringifyDeptName = function(title) {
  title = title.toLowerCase();
  title = title.replace(/ /g, '-');
  title = title.replace(/\,/g, '');
  title = title.replace(/\//g, '-');
  return title;
}

exports.parseCourseTitle = function(title) {
  title = title.split('.');
  for (var i = 0; i < title.length; i++) {
    if (title[i].length > 0) {
      title[i] = title[i].trim();
    } else {
      title.splice(title.indexOf(title[i]), 1);
    }
  }
  return {
    'key': title[0],
    'name': title[1]
  };
}

exports.parseMultipleCourses = function(chain) {
  chain = chain.split(',');
  var dept = chain[0].match(/([A-Za-z]+)/)[0];
  chain[0] = chain[0].replace(dept + ' ', '');
  for (var i = 1; i < chain.length; i++) {
    chain[i] = dept + ' ' + chain[i].trim();
  }
  return chain;
}

exports.fixSpace = function(string) {
  var fixed = '';
  for (var i = 0; i < string.length; i++) {
    string.charCodeAt(i) === 160 ? fixed += ' ' : fixed += string[i];
  }
  return fixed;
}
