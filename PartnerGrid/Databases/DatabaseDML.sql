INSERT INTO Partners (FirstName, LastName, Address, PartnerNumber, CroatianPin, PartnerTypeId, CreatedAtUtc, CreateByUser, IsForeign, ExternalCode, Gender)
VALUES
('Marija', 'Kovačević', 'Zagreb, Croatia', '12345678901234567890', '12345678901', 1, GETUTCDATE(), 'markov@wiener.hr', 0, NULL, 'F'),
('Ivan', 'Horvat', 'Split, Croatia', '98765432109876543210', '23456789012', 1, GETUTCDATE(), 'ivahor@wiener.hr', 0, NULL, 'M'),
('Emily', 'Smith', 'London, UK', '45678901234567890123', NULL, 2, GETUTCDATE(), 'emismi@wiener.hr', 1, 'EXTERNALCODE1234', 'F'),
('Ahmed', 'Al-Farsi', 'Doha, Qatar', '34567890123456789012', NULL, 2, GETUTCDATE(), 'ahmalf@wiener.at', 1, 'EXTERNALCODE5678', 'M'),
('Yuki', 'Tanaka', 'Tokyo, Japan', '56789012345678901234', NULL, 1, GETUTCDATE(), 'yuktan@wiener.at', 1, 'EXTERNALCODE0987', 'F'),
('Sonja', 'Perković', 'Zagreb, Croatia', '13579111315171921232', '13904713661', 1, GETUTCDATE(), 'sonjper@wiener.hr', 0, NULL, 'F');


INSERT INTO Policies (PartnerId, PolicyNumber, PolicyAmount)
VALUES
(1, 'POL1234567890', 499.99), 
(1, 'POL9876543210', 2000.90), 
(2, 'POL4567890123', 450.75), 
(3, 'POL6789012345', 100.00), 
(4, 'POL8901234567', 5502.00), 
(5, 'POL0123456789', 203.00),
(6, 'POL2345678901', 4000.00),
(6, 'POL3456789012', 300.00);