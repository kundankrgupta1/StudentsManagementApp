/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { IoSync } from "react-icons/io5"
import { QRCodeCanvas } from "qrcode.react"
import ControlTab1 from "./ControlTab1"
import ControlTab2 from "./ControlTab2"
import { ContextProvider } from "../Context/ContextAPI"

const StudentsList = () => {
	const { search, setSingleStudent, setShowSingleStundent, URL } = useContext(ContextProvider)
	const [data, setData] = useState([])
	

	const fetchData = async () => {
		try {
			const res = await axios.get(`http://localhost:8080/students?${search ? search : URL ? URL : ""}`)
			setData(res.data)
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		const delay = setTimeout(() => { fetchData() }, 1000)
		return () => clearTimeout(delay)
	}, [search, URL])

	return (
		<div>
			<ControlTab1 />
			<ControlTab2 />
			<div className="bg-gray-100 p-16">
				<div
					className="bg-white rounded-t-2xl border-b flex items-center justify-between p-6">
					<h1 className="font-bold">Student Data</h1>
					<button
						className="bg-orange-500 py-2 px-3 font-light text-white rounded-md flex items-center justify-between gap-4"
						onClick={fetchData}
					>
						Sync Now <IoSync />
					</button>
				</div>

				<div>
					<table className="w-full text-center shadow-md">
						<thead className="bg-white">
							<tr className="">
								<th className="p-4"><input type="checkbox" /></th>
								<th>Id</th>
								<th>Admission No</th>
								<th>Name</th>
								<th>Class</th>
								<th>Section</th>
								<th>Bus ID</th>
								<th>Admission Status</th>
								<th>View QR Code</th>
							</tr>
						</thead>
						<tbody>
							{data && data.length === 0 && <tr><td colSpan={9} className="p-4 text-center">No Data Found</td></tr>}
							{data.map((student, index) => (
								<tr key={index} className={`cursor-pointer ${index % 2 === 0 ? "bg-orange-100" : "bg-white"} hover:bg-gray-200`} onClick={() => { setSingleStudent(student); setShowSingleStundent(true) }}
								>
									<td><input type="checkbox" onClick={()=> setSingleStudent(student.qrCodeData)} /></td>
									<td>{student.id}</td>
									<td>{student.admission_number}</td>
									<td>{student.name}</td>
									<td>{student.class}</td>
									<td>{student.section}</td>
									<td>{student.busId}</td>
									<td className="capitalize">{student.current_status}</td>
									<td className="flex items-center justify-center p-4">
										<div className="flex flex-col gap-1 rounded-md items-center justify-center bg-white p-2">
											<QRCodeCanvas size={80}
												value={`Id: ${student.qrCodeData.id}\nAdmission No.: ${student.qrCodeData.admission_number}\nName: ${student.qrCodeData.name}\nClass: ${student.qrCodeData.class}\nSection: ${student.qrCodeData.section}\nBus Id: ${student.qrCodeData.busId}\nCurrent Status: ${student.qrCodeData.current_status}`} />
											<p className="text-[9px] font-normal">{student.qrCodeData.id}{student.qrCodeData.name.split(" ")[0]}</p>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default StudentsList