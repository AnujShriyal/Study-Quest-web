import { useEffect, useRef, useState } from 'react'

/**
 * Copy text with a graceful fallback for browsers without the async clipboard
 * API. Returns a short-lived status that can drive an aria-live announcement.
 */
export default function useCopy(timeout = 2200) {
  const [status, setStatus] = useState('idle')
  const timer = useRef(null)

  useEffect(() => {
    return () => window.clearTimeout(timer.current)
  }, [])

  async function copy(text) {
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.className = 'clipboard-helper'
        document.body.appendChild(area)
        area.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(area)
        if (!ok) throw new Error('Copy was rejected')
      }
      setStatus('copied')
    } catch {
      setStatus('error')
    }

    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setStatus('idle'), timeout)
  }

  return { status, copy }
}
