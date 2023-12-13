'use client';

import { PageProps } from "@/types/PageProps";
import { useSearchParams } from "next/navigation";

export type MySubjectsPageProps = PageProps<{
    subjectId: string
}>

export default function MySubjectsPage({
    searchParams: {
        subjectId
    }
}: MySubjectsPageProps) {

    return (
        <div>{subjectId}</div>
    );
}
