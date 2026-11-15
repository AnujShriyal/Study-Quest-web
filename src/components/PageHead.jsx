/**
 * Page opener for every route except the home page. The oversized numeral is
 * decorative (rendered from data-num) and the h1 carries the real meaning.
 */
export default function PageHead({ chapter, title, lede, note }) {
  return (
    <header className="page-head" data-num={chapter.number}>
      <div className="container page-head__inner">
        <p className="page-head__meta mono">
          <span className="page-head__num">{chapter.number}</span>
          <span aria-hidden="true">/</span>
          <span>{chapter.label}</span>
        </p>

        <div className="page-head__body">
          <h1 className="display page-head__title">{title}</h1>
          <div className="page-head__aside">
            <p className="page-head__lede">{lede}</p>
            {note ? <p className="page-head__note mono">{note}</p> : null}
          </div>
        </div>
      </div>
    </header>
  )
}
