package com.funtown.application.controllers;

import com.funtown.application.model.Availability;
import com.funtown.application.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
      System.out.println("ENDPOINT principal: " + princ);
      return roles;
   }

   @GetMapping("/apply")
   @PreAuthorize("hasRole('APPLICANT')")
   public String applicantOnlyEndpoint() {
      // This endpoint is accessible only to users with the 'ADMIN' role
      return "Welcome, Applicant!";
   }
   @GetMapping("/get-by-username/{username}") // both
   public ResponseEntity<List<Availability>> getByPersonId(@PathVariable("username") String userName ){
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      List<String> roles = auth.getAuthorities().stream()
              .map(Object::toString)
              .toList();
      if(roles.contains("ROLE_APPLICANT") && !auth.getPrincipal().toString().equals(userName)){
         return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      }
      try{
         return ResponseEntity.ok(service.findByUserName(userName));
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
   @Secured("ROLE_RECRUITER")
   public ResponseEntity<List<Availability>> getAll(){
      return ResponseEntity.ok(service.findAll());
   }

   @PostMapping("/create") // only applicant
   @Secured("ROLE_APPLICANT")
   @ResponseStatus(HttpStatus.CREATED)
   public ResponseEntity<Availability> create(@RequestBody Availability availability){
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if(!auth.getPrincipal().toString().equals(availability.getUserName())) {
         return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      }
      try {
         return ResponseEntity.ok(service.save(availability));
      } catch (Exception e) {
         return ResponseEntity.internalServerError().build();
      }
   }

   // update status only for recruiter

   /*
   rabi rec token : eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJyYWJpIiwicm9sZXMiOlsiUkVDUlVJVEVSIl0sImlhdCI6MTcwODU1ODQyMiwiZXhwIjoxNzA4NTY0NDIyfQ.YxwW_VYJLiXMvV3K6fEKjf52clSp_f4ihWMBoaPVe5mCXItsAmPbrgzU5A9xNqjK
   yosse app token : eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5b3NzZSIsInJvbGVzIjpbIkFQUExJQ0FOVCJdLCJpYXQiOjE3MDg1NTg0NzUsImV4cCI6MTcwODU2NDQ3NX0.8TH2Gs-fGtc9yuZDJPGmg9_97XFG930-OgU5L97-vxOJ4rnItw74wfxo-UUwX2kk
   dinh app token : eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJkaW5oIiwicm9sZXMiOlsiQVBQTElDQU5UIl0sImlhdCI6MTcwODU1ODUxMSwiZXhwIjoxNzA4NTY0NTExfQ.9v8P7dPY_TCotkj8ulcRP5KY1CDWMGPPocyVaVHvm6opEuqhKX6_v7pdC4nfoJ8Y
    */
}
