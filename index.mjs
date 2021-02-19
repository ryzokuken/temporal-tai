import { Temporal } from 'proposal-temporal/lib/index.mjs';
import tai from 't-a-i';

export default class TAI extends Temporal.TimeZone {
  constructor() {
    super('UTC');
  }

  toString() {
    return 'Etc/TAI';
  }

  getOffsetNanosecondsFor() {
    return 0;
  };

  getNextTransition() {
    return null;
  }

  getPreviousTransition() {
    return null;
  }

  getPossibleInstantsFor(pdt) {
    const instant = Temporal.TimeZone.from('UTC').getInstantFor(pdt); // There's no DST in UTC
    const nanos = instant.epochNanoseconds;
    const millis = instant.epochMilliseconds;
    const precision = nanos % 1_000_000n;
    const tais = tai.convert.oneToMany.unixToAtomic(millis);
    return tais.map(tai => new Temporal.Instant(BigInt(tai * 1e6) + precision));
  }

  getPlainDateTimeFor(instant) {
    const nanos = instant.epochNanoseconds;
    const millis = instant.epochMilliseconds;
    const precision = nanos % 1_000_000n;
    const utc = tai.convert.oneToMany.atomicToUnix(millis);
    return Temporal.TimeZone.from('UTC').getPlainDateTimeFor(new Temporal.Instant(BigInt(utc) + precision));
  }
}
