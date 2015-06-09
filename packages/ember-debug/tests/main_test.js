import Ember from 'ember-metal/core';

let originalEnvValue;

QUnit.module('ember-debug', {
  setup() {
    originalEnvValue = Ember.ENV.RAISE_ON_DEPRECATION;
    Ember.ENV.RAISE_ON_DEPRECATION = true;
  },

  teardown() {
    Ember.ENV.RAISE_ON_DEPRECATION = originalEnvValue;
  }
});

QUnit.test('Ember.deprecate does not throw if RAISE_ON_DEPRECATION env value is false', function(assert) {
  assert.expect(1);
  Ember.ENV.RAISE_ON_DEPRECATION = false;

  try {
    Ember.deprecate('Should not throw', false);
    assert.ok(true, 'Ember.deprecate did not throw');
  } catch(e) {
    assert.ok(false, `Expected Ember.deprecate not to throw but it did: ${e.message}`);
  }
});

QUnit.test('Ember.deprecate throws deprecation if second argument is falsy', function() {
  expect(3);

  throws(function() {
    Ember.deprecate('Deprecation is thrown', false);
  });

  throws(function() {
    Ember.deprecate('Deprecation is thrown', '');
  });

  throws(function() {
    Ember.deprecate('Deprecation is thrown', 0);
  });
});

QUnit.test('Ember.deprecate does not throw deprecation if second argument is a function and it returns true', function() {
  expect(1);

  Ember.deprecate('Deprecation is thrown', function() {
    return true;
  });

  ok(true, 'deprecation was not thrown');
});

QUnit.test('Ember.deprecate throws if second argument is a function and it returns false', function() {
  expect(1);
  throws(function() {
    Ember.deprecate('Deprecation is thrown', function() {
      return false;
    });
  });
});

QUnit.test('Ember.deprecate does not throw deprecations if second argument is truthy', function() {
  expect(1);

  Ember.deprecate('Deprecation is thrown', true);
  Ember.deprecate('Deprecation is thrown', '1');
  Ember.deprecate('Deprecation is thrown', 1);

  ok(true, 'deprecations were not thrown');
});

QUnit.test('Ember.assert throws if second argument is falsy', function() {
  expect(3);

  throws(function() {
    Ember.assert('Assertion is thrown', false);
  });

  throws(function() {
    Ember.assert('Assertion is thrown', '');
  });

  throws(function() {
    Ember.assert('Assertion is thrown', 0);
  });
});

QUnit.test('Ember.assert does not throw if second argument is a function and it returns true', function() {
  expect(1);

  Ember.assert('Assertion is thrown', function() {
    return true;
  });

  ok(true, 'assertion was not thrown');
});

QUnit.test('Ember.assert throws if second argument is a function and it returns false', function() {
  expect(1);
  throws(function() {
    Ember.assert('Assertion is thrown', function() {
      return false;
    });
  });
});

QUnit.test('Ember.assert does not throw if second argument is truthy', function() {
  expect(1);

  Ember.assert('Assertion is thrown', true);
  Ember.assert('Assertion is thrown', '1');
  Ember.assert('Assertion is thrown', 1);

  ok(true, 'assertions were not thrown');
});

QUnit.test('Ember.assert does not throw if second argument is an object', function() {
  expect(1);
  var Igor = Ember.Object.extend();

  Ember.assert('is truthy', Igor);
  Ember.assert('is truthy', Igor.create());

  ok(true, 'assertions were not thrown');
});
