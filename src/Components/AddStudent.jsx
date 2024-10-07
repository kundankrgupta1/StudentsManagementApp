import axios from "axios"
import { useContext, useState } from "react";
import { FaBus, FaRegWindowClose, FaUser } from "react-icons/fa";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { SiGoogleclassroom } from "react-icons/si";
import InputForm from "./InputForm";
import { ContextProvider } from "../Context/ContextAPI";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../../firebase";

const AddStudent = () => {
	const { showForm, setShowForm } = useContext(ContextProvider);
	const [name, setName] = useState("");
	const [studentClass, setStudentClass] = useState("");
	const [section, setSection] = useState("");
	const [busId, setBusId] = useState("");
	const [currentStatus, setCurrentStatus] = useState("");
	const [message, setMessage] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault();

		const generateId = "APS" + Math.random().toString().slice(2, 6);

		try {
			const db = getDatabase(app);
			set(ref(db, `students/${generateId}`), {
				id: generateId,
				admission_number: generateId.slice(3, 7),
				name: name,
				class: studentClass,
				section: section,
				busId: busId,
				current_status: currentStatus,
				qrCodeData: {
					id: generateId,
					admission_number: generateId.slice(3, 7),
					name: name,
					class: studentClass,
					section: section,
					busId: busId,
					current_status: currentStatus,
				}
			})

			const res = await axios.post("http://localhost:8080/students", {
				id: generateId,
				admission_number: generateId.slice(3, 7),
				name: name,
				class: studentClass,
				section: section,
				busId: busId,
				current_status: currentStatus,
				qrCodeData: {
					id: generateId,
					admission_number: generateId.slice(3, 7),
					name: name,
					class: studentClass,
					section: section,
					busId: busId,
					current_status: currentStatus,
				}
			})
			console.log(res.data)
			setName("")
			setStudentClass("")
			setSection("")
			setBusId("")
			setCurrentStatus("")
			setMessage("Submitted")
			setTimeout(() => {
				setShowForm(false)
				setMessage("")
			}, 2000)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={`${showForm ? "flex" : "hidden"} m-auto fixed justify-center items-center top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70`}>
			<div className="m-auto w-1/3 shadow-2xl p-10 rounded-lg bg-white">
				<div className="flex items-center justify-between mb-5">
					<div>
						<h1 className="text-2xl font-bold text-black">Add Student</h1>
						<p className="text-sm text-gray-600 font-light">
							all fields marked with <span className="text-red-600 font-bold">*</span> are required.
						</p>
					</div>
					<button
						onClick={() => setShowForm(false)}
						className="hover:text-red-600 text-3xl font-bold float-right"
					>
						<FaRegWindowClose />
					</button>
				</div>
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<InputForm
						label="Name"
						icon={<FaUser />}
						type="text"
						required
						placeholder="student name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<div className="flex flex-col">
						<label className="text-black font-light">
							Class <span className="text-red-600 font-bold">*</span>
						</label>
						<div className="flex items-center rounded-sm border-[1px] border-solid border-gray-700">
							<span className="px-2 text-black"><SiGoogleclassroom /></span>
							<select
								className="w-full px-4 py-2 outline-none text-gray-600 font-light"
								required
								value={studentClass}
								onChange={(e) => setStudentClass(e.target.value)}
							>
								<option value="" hidden>select class</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
						</div>
					</div>

					<div className="flex flex-col">
						<label className="text-black font-light">
							Section <span className="text-red-600 font-bold">*</span>
						</label>
						<div className="flex items-center rounded-sm border-[1px] border-solid border-gray-700">
							<span className="px-2 text-black"><SiGoogleclassroom /></span>
							<select
								className="w-full px-4 py-2 outline-none text-gray-600 font-light"
								required
								value={section}
								onChange={(e) => setSection(e.target.value)}
							>
								<option value="" hidden>select section</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
							</select>
						</div>
					</div>

					<div className="flex flex-col">
						<label className="text-black font-light">
							Bus Id <span className="text-red-600 font-bold">*</span>
						</label>
						<div className="flex items-center rounded-sm border-[1px] border-solid border-gray-700">
							<span className="px-2 text-black"><FaBus /></span>
							<select
								className="w-full px-4 py-2 outline-none text-gray-600 font-light"
								required
								value={busId}
								onChange={(e) => setBusId(e.target.value)}
							>
								<option value="" hidden>select bus number</option>
								<option value="CG-04MU-2606">CG-04MU-2606</option>
								<option value="CG-04FL-4076">CG-04FL-4076</option>
								<option value="CG-04FO-9987">CG-04FO-9987</option>
								<option value="CG-04BP-8096">CG-04BP-8096</option>
							</select>
						</div>
					</div>

					<div className="flex flex-col">
						<label className="text-black font-light">
							Current Status <span className="text-red-600 font-bold">*</span>
						</label>
						<div className="flex items-center rounded-sm border-[1px] border-solid border-gray-700">
							<span className="px-2 text-black"><GrStatusCriticalSmall /></span>
							<select
								className="w-full px-4 py-2 outline-none text-gray-600 font-light"
								required
								value={currentStatus}
								onChange={(e) => setCurrentStatus(e.target.value)}
							>
								<option value="" hidden>select status</option>
								<option value="studying">Studying</option>
								<option value="absent">Absent</option>
							</select>
						</div>
					</div>
					<button type="submit" className="w-full bg-black text-white font-bold py-2 mt-4 rounded-sm">Add Student</button>
				</form>
				{message && <p className="text-center text-green-500 font-bold">{message}</p>}
			</div>
		</div>
	)
}

export default AddStudent