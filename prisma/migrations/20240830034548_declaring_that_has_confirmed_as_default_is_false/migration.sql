-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_measurements" (
    "measure_uuid" TEXT NOT NULL PRIMARY KEY,
    "measure_value" INTEGER NOT NULL,
    "measure_datetime" DATETIME NOT NULL,
    "measure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    CONSTRAINT "measurements_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_measurements" ("customer_id", "has_confirmed", "image_url", "measure_datetime", "measure_type", "measure_uuid", "measure_value") SELECT "customer_id", "has_confirmed", "image_url", "measure_datetime", "measure_type", "measure_uuid", "measure_value" FROM "measurements";
DROP TABLE "measurements";
ALTER TABLE "new_measurements" RENAME TO "measurements";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
