'use strict';

import dust from 'dustjs-linkedin';

export function translate(load) {
  const address = load.address;

  const protocolIndex = address.indexOf('://');
  const slashIndex = address.indexOf('/', protocolIndex === -1 ? 0 : (protocolIndex + 3));
  const name = address.substr(slashIndex === -1 ? 0 : (slashIndex + 1)).replace('.dust', '')

  const precompiled = dust.compile(load.source, name);

  let output;
  if (load.metadata.format === 'esm') {
    output = `export default ${precompiled};`;
  } else if (load.metadata.format === 'amd') {
    output = `define([], function() { return ${precompiled}; });`;
  } else {
    output = `module.exports = ${precompiled};`;
  }
  load.source = output;
  return output;
}
