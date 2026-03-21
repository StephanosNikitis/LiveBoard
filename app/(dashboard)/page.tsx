"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { Suspense, use } from "react";
import { BoardList } from "./_components/board-list";

interface DashboardPageProps {
  searchParams: Promise<{
    search?: string;
    favourites?: string;
  }>;
};

const DashboardPage = ({
  searchParams,
} : DashboardPageProps) => {
  const { organization } = useOrganization();
  const { search, favourites } = use(searchParams);

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      {/* {JSON.stringify({ search, favourites })} */}
      {!organization ? (
        <EmptyOrg />
      ) : (
        <Suspense fallback={null}>
          <BoardList 
            orgId = {organization.id}
            query = {{
              search,
              favourites
            }}
          />
        </Suspense>
      )}
    </div>
  )
}

export default DashboardPage