function noop() {
  return null;
}

require.extensions['.png'] = function exportEmptyString (module) {
  module.exports = '';
};
require.extensions['.scss'] = noop;