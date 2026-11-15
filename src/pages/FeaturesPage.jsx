import PageHead from '../components/PageHead'
import ChapterNav from '../components/ChapterNav'
import Features from '../sections/Features'
import Overlay from '../sections/Overlay'
import Progress from '../sections/Progress'
import { getChapter } from '../config'

export default function FeaturesPage() {
  return (
    <>
      <PageHead
        chapter={getChapter('features')}
        title={
          <>
            The timer is only <em>the beginning.</em>
          </>
        }
        lede="Eight small tools that share one file and one purpose: make an hour of study feel like an hour well spent. No plugins, no subscription tier, no setup wizard."
        note="Everything below ships in v1.3.1."
      />

      <Features index="02.1" />
      <Overlay index="02.2" />
      <Progress index="02.3" />

      <ChapterNav current="features" />
    </>
  )
}
