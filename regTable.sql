drop table if exist towns, reg; 
CREATE TABLE towns(
    id serial not null primary key,
    town_name VARCHAR(50) not null,
    reg VARCHAR not null
);

CREATE TABLE reg(
    id serial not null primary key,
    reg_numbers VARCHAR(13) not null,
    town_id int,
    FOREIGN KEY(town_id) references towns(id)
);

INSERT INTO towns (town_name, reg) VALUES ('CAPE TOWN', 'CA ');
INSERT INTO towns (town_name, reg) VALUES ('GEORGE', 'CAW ');
INSERT INTO towns (town_name, reg) VALUES ('PAARL', 'CJ ');
INSERT INTO towns (town_name, reg) VALUES ('BELVILLE', 'CY '); 

 