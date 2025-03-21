"use client"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthContext from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
    const router = useRouter()
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem("token")
            if (storedUser) {
                setLoading(false)
            } else {
                router.push("/login")
            }
        } else {
            setLoading(false)
        }
    }, [user, router])

    return loading ? <p>Loading...</p> : children
}

export default ProtectedRoute
