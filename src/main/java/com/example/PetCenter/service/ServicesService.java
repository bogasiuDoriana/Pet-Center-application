package com.example.PetCenter.service;

import com.example.PetCenter.domain.Services;
import com.example.PetCenter.repo.ServicesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ServicesService {
    private final ServicesRepo servicesRepo;

    @Autowired
    public ServicesService(ServicesRepo servicesRepo) {
        this.servicesRepo = servicesRepo;
    }

    public List<Services> findAllServices(){
        return servicesRepo.findAll();
    }
    public Services addService(Services services){
        return servicesRepo.save(services);
    }
    public Services updateService(Services services){
        return servicesRepo.save(services);
    }

    @Transactional
    public void deleteService(int id){
        if(!servicesRepo.existsById(id)){
            throw new RuntimeException("Service not found");
        }
        servicesRepo.deleteById(id);
    }
    public Services findServiceById(int id){
        return servicesRepo.findById(id).orElseThrow(() -> new RuntimeException("Service not found"));
    }
}
