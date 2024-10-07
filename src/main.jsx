import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextAPI from './Context/ContextAPI.jsx'

createRoot(document.getElementById('root')).render(
	<ContextAPI>
		<App />
	</ContextAPI>
)
