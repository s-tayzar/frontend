import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import { User } from './models/user';
import * as SkillsetApi from "./network/user_api";
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import styles from "./styles/App.module.css";
import PasswordResetPage from './pages/PasswordResetPage';

function App() {

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [showLoginModal, setShowLoginModal] = useState(false);

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await SkillsetApi.getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);

	return (
		<BrowserRouter>
			<div>
				<NavBar
					loggedInUser={loggedInUser}
					onLoginClicked={() => setShowLoginModal(true)}
					onLogoutSuccessful={() => setLoggedInUser(null)}
				/>
				<Container className={styles.pageContainer}>
					<Routes>
						<Route path='/' element={<MainPage loggedInUser={loggedInUser} />}/>
						<Route path='/privacy' element={<PrivacyPage />}/>
						{(loggedInUser?.roleflg === 1) &&
							<Route path='/passwordreset' element={<PasswordResetPage />} />
						}
						<Route path='/*' element={<NotFoundPage />} />
					</Routes>
				</Container>

				{showLoginModal &&
					<LoginModal
						onDismiss={() => setShowLoginModal(false)}
						onLoginSuccessful={(user) => {
							setLoggedInUser(user);
							setShowLoginModal(false);
						}}
					/>
				}
			</div>
		</BrowserRouter>
	);
}

export default App;