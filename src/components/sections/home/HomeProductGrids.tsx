import { getHomeShowcaseProducts } from "@/lib/homeShowcaseProducts";
import HomeShowcaseSections from "./HomeShowcaseSections";

export default async function HomeProductGrids() {
  const { best, limited } = await getHomeShowcaseProducts();

  return (
    <section className="py-6 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeShowcaseSections best={best} limited={limited} />
      </div>
    </section>
  );
}
