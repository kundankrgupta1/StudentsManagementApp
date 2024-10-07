import { FcManager } from "react-icons/fc"
import { IoSettingsOutline } from "react-icons/io5"

const Navbar = () => {
	const navbarText = [
		{text: "Dashboard"},
		{text: "Attendance"},
		{text: "Manage Student"},
		{text: "Licenses"},
	]
	return (
		<nav className="h-16 m-auto px-20  bg-black text-white flex items-center justify-between">
			<h1 className="font-bold text-3xl">LOGO</h1>

			<ul className="flex items-center gap-8 font-light h-full">
				{
					navbarText.map(({text}, index) => {
						return (
							<li key={index} className="h-full flex items-center justify-center cursor-pointer">{text}</li>
						)
					})
				}
			</ul>

			<div className="flex items-center gap-4 text-3xl">
				<button><IoSettingsOutline /></button>
				<button><FcManager /></button>
			</div>
		</nav>
	)
}

export default Navbar