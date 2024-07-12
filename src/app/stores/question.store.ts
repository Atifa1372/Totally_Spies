import {Question} from "../interfaces/question.interface";
import {signalStore, withMethods, withState} from "@ngrx/signals";
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
        return question_service.getQuestionsByAmountAndCategoryId(amount_of_questions, category_id)
      }

    })
  )
);
