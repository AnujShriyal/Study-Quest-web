import Icon from './Icon'
import { chapters } from '../config'

export default function Contents() {
  const items = chapters.filter((chapter) => chapter.id !== 'home')

  return (
    <section className="contents" aria-labelledby="contents-title">
      <div className="container">
        <div className="contents__head">
          <h2 className="mono" id="contents-title">
            Contents
          </h2>
          <p className="mono">
            Four more pages · no infinite scroll
          </p>
        </div>

        <ol className="contents__list">
          {items.map((chapter) => (
            <li key={chapter.id}>
              <a href={chapter.href}>
                <span className="contents__num mono">{chapter.number}</span>
                <span className="contents__text">
                  <span className="contents__title display">
                    {chapter.label}
                  </span>
                  <span className="contents__summary">{chapter.summary}</span>
                </span>
                <span className="contents__arrow">
                  <Icon name="arrow-right" size={18} />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
