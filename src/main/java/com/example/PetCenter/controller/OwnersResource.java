package com.example.PetCenter.controller;

import com.example.PetCenter.domain.Owners;
import com.example.PetCenter.service.OwnersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owners")
public class OwnersResource {

    private final OwnersService ownersService;

    public OwnersResource(OwnersService ownersService) {
        this.ownersService = ownersService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Owners>> getAllOwners () {
        List<Owners> owners = ownersService.findAllOwners();
        return new ResponseEntity<>(owners, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Owners> getOwnerById (@PathVariable("id") int id) {
        Owners owner = ownersService.findOwnerById(id);
        return new ResponseEntity<>(owner, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Owners> addOwner(@RequestBody Owners owners) {
        Owners newOwner = ownersService.addOwner(owners);
        return new ResponseEntity<>(newOwner, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Owners> updateOwner(@RequestBody Owners owners) {
        Owners updateOwner = ownersService.updateOwner(owners);
        return new ResponseEntity<>(updateOwner, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOwner(@PathVariable("id") int id){
        ownersService.deleteOwner(id);
        return ResponseEntity.ok().build();
    }
}
