import { module, test } from 'qunit';
import { setupTest } from 'ember-tauri-test/tests/helpers';

module('Unit | Route | from-ember', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:from-ember');
    assert.ok(route);
  });
});
