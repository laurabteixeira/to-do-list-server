// import { PrismaClient, Task } from '@prisma/client'
// import { randomUUID } from 'crypto'

// const prisma = new PrismaClient()

// const NUM_RECORDS = 1000000 // Number of records you want to seed

// async function seed() {
//   console.log(`Seeding ${NUM_RECORDS} records...`)

//   for (let i = 0; i < NUM_RECORDS; i++) {
//     const task: Task = {
//       id: randomUUID(),
//       title: generateRandomWords(3),
//       description: generateRandomSentences(2),
//       isFinished: generateRandomBoolean(),
//       createdAt: new Date(),
//       taskTableId: randomUUID(),
//     }

//     await prisma.task.create({
//       data: task,
//     })

//     if (i % 1000 === 0) {
//       console.log(`Seeded ${i} records`)
//     }
//   }

//   console.log(`Seeding completed`)
// }

// function generateRandomWords(count: number): string {
//   const words = []
//   for (let i = 0; i < count; i++) {
//     words.push(generateRandomWord())
//   }
//   return words.join(' ')
// }

// function generateRandomWord(): string {
//   return Math.random().toString(36).substr(2, 5)
// }

// function generateRandomSentences(count: number): string {
//   const sentences = []
//   for (let i = 0; i < count; i++) {
//     sentences.push(generateRandomSentence())
//   }
//   return sentences.join(' ')
// }

// function generateRandomSentence(): string {
//   return generateRandomWords(5) + '.'
// }

// function generateRandomBoolean(): boolean {
//   return Math.random() < 0.5
// }

// seed()
//   .catch((error) => {
//     console.error(error)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
