var mocha = require('mocha');
var chai = require('chai');
var utils = require('../src/utils');

describe('department name parsing', function() {
  var dept = 'Natural Sciences: NSC';

  it('should have the correct key', function() {
    var result = utils.parseDeptName(dept);
    chai.expect(result['key']).to.equal('NSC');
  });

  it('should have the correct name', function() {
    var result = utils.parseDeptName(dept);
    chai.expect(result['name']).to.equal('Natural Sciences');
  });
});

describe('department link parsing', function() {
  it('should extract the correct link', function() {
    var link = '/undergraduate/natural-sciences/courses/biological-sciences/';
    var result = utils.parseDeptLink(link);
    chai.expect(result).to.equal('biological-sciences');
  });
});

describe('department name stringifying', function() {
  it('should yield the correct file name', function() {
    var dept1 = 'Computer Science';
    var dept2 = 'Business, Government, and Society';
    var dept3 = 'Management Information Systems';
    var dept4 = 'Serbian/Croatian';
    var result1 = utils.stringifyDeptName(dept1);
    var result2 = utils.stringifyDeptName(dept2);
    var result3 = utils.stringifyDeptName(dept3);
    var result4 = utils.stringifyDeptName(dept4);
    chai.expect(result1).to.equal('computer-science');
    chai.expect(result2).to.equal('business-government-and-society');
    chai.expect(result3).to.equal('management-information-systems');
    chai.expect(result4).to.equal('serbian-croatian');
  });
});

describe('course name parsing', function() {
  it('should parse multiple courses', function() {
    var list = 'NSC NSC 122, 222, 322';
    var correct = ['NSC 122', 'NSC 222', 'NSC 322'];
    var result = utils.parseMultipleCourses(list);
    chai.expect(result.length).to.equal(3);
    chai.expect(result).to.include('NSC 122');
    chai.expect(result).to.include('NSC 222');
    chai.expect(result).to.include('NSC 322');
  });
});

describe('annoying utf-8 parsing', function() {
  it('should remove non-breaking spaces', function() {
    var str1 = 'C S 311';
    var str2 = 'M 408C';
    var r1 = utils.fixSpace(str1);
    var r2 = utils.fixSpace(str2);
    chai.expect(r1).to.eql('C S 311');
    chai.expect(r2).to.eql('M 408C');
  });
});
