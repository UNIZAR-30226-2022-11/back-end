DROP DATABASE IF EXISTS ajedrez;
CREATE DATABASE ajedrez;
USE ajedrez;
CREATE TABLE usuario
(
   Nickname     VARCHAR(30) PRIMARY KEY,
   contraseña   VARCHAR(100)        NOT NULL,
   puntos       INT DEFAULT 0       ,
   monedas      INT DEFAULT 0,    
   avatar       VARCHAR(30),
   piezas       VARCHAR(30),
   tablero      VARCHAR(30)        
);

CREATE TABLE amigos
(
   valor              VARCHAR(30),
   USUARIO_Nickname   VARCHAR(30),
   PRIMARY KEY (valor,USUARIO_Nickname),
   FOREIGN KEY (USUARIO_Nickname) REFERENCES usuario(Nickname)
);

CREATE TABLE peticiones_amigos
(
   valor              VARCHAR(30),
   USUARIO_Nickname   VARCHAR(30),
   PRIMARY KEY (valor,USUARIO_Nickname),
   FOREIGN KEY (USUARIO_Nickname) REFERENCES usuario(Nickname)
);

CREATE TABLE partida
(
   id          INT AUTO_INCREMENT PRIMARY KEY,
   Nickname_1  VARCHAR(30) NOT NULL,
   Nickname_2  VARCHAR(30) NOT NULL,
   ganador     BOOLEAN,
   FOREIGN KEY (Nickname_1) REFERENCES usuario(Nickname),
   FOREIGN KEY (Nickname_2) REFERENCES usuario(Nickname)
);


CREATE TABLE articulo
(
   nombre   VARCHAR(30) PRIMARY KEY,
   precio   INT        NOT NULL,
   tipo     VARCHAR(30)        NOT NULL
);

CREATE TABLE compra
(
   USUARIO_Nickname   VARCHAR(30),
   ARTICULO_nombre   VARCHAR(30),
   PRIMARY KEY (USUARIO_Nickname,ARTICULO_nombre),
   FOREIGN KEY (USUARIO_Nickname) REFERENCES usuario(Nickname),
   FOREIGN KEY (ARTICULO_nombre) REFERENCES articulo(nombre)
);

