export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary: 'bg-green-700 hover:bg-green-800 text-white',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-800',
    outline: 'bg-transparent border border-green-700 hover:bg-green-50 text-green-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    earth: 'bg-earth-700 hover:bg-earth-800 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}