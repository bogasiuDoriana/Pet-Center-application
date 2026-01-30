-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pet_shop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pet_shop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pet_shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `pet_shop` ;

-- -----------------------------------------------------
-- Table `pet_shop`.`owners`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shop`.`owners` (
  `idowner` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `telephone` INT NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(100) NOT NULL DEFAULT 'parola')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE owners
ADD COLUMN password VARCHAR(100) NOT NULL DEFAULT 'password';

select * from owners;


-- -----------------------------------------------------
-- Table `pet_shop`.`animals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shop`.`animals` (
  `idanimal` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `idowner` INT NULL DEFAULT NULL,
  `species` VARCHAR(45) NULL DEFAULT NULL,
  `breed` VARCHAR(45) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idanimal`),
  INDEX `fk_owner_idx` (`idowner` ASC) VISIBLE,
  CONSTRAINT `fk_owner`
    FOREIGN KEY (`idowner`)
    REFERENCES `pet_shop`.`owners` (`idowner`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


ALTER TABLE pet_shop.appointments
DROP FOREIGN KEY fk_pet;

ALTER TABLE animals
MODIFY idanimal INT NOT NULL AUTO_INCREMENT;

select * from animals;

alter table animals
drop column breed;

ALTER TABLE animals DROP FOREIGN KEY fk_owner;
ALTER TABLE appointments DROP FOREIGN KEY fk_customer;
ALTER TABLE sales DROP FOREIGN KEY fkcustomer;

ALTER TABLE appointments
ADD CONSTRAINT fk_pet
FOREIGN KEY (idanimal) REFERENCES animals(idanimal)
ON DELETE CASCADE;

ALTER TABLE animals DROP COLUMN id_owner;
select * from pet_adoption;
-- -----------------------------------------------------
-- Table `pet_shop`.`services`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shop`.`services` (
  `idservices` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `duration_minutes` INT NULL DEFAULT NULL,
  `price` DECIMAL(5,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idservices`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE appointments DROP FOREIGN KEY fk_service;
ALTER TABLE sales DROP FOREIGN KEY fkservice;

ALTER TABLE appointments
MODIFY idservice BIGINT;

ALTER TABLE sales
MODIFY id_service BIGINT;


ALTER TABLE appointments
ADD CONSTRAINT fk_service
FOREIGN KEY (idservice)
REFERENCES services(idservices)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE sales
ADD CONSTRAINT fkservice
FOREIGN KEY (id_service)
REFERENCES services(idservices)
ON DELETE CASCADE
ON UPDATE CASCADE;




-- -----------------------------------------------------
-- Table `pet_shop`.`appointments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shop`.`appointments` (
  `idappointments` INT NOT NULL,
  `idowner` INT NULL DEFAULT NULL,
  `idanimal` INT NULL DEFAULT NULL,
  `idservice` INT NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `status` ENUM('in_progress', 'complete', 'canceled') NULL DEFAULT NULL,
  PRIMARY KEY (`idappointments`),
  INDEX `fk_customer_idx` (`idowner` ASC) VISIBLE,
  INDEX `fk_pet_idx` (`idanimal` ASC) VISIBLE,
  INDEX `fk_service_idx` (`idservice` ASC) VISIBLE,
  CONSTRAINT `fk_customer`
    FOREIGN KEY (`idowner`)
    REFERENCES `pet_shop`.`owners` (`idowner`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_pet`
    FOREIGN KEY (`idanimal`)
    REFERENCES `pet_shop`.`animals` (`idanimal`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_service`
    FOREIGN KEY (`idservice`)
    REFERENCES `pet_shop`.`services` (`idservices`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_shop`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shop`.`employee` (
  `idemployee` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `phone` INT NULL DEFAULT NULL,
  `hire_date` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`idemployee`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE `pet_shop`.`employee`
ADD COLUMN `job_title` VARCHAR(45) NULL DEFAULT NULL AFTER `hire_date`;

ALTER TABLE pet_shop.employee
MODIFY phone BIGINT NULL;
select * from owners;
ALTER TABLE owners CHANGE idowner old_idemployee BIGINT NOT NULL;
ALTER TABLE owners DROP PRIMARY KEY;
ALTER TABLE owners ADD COLUMN idowner BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
SET SQL_SAFE_UPDATES = 0;
UPDATE owners SET idowner = old_idemployee;
SET SQL_SAFE_UPDATES = 1;
ALTER TABLE owners DROP COLUMN old_idemployee;
-- SHOW CREATE TABLE owners;
-- INSERT INTO employee (name, surname, email, phone, job_title, hire_date)
-- VALUES ('Test', 'Person', 't@t.com', 1234567890, 'Tester', NOW());
-- SELECT * FROM employee ORDER BY idemployee DESC LIMIT 1;

-- -----------------------------------------------------
-- Table `pet_shop`.`pet_adoption`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shop`.`pet_adoption` (
  `idpet_adoption` INT NOT NULL,
  `idowner` INT NULL DEFAULT NULL,
  `idanimal` INT NULL DEFAULT NULL,
  `aplication_date` DATE NULL DEFAULT NULL,
  `status` ENUM('pending', 'approved', 'rejected') NULL DEFAULT NULL,
  PRIMARY KEY (`idpet_adoption`),
  INDEX `fk_customer_idx` (`idowner` ASC) VISIBLE,
  INDEX `fk_pets_idx` (`idanimal` ASC) VISIBLE,
  CONSTRAINT `fkani`
    FOREIGN KEY (`idanimal`)
    REFERENCES `pet_shop`.`animals` (`idanimal`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fkown`
    FOREIGN KEY (`idowner`)
    REFERENCES `pet_shop`.`owners` (`idowner`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

select * from pet_adoption;
select * from animals;
-- -----------------------------------------------------
-- Table `pet_shop`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shop`.`products` (
  `idproducts` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `price` DECIMAL(5,2) NULL DEFAULT NULL,
  `stock` INT NULL DEFAULT NULL,
  `category` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idproducts`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



select * from employee;

select * from products;
ALTER TABLE products
ADD COLUMN category VARCHAR(45) NULL DEFAULT NULL;

ALTER TABLE sales DROP FOREIGN KEY fkproduct;

ALTER TABLE sales
MODIFY idproduct BIGINT;

ALTER TABLE products
ADD COLUMN idproducts BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
SET SQL_SAFE_UPDATES = 0;
UPDATE products SET idproducts = old_idproducts;
SET SQL_SAFE_UPDATES = 1;

ALTER TABLE sales
ADD CONSTRAINT fkproduct
FOREIGN KEY (idproduct)
REFERENCES products(idproducts)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE products DROP COLUMN old_idproducts;
select * from owners;
select * from animals;
select * from pet_adoption;
-- -----------------------------------------------------
-- Table `pet_shop`.`sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_shop`.`sales` (
  `idsales` INT NOT NULL,
  `idowner` INT NULL DEFAULT NULL,
  `idproduct` INT NULL DEFAULT NULL,
  `id_service` INT NULL DEFAULT NULL,
  `quantity` INT NULL DEFAULT NULL,
  `sale_date` DATETIME NULL DEFAULT NULL,
  `total` DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`idsales`),
  INDEX `fkcustomer_idx` (`idowner` ASC) VISIBLE,
  INDEX `fkproduct_idx` (`idproduct` ASC) VISIBLE,
  INDEX `fkservice_idx` (`id_service` ASC) VISIBLE,
  CONSTRAINT `fkcustomer`
    FOREIGN KEY (`idowner`)
    REFERENCES `pet_shop`.`owners` (`idowner`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fkproduct`
    FOREIGN KEY (`idproduct`)
    REFERENCES `pet_shop`.`products` (`idproducts`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fkservice`
    FOREIGN KEY (`id_service`)
    REFERENCES `pet_shop`.`services` (`idservices`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

alter table owners modify COLUMN password varchar(100) NOT NULL default 'parola';
alter table employee MODIFY COLUMN password varchar(100) NOT NULL default 'parola';


INSERT INTO owners (idowner, name, surname, telephone, email, address)
VALUES
(107, 'Robert', 'Dumitru', 712998877, 'robert@example.com', 'Str. Victoriei 3'),
(108, 'Ana', 'Matei', 765442211, 'ana@example.com', 'Aleea Lalelelor 12'),
(109, 'Chris', 'Brown', 666888999, 'chris@example.com', '789 Pine Dr'),
(110, 'Andreea', 'Georgescu', 722334455, 'andreea@example.com', 'Str. Parcului 18');

INSERT INTO owners (idowner, name, surname, telephone, email, address)
VALUES
(111, 'Rony', 'Dumy', 712558877, 'rony@example.com', 'Str. Victory 3'),
(112, 'Anne', 'Mathew', 885442211, 'anne@example.com', 'Aleea Peana 12'),
(113, 'Christy', 'Blue', 661388999, 'christy@example.com', '789 Pine Drew'),
(114, 'Andrew', 'Gene', 722494455, 'andrew@example.com', 'Str. Lea 18');

select * from animals;
INSERT INTO animals (idanimal, name, idowner, specie, rasa, age, price)
VALUES
(211, 'Lola', 107, 'Cat', 'Maine Coon', 3, 280.00),
(212, 'Macy', 108, 'Cat', 'British Shorthair', 1, 80.00),
(213, 'Ian', 109, 'Dog', 'Golden Retriever', 4, 450.00),
(214, 'Mala', 110, 'Dog', 'Labrador', 2, 220.00);


INSERT INTO pet_adoption (idpet_adoption, idowner, idanimal, aplication_date, status)
VALUES
(5, 111, 211, '2025-01-13', 'pending'),
(6, 112, 212, '2025-01-14', 'pending'),

(7, 113, 213, '2025-01-15', 'pending'),
(8, 114, 214, '2025-01-16', 'pending');
select * from pet_adoption;

ALTER TABLE pet_shop.pet_adoption
MODIFY COLUMN status ENUM('pending', 'approved', 'rejected') NULL DEFAULT 'pending';

INSERT INTO pet_adoption (idpet_adoption, idowner, idanimal, aplication_date, status)
VALUES
(1, 107, 207, '2025-01-13', 'pending'),
(2, 108, 208, '2025-01-14', 'pending'),

(3, 109, 209, '2025-01-15', 'pending'),
(4, 110, 210, '2025-01-16', 'pending');

select * from pet_adoption;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
select * from employee;

CREATE TABLE `pet_adoption` (
  `idpet_adoption` BIGINT NOT NULL AUTO_INCREMENT ,
  `idowner` int DEFAULT NULL,
  `idanimal` int DEFAULT NULL,
  `aplication_date` datetime(6) DEFAULT NULL,
  `status` enum('APPROVED','PENDING','REJECTED') DEFAULT NULL,
  PRIMARY KEY (`idpet_adoption`),
  KEY `fk_customer_idx` (`idowner`),
  KEY `fk_pet_idx` (`idanimal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

select * from owners;