package com.funtown.userService.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void givenNoAuthentication_whenAccessSecureEndpoint_thenUnauthorized() throws Exception {
        ResultActions result = mockMvc.perform(get("/api/secure")
                .contentType(MediaType.APPLICATION_JSON));

        result.andExpect(status().isUnauthorized());
    }

    // Another test might be accessing an endpoint that does not require authentication, expecting a 200 OK response.

    @Test
    public void givenNoAuthentication_whenAccessPublicEndpoint_thenOk() throws Exception {
        ResultActions result = mockMvc.perform(get("/api/public")
                .contentType(MediaType.APPLICATION_JSON));

        result.andExpect(status().isOk());
    }
}