import Hero from '@/components/home/Hero'
import PlatformStrip from '@/components/home/PlatformStrip'
import PromoBanner from '@/components/home/PromoBanner'
import FeaturedBikes from '@/components/home/FeaturedBikes'
import PartsModifications from '@/components/home/PartsModifications'
import StatsSection from '@/components/home/StatsSection'
import CustomBuildsCTA from '@/components/home/CustomBuildsCTA'
import BrandStory from '@/components/home/BrandStory'
import Reviews from '@/components/home/Reviews'
import Newsletter from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformStrip />
      <PromoBanner />
      <FeaturedBikes />
      <PartsModifications />
      <StatsSection />
      <CustomBuildsCTA />
      <BrandStory />
      <Reviews />
      <Newsletter />
    </>
  )
}
