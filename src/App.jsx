import Header from './components/Header'
import Footer from './sections/Footer'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import PrivacyPage from './pages/PrivacyPage'
import DownloadPage from './pages/DownloadPage'
import FaqPage from './pages/FaqPage'

const pages = {
  home: HomePage,
  features: FeaturesPage,
  privacy: PrivacyPage,
  download: DownloadPage,
  faq: FaqPage,
}

export default function App({ page = 'home' }) {
  const Page = pages[page] ?? HomePage

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header current={page} />
      <main id="main">
        <Page />
      </main>
      <Footer current={page} />
    </>
  )
}
