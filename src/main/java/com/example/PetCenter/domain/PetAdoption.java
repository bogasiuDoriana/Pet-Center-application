package com.example.PetCenter.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pet_adoption")
public class PetAdoption implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idpet_adoption;
    private Integer idowner;
    private Integer idanimal;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;
    private Date aplication_date;

    public void setOwner(Owners owner) {
        this.idowner = owner.getIdowner();
    }

    public void setAnimal(Animals animal) {
        this.idanimal = animal.getIdAnimal();
    }

    public enum Status {
        PENDING, APPROVED, REJECTED
    }

    public Integer getIdpet_adoption() {
        return idpet_adoption;
    }

    public void setIdpet_adoption(Integer idpet_adoption) {
        this.idpet_adoption = idpet_adoption;
    }

    public Integer getIdowner() {
        return idowner;
    }

    public void setIdowner(Integer idowner) {
        this.idowner = idowner;
    }

    public Integer getIdanimal() {
        return idanimal;
    }

    public void setIdanimal(Integer idanimal) {
        this.idanimal = idanimal;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getAplication_date() {
        return aplication_date;
    }

    public void setAplication_date(Date aplication_date) {
        this.aplication_date = aplication_date;
    }
}
