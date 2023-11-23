import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { triviaQuestions } from "./schema";
import "dotenv/config";

// create database connection
const connection = connect({
  url: process.env.DATABASE_URL,
});

const db = drizzle(connection);

async function addQuestion(questionData: {
  question: string;
  answer: string;
  category: string;
  wrongAnswers: string[];
}) {
  return db.insert(triviaQuestions).values(questionData);
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const questions = [
    {
      question: "What is the capital of Finland?",
      answer: "Helsinki",
      category: "Geography",
      wrongAnswers: ["Stockholm", "Oslo", "Copenhagen"],
    },
  ];

  try {
    for (const question of questions) {
      await addQuestion(question);
    }
    console.log("Questions added successfully");
  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
