package com.example.PetCenter.controller;


import com.example.PetCenter.domain.Animals;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.PetCenter.service.AnimalService;

import java.util.List;

@RestController
@RequestMapping("/animal")
@CrossOrigin(origins = "http://localhost:4200")
public class AnimalController {

    private final AnimalService animalsService;


    //@Autowired
    public AnimalController(AnimalService animalsService) {
        this.animalsService = animalsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Animals>> getAllAnimals(){
        List<Animals> animals = animalsService.findAllAnimals();
        return new ResponseEntity<>(animals, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Animals> getAnimalsById(@PathVariable("id") int id){
        Animals animals = animalsService.findAnimalById(id);
        return new ResponseEntity<>(animals, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Animals> addAnimal(@RequestBody Animals animal){
        Animals newAnimal = animalsService.addAnimal(animal);
        return new ResponseEntity<>(newAnimal, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Animals> updateAnimal (@RequestBody Animals animal){
        Animals updateAnimal = animalsService.updateAnimal(animal);
        return new ResponseEntity<>(updateAnimal, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable("id") int id) {
        animalsService.deleteAnimal(id);
        return ResponseEntity.ok().build();
    }


}
