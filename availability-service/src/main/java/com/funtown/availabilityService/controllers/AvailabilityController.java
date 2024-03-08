package com.funtown.availabilityService.controllers;

import com.funtown.availabilityService.model.Availability;
import com.funtown.availabilityService.model.api.UpdateStatusRequest;
import com.funtown.availabilityService.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for managing availability-related API endpoints.
 */
@RestController
@RequestMapping("/api/v1/availability")
@RequiredArgsConstructor
public class AvailabilityController {
   private final AvailabilityService service;

   /**
    * Retrieves a list of availabilities based on the applicant's username.
    *
    * @param username The applicant's username.
    * @return A {@link ResponseEntity} object containing a list of {@link Availability} objects associated with the specified username if successful,
    *         or a {@link ResponseEntity} object with a status of 403 (FORBIDDEN) if the user is not authorized,
    *         or a {@link ResponseEntity} object with a status of 404 (NOT_FOUND) if an error occurs during the operation.
    * @throws Exception If an error occurs during the operation.
    */
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

   /**
    * Retrieves an availability by its ID.
    *
    * @param id The identifier of the availability.
    * @return A {@link ResponseEntity} object containing the availability with the specified ID if found,
    *         or a {@link ResponseEntity} object with a status of 404 (NOT_FOUND) if the availability is not found.
    */
   @GetMapping("/id/{id}")
   public ResponseEntity<Availability> getAvailabilityById(@PathVariable Integer id ){
      try{
         return ResponseEntity.ok(service.findById(id));
      } catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
   }

   /**
    * Retrieves all applications.
    *
    * @return A ResponseEntity object containing a list of Availability objects if successful,
    *         or a ResponseEntity object with a status of 403 (FORBIDDEN) if the user is not authorized,
    *         or a ResponseEntity object with a status of 404 (NOT_FOUND) if an error occurs during the operation.
    * @throws Exception If an error occurs during the operation.
    */
   @GetMapping("/allapplications") // only recruiter
   @Secured("ROLE_RECRUITER")
   public ResponseEntity<List<Availability>> getAllApplications(){
      return ResponseEntity.ok(service.findAll());
   }

   /**
    * Creates a new availability period for a job applicant.
    * The method requires the applicant to be authenticated as an ROLE_APPLICANT.
    * The availability record is created with the provided information and saved using the service's save method.
    * If the authenticated username does not match the username in the availability record, a FORBIDDEN response is returned.
    * If an exception occurs during the save operation, an INTERNAL_SERVER_ERROR response is returned.
    *
    * @param availability The availability object representing the period of availability.
    * @return A ResponseEntity object with a status of CREATED and the saved availability if the operation is successful.
    *         A ResponseEntity object with a status of FORBIDDEN if the authenticated user is not authorized.
    *         A ResponseEntity object with a status of INTERNAL_SERVER_ERROR if an exception occurs during the operation.
    */
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

   /**
    * Updates the availability period for a job applicant.
    * The method requires the applicant to be authenticated as a ROLE_APPLICANT.
    * The availability record is updated with the provided information and saved using the service's save method.
    * If the authenticated username does not match the username in the availability record, a FORBIDDEN response is returned.
    * If an exception occurs during the save operation, an INTERNAL_SERVER_ERROR response is returned.
    *
    * @param availability The updated availability period.
    * @return A ResponseEntity object with a status of OK and the updated availability if the operation is successful.
    *         A ResponseEntity object with a status of FORBIDDEN if the authenticated user is not authorized.
    *         A ResponseEntity object with a status of INTERNAL_SERVER_ERROR if an exception occurs during the operation.
    */
   @PutMapping("/update")
   @Secured("ROLE_APPLICANT")
   @ResponseStatus(HttpStatus.OK)
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
   /**
    * Updates the status of an availability based on the provided request.
    *
    * @param request The request containing the updated status information.
    * @return The updated availability.
    * @throws Exception If an error occurs during the operation.
    */
   // update status only for recruiter
   @PutMapping("/status")
   @Secured("ROLE_RECRUITER")
   public ResponseEntity<Availability> changeStatus(@RequestBody UpdateStatusRequest request){
      try{
         return ResponseEntity.ok(service.updateStatus(request));
      } catch (Exception e){
         return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
      }
   }
}