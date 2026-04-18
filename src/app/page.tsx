import { getBanner } from "@/api/banner";
import HomeBannerSlider from "@/components/home/HomeBannerSlider";
import HomeToursPreview from "@/components/home/HomeToursPreview";
import HomeAbout from "@/components/home/HomeAbout";
import HomeTeam from "@/components/home/HomeTeam";
import HomeNewsletter from "@/components/home/HomeNewsletter";

export default async function HomePage() {
  const slides = await getBanner();

  return (
    <main>
      <HomeBannerSlider slides={slides} />
      <HomeToursPreview />
      <HomeAbout />
      <HomeTeam />
      <HomeNewsletter />
    </main>
  );
}
