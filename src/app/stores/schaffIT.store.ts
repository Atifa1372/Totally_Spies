import {Question} from "../interfaces/question.interface";
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {inject} from "@angular/core";
import {QuestionService} from "../services/question.service";
import {Category} from "../interfaces/category.interface";
import {CategoryService} from "../services/category.service";
import {Router} from "@angular/router";

type SchaffITStore = {
  questions: Question[],
  categories: Category[],
  selected_category_id: number|null,
  selected_amount_of_questions: number,
  selected_answer_id: number|null,
  amount_of_correct_answers: number,
  isLoading: boolean
}
const initialState: SchaffITStore = {
  questions: [] as Question[],
  categories: [] as Category[],
  selected_category_id: null,
  selected_amount_of_questions: 0,
  selected_answer_id: null,
  amount_of_correct_answers: 0,
  isLoading: false,
};

export const SchaffITStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),

  withMethods((store: any) => {
    const question_service = inject(QuestionService);
    const category_service = inject(CategoryService);
    const router = inject(Router);

    return {
      load_questions() {
        /*if (store.selected_category_id() && store.selected_amount_of_questions() > 0) {
          if (store.selected_category_id() === 0) {
            let subscription = question_service.getQuestionsByAmount(store.selected_amount_of_questions()).subscribe(questions => {
              patchState(store, {questions: questions});
              subscription.unsubscribe();
            });
          } else {
            let subscription = question_service.getQuestionsByAmountAndCategoryId(store.selected_amount_of_questions(), store.selected_category_id()).subscribe(questions => {
              patchState(store, {questions: questions});
              subscription.unsubscribe();
            });
          }
        } else {
          router.navigate(['category-select']).then(() => confirm('Es muss erst eine Kategorie und die Anzahl der Fragen ausgewählt werden.'))
        }*/

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
      },

      load_categories() {
       /* let subscription = category_service.getCategories().subscribe(categories => {
          patchState(store, {categories: categories});
          subscription.unsubscribe();
        })*/

        let categories = [
          {id: 1, name: 'BfK-S'},
          {id: 2, name: 'BfK-B'},
          {id: 3, name: 'BfK-I'},
          {id: 4, name: 'Wirtschaft'},
        ];
        patchState(store, {categories: categories});
      },

      set_selected_category(selected_category: number) {
        patchState(store, {selected_category_id: selected_category});
      },

      set_selected_amount_and_load_questions(selected_amount: number) {
        patchState(store, {selected_amount_of_questions: selected_amount});
        this.load_questions();
      },

      get_first_question() {
        if (store.questions().length > 0) {
          return store.questions()[0];
        } else if (store.amount_of_correct_answers()) {
          router.navigate(['score']);
        } else {
          router.navigate(['category-select']).then(() => confirm('Es muss erst eine Kategorie und die Anzahl der Fragen ausgewählt werden.'));
        }
      },

      set_selected_answer_id(answer_id: number) {
        patchState(store, {selected_answer_id: answer_id})
      },

      delete_first_question() {
        const questions = [...store.questions];
        questions.splice(0, 1);
        patchState(store, {questions: questions})
      },

      increment_amount_of_correct_answers() {
        let amount = store.amount_of_correct_answers()+1;
        patchState(store, {amount_of_correct_answers: amount});
      }
    }
  }),

  withComputed(() => ({})
    // computed
  ),

  withHooks({
    onInit(store: any) {
      store.load_categories();
    }
  })
);
