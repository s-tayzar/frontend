import { useState } from 'react';
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import * as UserApi from "../network/user_api";
import { LoginCredentials } from "../network/user_api";
import styleUtils from "../styles/utils.module.css";
import PasswordInputField from './form/PasswordInputField2Horizontal';
import TextInputField from "./form/TextInputFieldHorizontal";
// import PasswordInputField from './form/PasswordInputField2';
// import TextInputField from "./form/TextInputField";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await UserApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {errorText &&
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="userid"
                        label="ユーザーID"
                        // labelLength={2}
                        // itemLength={10}
                        type="text"
                        placeholder="ユーザーID"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.userid}
                    />
                    <PasswordInputField
                        name="password"
                        label="パスワード"
                        // labelLength={2}
                        // itemLength={10}
                        placeholder="パスワード"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        // className={styleUtils.width100}
                        >
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default LoginModal;