package com.example.PetCenter.domain;

import jakarta.persistence.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "owners")
public class Owners implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private int idowner;
    private String name;
    private String surname;
    private int telephone;
    private String email;
    private String address;
    private String password;

    public int getIdowner() {
        return idowner;
    }

    public void setIdowner(int idowner) {
        this.idowner = idowner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getTelephone() {
        return telephone;
    }

    public void setTelephone(int telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    @Override
    public String toString() {
        return "Owners{" +
                "idowner=" + idowner +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", telephone=" + telephone +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                '}';
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

