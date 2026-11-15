const rows = [
  {
    record: 'Study sessions',
    detail: 'Subject, date, duration, start and end times',
    stored: 'Local JSON',
    leaves: 'Never',
  },
  {
    record: 'Quest log',
    detail: 'Missions, completion state, timestamps',
    stored: 'Local JSON',
    leaves: 'Never',
  },
  {
    record: 'Subjects & settings',
    detail: 'Recent subjects, daily goal, overlay position',
    stored: 'Local JSON',
    leaves: 'Never',
  },
  {
    record: 'Active timer',
    detail: 'Used only for crash and restart recovery',
    stored: 'Local JSON',
    leaves: 'Never',
  },
  {
    record: 'Analytics & telemetry',
    detail: 'No SDK, no events, no identifiers',
    stored: 'Not collected',
    leaves: '—',
  },
  {
    record: 'Account',
    detail: 'There is nothing to sign up for',
    stored: 'Not created',
    leaves: '—',
  },
]

export default function DataLedger() {
  return (
    <section className="section ledger" aria-labelledby="ledger-title">
      <div className="container">
        <div className="ledger__head">
          <div>
            <p className="section-head__index mono">
              <span className="section-head__num">03.2</span>
              <span aria-hidden="true">/</span>
              <span>The ledger</span>
            </p>
            <h2 className="display ledger__title" id="ledger-title">
              What leaves the machine? <em>Nothing.</em>
            </h2>
          </div>
          <p className="ledger__lede">
            Every record the app keeps is listed below. There is no hidden
            sync layer, no crash reporter, and no &ldquo;anonymous usage
            data&rdquo; checkbox you forgot about.
          </p>
        </div>

        <div className="ledger__table-wrap">
          <table className="ledger__table">
            <caption className="sr-only">
              Study Quest records, where each one is stored, and whether it
              leaves the device
            </caption>
            <thead>
              <tr>
                <th scope="col">Record</th>
                <th scope="col">What it holds</th>
                <th scope="col">Stored in</th>
                <th scope="col">Leaves device</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.record}>
                  <th scope="row">{row.record}</th>
                  <td>{row.detail}</td>
                  <td className="mono">{row.stored}</td>
                  <td className="ledger__status mono">
                    {row.leaves === 'Never' ? (
                      <>
                        <span className="ledger__dot" aria-hidden="true" />
                        Never
                      </>
                    ) : (
                      row.leaves
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="ledger__foot mono">
          <span className="live-dot" aria-hidden="true" />
          No analytics · no telemetry · no sync service
        </p>
      </div>
    </section>
  )
}
