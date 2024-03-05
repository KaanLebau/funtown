package com.funtown.userService.config;

import com.funtown.userService.security.JwtRequestFilter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class SecurityConfigUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtRequestFilter jwtRequestFilter;

    @Test
    @WithMockUser(roles = "APPLICANT")  // Mock a user with the role 'ROLE_APPLICANT'
    public void testFilterChainConfiguration() throws Exception {
        // Perform a GET on '/api/persons/test-token' endpoint
        mockMvc.perform(get("/api/persons/test-token"))
                .andExpect(status().isOk()); // Assert the status is 200 OK.
    }
}