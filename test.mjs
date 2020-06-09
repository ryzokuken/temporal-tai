import {strict as assert} from 'assert';

import * as Temporal from 'proposal-temporal/polyfill/lib/temporal.mjs';

import TAI from './index.mjs';

const tai = new TAI();
const disambiguation = { disambiguation: 'later' };

const dt1 = Temporal.DateTime.from('1972-01-01T00:00:00');
const dt2 = Temporal.DateTime.from('1973-01-01T00:00:00');
assert.equal(dt1.inTimeZone('UTC').difference(dt2.inTimeZone('UTC')).toString(), 'PT31622400S');
assert.equal(dt1.inTimeZone(tai, disambiguation).difference(dt2.inTimeZone(tai, disambiguation)).toString(), 'PT31622402S');

const abs1 = new Temporal.Absolute(915148831000n * 1000000n);
const abs2 = new Temporal.Absolute(915148832000n * 1000000n);
assert.notEqual(abs1.inTimeZone('UTC').toString(), abs2.inTimeZone('UTC').toString());
assert.equal(abs1.inTimeZone(tai).toString(), abs2.inTimeZone(tai).toString());
