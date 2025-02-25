/* global describe, it */

var assert = require('assert')
var bippath = require('../')

describe('fromPathArray()', function () {
  it('should work with proper input', function () {
    assert.equal(bippath.fromPathArray([44 | 0x80000000, 1, 1, 0]).toString(), 'm/44\'/1/1/0')
  })
  it('should fail for no parameter', function () {
    assert.throws(function () {
      bippath.fromPathArray()
    })
  })
  it('should fail for number', function () {
    assert.throws(function () {
      bippath.fromPathArray(1)
    })
  })
  it('should fail for string', function () {
    assert.throws(function () {
      bippath.fromPathArray('wrong')
    })
  })
  it('should fail for empty array', function () {
    assert.throws(function () {
      bippath.fromPathArray([])
    })
  })
  it('should fail for non-number array', function () {
    assert.throws(function () {
      bippath.fromPathArray([ 1, 'wrong' ])
    })
  })
})

describe('toPathArray()', function () {
  it('should work with proper input', function () {
    assert.deepEqual(bippath.fromPathArray([44 | 0x80000000, 1, 1, 0]).toPathArray(), [ 44 | 0x80000000, 1, 1, 0 ])
  })
})

describe('fromString()', function () {
  it('should work with new style input', function () {
    assert.equal(bippath.fromString('m/44\'/0\'/0\'').toString(), 'm/44\'/0\'/0\'')
  })
  it('should work with old style input', function () {
    assert.equal(bippath.fromString('m/44h/0h/0\'').toString(), 'm/44\'/0\'/0\'')
  })
  it('should work without m/ prefix', function () {
    assert.equal(bippath.fromString('44\'/0\'/0\'').toString(), 'm/44\'/0\'/0\'')
  })
  it('should require the m/ prefix', function () {
    assert.equal(bippath.fromString('m/44\'/0\'/0\'', true).toString(), 'm/44\'/0\'/0\'')
  })
  it('should require the m/ prefix (and fail)', function () {
    assert.throws(function () {
      bippath.fromString('44\'/0\'/0\'', true)
    })
  })
  it('should not work with invalid index', function () {
    assert.throws(function () {
      bippath.fromString('44\'/2147483648')
    })
    assert.throws(function () {
      bippath.fromString('44\'/2147483648\'')
    })
  })
  it('should work with large indexes', function () {
    assert.equal(bippath.fromString('m/0/2147483647\'/1/2147483646\'/2').toString(), 'm/0/2147483647\'/1/2147483646\'/2')
  })
  it('should not return negative indexes', function () {
    assert.equal(bippath.fromString('m/44\'/0\'/0\'').toPathArray()[0], 2147483692)
  })
})

describe('toString()', function () {
  it('should work with new style ouput', function () {
    assert.equal(bippath.fromPathArray([44 | 0x80000000, 1, 1, 0]).toString(), 'm/44\'/1/1/0')
  })
  it('should work with old style ouput', function () {
    assert.equal(bippath.fromPathArray([44 | 0x80000000, 1, 1, 0]).toString(false, true), 'm/44h/1/1/0')
  })
  it('should work with new style ouput (without m/ prefix)', function () {
    assert.equal(bippath.fromPathArray([44 | 0x80000000, 1, 1, 0]).toString(true), '44\'/1/1/0')
  })
  it('should work with old style ouput (without m/ prefix)', function () {
    assert.equal(bippath.fromPathArray([44 | 0x80000000, 1, 1, 0]).toString(true, true), '44h/1/1/0')
  })
})

describe('validateString()', function () {
  it('should work', function () {
    assert.equal(bippath.validateString('m/44/1'), true);
    assert.equal(bippath.validateString('m/44\'/1'), true);
    assert.equal(bippath.validateString('44/1'), true);
    assert.equal(bippath.validateString('44\'/1'), true);
    assert.equal(bippath.validateString('m/44/1', true), true);
  })
  it('should fail', function () {
    assert.equal(bippath.validateString('wrong'), false);
    assert.equal(bippath.validateString('m/44  /'), false);
    assert.equal(bippath.validateString(''), false);
    assert.equal(bippath.validateString('44/1', true), false);
  })
})

describe('validatePathArray()', function () {
  it('should work', function () {
    assert.equal(bippath.validatePathArray([ 44 ]), true);
    assert.equal(bippath.validatePathArray([ 44 | 0x80000000, 1 ]), true);
  })
  it('should fail', function () {
    assert.equal(bippath.validatePathArray(), false);
    assert.equal(bippath.validatePathArray(1), false);
    assert.equal(bippath.validatePathArray('wrong'), false);
    assert.equal(bippath.validatePathArray([]), false);
    assert.equal(bippath.validatePathArray([ 'wrong' ]), false);
  })
})
