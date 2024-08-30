-- CreateTable
CREATE TABLE "measurements" (
    "measure_uuid" TEXT NOT NULL PRIMARY KEY,
    "measure_value" INTEGER NOT NULL,
    "measure_datetime" DATETIME NOT NULL,
    "measure_type" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL,
    "image_url" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    CONSTRAINT "measurements_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customer_code" TEXT NOT NULL
);
