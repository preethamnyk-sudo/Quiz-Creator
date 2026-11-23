import { get, push, ref, set } from "firebase/database";
import { database } from "./firebaseConfig";

export async function createQuizQuestion(question, optionA, optionB, optionC, optionD, correctAnswer) {
  const quizRef = push(ref(database, "Quiz-Questions"));

  await set(quizRef, {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
  });
}

export async function getQuizQuestions() {
  const quizRef = ref(database, "Quiz-Questions");
  const quizSnapshot = await get(quizRef);
  return quizSnapshot.val() || {};
}
