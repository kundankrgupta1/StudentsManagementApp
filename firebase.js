import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyAyQ8iJ9_qQiXdC1fyCAZkcR3dy9gQPeuI",
	authDomain: "studentmanagementapp-769c8.firebaseapp.com",
	projectId: "studentmanagementapp-769c8",
	storageBucket: "studentmanagementapp-769c8.appspot.com",
	messagingSenderId: "738547890540",
	appId: "1:738547890540:web:046cf65c6e492dd00b9b49",
	measurementId: "G-2HYH92VD7R",
	database: "https://studentmanagementapp-769c8-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);
