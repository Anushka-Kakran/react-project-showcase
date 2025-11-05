const baseStyles = "px-4 py-2 rounded-lg font-semibold transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-sm";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-primary-hover dark:hover:bg-primary",

  secondary: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600",
 
  tertiary: "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-600 dark:hover:bg-neutral-700",
};

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) => {
  const style = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${style} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;