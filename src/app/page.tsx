import HomeHero from "@/components/sections/home/HomeHero";
import HomeProductGrids from "@/components/sections/home/HomeProductGrids";
import HomeNewCollection from "@/components/sections/home/HomeNewCollection";
import HomeEcoStatement from "@/components/sections/home/HomeEcoStatement";
import HomeCommitment from "@/components/sections/home/HomeCommitment";
import HomeCustomers from "@/components/sections/home/HomeCustomers";
import HomeNewsletterBanner from "@/components/sections/home/HomeNewsletterBanner";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeProductGrids />
      <HomeNewCollection />
      <HomeEcoStatement />
      <HomeCommitment />
      <HomeCustomers />
      <HomeNewsletterBanner />
    </>
  );
}
