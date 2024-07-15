import {Question} from "../interfaces/question.interface";
import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {inject} from "@angular/core";
import {QuestionService} from "../services/question.service";
import {Answer} from "../interfaces/answer.interface";
import {Category} from "../interfaces/category.interface";

type QuestionsState = {
  questions: Question[]|null,
  current_question: Question|null,
  selected_answer: Answer|null,
  selected_categories: Category[]|null,
  selected_amount_of_questions: number|null,
  isLoading: boolean
}
const initialState: QuestionsState = {
  questions: null,
  current_question: null,
  selected_answer: null,
  selected_categories: null,
  selected_amount_of_questions: null,
  isLoading: false,
};

export const QuestionStore = signalStore(
  {providedIn: 'root'},

  withState(initialState),

  withMethods(
    (
      store,
      question_service = inject(QuestionService)
    ) => ({

      loadQuestionsByAmountAndCategoryId(amount_of_questions: number, category_id: number) {
        /*question_service.getQuestionsByAmountAndCategoryId(amount_of_questions, category_id).subscribe(questions => {
          patchState(store, {questions: questions});
        });*/

        let questions = [
          {
            id: 1,
            text: 'Die Claudianer speichern ihre Daten in einer Wolke mit vier Server- Computern. Das Bild zeigt alle Datenwege zwischen diesen Servern. STORE-1 und STORE-2 dienen der Datensicherheit. PORT-1 und PORT-2 dienen dem Server-Zugang. Die Zugangsserver speichern keine Daten.\n' + '\n' + 'Welche Aussage ist falsch?',
            answers: [
              {
                id: 1,
                text: 'Falls PORT-1 und PORT-2 zerstört werden, sind alle Daten der Claudianer vernichtet.',
                is_true: true
              },
              {
                id: 2,
                text: 'Falls PORT-1 und PORT-2 zerstört werden, sind alle Daten der Claudianer unzugänglich.',
                is_true: false
              },
              {
                id: 3,
                text: 'Falls STORE-1 und STORE-2 zerstört werden, sind alle Daten der Claudianer vernichtet.',
                is_true: false
              }
            ],
            category: {
              id: 1,
              name: 'Netzwerk'
            }
          },
          {
            id: 2,
            text: 'Ein Handwerker steht in einem Baumarkt vor einem Regal mit Schrauben. Er hat die Aufgabe, eine Schraube mit einer vorgegebenen Länge auszuwählen. Glücklicherweise sind die Schrauben im Regal von links nach rechts der Länge nach sortiert. Was ist die Lösung?',
            answers: [
              {
                id: 1,
                text: 'f(n) = log2 (n) + 1',
                is_true: false
              },
              {
                id: 2,
                text: 'f(n) = 2n² + 1',
                is_true: false
              },
              {
                id: 3,
                text: 'f(n) = √n + 1',
                is_true: true
              }
            ],
            category: {
              id: 1,
              name: 'Netzwerk'
            }
          },
        ];

        patchState(store, {questions: questions});
      }

    })
  )
);
