import {
    ONE_BYTE,
    ONE_GIBIBYTE,
    ONE_GIGABYTE,
    ONE_KIBIBYTE,
    ONE_KILOBYTE,
    ONE_MEBIBYTE,
    ONE_MEGABYTE
} from "../constants/data";

export function formatBytes(bytes: number, places = 0): string {
    const bits = bytes * ONE_BYTE;
    if (bits < ONE_KILOBYTE) {
        return (bits / ONE_BYTE).toFixed(places) + " B";
    } else if (bits < ONE_MEGABYTE) {
        return (bits / ONE_KILOBYTE).toFixed(places) + " kB";
    } else if (bits < ONE_GIGABYTE) {
        return (bits / ONE_MEGABYTE).toFixed(places) + " MB";
    } else {
        return (bits / ONE_GIGABYTE).toFixed(places) + " GB";
    }
}
export function formatBinaryBytes(bytes: number, places = 0): string {
    const bits = bytes * ONE_BYTE;
    if (bits < ONE_KIBIBYTE) {
        return (bits / ONE_BYTE).toFixed(places) + " B";
    } else if (bits < ONE_MEBIBYTE) {
        return (bits / ONE_KIBIBYTE).toFixed(places) + " KiB";
    } else if (bits < ONE_GIBIBYTE) {
        return (bits / ONE_MEBIBYTE).toFixed(places) + " MiB";
    } else {
        return (bits / ONE_GIBIBYTE).toFixed(places) + " GiB";
    }
}
