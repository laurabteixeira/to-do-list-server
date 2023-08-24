-- CreateTable
CREATE TABLE "TaskTable" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "Description" TEXT,
    "isFinished" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "taskTableId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_taskTableId_key" ON "Task"("id", "taskTableId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskTableId_fkey" FOREIGN KEY ("taskTableId") REFERENCES "TaskTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
