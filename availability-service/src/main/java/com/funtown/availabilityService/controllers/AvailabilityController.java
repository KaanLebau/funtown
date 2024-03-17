package com.funtown.availabilityService.controllers;

import com.funtown.availabilityService.model.Availability;
import com.funtown.availabilityService.model.api.CreateAvailabilityRequest;
import com.funtown.availabilityService.model.api.UpdateStatusRequest;
import com.funtown.availabilityService.service.AvailabilityService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/availability")
@RequiredArgsConstructor
public class AvailabilityController {
   private final AvailabilityService service;

   @GetMapping("/username/{username}") // both
   public ResponseEntity<List<Availability>> getApplicantAvailabilityList(@PathVariable String username ){
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      List<String> roles = auth.getAuthorities().stream()
              .map(Object::toString)
              .toList();
      if(roles.contains("ROLE_APPLICANT") && !auth.getPrincipal().toString().equals(username)){
         return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      }
      try{
         return ResponseEntity.ok(service.findByUsername(username));
      } catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
   }



   @GetMapping("/id/{id}")
   public ResponseEntity<Availability> getAvailabilityById(@PathVariable Integer id ){
      try{
         return ResponseEntity.ok(service.findById(id));
      } catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
   }

   @GetMapping("/allapplications") // only recruiter
   @Secured("ROLE_RECRUITER")
   public ResponseEntity<List<Availability>> getAllApplications(){
      return ResponseEntity.ok(service.findAll());
   }


   @PostMapping("/create") // only applicant
   @Secured("ROLE_APPLICANT")
   @ResponseStatus(HttpStatus.CREATED)
   public ResponseEntity<List<Availability>> create(@RequestBody List<CreateAvailabilityRequest> availability){
      System.out.println(availability);
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if(!auth.getPrincipal().toString().equals(availability.get(0).username())) {
         return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      }
      try {
         List<Availability> respons =service.saveAll(availability);
         System.out.println(respons);
         return ResponseEntity.ok(respons);
      } catch (Exception e) {
         return ResponseEntity.internalServerError().build();
      }
   }

   @PutMapping("/update")
   @Secured("ROLE_APPLICANT")
   @ResponseStatus(HttpStatus.OK)
   @Transactional
   public ResponseEntity<Object> updateAvailability(@RequestBody Availability availability){
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if(!auth.getPrincipal().toString().equals(availability.getUsername())) {
         return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
      }
      try {
         return ResponseEntity.ok(service.save(availability));
      } catch (Exception e) {
         return ResponseEntity.internalServerError().build();
      }
   }
   // update status only for recruiter
   @PutMapping("/status")
   @Secured("ROLE_RECRUITER")
   @Transactional
   public ResponseEntity<Availability> changeStatus(@RequestBody UpdateStatusRequest request){
      try{
         return ResponseEntity.ok(service.updateStatus(request));
      } catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
   }
}