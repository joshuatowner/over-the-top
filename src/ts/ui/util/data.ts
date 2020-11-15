import {
  ONE_BYTE,
  ONE_GIBIBYTE, ONE_GIGABIT,
  ONE_GIGABYTE,
  ONE_KIBIBYTE, ONE_KILOBIT,
  ONE_KILOBYTE,
  ONE_MEBIBYTE,
  ONE_MEGABYTE
} from "../constants/data";

export function formatBytes(bytes: number, places = 3): string {
    const bits = bytes * ONE_BYTE;
    if (bits < ONE_KILOBYTE) {
        return (bits / ONE_BYTE).toPrecision(places) + " B";
    } else if (bits < ONE_MEGABYTE) {
        return (bits / ONE_KILOBYTE).toPrecision(places) + " kB";
    } else if (bits < ONE_GIGABYTE) {
        return (bits / ONE_MEGABYTE).toPrecision(places) + " MB";
    } else {
        return (bits / ONE_GIGABYTE).toPrecision(places) + " GB";
    }
}
export function formatBinaryBytes(bytes: number, places = 3): string {
    const bits = bytes * ONE_BYTE;
    if (bits < ONE_KIBIBYTE) {
        return (bits / ONE_BYTE).toPrecision(places) + " B";
    } else if (bits < ONE_MEBIBYTE) {
        return (bits / ONE_KIBIBYTE).toPrecision(places) + " KiB";
    } else if (bits < ONE_GIBIBYTE) {
        return (bits / ONE_MEBIBYTE).toPrecision(places) + " MiB";
    } else {
        return (bits / ONE_GIBIBYTE).toPrecision(places) + " GiB";
    }
}

export function normalizeLog(bytes: number, min= ONE_KILOBIT, max= ONE_GIGABIT) {
  if (bytes <= 0) {
    return 0;
  }
  const denom = Math.log(max / min);
  const amount = (Math.log(bytes * ONE_BYTE) - Math.log(min)) / denom;
  return Math.max(Math.min(amount, 1), 0);
}
