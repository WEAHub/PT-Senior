# 3. Modelatge de Base de Dades

Las relaciones importantes de esta base de datos se basa en las llaves foráneas.

## Tabla categorías
Creamos la primera tabla `categories` con una llave primaria `categoryId`
```sql
CREATE TABLE categories (
    categoryId int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    PRIMARY KEY (categoryId)
) ENGINE=InnoDB;
```

## Tabla Products
La tabla `products` tendrá una llave primaria `productId` y una llave foránea hace referencia a `categories(categoryId)` con los eventos `UPDATE/DELETE CASCADE` para que se eliminen los productos si las categorías se elimina.

```sql
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
```

## Tabla commands
La tabla commands sigue la misma lógica que la tabla products, pero en este caso en vez de referenciar con una llave foránea a `categories(categoryId)`, se hace referencia a `products(productId)`


```sql
CREATE TABLE commands (
    commandId int NOT NULL AUTO_INCREMENT,
    productId int NOT NULL,
    quantity int NOT NULL,
    PRIMARY KEY (commandId),
    FOREIGN KEY (productId) REFERENCES products(productId)
	ON UPDATE CASCADE
	ON DELETE CASCADE
) ENGINE=InnoDB;
```
