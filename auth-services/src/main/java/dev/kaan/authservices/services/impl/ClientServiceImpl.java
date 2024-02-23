package dev.kaan.authservices.services.impl;

import dev.kaan.authservices.model.Client;
import dev.kaan.authservices.repository.ClientRepository;
import dev.kaan.authservices.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository CLIENT_REPOSITORY;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return CLIENT_REPOSITORY.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
    }

    @Override
    public Client create(Client person) throws Exception {
        Client client = null;
        try{
            client =  CLIENT_REPOSITORY.save(person);
        } catch (Exception e){
            throw new Exception("Not created!");
        }
        return  client;
    }

    @Override
    public Client findByUsername(String username) throws UsernameNotFoundException{
        return CLIENT_REPOSITORY.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Username not found"));
    }
}
