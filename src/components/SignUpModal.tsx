import { useState } from 'react';
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConflictError } from "../errors/http_errors";
import * as UserApi from "../network/user_api";
import { SignUpCredentials } from "../network/user_api";
import styleUtils from "../styles/utils.module.css";
import TextInputField from "./form/TextInputField";

interface SignUpModalProps {
    onDismiss: () => void,
    onSignUpSuccessful: () => void,
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {

    const [ errorText, setErrorText ] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState('2');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            credentials.roleflg = selectedOption;

            if (credentials.password !== credentials.confirmpassword) {
                // Show error message
                setErrorText("Password and confirm password do not match");
              } else {
                // Submit form
                await UserApi.signUp(credentials);
                onSignUpSuccessful();
            }
        } catch (error) {
            if (error instanceof ConflictError) {
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
                    Sign Up
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
                        type="text"
                        placeholder="ユーザーID"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.userid}
                    />
                    <TextInputField
                        name="name"
                        label="名前"
                        type="text"
                        placeholder="名前"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.name}
                    />
                    <Form.Group className="mb-3" controlId="roleflg-select">
                        <Form.Label>ユーザー区分</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedOption}
                            onChange={e => setSelectedOption(e.target.value)}
                        >
                            <option value="1">JM課</option>
                            <option value="2">GIT</option>
                        </Form.Control>
                    </Form.Group>
                    <TextInputField
                        name="password"
                        label="新しいパスワード"
                        type="password"
                        placeholder="新しいパスワード"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <TextInputField
                        name="confirmpassword"
                        label="再入力パスワード"
                        type="password"
                        placeholder="再入力パスワード"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.confirmpassword }
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>

        </Modal>
    );
}

export default SignUpModal;