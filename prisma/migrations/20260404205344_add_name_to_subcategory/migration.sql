/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,name]` on the table `Subcategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Subcategory_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_categoryId_name_key" ON "Subcategory"("categoryId", "name");
