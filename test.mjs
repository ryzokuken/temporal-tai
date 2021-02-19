import {strict as assert} from 'assert';

import { Temporal } from 'proposal-temporal/lib/index.mjs';

import TAI from './index.mjs';

const tai = new TAI();
const disambiguation = { disambiguation: 'later' };

const pdt1 = Temporal.PlainDateTime.from('1972-01-01T00:00:00');
const pdt2 = Temporal.PlainDateTime.from('1973-01-01T00:00:00');
assert.equal(pdt1.toZonedDateTime('UTC').until(pdt2.toZonedDateTime('UTC'), { largestUnit: 'seconds' }).toString(), 'PT31622400S');
assert.equal(pdt1.toZonedDateTime(tai, disambiguation).until(pdt2.toZonedDateTime(tai, disambiguation), { largestUnit: 'seconds' }).toString(), 'PT31622402S');

const instant1 = new Temporal.Instant(915148831000n * 1_000_000n);
const instant2 = new Temporal.Instant(915148832000n * 1_000_000n);
assert.notEqual(instant1.toZonedDateTimeISO('UTC').toString(), instant2.toZonedDateTimeISO('UTC').toString());
assert.equal(instant1.toZonedDateTimeISO(tai).toString(), instant2.toZonedDateTimeISO(tai).toString());
