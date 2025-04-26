"use server";

const correctPassword = process.env.ADMIN_PASSWORD || "secret";

export async function checkPassword(password: string) {
  const isCorrect = password === correctPassword;
  console.log(isCorrect ? "Password Correct" : "Password Incorrect");
  return isCorrect;
}