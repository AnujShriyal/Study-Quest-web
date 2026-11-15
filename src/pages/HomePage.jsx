import Hero from '../sections/Hero'
import Contents from '../components/Contents'
import Loop from '../sections/Loop'
import ToolkitTeaser from '../sections/ToolkitTeaser'
import DownloadCta from '../components/DownloadCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Contents />
      <Loop index="01.1" />
      <ToolkitTeaser />
      <DownloadCta />
    </>
  )
}
