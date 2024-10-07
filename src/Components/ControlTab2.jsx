import { useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { MdDownload, MdUpload } from 'react-icons/md'
import { ContextProvider } from '../Context/ContextAPI'

const ControlTab2 = () => {
	const { setShowForm } = useContext(ContextProvider)

	return (
		<div className="m-auto bg-black p-10 text-white flex justify-between items-center">
			<button
				className="bg-gray-900 w-96 p-3 font-light rounded-md border-yellow-500 border-[1px] flex items-center justify-between gap-2"
				onClick={() => setShowForm(true)}
			>
				Add Student using Form <FaPlus />
			</button>
			<button
				className="bg-gray-900 w-96 p-3 font-light rounded-md border-yellow-500 border-[1px] flex items-center justify-between gap-2"
			>
				Download QR Code<MdDownload />
			</button>
			<button
				className="bg-gray-900 w-96 p-3 font-light rounded-md border-yellow-500 border-[1px] flex items-center justify-between gap-2"
			>
				Upload Excel File<MdUpload />
			</button>
		</div>
	)
}

export default ControlTab2