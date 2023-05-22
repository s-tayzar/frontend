import { useState } from 'react';
import { Button, Navbar } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaBell } from "react-icons/fa";
import userIcon from '../images/user128.png';
import { User } from "../models/user";
import * as NotesApi from "../network/user_api";
import SignUpModal from './SignUpModal';

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    const [showSignUpModal, setShowSignUpModal] = useState(false);

    // const passwordResetOnClick = () => {
    //     // クリックされた要素に応じた処理を行う。
    // };

    async function logout() {
        try {
            await NotesApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            {showSignUpModal &&
                <SignUpModal
                    onDismiss={() => setShowSignUpModal(false)}
                    onSignUpSuccessful={() => setShowSignUpModal(false)}
                />
            }

            {user.roleflg === 1 &&
                <>
                    <Button onClick={() => setShowSignUpModal(true)}>
                        {/* Create Account */}
                        <img src={userIcon} alt="Edit" width={24} height={24} />
                    </Button>
                    <Button onClick={() => window.location.href='passwordreset'}>
                        <IconContext.Provider value={
                            {
                                color: "white", className: "global-class-name",
                                style: { position: "relative", minWidth: '18px', minHeight: '18px' }
                            }
                        }>
                            <FaBell />
                            <span style={
                                {
                                    display: 'block',
                                    position: 'absolute',
                                    paddingLeft: '14px',
                                    top: '10px',
                                    textShadow: '2px 1px 4px black, 0 0 0.2em black, 0 0 1em black'
                                }
                            }>5</span>

                        </IconContext.Provider>
                    </Button>
                </>
            }

            <Navbar.Text className="me-2" style={{ paddingLeft: '0.75rem' }}>
                Signed in as: {user.name}
            </Navbar.Text>
            <Button onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;