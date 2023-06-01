import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";

const root = "http://localhost:5000";

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(root + "/api/users", { method: "GET" });
    return response.json();
}

export interface SignUpCredentials {
    userid: string,
    name: string,
    roleflg: string,
    password: string,
    confirmpassword: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData(root + "/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LoginCredentials {
    userid: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData(root + "/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export async function logout() {
    await fetchData(root + "/api/users/logout", { method: "POST" });
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message" + errorMessage);
        }
    }
}