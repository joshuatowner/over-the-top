import {
  ONE_BYTE,
  ONE_GIBIBYTE,
  ONE_GIGABIT,
  ONE_GIGABYTE,
  ONE_KIBIBYTE,
  ONE_KILOBIT,
  ONE_KILOBYTE,
  ONE_MEBIBYTE,
  ONE_MEGABYTE
} from "../constants/data";

function formatNumber(input: number, places: number): number {
  return parseFloat(input.toPrecision(places));
}

export function formatBytes(bytes: number, places = 3): string {
  const bits = bytes * ONE_BYTE;
  if (bits < ONE_KILOBYTE) {
    return formatNumber(bits / ONE_BYTE, places) + " B";
  } else if (bits < ONE_MEGABYTE) {
    return formatNumber(bits / ONE_KILOBYTE, places) + " kB";
  } else if (bits < ONE_GIGABYTE) {
    return formatNumber(bits / ONE_MEGABYTE, places) + " MB";
  } else {
    return formatNumber(bits / ONE_GIGABYTE, places) + " GB";
  }
}

export function formatBinaryBytes(bytes: number, places = 3): string {
  const bits = bytes * ONE_BYTE;
  if (bits < ONE_KIBIBYTE) {
    return formatNumber(bits / ONE_BYTE, places) + " B";
  } else if (bits < ONE_MEBIBYTE) {
    return formatNumber(bits / ONE_KIBIBYTE, places) + " KiB";
  } else if (bits < ONE_GIBIBYTE) {
    return formatNumber(bits / ONE_MEBIBYTE, places) + " MiB";
  } else {
    return formatNumber(bits / ONE_GIBIBYTE, places) + " GiB";
  }
}

export function normalizeLog(bytes: number, min = ONE_KILOBIT, max = ONE_GIGABIT) {
  if (bytes <= 0) {
    return 0;
  }
  const denom = Math.log(max / min);
  const amount = (Math.log(bytes * ONE_BYTE) - Math.log(min)) / denom;
  return Math.max(Math.min(amount, 1), 0);
}
