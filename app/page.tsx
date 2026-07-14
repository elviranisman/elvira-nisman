import { Suspense } from "react";
import { FilteredHomeGrid } from "@/components/FilteredHomeGrid";
import { HomeGrid } from "@/components/HomeGrid";
import { InfiniteHome } from "@/components/InfiniteHome";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <InfiniteHome>
      <Suspense fallback={<HomeGrid projects={projects} />}>
        <FilteredHomeGrid />
      </Suspense>
    </InfiniteHome>
  );
}
