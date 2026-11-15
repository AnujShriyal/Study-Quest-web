import Icon from './Icon'
import useCopy from '../hooks/useCopy'

export default function CopyButton({
  value,
  label = 'Copy',
  copiedLabel = 'Copied',
  className = '',
}) {
  const { status, copy } = useCopy()

  return (
    <button
      type="button"
      className={`copy-btn ${className}`.trim()}
      onClick={() => copy(value)}
      title={label}
    >
      <Icon name={status === 'copied' ? 'check' : 'copy'} size={14} />
      <span>{status === 'copied' ? copiedLabel : label}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {status === 'copied'
          ? 'Copied to clipboard'
          : status === 'error'
            ? 'Could not copy to clipboard'
            : ''}
      </span>
    </button>
  )
}
