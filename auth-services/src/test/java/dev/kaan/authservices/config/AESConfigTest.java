package dev.kaan.authservices.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.crypto.Cipher;

import java.security.GeneralSecurityException;
import java.util.Base64;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class AESConfigTest {
  //  @Mock
    Cipher mockCipher;
    AESConfig aesConfig;
/*
    @BeforeEach
    void setup() throws GeneralSecurityException{
        MockitoAnnotations.initMocks(this);
        aesConfig = new AESConfig();
        aesConfig.setCipher(mockCipher);
    }
    @Test
    void testEncryption() throws GeneralSecurityException {
        String originalData = "Hello, World!";
        String encryptedData = "encryptedData";

        when(mockCipher.doFinal(originalData.getBytes())).thenReturn(encryptedData.getBytes());

        String result = aesConfig.convertToDatabaseColumn(originalData);

        assertEquals(encryptedData, result);
    }

    @Test
    void testDecryption() throws GeneralSecurityException {
        String encryptedData = "encryptedData";
        String decryptedData = "Hello, World!"; // Dummy decrypted data

        when(mockCipher.doFinal(Base64.getDecoder().decode(encryptedData))).thenReturn(decryptedData.getBytes());

        Object result = aesConfig.convertToEntityAttribute(encryptedData);

        assertEquals(decryptedData, result);
    }*/
}