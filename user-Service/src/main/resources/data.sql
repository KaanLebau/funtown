INSERT INTO person (id ,first_name, last_name, pnr, email, username) VALUES (1, 'Kaan', 'ozsan', NULL, 'Joelle@Wilkinson.com', 'kaanozsan');
SELECT setval('person_id_seq',2, false);