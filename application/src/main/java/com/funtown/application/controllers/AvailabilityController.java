package com.funtown.application.controllers;

import com.funtown.application.model.Availability;
import com.funtown.application.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/availability")
@RequiredArgsConstructor
public class AvailabilityController {
private final AvailabilityService service;

   @GetMapping("/rec")
   @Secured("ROLE_RECRUITER")
   public List<String> adminOnlyEndpoint() {
      // This endpoint is accessible only to users with the 'ADMIN' role
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();

      List<String> roles = auth.getAuthorities().stream()
              .map(Object::toString)
              .toList();

      String princ = auth.getPrincipal().toString();

      return roles;
   }

   @GetMapping("/apply")
   @PreAuthorize("hasRole('APPLICANT')")
   public String applicantOnlyEndpoint() {
      // This endpoint is accessible only to users with the 'ADMIN' role
      return "Welcome, Applicant!";
   }
   @GetMapping("/get-by-person-id/{person-id}") // both
   public ResponseEntity<List<Availability>> getByPersonId(@PathVariable("person-id") Integer personId ){
      try{
         return ResponseEntity.ok(service.findByPersonId(personId));
      } catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
   }

   @GetMapping("/get-by-id/{id}")
   public ResponseEntity<Availability> getById(@PathVariable("id") Integer id ){
      try{
         return ResponseEntity.ok(service.findById(id));
      } catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
   }

   @GetMapping("/get-all") // only recruiter
   public ResponseEntity<List<Availability>> getAll(){
      return ResponseEntity.ok(service.findAll());
   }

   @PostMapping("/create") // only applicant
   @ResponseStatus(HttpStatus.CREATED)
   public void create(@RequestBody Availability availability){
      service.save(availability);
   }

   // update status only for recruiter
}
