import AddStudent from "./Components/AddStudent"
import Navbar from "./Components/Navbar"
import Student from "./Components/Student"
import StudentsList from "./Components/StudentsList"
// import GenerateQR from "./Components/GenerateQR"

const App = () => {

	return (
		<div className="w-[1350px] m-auto border-4 border-black">
			<Navbar />
			<StudentsList />
			<AddStudent />
			<Student />
			{/* <GenerateQR StudentData={StudentData} /> */}
		</div>
	)
}

export default App