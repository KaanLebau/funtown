package com.funtown.application.controllers;

import com.funtown.application.model.Availability;
import com.funtown.application.model.api.UpdateStatusRequest;
import com.funtown.application.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
@RequiredArgsConstructor
public class AvailabilityController {
   private final AvailabilityService service;

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
         return ResponseEntity.ok(service.findByUsername(userName));
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
   @PutMapping("/update-status")
   @Secured("ROLE_RECRUITER")
   public ResponseEntity<Availability> changeStatus(@RequestBody UpdateStatusRequest request){
      try{
         return ResponseEntity.ok(service.updateStatus(request));
      } catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
   }
}