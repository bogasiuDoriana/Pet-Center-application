package com.example.PetCenter.controller;

import com.example.PetCenter.domain.Services;
import com.example.PetCenter.service.ServicesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "http:\\localhoys:4200")
public class ServicesController {

    private final ServicesService servicesService;

    public ServicesController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Services>> getAllServices(){
        List<Services> services = servicesService.findAllServices();
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Services> getServiceById(@PathVariable("id") int id){
        Services services = servicesService.findServiceById(id);
        return new ResponseEntity<>(services, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Services> addService(@RequestBody Services service){
        Services newService = servicesService.addService(service);
        return new ResponseEntity<>(newService, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Services> updateService(@RequestBody Services service){
        Services updateService = servicesService.updateService(service);
        return new ResponseEntity<>(updateService, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteService(@PathVariable("id") int id){
        servicesService.deleteService(id);
        return ResponseEntity.ok().build();
    }
}
