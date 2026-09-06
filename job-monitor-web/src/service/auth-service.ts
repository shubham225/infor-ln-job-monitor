"use client"

import apiClient from "@/lib/axios-client";
import { BackendResponse } from "@/types";
import {User} from "@/types/api";

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

// Message Exclusions
export async function fetchLoggedInUser(): Promise<User> {
    try {
        const response = await apiClient.get<BackendResponse<User>>(
            `/me`
        );
        return response.data.payload;

    } catch (error) {
        console.error("Failed to fetch logged in user:", error);
        throw error;
    }
}

export async function handleLogout() {
    try {
        const csrfToken = getCookie("XSRF-TOKEN"); // default cookie name from CookieCsrfTokenRepository

        await fetch("/logout", {
            method: "POST",
            credentials: "include", // send session cookie + XSRF-TOKEN cookie
            headers: {
                "X-XSRF-TOKEN": csrfToken ?? "",
            },
        });
    } catch (e) {
        console.error("Logout failed", e);
    } finally {
        // fetch() follows the 302 from logoutSuccessUrl internally,
        // but the browser itself doesn't navigate — force it so the app re-renders as logged out
        window.location.href = "/";
    }
}