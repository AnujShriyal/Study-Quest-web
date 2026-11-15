import { useEffect, useRef, useState } from 'react'
import Wordmark from '../components/Wordmark'
import Icon from '../components/Icon'
import { chapters, navLinks, release } from '../config'

export default function Header({ current = 'home' }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return

    menuRef.current?.querySelector('a')?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return

    function onPointerDown(event) {
      if (!headerRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 861px)')
    function onChange(event) {
      if (event.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    let frame = 0
    function onScroll() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 8))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}
      id="top"
      ref={headerRef}
    >
      <div className="site-header__inner container">
        <div className="site-header__brand">
          <Wordmark />
          <span className="version-pill mono">v{release.version}</span>
        </div>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={current === link.id ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a
            className="btn btn--small btn--primary site-header__download"
            href={release.downloadUrl}
            download={release.downloadName}
          >
            <Icon name="download" size={15} />
            Download .exe
          </a>

          <button
            type="button"
            ref={toggleRef}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="mobile-menu" id="mobile-menu" ref={menuRef}>
          <nav className="mobile-menu__nav" aria-label="Mobile">
            {chapters.map((link) => (
              <a
                key={link.id}
                href={link.href}
                aria-current={current === link.id ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="mono mobile-menu__num">{link.number}</span>
                <span>{link.label}</span>
                <Icon name="arrow-right" size={16} />
              </a>
            ))}
          </nav>
          <a
            className="btn btn--primary mobile-menu__download"
            href={release.downloadUrl}
            download={release.downloadName}
            onClick={() => setOpen(false)}
          >
            Download for Windows
            <Icon name="download" size={16} />
          </a>
          <p className="mobile-menu__meta mono">
            v{release.version} · {release.sizeLabel} · {release.platform}
          </p>
        </div>
      ) : null}
    </header>
  )
}
