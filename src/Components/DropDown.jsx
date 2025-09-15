export default function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="w-full mb-4">
      <label className="block mb-2 text-[14px] font-noto font-[500] text-black">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[56px] px-4 border rounded-[8px] text-black text-[14px] font-noto focus:outline-none"
        style={{
          background: "linear-gradient(35deg, #0F35FF, #94288A, #E8D610)",
        }}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
