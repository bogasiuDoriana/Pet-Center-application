package com.example.PetCenter.service;

import com.example.PetCenter.domain.Employee;
import com.example.PetCenter.exception.UserNotFoundException;
import com.example.PetCenter.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }
    public Employee addEmployee(Employee employee){
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees(){
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee){
        return employeeRepo.save(employee);
    }

    @Transactional
    public void deleteEmployee(int id){
        employeeRepo.deleteEmployeeByidemployee(id);
    }

    public Employee findEmployeeById(int id){
        return employeeRepo.findEmployeeByidemployee(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
}
