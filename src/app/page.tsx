import HeroSection from "@/components/sections/HeroSection";
import WhyCupffee from "@/components/sections/WhyCupffee";
import ProductSizes from "@/components/sections/ProductSizes";
import StatsSection from "@/components/sections/StatsSection";
import BrandingSection from "@/components/sections/BrandingSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SamplePackSection from "@/components/sections/SamplePackSection";
import SuitableFor from "@/components/sections/SuitableFor";
import BlogPreview from "@/components/sections/BlogPreview";
import CustomerLoveSection from "@/components/sections/CustomerLoveSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyCupffee />
      <ProductSizes />
      <StatsSection />
      <BrandingSection />
      <SuitableFor />
      <SamplePackSection />
      <TestimonialsSection />
      <CustomerLoveSection />
      <BlogPreview />
    </>
  );
}
