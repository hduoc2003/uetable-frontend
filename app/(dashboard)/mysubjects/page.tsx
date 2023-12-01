'use client';

import { useSearchParams } from "next/navigation";

interface SearchParams {
    subjectId: string
}

export interface MySubjectsPageProps {
    searchParams: {
        subjectId: string
    }
}

export default function MySubjectsPage({
    searchParams: {
        subjectId
    }
}: MySubjectsPageProps) {

    return (
        <div>{subjectId}</div>
    );
}
