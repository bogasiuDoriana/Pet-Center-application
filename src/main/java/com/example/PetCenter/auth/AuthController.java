package com.example.PetCenter.auth;

import com.example.PetCenter.domain.Employee;
import com.example.PetCenter.domain.Owners;
import com.example.PetCenter.repo.EmployeeRepo;
import com.example.PetCenter.repo.OwnersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private EmployeeRepo employeeRepository;
    @Autowired
    private OwnersRepo ownersRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<Employee> employee =
                employeeRepository.findByEmailAndPassword(
                        request.email(), request.password()
                );

        if (employee.isPresent()) {
            return ResponseEntity.ok(
                    new LoginResponse(
                            "Login successful",
                            employee.get().getIdemployee(),
                            "EMPLOYEE"
                    )
            );
        }

        Optional<Owners> owner =
                ownersRepository.findByEmailAndPassword(
                        request.email(), request.password()
                );

        if (owner.isPresent()) {
            return ResponseEntity.ok(
                    new LoginResponse(
                            "Login successful",
                            owner.get().getIdowner(),
                            "OWNER"
                    )
            );
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }

}
