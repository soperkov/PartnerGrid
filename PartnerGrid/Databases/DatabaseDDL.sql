CREATE DATABASE PartnersPolicies;
GO

USE PartnersPolicies;
GO

CREATE TABLE Partners (
PartnerId INT IDENTITY(1,1) PRIMARY KEY,
FirstName NVARCHAR(255) NOT NULL CHECK(LEN(FirstName) >= 2),
LastName NVARCHAR(255) NOT NULL CHECK(LEN(LastName) >= 2),
Address NVARCHAR(MAX),
PartnerNumber CHAR(20) NOT NULL UNIQUE CHECK(ISNUMERIC(PartnerNumber) = 1),
CroatianPin CHAR(11) CHECK(ISNUMERIC(CroatianPin) = 1 OR CroatianPin IS NULL),
PartnerTypeId INT NOT NULL CHECK(PartnerTypeId IN (1,2)),
CreatedAtUtc DATETIME NOT NULL DEFAULT (GETUTCDATE()),
CreateByUser NVARCHAR(255) NOT NULL CHECK (
        CreateByUser LIKE '%@%.%' AND
        CHARINDEX('@', CreateByUser) > 1
    ),
IsForeign BIT NOT NULL,
ExternalCode NVARCHAR(20) UNIQUE CHECK(LEN(ExternalCode) >= 10),
Gender CHAR(1) NOT NULL CHECK(Gender in ('M', 'F', 'N'))
);

CREATE TABLE Policies (
PolicyId INT IDENTITY(1,1) PRIMARY KEY,
PartnerId INT NOT NULL FOREIGN KEY REFERENCES Partners(PartnerId) ON DELETE CASCADE,
PolicyNumber NVARCHAR(15) NOT NULL CHECK(LEN(PolicyNumber) >= 10),
PolicyAmount DECIMAL(18,2) NOT NULL
);

CREATE UNIQUE INDEX IX_Unique_CroatianPin
ON Partners (CroatianPin)
WHERE CroatianPin IS NOT NULL;

GO
