import { Knex } from "knex";
import { faker } from "@faker-js/faker";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("quizes").del();
  const quizeData = [
    {
      id: 1,
      lesson_id: 1,
      question: "What is the Arabic word for 'hello'?",
      o1: "Marhaba",
      o2: "Shukran",
      o3: "Sabah al-khair",
      o4: "Maa al-salama",
      answer: [1],
    },
    {
      id: 2,
      lesson_id: 1,
      question: "Which of the following means 'thank you' in Arabic?",
      o1: "Marhaba",
      o2: "Shukran",
      o3: "Sabah al-khair",
      o4: "Maa al-salama",
      answer: [2],
    },
    {
      id: 3,
      lesson_id: 1,
      question: "What is the Arabic word for 'good morning'?",
      o1: "Marhaba",
      o2: "Shukran",
      o3: "Sabah al-khair",
      o4: "Maa al-salama",
      answer: [3],
    },
    {
      id: 4,
      lesson_id: 2,
      question: "What is the Arabic word for 'book'?",
      o1: "Qalam",
      o2: "Kitaab",
      o3: "Burtuqal",
      o4: "Sayara",
      answer: [2],
    },
    {
      id: 5,
      lesson_id: 2,
      question: "Which of the following means 'pen' in Arabic?",
      o1: "Qalam",
      o2: "Kitaab",
      o3: "Burtuqal",
      o4: "Sayara",
      answer: [1],
    },
  ];
  const quizes: Array<Object> = [];

  const lessons = await knex("lessons");

  lessons.forEach((lesson: any) => {
    quizeData.forEach((q, i) => {
      const quize = {
        lesson_id: lesson.id,
        question: q.question,
        o1: q.o1,
        o2: q.o2,
        o3: q.o3,
        o4: q.o4,
        answer: JSON.stringify(q.answer),
      };
      quizes.push(quize);
    });
    // for (let i = 0; i < quizeData.length; i++) {

    // }
  });

  // Inserts seed entries
  await knex("quizes").insert(quizes);
}
