import { HomeFeed } from "@/components/HomeFeed";
import { InfiniteHome } from "@/components/InfiniteHome";
import { getHomeModules, getProjects } from "@/lib/sanity";

export default async function Home() {
  const projects = await getProjects();
  const modules = await getHomeModules(projects);

  return (
    <InfiniteHome>
      <HomeFeed modules={modules} />
    </InfiniteHome>
  );
}
