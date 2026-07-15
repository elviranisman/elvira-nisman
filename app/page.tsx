import { HomeFeed } from "@/components/HomeFeed";
import { InfiniteHome } from "@/components/InfiniteHome";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <InfiniteHome>
      <HomeFeed projects={projects} />
    </InfiniteHome>
  );
}
