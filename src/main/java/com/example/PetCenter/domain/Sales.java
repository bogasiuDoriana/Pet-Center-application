package com.example.PetCenter.domain;

import java.io.Serializable;
import java.util.Date;

public class Sales implements Serializable {
    private int idsales;
    private int idowner;
    private int idproduct;
    private int id_service;
    private int quantity;
    private Date sale_date;
    private int total;

    public Sales(int idsales, int idowner, int idproduct, int id_service, int quantity, Date sale_date, int total) {
        this.idsales = idsales;
        this.idowner = idowner;
        this.idproduct = idproduct;
        this.id_service = id_service;
        this.quantity = quantity;
        this.sale_date = sale_date;
        this.total = total;
    }

    public int getIdsales() {
        return idsales;
    }

    public void setIdsales(int idsales) {
        this.idsales = idsales;
    }

    public int getIdowner() {
        return idowner;
    }

    public void setIdowner(int idowner) {
        this.idowner = idowner;
    }

    public int getIdproduct() {
        return idproduct;
    }

    public void setIdproduct(int idproduct) {
        this.idproduct = idproduct;
    }

    public int getId_service() {
        return id_service;
    }

    public void setId_service(int id_service) {
        this.id_service = id_service;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getSale_date() {
        return sale_date;
    }

    public void setSale_date(Date sale_date) {
        this.sale_date = sale_date;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
