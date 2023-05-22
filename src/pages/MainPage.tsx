import { Container } from "react-bootstrap";
import JMView from "../components/JMView";
import GeneralUsersView from "../components/GeneralUsersView";
import { User } from "../models/user";
import styles from "../styles/SkillsetPage.module.css";
import EngineerView from "../components/EngineerView";

interface SkillsetPageProps {
    loggedInUser: User | null,
}

const MainPage = ({ loggedInUser }: SkillsetPageProps) => {
    return (
        <Container className={styles.userPage}>
            <>
                {loggedInUser
                    ? ( loggedInUser.roleflg === 1 ? <JMView /> 
                        : loggedInUser.roleflg === 2 ? <EngineerView /> 
                        : <GeneralUsersView />)
                    : <GeneralUsersView />
                }
            </>
        </Container>
    );
}

export default MainPage;