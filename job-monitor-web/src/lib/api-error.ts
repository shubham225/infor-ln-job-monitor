import axios, { type AxiosError } from "axios";

function extractMessageFromResponse(responseData: unknown): string | undefined {
  if (!responseData || typeof responseData !== "object") {
    return undefined;
  }

  const data = responseData as Record<string, unknown>;
  if (typeof data.message === "string") {
    return data.message;
  }

  if (data.payload && typeof data.payload === "object") {
    const payload = data.payload as Record<string, unknown>;
    if (typeof payload.message === "string") {
      return payload.message;
    }
  }

  return undefined;
}

export function getErrorMessage(error: unknown): string {
  if (!error) {
    return "An unknown error occurred.";
  }

  if (typeof error === "string") {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const message = extractMessageFromResponse(error.response?.data) ?? error.message;
    return message || "An unknown server error occurred.";
  }

  if (error instanceof Error) {
    return error.message || "An unknown error occurred.";
  }

  if (typeof error === "object") {
    const message = extractMessageFromResponse(error);
    if (message) {
      return message;
    }

    return JSON.stringify(error);
  }

  return String(error);
}
