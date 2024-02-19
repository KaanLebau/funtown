import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@Test
public void testPasswordEncoderBean() {
    String rawPassword = "password";
    BCryptPasswordEncoder encoder = securityConfig.passwordEncoder();
    assertTrue(encoder.matches(rawPassword, encoder.encode(rawPassword)), "The password encoder should correctly encode and validate the password");
}