CREATE TABLE categories (
    categoryId int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    PRIMARY KEY (categoryId)
) ENGINE=InnoDB;

CREATE TABLE products (
    productId int NOT NULL AUTO_INCREMENT,
    categoryId int NOT NULL,
    name varchar(50) NOT NULL,
    price int NOT NULL,
    PRIMARY KEY (productId),
    FOREIGN KEY (categoryId) REFERENCES categories(categoryId)
	ON UPDATE CASCADE
	ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE commands (
    commandId int NOT NULL AUTO_INCREMENT,
    productId int NOT NULL,
    quantity int NOT NULL,
    PRIMARY KEY (commandId),
    FOREIGN KEY (productId) REFERENCES products(productId)
	ON UPDATE CASCADE
	ON DELETE CASCADE
) ENGINE=InnoDB;


INSERT INTO `categories` (`categoryId`, `name`) VALUES (NULL, 'Verano');
INSERT INTO `categories` (`categoryId`, `name`) VALUES (NULL, 'Primavera');
INSERT INTO `categories` (`categoryId`, `name`) VALUES (NULL, 'Deporte');
INSERT INTO `categories` (`categoryId`, `name`) VALUES (NULL, 'Escalada');

INSERT INTO `products` (`productId`, `categoryId`, `name`, `price`) VALUES (NULL, '1', 'Pantalones', '15');
INSERT INTO `products` (`productId`, `categoryId`, `name`, `price`) VALUES (NULL, '2', 'Camiseta', '15');
INSERT INTO `products` (`productId`, `categoryId`, `name`, `price`) VALUES (NULL, '3', 'Gorra', '15');
INSERT INTO `products` (`productId`, `categoryId`, `name`, `price`) VALUES (NULL, '4', 'Bambas', '15');