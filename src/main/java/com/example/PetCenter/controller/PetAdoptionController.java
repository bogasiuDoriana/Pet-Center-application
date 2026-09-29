package com.example.PetCenter.controller;
import com.example.PetCenter.domain.PetAdoption;
import com.example.PetCenter.repo.AnimalsRepo;
import com.example.PetCenter.service.PetAdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pet_adoption")
@CrossOrigin(origins = "*")
public class PetAdoptionController {

    private final PetAdoptionService petAdoptionService;

    @Autowired

    public PetAdoptionController(PetAdoptionService adoptionService, AnimalsRepo animalRepository) {
        this.petAdoptionService = adoptionService;
    }

    @GetMapping("/pending")
    public List<Map<String, Object>> getPendingAdoptions() {
        return petAdoptionService.getPendingAdoptionsFormatted();
    }

    @PostMapping("/approve/{id}")
    public boolean approveAdoption(@PathVariable Integer id) {
        return petAdoptionService.approveAdoption(id);
    }

    @PostMapping("/reject/{id}")
    public boolean rejectAdoption(@PathVariable Integer id) {
        return petAdoptionService.rejectAdoption(id);
    }

    @PostMapping("/apply")
    public PetAdoption apply(@RequestParam Integer idowner, @RequestParam Integer idanimal) {
        return petAdoptionService.applyForAdoption(idowner, idanimal);
    }

}
