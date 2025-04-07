"use client"

import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery, gql } from '@apollo/client';

const AuthContext = createContext()

const LOGIN_USER = gql`
    mutation GetData($username: String!, $password: String!) {
        loginUser(username: $username, password: $password){
        id,
        token
        }
    }
`;

const REGISTER_USER = gql`mutation RegisterUser($username: String!, $email: String!, $password: String!, $fullName: String!) {registerUser(username: $username, email: $email, password: $password, fullName: $fullName)}`

const GET_USER_DATA = gql`
    query GetUserByToken ($token: String!) {
        getUserByToken(token: $token) {
            id
        }
    }
`;


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loginUser] = useMutation(LOGIN_USER)
    const [registerUser] = useMutation(REGISTER_USER)
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("token") : null
    const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_DATA, {
        variables: { token: storedUser },
        skip: !storedUser,
    });
    const router = useRouter()

    // ✅ Sayfa yüklendiğinde localStorage’dan kullanıcıyı al
    useEffect(() => {
        
        if (!storedUser || (!userLoading && !userData)) {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            setUser(null)
            router.push("/login");
        } 
        // if (storedUser) {
        //     setUser(storedUser)
        //     console.log(storedUser)
        //     console.log("USER::", user)
        // }
    }, [user, userLoading, userData])

    const login = async (username, password) => {
        try {
            const { data } = await loginUser({
                variables: {
                    username,
                    password
                }
            })

            localStorage.setItem("token", data.loginUser.token)
            localStorage.setItem("userId", data.loginUser.id)
            setUser(data.loginUser.token)
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

            localStorage.setItem("token", data.registerUser.token)
            localStorage.setItem("userId", data.registerUser.id)
            setUser(data.registerUser)
            router.push("/")
        } catch (error) {
            console.log("Register Failed", error)
            setError(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
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
