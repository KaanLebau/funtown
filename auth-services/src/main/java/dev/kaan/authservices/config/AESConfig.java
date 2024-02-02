package dev.kaan.authservices.config;

import jakarta.persistence.AttributeConverter;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.SerializationUtils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.util.Base64;

@Configuration
public class AESConfig implements AttributeConverter<Object, String> {

    private final String KEY="this-is-test-key";
    private final String HOLE = "AES";

    private static Key key;
    private static Cipher cipher;

    private Key getKey(){
        if(key== null)
            key = new SecretKeySpec(KEY.getBytes(),HOLE);
        return key;
    }
    private Cipher getCipher() throws GeneralSecurityException {
        if(cipher == null) {
            cipher = Cipher.getInstance(HOLE);
        }
        return cipher;
    }
    private void initCipher(int mode) throws GeneralSecurityException {
        getCipher().init(mode, getKey());
    }
    /**
     * Converts the attribute value to a database column value by encrypting it using AES algorithm.
     *
     * @param columnValue the attribute value to be converted
     * @return the encrypted database column value
     */
    @SneakyThrows
    @Override
    public String convertToDatabaseColumn(Object columnValue) {
        if(columnValue == null)
            return null;
        initCipher(Cipher.ENCRYPT_MODE);
        byte[] bytes = SerializationUtils.serialize(columnValue);
        return Base64.getEncoder().encodeToString(getCipher().doFinal(bytes));
    }
    /**
     * Converts the database column value to an attribute value by decrypting it using AES algorithm.
     *
     * @param data the encrypted database column value
     * @return the decrypted attribute value
     */
    @SneakyThrows
    @Override
    public Object convertToEntityAttribute(String data) {
        if(data == null)
            return null;
        initCipher(Cipher.DECRYPT_MODE);
        byte[] bytes = getCipher().doFinal(Base64.getDecoder().decode(data));

        return SerializationUtils.deserialize(bytes);
    }
}
