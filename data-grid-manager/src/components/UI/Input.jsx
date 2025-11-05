const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary w-full text-sm ${className}`}
      {...props}
    />
  );
};

export default Input;
