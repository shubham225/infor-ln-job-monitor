package com.shubham225.erp.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.shubham225.erp.ERPClient;
import com.shubham225.erp.domain.*;
import com.shubham225.exception.ErpApiException;
import com.shubham225.model.dto.ErrorMessageDTO;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.ConnectException;
import java.net.URI;
import java.net.http.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class ERPClientImpl implements ERPClient {
    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();
    private static final String JOB_DETAIL_ENDPOINT = "/jobDetail";
    private static final String JOB_HISTORY_ENDPOINT = "/jobHistoryMessage";

    public ERPClientImpl() {
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Override
    public FetchERPJobResponseDTO fetchERPJobDetails(String apiBaseURL, String jobCode, String company) {
        String apiURL = apiBaseURL + JOB_DETAIL_ENDPOINT;

        return post(apiURL,
                new FetchERPJobRequestDTO(jobCode, company),
                FetchERPJobResponseDTO.class);
    }

    @Override
    public List<ErrorMessageDTO> getJobHistoryErrorMessages(String apiBaseURL, String jobCode, String company, String keywords) {
        String apiURL = apiBaseURL + JOB_HISTORY_ENDPOINT;

        FetchJobHistoryMessageResponseDTO response = post(apiURL,
                                                          new FetchERPJobRequestDTO(jobCode, company),
                                                          FetchJobHistoryMessageResponseDTO.class);

        return Arrays.stream(response.getMessages())
                .map(message -> {
                    ErrorMessageDTO dto = new ErrorMessageDTO();
                    dto.setJobCode(response.getJobCode());
                    dto.setCompany(response.getCompany());
                    dto.setMessage(message);
                    return dto;
                })
                .toList();
    }

    private <T> T post(String apiUrl, Object requestBody, Class<T> responseType) {
        try {
            String requestJson = mapper.writeValueAsString(requestBody);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(requestJson))
                    .build();

            HttpResponse<String> response = client.send(
                    request,
                    HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new ErpApiException(
                        "ERP API returned status " + response.statusCode(), response.statusCode());
            }

            return mapper.readValue(response.body(), responseType);

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
    }
}
