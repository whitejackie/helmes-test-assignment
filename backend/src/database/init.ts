import { Database } from 'sqlite';
import { getDb } from './database.js';

export async function initDatabase() {
  const db = await getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sectors (
      id         INTEGER PRIMARY KEY,
      name       TEXT    NOT NULL,
      parent_id  INTEGER REFERENCES sectors(id) ON DELETE CASCADE,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_sectors_parent ON sectors(parent_id);

    CREATE TABLE IF NOT EXISTS users (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      name           TEXT    NOT NULL,
      agree_to_terms INTEGER NOT NULL CHECK (agree_to_terms IN (0, 1)),
      created_at     TEXT    DEFAULT (datetime('now')),
      updated_at     TEXT    DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS user_sectors (
      user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      sector_id INTEGER NOT NULL REFERENCES sectors(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, sector_id)
    );
  `);

  const result = await db.get<{ c: number }>(
    'SELECT COUNT(*) as c FROM sectors',
  );

  if (result?.c === 0) {
    await seedSectors(db);
  }
}

async function seedSectors(db: Database) {
  const sectors: [number, string, number | null, number][] = [
    // Top level
    [1, 'Manufacturing', null, 1],
    [3, 'Other', null, 2],
    [2, 'Service', null, 3],

    // Manufacturing(1) children
    [19, 'Construction materials', 1, 10],
    [18, 'Electronics and Optics', 1, 20],
    [6, 'Food and Beverage', 1, 30],
    [13, 'Furniture', 1, 40],
    [12, 'Machinery', 1, 50],
    [11, 'Metalworking', 1, 60],
    [9, 'Plastic and Rubber', 1, 70],
    [5, 'Printing', 1, 80],
    [7, 'Textile and Clothing', 1, 90],
    [8, 'Wood', 1, 100],

    // Food and Beverage(6) children
    [342, 'Bakery & confectionery products', 6, 310],
    [43, 'Beverages', 6, 320],
    [42, 'Fish & fish products', 6, 330],
    [40, 'Meat & meat products', 6, 340],
    [39, 'Milk & dairy products', 6, 350],
    [437, 'Other', 6, 360],
    [378, 'Sweets & snack food', 6, 370],

    // Furniture(13) children
    [389, 'Bathroom/sauna', 13, 410],
    [385, 'Bedroom', 13, 420],
    [390, 'Children’s room', 13, 430],
    [98, 'Kitchen', 13, 440],
    [101, 'Living room', 13, 450],
    [392, 'Office', 13, 460],
    [394, 'Other (Furniture)', 13, 470],
    [341, 'Outdoor', 13, 480],
    [99, 'Project furniture', 13, 490],

    // Machinery(12) children
    [94, 'Machinery components', 12, 510],
    [91, 'Machinery equipment/tools', 12, 520],
    [224, 'Manufacture of machinery', 12, 530],
    [97, 'Maritime', 12, 540],
    [93, 'Metal structures', 12, 550],
    [508, 'Other', 12, 560],
    [227, 'Repair and maintenance service', 12, 570],

    // Maritime(97) children
    [271, 'Aluminium and steel workboats', 97, 541],
    [269, 'Boat/Yacht building', 97, 542],
    [230, 'Ship repair and conversion', 97, 543],

    // Metalworking(11) children
    [67, 'Construction of metal structures', 11, 610],
    [263, 'Houses and buildings', 11, 620],
    [267, 'Metal products', 11, 630],
    [542, 'Metal works', 11, 640],

    // Metal works(542) children
    [75, 'CNC-machining', 542, 641],
    [62, 'Forgings, Fasteners', 542, 642],
    [69, 'Gas, Plasma, Laser cutting', 542, 643],
    [66, 'MIG, TIG, Aluminum welding', 542, 644],

    // Plastic and Rubber(9) children
    [54, 'Packaging', 9, 710],
    [556, 'Plastic goods', 9, 720],
    [559, 'Plastic processing technology', 9, 730],
    [560, 'Plastic profiles', 9, 740],

    // Plastic processing technology(559) children
    [55, 'Blowing', 559, 731],
    [57, 'Moulding', 559, 732],
    [53, 'Plastics welding and processing', 559, 733],

    // Printing(5) children
    [148, 'Advertising', 5, 810],
    [150, 'Book/Periodicals printing', 5, 820],
    [145, 'Labelling and packaging printing', 5, 830],

    // Textile and Clothing(7) children
    [44, 'Clothing', 7, 910],
    [45, 'Textile', 7, 920],

    // Wood(8) children
    [337, 'Other (Wood)', 8, 1010],
    [51, 'Wooden building materials', 8, 1020],
    [47, 'Wooden houses', 8, 1030],

    // Other(3) children
    [37, 'Creative industries', 3, 2010],
    [29, 'Energy technology', 3, 2020],
    [33, 'Environment', 3, 2030],

    // Service(2) children
    [25, 'Business services', 2, 3010],
    [35, 'Engineering', 2, 3020],
    [28, 'Information Technology and Telecommunications', 2, 3030],
    [22, 'Tourism', 2, 3040],
    [141, 'Translation services', 2, 3050],
    [21, 'Transport and Logistics', 2, 3060],

    // IT & Telecom(28) children
    [581, 'Data processing, Web portals, E-marketing', 28, 3031],
    [576, 'Programming, Consultancy', 28, 3032],
    [121, 'Software, Hardware', 28, 3033],
    [122, 'Telecommunications', 28, 3034],

    // Transport(21) children
    [111, 'Air', 21, 3061],
    [114, 'Rail', 21, 3062],
    [112, 'Road', 21, 3063],
    [113, 'Water', 21, 3064],
  ];

  const insert = await db.prepare(`
    INSERT INTO sectors (id, name, parent_id, sort_order)
    VALUES (?, ?, ?, ?)
  `);

  for (const sector of sectors) {
    await insert.run(...sector);
  }

  await insert.finalize();
}
