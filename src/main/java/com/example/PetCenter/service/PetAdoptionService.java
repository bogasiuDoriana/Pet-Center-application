package com.example.PetCenter.service;

import com.example.PetCenter.domain.Animals;
import com.example.PetCenter.domain.Owners;
import com.example.PetCenter.domain.PetAdoption;
import com.example.PetCenter.repo.AnimalsRepo;
import com.example.PetCenter.repo.OwnersRepo;
import com.example.PetCenter.repo.PetAdoptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.util.*;

@Service
public class PetAdoptionService {
    private final PetAdoptionRepo petAdoptionRepo;
    private final OwnersRepo ownersRepo;
    private final AnimalsRepo animalsRepo;


    @Autowired
    public PetAdoptionService(PetAdoptionRepo petAdoptionRepo,
                              OwnersRepo ownersRepo,
                              AnimalsRepo animalsRepo) {
        this.petAdoptionRepo = petAdoptionRepo;
        this.ownersRepo = ownersRepo;
        this.animalsRepo = animalsRepo;
    }

    public List<Map<String, Object>> getPendingAdoptionsFormatted() {

        List<PetAdoption> list =
                petAdoptionRepo.findByStatus(PetAdoption.Status.PENDING
                );

        List<Map<String, Object>> result = new ArrayList<>();

        for (PetAdoption a : list) {

            Map<String, Object> item = new HashMap<>();
            item.put("idpet_adoption", a.getIdpet_adoption());
            item.put("status", a.getStatus());
            item.put("aplication_date", a.getAplication_date());

            // owner
            var owner = ownersRepo.findById(a.getIdowner()).orElse(null);
            Map<String, Object> ownerObj = new HashMap<>();
            if (owner != null) {
                ownerObj.put("idowner", owner.getIdowner());
                ownerObj.put("name", owner.getName());
                ownerObj.put("surname", owner.getSurname());
            }
            item.put("owner", ownerObj);

            // animal
            var animal = animalsRepo.findById(a.getIdanimal()).orElse(null);
            Map<String, Object> animalObj = new HashMap<>();
            if (animal != null) {
                animalObj.put("name", animal.getName());
                animalObj.put("specie", animal.getSpecie());
            }
            item.put("animal", animalObj);

            result.add(item);
        }

        return result;
    }

    public boolean approveAdoption(Integer petAdoptionId) {
        var adoptionOpt = petAdoptionRepo.findById(petAdoptionId);
        if (adoptionOpt.isEmpty()) return false;

        PetAdoption adoption = adoptionOpt.get();

        // Check if the animal is already adopted
        boolean alreadyAdopted = petAdoptionRepo.existsByIdanimalAndStatus(
                adoption.getIdanimal(), PetAdoption.Status.APPROVED);
        if (alreadyAdopted) return false;

        // Approve this adoption
        adoption.setStatus(PetAdoption.Status.APPROVED);
        petAdoptionRepo.save(adoption);

        // Reject other pending adoptions for the same animal
        petAdoptionRepo.findByStatus(PetAdoption.Status.PENDING).stream()
                .filter(a -> a.getIdanimal() == adoption.getIdanimal()
                        && !(a.getIdpet_adoption() == adoption.getIdpet_adoption()))
                .forEach(a -> {
                    a.setStatus(PetAdoption.Status.REJECTED);
                    petAdoptionRepo.save(a);
                });

        return true;
    }

    public boolean rejectAdoption(Integer id) {
        var adoptionOpt = petAdoptionRepo.findById(id);
        if (adoptionOpt.isEmpty()) return false;

        PetAdoption adoption = adoptionOpt.get();
        adoption.setStatus(PetAdoption.Status.REJECTED);
        petAdoptionRepo.save(adoption);
        return true;
    }

    public PetAdoption applyForAdoption(Integer ownerId, Integer animalId) {
        Owners owner = ownersRepo.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        Animals animal = animalsRepo.findById(animalId)
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        // Optional: check if the same animal is already pending
        if (petAdoptionRepo.existsByIdanimalAndStatus(animalId, PetAdoption.Status.PENDING)) {
            throw new RuntimeException("This animal already has a pending adoption");
        }

        PetAdoption adoption = new PetAdoption();
        adoption.setOwner(owner);
        adoption.setAnimal(animal);
        adoption.setStatus(PetAdoption.Status.PENDING);
        adoption.setAplication_date(new Date());

        // **Important: ** save it to the database
        animalsRepo.deleteById(animalId);
        return petAdoptionRepo.save(adoption);
    }

}
