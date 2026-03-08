package com.shubham225.utils;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.shubham225.domains.HttpResult;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HttpUtil {
    private static final HttpClient client = HttpClient.newHttpClient();

    public static HttpResult get(String url) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .GET()
                .build();

        return sendHttpRequest(request);
    }

    public static HttpResult post(String url, ObjectNode jsonBody) {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody.toString()))
                .build();
        return sendHttpRequest(request);
    }

    private static HttpResult sendHttpRequest(HttpRequest request) {
        try {
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            return new HttpResult(response.statusCode(), response.body(), null);

        } catch (java.net.ConnectException e) {
            return new HttpResult(2, null,
                    "Could not connect to server: " + request.uri() + " | " + e.getMessage());

        } catch (java.net.http.HttpConnectTimeoutException e) {
            return new HttpResult(3, null,
                    "Connection timed out: " + request.uri() + " | " + e.getMessage());

        } catch (IOException e) {
            return new HttpResult(4, null,
                    "I/O error: " + e.getMessage());

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return new HttpResult(5, null,
                    "Request interrupted.");
        }
    }
}
