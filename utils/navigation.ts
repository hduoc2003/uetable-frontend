import { SearchParams } from "@/types/PageProps";
import _ from "lodash";

export function openNewTab<SP extends SearchParams>(url: string, searchParams?: SP): void {
    url = getURL(url, searchParams);
    window.open(url, '_blank');
}

export function getURL<SP extends SearchParams>(url: string, searchParams?: SP): string {
    if (searchParams)
        url += '?' + _.join(_.map(searchParams, (value, key) => `${key}=${encodeURIComponent(value as string)}`), '&');
    return url;
}
