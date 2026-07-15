import { Suspense } from "react";
import { FilteredHomeFeed } from "@/components/FilteredHomeFeed";
import { HomeFeed } from "@/components/HomeFeed";
import { InfiniteHome } from "@/components/InfiniteHome";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <InfiniteHome>
      <Suspense fallback={<HomeFeed projects={projects} />}>
        <FilteredHomeFeed />
      </Suspense>
    </InfiniteHome>
  );
}
