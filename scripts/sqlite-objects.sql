CREATE TABLE ActivityTypes (
  Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  Name TEXT(8) NOT NULL,
  Operation TEXT(1) NOT NULL,
  CONSTRAINT UNQ_ActivityTypes_Name UNIQUE (Name)
);

CREATE TABLE Activities (
  Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  ActivityTypeId INTEGER NOT NULL,
  Name TEXT(50) NOT NULL,
  CONSTRAINT FK_Activities_ActivityTypes_Id FOREIGN KEY (ActivityTypeId) REFERENCES ActivityTypes(Id),
  CONSTRAINT UNQ_Activities_Name UNIQUE (ActivityTypeId, Name)
);

CREATE TABLE Expressions (
  Id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  ActivityId INTEGER NOT NULL,
  Pattern TEXT(255) NOT NULL,
  CONSTRAINT FK_Expressions_Activities_Id FOREIGN KEY (ActivityId) REFERENCES Activities(Id),
  CONSTRAINT UNQ_Expressions_Id_Pattern UNIQUE (Pattern)
);

INSERT INTO ActivityTypes (Name, Operation) VALUES ('Despesas', 'D');
INSERT INTO ActivityTypes (Name, Operation) VALUES ('Receitas', 'C');

INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'Condomínio');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'Aluguel');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'Despesas da casa');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'Claro');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'ENEL');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'Comgas');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'Cartão de crédito');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'GPS Cida');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (1, 'Outras despesas');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (2, 'Salário');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (2, 'Benefícios');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (2, 'Rendimentos CC Santander');
INSERT INTO Activities (ActivityTypeId, Name) VALUES (2, 'Outras receitas');

INSERT INTO Expressions (ActivityId, Pattern) VALUES (1, 'LELLO');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (2, 'GRPQA LTDA');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (4, 'TV A CABO NET SERVICOS');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (5, 'ENERGIA ELETRICA   ENEL');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (6, 'COMGAS');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (7, 'CARTAO VISA    FINAL 2274');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (8, 'GUIA PREV SOCIAL');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (10, 'PIX RECEBIDO                       341\/0176\/0000000000166189');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (11, 'PIX RECEBIDO                       397\/0001\/0000000001877271');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (12, 'REMUNERACAO APLICACAO AUTOMATICA');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (10, 'PIX RECEBIDO                       LEANDRO GIMENES GONCALVES');
INSERT INTO Expressions (ActivityId, Pattern) VALUES (11, 'PIX RECEBIDO                       Leandro Gimenes Gonalves');
