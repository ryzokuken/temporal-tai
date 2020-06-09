import * as Temporal from 'proposal-temporal/polyfill/lib/temporal.mjs';
import tai from 't-a-i';

export default class TAI extends Temporal.TimeZone {
  constructor() {
    super('Etc/TAI');
  }

  getOffsetNanosecondsFor() {
    return 0;
  };

  *getTransitions() {}

  getPossibleAbsolutesFor(dt) {
    const abs = Temporal.TimeZone.from('UTC').getAbsoluteFor(dt); // There's no DST in UTC
    const nanos = abs.getEpochNanoseconds();
    const millis = abs.getEpochMilliseconds();
    const precision = nanos % BigInt(millis);
    const tais = tai.convert.oneToMany.unixToAtomic(millis);
    return tais.map(tai => { return new Temporal.Absolute(BigInt(tai * 1e6) + precision) });
  }

  getDateTimeFor(abs) {
    const nanos = abs.getEpochNanoseconds();
    const millis = abs.getEpochMilliseconds();
    const precision = nanos % BigInt(millis);
    const utc = tai.convert.oneToMany.atomicToUnix(millis);
    return Temporal.TimeZone.from('UTC').getDateTimeFor(new Temporal.Absolute(BigInt(utc) + precision));
  }
}
