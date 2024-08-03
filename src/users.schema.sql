create table users (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL unique,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into users (name, email) values 
('juan manuel', 'juanmanuel@gmail.com'),
('juan', 'juan@gmail.com');

select * from users;