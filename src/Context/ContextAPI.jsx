import PropTypes from 'prop-types';
import { createContext, useState } from "react"

export const ContextProvider = createContext();

const ContextAPI = ({ children }) => {
	const [showForm, setShowForm] = useState(false)
	const [search, setSearch] = useState("")
	const [singleStudent, setSingleStudent] = useState(null)
	const [showSingleStundet, setShowSingleStundent] = useState(false)
	const [QRData, setQRData] = useState(null);

	console.log(singleStudent)

	return (
		<ContextProvider.Provider value={{
			showForm,
			setShowForm,
			search,
			setSearch,
			singleStudent,
			setSingleStudent,
			showSingleStundet,
			setShowSingleStundent,
			QRData,
			setQRData
		}}>
			{children}
		</ContextProvider.Provider>
	)
}

ContextAPI.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ContextAPI;

