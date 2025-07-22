// // server/db.js  – simple in-memory “DB” so the routes work

// const lessons = [];                      // shared array in this process

// export async function connect() {
//   return {
//     collection(name) {
//       if (name !== "lessons") throw new Error("Unknown collection");

//       return {
//         async find() { return lessons; },
//         async insertOne(doc) {
//           const id = lessons.length + 1;
//           console.log(id);
//           lessons.push({ id, ...doc });
//           return { insertedId: id };
//         },
//       };
//     },
//   };
// }
