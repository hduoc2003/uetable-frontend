'use client';

import { PageProps } from "@/types/PageProps";


export type SubjectDocumentsPageProps = PageProps<{
  subjectId: string
}>;

export default function SubjectDocumentsPage({
    searchParams: {
        subjectId
    }
}: SubjectDocumentsPageProps) {
  return (
    <div>
      <h1>Client Component</h1>
    </div>
  );
}
