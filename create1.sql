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
   id        INT PRIMARY KEY,
   ganador   BOOLEAN        NOT NULL
);

CREATE TABLE articulo
(
   nombre   VARCHAR(30) PRIMARY KEY,
   precio   INT        NOT NULL,
   tipo     VARCHAR(30)        NOT NULL
);

CREATE TABLE juega
(
   USUARIO_Nickname   VARCHAR(30),
   PARTIDA_id         INT,
   PRIMARY KEY (USUARIO_Nickname,PARTIDA_id),
   FOREIGN KEY (USUARIO_Nickname) REFERENCES usuario(Nickname),
   FOREIGN KEY (PARTIDA_id) REFERENCES partida(id)
);

CREATE TABLE compra
(
   USUARIO_Nickname   VARCHAR(30),
   ARTICULO_nombre   VARCHAR(30),
   PRIMARY KEY (USUARIO_Nickname,ARTICULO_nombre),
   FOREIGN KEY (USUARIO_Nickname) REFERENCES usuario(Nickname),
   FOREIGN KEY (ARTICULO_nombre) REFERENCES articulo(nombre)
);

