package com.example.PetCenter.domain;

import java.io.Serializable;
import java.util.Date;

public class Appointments implements Serializable {
    private int idappointments;
    private int idowner;
    private int idanimal;
    private int idservice;
    private Date date;
    private Status status;

    public Appointments(int idappointments, int idowner, int idanimal, int idservice, Date date, Status status) {
        this.idappointments = idappointments;
        this.idowner = idowner;
        this.idanimal = idanimal;
        this.idservice = idservice;
        this.date = date;
        this.status = status;
    }

    public enum Status {
        IN_PROGRESS,
        COMPLETE,
        CANCELED

    }

    public int getIdappointments() {
        return idappointments;
    }

    public void setIdappointments(int idappointments) {
        this.idappointments = idappointments;
    }

    public int getIdowner() {
        return idowner;
    }

    public void setIdowner(int idowner) {
        this.idowner = idowner;
    }

    public int getIdanimal() {
        return idanimal;
    }

    public void setIdanimal(int idanimal) {
        this.idanimal = idanimal;
    }

    public int getIdservice() {
        return idservice;
    }

    public void setIdservice(int idservice) {
        this.idservice = idservice;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "appointments{" +
                "idappointments=" + idappointments +
                ", idowner=" + idowner +
                ", idanimal=" + idanimal +
                ", idservice=" + idservice +
                ", date=" + date +
                ", status=" + status +
                '}';
    }
}
