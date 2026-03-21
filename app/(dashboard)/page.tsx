"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { Suspense } from "react";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";

const DashboardContent = () => {
  const { organization } = useOrganization();
  const searchParams = useSearchParams();

  if (!organization) {
    return <EmptyOrg />;
  }

  return (
    <BoardList 
      orgId={organization.id}
      query={{
        search: searchParams.get("search") || undefined,
        favourites: searchParams.get("favourites") || undefined,
      }}
    />
  );
};

const DashboardPage = () => {
  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      <Suspense fallback={null}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}

export default DashboardPage;