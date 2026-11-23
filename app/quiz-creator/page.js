"use client";

import { useEffect, useState } from "react";
import { createQuizQuestion, getQuizQuestions } from "../quizManager";

const emptyQuestion = {
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctAnswer: "",
};

export default function QuizCreatorPage() {
  const [quiz, setQuiz] = useState(emptyQuestion);
  const [questions, setQuestions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  async function loadQuestions() {
    try {
      const savedQuestions = await getQuizQuestions();
      setQuestions(Object.entries(savedQuestions).map(([id, question]) => ({ id, ...question })));
    } catch (error) {
      setStatus("Could not load quiz questions.");
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setQuiz((currentQuiz) => ({ ...currentQuiz, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      await createQuizQuestion(
        quiz.question,
        quiz.optionA,
        quiz.optionB,
        quiz.optionC,
        quiz.optionD,
        quiz.correctAnswer
      );
      setQuiz(emptyQuestion);
      setStatus("Question saved successfully.");
      await loadQuestions();
    } catch (error) {
      setStatus("Could not save the question. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="form-page min-h-screen bg-[#313338] text-[#dbdee1]">
      <div className="w-full max-w-2xl space-y-8">
        <form onSubmit={handleSubmit} className="simple-form max-w-none" style={{ backgroundColor: "#2b2d31", borderColor: "#1e1f22", color: "#dbdee1" }}>
          <h1 className="text-white">Quiz Creator</h1>

          <label htmlFor="question">Quiz Question</label>
          <input id="question" name="question" value={quiz.question} onChange={updateField} placeholder="Enter quiz question" required style={{ backgroundColor: "#1e1f22", color: "white", borderColor: "#1e1f22" }} />

          <label htmlFor="optionA">Option A</label>
          <input id="optionA" name="optionA" value={quiz.optionA} onChange={updateField} placeholder="Enter option A" required style={{ backgroundColor: "#1e1f22", color: "white", borderColor: "#1e1f22" }} />

          <label htmlFor="optionB">Option B</label>
          <input id="optionB" name="optionB" value={quiz.optionB} onChange={updateField} placeholder="Enter option B" required style={{ backgroundColor: "#1e1f22", color: "white", borderColor: "#1e1f22" }} />

          <label htmlFor="optionC">Option C</label>
          <input id="optionC" name="optionC" value={quiz.optionC} onChange={updateField} placeholder="Enter option C" required style={{ backgroundColor: "#1e1f22", color: "white", borderColor: "#1e1f22" }} />

          <label htmlFor="optionD">Option D</label>
          <input id="optionD" name="optionD" value={quiz.optionD} onChange={updateField} placeholder="Enter option D" required style={{ backgroundColor: "#1e1f22", color: "white", borderColor: "#1e1f22" }} />

          <label htmlFor="correctAnswer">Correct Answer</label>
          <select id="correctAnswer" name="correctAnswer" value={quiz.correctAnswer} onChange={updateField} required className="rounded border border-[#1e1f22] bg-[#1e1f22] p-2.5 text-white">
            <option value="">Select the correct answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

          <button type="submit" disabled={saving} style={{ backgroundColor: "#5865f2" }}>
            {saving ? "Saving..." : "Save Question"}
          </button>

          {status && <p role="status">{status}</p>}
        </form>

        <section className="simple-form max-w-none" style={{ backgroundColor: "#2b2d31", borderColor: "#1e1f22", color: "#dbdee1" }}>
          <h2 className="text-xl font-bold">Saved Quiz Questions</h2>
          {questions.length === 0 ? (
            <p>No quiz questions saved yet.</p>
          ) : (
            questions.map((savedQuestion, index) => (
              <article key={savedQuestion.id} className="rounded border border-[#1e1f22] bg-[#232428] p-4">
                <h3 className="font-bold">{index + 1}. {savedQuestion.question}</h3>
                <p>A. {savedQuestion.optionA}</p>
                <p>B. {savedQuestion.optionB}</p>
                <p>C. {savedQuestion.optionC}</p>
                <p>D. {savedQuestion.optionD}</p>
                <p className="font-semibold">Correct Answer: Option {savedQuestion.correctAnswer}</p>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
