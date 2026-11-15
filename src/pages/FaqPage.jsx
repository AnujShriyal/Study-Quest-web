import PageHead from '../components/PageHead'
import ChapterNav from '../components/ChapterNav'
import Faq from '../sections/Faq'
import { getChapter } from '../config'

export default function FaqPage() {
  return (
    <>
      <PageHead
        chapter={getChapter('faq')}
        title={
          <>
            The short <em>answers.</em>
          </>
        }
        lede="Accounts, SmartScreen, backups, tray behaviour, and what to do when something looks wrong. If the app can do it, it is probably answered here."
        note="Grouped, not endless."
      />

      <Faq />

      <ChapterNav current="faq" />
    </>
  )
}
