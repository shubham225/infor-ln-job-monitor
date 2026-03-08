package com.shubham225.erp.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.shubham225.erp.ERPClient;
import com.shubham225.erp.domain.*;
import com.shubham225.exception.ErpApiException;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.ConnectException;
import java.net.URI;
import java.net.http.*;

@Slf4j
public class ERPClientImpl implements ERPClient {
    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public ERPJob findERPJob(ERPJobQuery jobQuery) {
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        ERPJob job = null;
        try {
            // Convert query object → JSON
            String requestJson = mapper.writeValueAsString(jobQuery);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(jobQuery.apiURL()))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestJson))
                    .build();

            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            int status = response.statusCode();

            if (status >= 500) {
                throw new ErpApiException("ERP server error", status);
            }

            if (status >= 400) {
                throw new ErpApiException("ERP client error", status);
            }

            // Convert response JSON → ERPJob
            job = mapper.readValue(response.body(), ERPJob.class);
        } catch (HttpTimeoutException | ConnectException e) {
            throw new ErpApiException("ERP API not responding", e);
        } catch (IOException e) {
            throw new ErpApiException("ERP API IO error", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ErpApiException("ERP API interrupted", e);
        } catch (Exception e) {
            throw new ErpApiException("Exception Occurred while sending request to ERP", e);
        }

        return job;
    }
}
