//------------------------ Using built in library -------------------
// import { scrypt, randomBytes } from "crypto";
// import { promisify } from "util";

// const scryptAsyc = promisify(scrypt);

// export class Password {
//   static async toHash(password: string) {
//     const salt = randomBytes(8).toString("hex");
//     const buffer = (await scryptAsyc(password, salt, 64)) as Buffer;

//     return `${buffer.toString("hex")}.${salt}`;
//   }

//   static async compare(storedPassword: string, suppliedPassword: string) {
//     const [hashedPassword, salt] = storedPassword.split(".");
//     const buffer = (await scryptAsyc(suppliedPassword, salt, 64)) as Buffer;

//     return buffer.toString("hex") === hashedPassword;
//   }
// }

//------------------------ Using Argon -------------------

import argon2 from "argon2";

export class Password {
  static async toHash(password: string) {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16, //64 MB : how much RAM is used (higher = harder to attack)
      timeCost: 3, // how many iterations
      parallelism: 1,
    });
    return hash;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const verifyPassword = await argon2.verify(
      storedPassword,
      suppliedPassword,
    );
    return verifyPassword;
  }
}
