const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"
      />
      <span className="text-sm text-neutral-700">{label}</span>
    </label>
  );
};

export default Checkbox;
