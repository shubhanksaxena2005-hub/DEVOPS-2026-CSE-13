export function Input({ label, error, ...props }) {
  return (
    <div>
      {label && (
        <label className="label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input className={`input ${error ? 'border-red-400' : ''}`} {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function Select({ label, error, children, ...props }) {
  return (
    <div>
      {label && (
        <label className="label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <select className={`input ${error ? 'border-red-400' : ''}`} {...props}>
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function TextArea({ label, error, ...props }) {
  return (
    <div>
      {label && (
        <label className="label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <textarea className={`input min-h-[100px] ${error ? 'border-red-400' : ''}`} {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function FieldGroup({ children, cols = 1 }) {
  return <div className={`grid ${cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'} gap-4`}>{children}</div>;
}