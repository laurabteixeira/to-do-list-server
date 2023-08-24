// import { RedisClientType, createClient } from 'redis'

// export class Redis {
//   client: RedisClientType

//   constructor() {
//     this.client = createClient()
//     this.client
//       .connect()
//       .then(() => {
//         console.log('Redis is ready! 🚀')
//       })
//       .catch((error) => {
//         console.error('🥲 An error occured on connecting to Redis: ', error)
//       })

//     this.client.on('error', (error) =>
//       console.log('Redis Client error: ', error),
//     )
//   }

//   async disconnect() {
//     await this.client.quit()
//   }

//   async set(key: string, value: string, ttl?: number) {
//     await this.client.set(key, value, {
//       EX: ttl || undefined,
//     })
//   }

//   async get(key: string) {
//     return this.client.get(key)
//   }

//   async clear(key: string) {
//     this.client.del(key)
//   }
// }

// export const redis = new Redis()
// export default redis
