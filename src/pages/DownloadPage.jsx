import PageHead from '../components/PageHead'
import ChapterNav from '../components/ChapterNav'
import Download from '../sections/Download'
import FirstRun from '../sections/FirstRun'
import { getChapter } from '../config'

export default function DownloadPage() {
  return (
    <>
      <PageHead
        chapter={getChapter('download')}
        title={
          <>
            Install once. Then <em>get out of its way.</em>
          </>
        }
        lede="A free, MIT-licensed Windows app. The installer is about 75 MB, unsigned, and completely self-contained. Uninstall it from Windows Settings like anything else."
        note="v1.3.1 · 74.8 MB · SHA-256 published below."
      />

      <Download head={false} />
      <FirstRun />

      <ChapterNav current="download" />
    </>
  )
}
