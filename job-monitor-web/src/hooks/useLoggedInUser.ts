"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/api";
import {fetchLoggedInUser} from "@/service/auth-service";

export function useLoggedInUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
                setError(null);

                const loggedInUser = await fetchLoggedInUser();
                setUser(loggedInUser);
            } catch (error) {
                console.error("Failed to load logged in user:", error);
                setError(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    return {
        user,
        loading,
        error,
    };
}