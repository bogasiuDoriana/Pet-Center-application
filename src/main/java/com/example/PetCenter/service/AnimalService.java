package com.example.PetCenter.service;

import com.example.PetCenter.domain.Animals;
import com.example.PetCenter.exception.UserNotFoundException;
import com.example.PetCenter.repo.AnimalsRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AnimalService {
    private final AnimalsRepo animalsRepo;

    @Autowired
    public AnimalService(AnimalsRepo animalsRepo) {
        this.animalsRepo = animalsRepo;
    }
    public Animals addAnimal(Animals animals){
        return animalsRepo.save(animals);
    }
    public List<Animals> findAllAnimals(){
        return animalsRepo.findAll();
    }
    public Animals updateAnimal(Animals animals){
        return animalsRepo.save(animals);
    }

    @Transactional
    public void deleteAnimal(int id){
        if (!animalsRepo.existsById(id)) {
            throw new UserNotFoundException("Animal with id " + id + " not found");
        }
        animalsRepo.deleteById(id);
    }

    public Animals findAnimalById(int id){
        return animalsRepo.findAnimalByidanimal(id).orElseThrow(() -> new UserNotFoundException("Animal by id " + id + " was not found"));
    }

}
