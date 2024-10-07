const InputForm = ({ label, icon, type, required, placeholder, onChange, value }) => {
	return (
		<div className="flex flex-col">
			<label className="text-black font-light">
				{label} {required && <span className="text-red-600 font-bold">*</span>}
			</label>
			<div className="flex items-center rounded-sm border-[1px] border-solid border-gray-700">
				<span className="px-2 text-black">{icon}</span>
				<input type={type} required={required} placeholder={placeholder} onChange={onChange} value={value}
					className="w-full px-4 py-2 outline-none text-gray-600 font-light" />
			</div>
		</div>
	);
};

export default InputForm