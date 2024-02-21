package com.funtown.application.controllers;

import com.funtown.application.model.Availability;
import com.funtown.application.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
@RequiredArgsConstructor
public class AvailabilityController {
private final AvailabilityService service;

   @GetMapping("/get-by-person-id/{person-id}")
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

   @GetMapping("/get-all")
   public ResponseEntity<List<Availability>> getAll(){
      return ResponseEntity.ok(service.findAll());
   }

   @PostMapping("/create")
   @ResponseStatus(HttpStatus.CREATED)
   public void create(@RequestBody Availability availability){
      service.save(availability);
   }
}
