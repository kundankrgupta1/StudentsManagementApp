import { IoMdArrowDropdown, IoMdClose } from "react-icons/io"
import { ContextProvider } from "../Context/ContextAPI"
import { useContext, useState } from "react"

const ControlTab1 = () => {

	const { setURL, setSearch } = useContext(ContextProvider)
	const [inputValue, setInputValue] = useState("")
	const [isFilterSearch, setIsFilterSearch] = useState(false)
	const [selectedClass, setSelectedClass] = useState("")
	const [selectedSection, setSelectedSection] = useState("")
	const [selectedBusId, setSelectedBusId] = useState("")
	const [selectedStatus, setSelectedStatus] = useState("")


	const [closeIconVisibility, setCloseIconVisibility] = useState({
		class: false,
		section: false,
		busId: false,
		currentStatus: false,
	});

	const handleSearch = (e) => {
		const value = e.target.value
		setInputValue(value)
		setSearch(`q=${inputValue}`)
		setIsFilterSearch(true)
	}

	const handleSearchClear = () => {
		setInputValue("")
		setSearch("")
		setIsFilterSearch(false)
	}


	const handleChange = (e) => {
		const { name, value } = e.target;

		// Update selected value and URL
		switch (name) {
			case "class":
				setSelectedClass(value);
				setURL(`class=${value}`);
				break;
			case "section":
				setSelectedSection(value);
				setURL(`section=${value}`);
				break;
			case "busId":
				setSelectedBusId(value);
				setURL(`busId=${value}`);
				break;
			case "current_status":
				setSelectedStatus(value);
				setURL(`current_status=${value}`);
				break;
			default:
				break;
		}

		// Show close icon for the respective field
		setCloseIconVisibility((prev) => ({ ...prev, [name]: true }));
	};

	const handleClose = (name) => {
		// Clear the selected value based on the name
		switch (name) {
			case "class":
				setSelectedClass("");
				break;
			case "section":
				setSelectedSection("");
				break;
			case "busId":
				setSelectedBusId("");
				break;
			case "current_status":
				setSelectedStatus("");
				break;
			default:
				break;
		}

		setURL(""); // Clear URL
		setCloseIconVisibility((prev) => ({ ...prev, [name]: false })); // Hide the respective close icon
	};


	return (
		<div className="bg-gray-100 px-20 py-10 flex items-center justify-between">
			<div className="flex flex-col">
				<label>Search by name / Admission No.</label>
				<div className="px-2 flex items-center rounded-md border border-orange-400 bg-white">
					<input
						type="text"
						name="search"
						placeholder="Search stundent..."
						className="w-full px-2 py-2 outline-none text-gray-600 font-light rounded-md"
						value={inputValue}
						onChange={handleSearch}
					/>
					{isFilterSearch ? (
						<IoMdClose className="text-orange-400 text-xl" onClick={handleSearchClear} />
					) : (
						<IoMdArrowDropdown className="text-orange-400" />
					)}
				</div>
			</div>
			<div className="flex flex-col">
				<label>Class</label>
				<div className="px-2 flex items-center rounded-md border border-orange-400 bg-white">
					<select name="class" className="w-full px-2 py-2 outline-none text-gray-600 font-light rounded-md"
						onChange={handleChange}
						value={selectedClass}
					>
						<option value="" hidden>select class</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">11</option>
						<option value="12">12</option>
					</select>
					{closeIconVisibility.class ? (
						<IoMdClose className="text-orange-400 text-xl" onClick={handleClose} />
					) : (
						<IoMdArrowDropdown className="text-orange-400" />
					)}
				</div>
			</div>
			<div className="flex flex-col">
				<label>Section</label>
				<div className="px-2 flex items-center rounded-md border border-orange-400 bg-white">
					<select name="section" className="w-full px-2 py-2 outline-none text-gray-600 font-light rounded-md"
						onChange={handleChange}
						value={selectedSection}
					>
						<option value="" hidden>select section</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</select>
					{closeIconVisibility.section ? (
						<IoMdClose className="text-orange-400 text-xl" onClick={handleClose} />
					) : (
						<IoMdArrowDropdown className="text-orange-400" />
					)}
				</div>
			</div>
			<div className="flex flex-col">
				<label>Bus Id</label>
				<div className="px-2 flex items-center rounded-md border border-orange-400 bg-white">
					<select name="busId" className="w-full px-2 py-2 outline-none text-gray-600 font-light rounded-md"
						onChange={handleChange}
						value={selectedBusId}
					>
						<option value="" hidden>select bus id</option>
						<option value="" hidden>select bus number</option>
						<option value="CG-04MU-2606">CG-04MU-2606</option>
						<option value="CG-04FL-4076">CG-04FL-4076</option>
						<option value="CG-04FO-9987">CG-04FO-9987</option>
						<option value="CG-04BP-8096">CG-04BP-8096</option>
					</select>
					{closeIconVisibility.busId ? (
						<IoMdClose className="text-orange-400 text-xl" onClick={handleClose} />
					) : (
						<IoMdArrowDropdown className="text-orange-400" />
					)}
				</div>
			</div>
			<div className="flex flex-col">
				<label>Admission Status</label>
				<div className="px-2 flex items-center rounded-md border border-orange-400 bg-white">
					<select name="current_status" className="w-full px-2 py-2 outline-none text-gray-600 font-light rounded-md" onChange={handleChange}
						value={selectedStatus}>
						<option value="" hidden>select status</option>
						<option value="studying">Studying</option>
						<option value="absent">Absent</option>
					</select>
					{closeIconVisibility.currentStatus ? (
						<IoMdClose className="text-orange-400 text-xl" onClick={handleClose} />
					) : (
						<IoMdArrowDropdown className="text-orange-400" />
					)}
				</div>
			</div>
		</div>
	)
}

export default ControlTab1