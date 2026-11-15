import PageHead from '../components/PageHead'
import ChapterNav from '../components/ChapterNav'
import Privacy from '../sections/Privacy'
import DataLedger from '../sections/DataLedger'
import Backup from '../sections/Backup'
import { getChapter } from '../config'

export default function PrivacyPage() {
  return (
    <>
      <PageHead
        chapter={getChapter('privacy')}
        title={
          <>
            Local by <em>construction.</em>
          </>
        }
        lede="There is no server to trust because there is no server. The entire data model is one JSON file you can open in Notepad, back up with a copy, or delete with File Explorer."
        note="This website sets no cookies and loads nothing from a third party."
      />

      <Privacy index="03.1" />
      <DataLedger />
      <Backup />

      <ChapterNav current="privacy" />
    </>
  )
}
