import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  int,
  boolean,
  unique,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 120 }),
    lastName: varchar("last_name", { length: 120 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => {
    return {
      unq: unique().on(t.firstName, t.lastName),
    };
  },
);

export const triviaQuestions = mysqlTable("trivia_questions", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 500 }),
  answer: varchar("answer", { length: 500 }),
  category: varchar("category", { length: 120 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userScores = mysqlTable("user_scores", {
  id: serial("id").primaryKey(),
  userId: int("user_id"),
  score: int("score"),
  playedAt: timestamp("played_at").defaultNow(),
});

export const activeSessions = mysqlTable("active_sessions", {
  id: serial("id").primaryKey(),
  userId: int("user_id"),
  isActive: boolean("is_active").default(true),
  lastActiveAt: timestamp("last_active_at").defaultNow(),
});
