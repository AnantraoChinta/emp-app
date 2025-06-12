

export default function Timeline({ segments }) {
    return (
      <ul className="timeline">
        {segments.map((s, i) => (
          <li key={i} className={s.role.toLowerCase()}>
            <b>{s.role}:</b> {s.text}
            <span className="ts">{toClock(s.start)} – {toClock(s.end)}</span>
          </li>
        ))}
      </ul>
    );
  }
  