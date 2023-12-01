import _ from "lodash";

export function openNewTab<SearchParams extends Object>(url: string, searchParams: SearchParams): void {
    url += '?' + _.join(_.map(searchParams, (value, key) => `${key}=${encodeURIComponent(value as string)}`));
    window.open(url, '_blank');
}
