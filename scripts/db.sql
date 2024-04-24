-- Description: Script para rellenar la tabla commerce con un registro de ejemplo.
-- Author: Antonio Cabrera

INSERT INTO commerces (name, CIF, address, email, phone, city, activity, title, summary, scoring, numReviews, createdAt, updatedAt)
VALUES ('ABC Trading', '123456789', '123 Main Street', 'abc@example.com', '555123456', 'New York', 'Retail', 'Product XYZ', 'A brief summary of Product XYZ.', 4, 50, NOW(), NOW());

