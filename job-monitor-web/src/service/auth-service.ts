import apiClient from "@/lib/axios-client";
import { BackendResponse } from "@/types";
import {User} from "@/types/api";

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