export default function SectionHead({ index, label, title, lede, id }) {
  return (
    <header className="section-head">
      <p className="section-head__index mono">
        <span className="section-head__num">{index}</span>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </p>
      <div className="section-head__body">
        <h2 className="display" id={id}>
          {title}
        </h2>
        {lede ? <p className="section-head__lede">{lede}</p> : null}
      </div>
    </header>
  )
}
