
create table "user"(
  id serial primary key,
  username varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  role varchar(255) not null
);

create table post (
  id uuid primary key,
  title varchar(255) not null,
  content text,
  date date not null,
  user_id int not null,
  foreign key (user_id) references "user" (id) on delete cascade
);


INSERT INTO "user" (username, email, password, role) VALUES ('student1', 'student1@mail.com', 'pass1', 'student');
INSERT INTO "user" (username, email, password, role) VALUES ('student2', 'student2@mail.com', 'pass2', 'student');
INSERT INTO "user" (username, email, password, role) VALUES ('professor1', 'professor1@mail.com', 'pass3', 'professor');
INSERT INTO "user" (username, email, password, role) VALUES ('professor2', 'professor2@mail.com', 'pass4', 'professor');

INSERT INTO post (id, content, user_id, title, date) VALUES ('3ad71df8-57d1-4d94-8473-f7f85aa16c05','Content 1', 3, 'Title 1', now());
INSERT INTO post (id, content, user_id, title, date) VALUES ('20550b85-a535-4b40-8c92-8a15238d1f7c','Content 2', 4, 'Title 2', now());
INSERT INTO post (id, content, user_id, title, date) VALUES ('f64beb59-1d18-43cf-a6c3-c2d4653c9e39','Content 3', 3, 'Title 3', now());