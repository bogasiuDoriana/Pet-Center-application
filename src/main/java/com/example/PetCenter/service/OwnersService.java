package com.example.PetCenter.service;

import com.example.PetCenter.domain.Owners;
import com.example.PetCenter.exception.UserNotFoundException;
import com.example.PetCenter.repo.OwnersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OwnersService {
    private final OwnersRepo ownersRepo;
    @Autowired
    public OwnersService(OwnersRepo ownersRepo) {
        this.ownersRepo = ownersRepo;
    }

    public Owners addOwner (Owners owners){
        return ownersRepo.save(owners);
    }
    public List<Owners> findAllOwners(){
        return ownersRepo.findAll();
    }
    public Owners updateOwner(Owners owners){
        return ownersRepo.save(owners);
    }

    @Transactional
    public void deleteOwner(int id){
        ownersRepo.deleteOwnerByidowner(id);
    }
    public Owners findOwnerById(int id){
        return ownersRepo.findOwnerByidowner(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
}
