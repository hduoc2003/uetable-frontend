export type SearchParams = Record<string, string | number>;

export interface PageProps<SP extends SearchParams> {
    searchParams: SP
}

