"use client"

import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMutation, gql } from '@apollo/client';

const AuthContext = createContext()

const LOGIN_USER = gql`
    mutation GetData($username: String!, $password: String!) {
        loginUser(username: $username, password: $password)
    }
`;

const REGISTER_USER = gql`mutation RegisterUser($username: String!, $email: String!, $password: String!, $fullName: String!) {registerUser(username: $username, email: $email, password: $password, fullName: $fullName)}`


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loginUser] = useMutation(LOGIN_USER)
    const [registerUser] = useMutation(REGISTER_USER)
    const router = useRouter()

    // ✅ Sayfa yüklendiğinde localStorage’dan kullanıcıyı al
    useEffect(() => {
        const storedUser = localStorage.getItem("token")
        if (storedUser) {
            setUser(storedUser)
        }
    }, [])

    const login = async (username, password) => {
        try {
            const { data } = await loginUser({
                variables: {
                    username,
                    password
                }
            })
            console.log("Data", data)

            localStorage.setItem("token", data.loginUser)
            setUser(data.loginUser)
            router.push("/")
        } catch (error) {
            console.log("Login Failed", error)
            setError(error)
        }
    }

    const register = async (username, email, password, fullName) => {
        try {
            const { data } = await registerUser({
                variables: {
                    username,
                    email,
                    password,
                    fullName
                }
            })
            console.log("Data", data)

            localStorage.setItem("token", data.registerUser)
            setUser(data.registerUser)
            router.push("/")
        } catch (error) {
            console.log("Register Failed", error)
            setError(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, error, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
