PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE sectors (
      id         INTEGER PRIMARY KEY,
      name       TEXT    NOT NULL,
      parent_id  INTEGER REFERENCES sectors(id) ON DELETE CASCADE,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
INSERT INTO sectors VALUES(1,'Manufacturing',NULL,1);
INSERT INTO sectors VALUES(2,'Service',NULL,3);
INSERT INTO sectors VALUES(3,'Other',NULL,2);
INSERT INTO sectors VALUES(5,'Printing',1,80);
INSERT INTO sectors VALUES(6,'Food and Beverage',1,30);
INSERT INTO sectors VALUES(7,'Textile and Clothing',1,90);
INSERT INTO sectors VALUES(8,'Wood',1,100);
INSERT INTO sectors VALUES(9,'Plastic and Rubber',1,70);
INSERT INTO sectors VALUES(11,'Metalworking',1,60);
INSERT INTO sectors VALUES(12,'Machinery',1,50);
INSERT INTO sectors VALUES(13,'Furniture',1,40);
INSERT INTO sectors VALUES(18,'Electronics and Optics',1,20);
INSERT INTO sectors VALUES(19,'Construction materials',1,10);
INSERT INTO sectors VALUES(21,'Transport and Logistics',2,3060);
INSERT INTO sectors VALUES(22,'Tourism',2,3040);
INSERT INTO sectors VALUES(25,'Business services',2,3010);
INSERT INTO sectors VALUES(28,'Information Technology and Telecommunications',2,3030);
INSERT INTO sectors VALUES(29,'Energy technology',3,2020);
INSERT INTO sectors VALUES(33,'Environment',3,2030);
INSERT INTO sectors VALUES(35,'Engineering',2,3020);
INSERT INTO sectors VALUES(37,'Creative industries',3,2010);
INSERT INTO sectors VALUES(39,'Milk & dairy products',6,350);
INSERT INTO sectors VALUES(40,'Meat & meat products',6,340);
INSERT INTO sectors VALUES(42,'Fish & fish products',6,330);
INSERT INTO sectors VALUES(43,'Beverages',6,320);
INSERT INTO sectors VALUES(44,'Clothing',7,910);
INSERT INTO sectors VALUES(45,'Textile',7,920);
INSERT INTO sectors VALUES(47,'Wooden houses',8,1030);
INSERT INTO sectors VALUES(51,'Wooden building materials',8,1020);
INSERT INTO sectors VALUES(53,'Plastics welding and processing',559,733);
INSERT INTO sectors VALUES(54,'Packaging',9,710);
INSERT INTO sectors VALUES(55,'Blowing',559,731);
INSERT INTO sectors VALUES(57,'Moulding',559,732);
INSERT INTO sectors VALUES(62,'Forgings, Fasteners',542,642);
INSERT INTO sectors VALUES(66,'MIG, TIG, Aluminum welding',542,644);
INSERT INTO sectors VALUES(67,'Construction of metal structures',11,610);
INSERT INTO sectors VALUES(69,'Gas, Plasma, Laser cutting',542,643);
INSERT INTO sectors VALUES(75,'CNC-machining',542,641);
INSERT INTO sectors VALUES(91,'Machinery equipment/tools',12,520);
INSERT INTO sectors VALUES(93,'Metal structures',12,550);
INSERT INTO sectors VALUES(94,'Machinery components',12,510);
INSERT INTO sectors VALUES(97,'Maritime',12,540);
INSERT INTO sectors VALUES(98,'Kitchen',13,440);
INSERT INTO sectors VALUES(99,'Project furniture',13,490);
INSERT INTO sectors VALUES(101,'Living room',13,450);
INSERT INTO sectors VALUES(111,'Air',21,3061);
INSERT INTO sectors VALUES(112,'Road',21,3063);
INSERT INTO sectors VALUES(113,'Water',21,3064);
INSERT INTO sectors VALUES(114,'Rail',21,3062);
INSERT INTO sectors VALUES(121,'Software, Hardware',28,3033);
INSERT INTO sectors VALUES(122,'Telecommunications',28,3034);
INSERT INTO sectors VALUES(141,'Translation services',2,3050);
INSERT INTO sectors VALUES(145,'Labelling and packaging printing',5,830);
INSERT INTO sectors VALUES(148,'Advertising',5,810);
INSERT INTO sectors VALUES(150,'Book/Periodicals printing',5,820);
INSERT INTO sectors VALUES(224,'Manufacture of machinery',12,530);
INSERT INTO sectors VALUES(227,'Repair and maintenance service',12,570);
INSERT INTO sectors VALUES(230,'Ship repair and conversion',97,543);
INSERT INTO sectors VALUES(263,'Houses and buildings',11,620);
INSERT INTO sectors VALUES(267,'Metal products',11,630);
INSERT INTO sectors VALUES(269,'Boat/Yacht building',97,542);
INSERT INTO sectors VALUES(271,'Aluminium and steel workboats',97,541);
INSERT INTO sectors VALUES(337,'Other (Wood)',8,1010);
INSERT INTO sectors VALUES(341,'Outdoor',13,480);
INSERT INTO sectors VALUES(342,'Bakery & confectionery products',6,310);
INSERT INTO sectors VALUES(378,'Sweets & snack food',6,370);
INSERT INTO sectors VALUES(385,'Bedroom',13,420);
INSERT INTO sectors VALUES(389,'Bathroom/sauna',13,410);
INSERT INTO sectors VALUES(390,'Children’s room',13,430);
INSERT INTO sectors VALUES(392,'Office',13,460);
INSERT INTO sectors VALUES(394,'Other (Furniture)',13,470);
INSERT INTO sectors VALUES(437,'Other',6,360);
INSERT INTO sectors VALUES(508,'Other',12,560);
INSERT INTO sectors VALUES(542,'Metal works',11,640);
INSERT INTO sectors VALUES(556,'Plastic goods',9,720);
INSERT INTO sectors VALUES(559,'Plastic processing technology',9,730);
INSERT INTO sectors VALUES(560,'Plastic profiles',9,740);
INSERT INTO sectors VALUES(576,'Programming, Consultancy',28,3032);
INSERT INTO sectors VALUES(581,'Data processing, Web portals, E-marketing',28,3031);
CREATE TABLE users (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      name           TEXT    NOT NULL,
      agree_to_terms INTEGER NOT NULL CHECK (agree_to_terms IN (0, 1)),
      created_at     TEXT    DEFAULT (datetime('now')),
      updated_at     TEXT    DEFAULT (datetime('now'))
    );
INSERT INTO users VALUES(1,'John Doe',1,'2026-09-28 00:48:42','2026-09-28 00:48:42');
INSERT INTO users VALUES(2,'Anoth',1,'2026-09-28 03:28:49','2026-09-28 03:28:49');
INSERT INTO users VALUES(3,'Flock',1,'2026-09-28 03:52:19','2026-09-28 03:52:19');
INSERT INTO users VALUES(4,'Frank',1,'2026-09-28 04:05:45','2026-09-28 04:05:45');
INSERT INTO users VALUES(5,'Draco',1,'2026-09-28 04:08:05','2026-09-28 04:08:05');
INSERT INTO users VALUES(6,'Johnny Doe2',1,'2026-09-28 04:34:28','2026-09-28 04:36:02');
INSERT INTO users VALUES(7,'Chupppp2',1,'2026-09-28 04:41:22','2026-09-28 04:41:47');
INSERT INTO users VALUES(8,'Draco',1,'2026-09-28 22:59:24','2026-09-28 22:59:24');
CREATE TABLE user_sectors (
      user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      sector_id INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, sector_id)
    );
INSERT INTO user_sectors VALUES(1,1);
INSERT INTO user_sectors VALUES(1,6);
INSERT INTO user_sectors VALUES(1,342);
INSERT INTO user_sectors VALUES(2,19);
INSERT INTO user_sectors VALUES(2,18);
INSERT INTO user_sectors VALUES(3,19);
INSERT INTO user_sectors VALUES(3,18);
INSERT INTO user_sectors VALUES(4,19);
INSERT INTO user_sectors VALUES(4,18);
INSERT INTO user_sectors VALUES(5,19);
INSERT INTO user_sectors VALUES(5,18);
INSERT INTO user_sectors VALUES(6,1);
INSERT INTO user_sectors VALUES(6,342);
INSERT INTO user_sectors VALUES(7,18);
INSERT INTO user_sectors VALUES(7,99);
INSERT INTO user_sectors VALUES(8,19);
INSERT INTO user_sectors VALUES(8,18);
INSERT INTO sqlite_sequence VALUES('users',8);
CREATE INDEX idx_sectors_parent ON sectors(parent_id);
COMMIT;
