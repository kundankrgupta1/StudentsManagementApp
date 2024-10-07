import { useContext } from "react"
import { ContextProvider } from "../Context/ContextAPI"
import { FaRegWindowClose } from "react-icons/fa"
import { QRCodeCanvas } from "qrcode.react"

const Student = () => {
	const { singleStudent, setSingleStudent, showSingleStundet, setShowSingleStundent } = useContext(ContextProvider)

	return (
		<div
			className={`${showSingleStundet ? "block" : "hidden"} bg-black w-full h-full fixed top-0 left-0 z-10 bg-opacity-70 flex justify-center items-center`}
		>
			<div className="w-[1200px] h-[600px] bg-white p-8 rounded-md">
				<div className="flex items-center justify-between mb-5 border-b">
					<div>
						<h1 className="text-3xl font-bold text-black">Student Data</h1>
						{/* <p className="text-xs text-gray-600 font-light">confirm your data <span className="text-red-600 font-bold">if not right click on Edit</span></p> */}
					</div>
					<button
						onClick={() => { setShowSingleStundent(false); setSingleStudent(null) }}
						className="hover:text-red-600 text-3xl font-bold float-right"
					>
						<FaRegWindowClose />
					</button>
				</div>
				<div>
					{singleStudent && (
						<div className="flex">
							<div className="basis-[250px] flex flex-col items-center gap-20">
								<img src={singleStudent.img ? "singleStudent.img" : "https://raw.githubusercontent.com/kundankrgupta1/media/refs/heads/main/assets/profile.png"} className="w-[150px]" alt="" />
								<div className="flex flex-col items-center">
									<QRCodeCanvas size={140}
										value={`Id: ${singleStudent.qrCodeData.id}\nAdmission No.: ${singleStudent.qrCodeData.admission_number}\nName: ${singleStudent.qrCodeData.name}\nClass: ${singleStudent.qrCodeData.class}\nSection: ${singleStudent.qrCodeData.section}\nBus Id: ${singleStudent.qrCodeData.busId}\nCurrent Status: ${singleStudent.qrCodeData.current_status}`} />
									<p className="text-[9px] font-normal">{singleStudent.qrCodeData.id}{singleStudent.qrCodeData.name.split(" ")[0]}</p>
									<button className="text-white w-fit bg-gray-900 p-2 font-light rounded-md border-yellow-500 border-[1px]">Download QR Code</button>
								</div>
							</div>
							<div className="basis-2/3">
								<h1 className="text-3xl font-bold">{singleStudent.name}</h1>
								<table>
									<tbody>
										<tr>
											<td className="h-12 w-[200px]">Id No.</td>
											<td className="h-12 w-[200px]">{singleStudent.id}</td>
										</tr>
										<tr>
											<td className="h-12 w-[200px]">Admission No.</td>
											<td className="h-12 w-[200px]">{singleStudent.admission_number}</td>
										</tr>
										<tr>
											<td className="h-12 w-[200px]">Class</td>
											<td className="h-12 w-[200px]">{singleStudent.class}</td>
										</tr>
										<tr>
											<td className="h-12 w-[200px]">Section</td>
											<td className="h-12 w-[200px]">{singleStudent.section}</td>
										</tr>
										<tr>
											<td className="h-12 w-[200px]">Bus. Id</td>
											<td className="h-12 w-[200px]">{singleStudent.busId}</td>
										</tr>
										<tr>
											<td className="h-12 w-[200px]">Admission Status</td>
											<td className="h-12 w-[200px]">{singleStudent.current_status}</td>
										</tr>
									</tbody>
								</table>
								{/* <button className="text-white w-80 bg-gray-900 p-2 font-light rounded-md border-yellow-500 border-[1px]">Edit</button>	 */}
							</div>
							
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Student