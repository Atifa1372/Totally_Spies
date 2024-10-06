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
  question_count: number,
  amount_of_correct_answers: number,
  all_answered: boolean
  time: number,
  timer: string,
  interval: any
}
const initialState: SchaffITStore = {
  questions: [] as Question[],
  categories: [] as Category[],
  selected_category_id: null,
  selected_amount_of_questions: 0,
  selected_answer_id: null,
  question_count: 1,
  amount_of_correct_answers: 0,
  all_answered: false,
  time: 0,
  timer: '00:00',
  interval: null,
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
            Id: 1,
            Text: 'Das Bild zeigt alle Datenwege zwischen diesen Servern. STORE-1 und STORE-2 dienen der Datensicherheit. PORT-1 und PORT-2 dienen dem Server-Zugang. Die Zugangsserver speichern keine Daten.\n' + '\n' + 'Welche Aussage ist falsch?',
            Answers: [
              {
                Id: 1,
                Text: 'Falls PORT-1 und PORT-2 zerstört werden, sind alle Daten der Claudianer vernichtet.',
                IsTrue: true
              },
              {
                Id: 2,
                Text: 'Falls PORT-1 und PORT-2 zerstört werden, sind alle Daten der Claudianer unzugänglich.',
                IsTrue: false
              },
              {
                Id: 3,
                Text: 'Falls STORE-1 und STORE-2 zerstört werden, sind alle Daten der Claudianer vernichtet.',
                IsTrue: false
              }
            ],
            Category: {
              Id: 1,
              Name: 'Netzwerk'
            }
          },
          {
            Id: 2,
            Text: 'Ein Handwerker steht in einem Baumarkt vor einem Regal mit Schrauben. Er hat die Aufgabe, eine Schraube mit einer vorgegebenen Länge auszuwählen. Glücklicherweise sind die Schrauben im Regal von links nach rechts der Länge nach sortiert. Was ist die Lösung?',
            Answers: [
              {
                Id: 1,
                Text: 'f(n) = log2 (n) + 1',
                IsTrue: false
              },
              {
                Id: 2,
                Text: 'f(n) = 2n² + 1',
                IsTrue: false
              },
              {
                Id: 3,
                Text: 'f(n) = √n + 1',
                IsTrue: true
              }
            ],
            Category: {
              Id: 1,
              Name: 'Netzwerk'
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
          {Id: 1, Name: 'BfK-S', PicturePath: '/bfkS.png'},
          {Id: 2, Name: 'BfK-B', PicturePath: '/bfkB.png'},
          {Id: 3, Name: 'BfK-I', PicturePath: '/bfkI.png'},
          {Id: 4, Name: 'Wirtschaft', PicturePath: '/wi.png'},
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

      get_first_question_of_array() {
        if (store.questions().length > 0) {
          return store.questions()[0];
        } else if (store.all_answered()) {
          router.navigate(['score']);
        } else {
          router.navigate(['category-select']).then(() => confirm('Es muss erst eine Kategorie und die Anzahl der Fragen ausgewählt werden.'));
        }
      },

      set_selected_answer_id(answer_id: number) {
        patchState(store, {selected_answer_id: answer_id})
      },

      delete_first_question_of_array() {
        const questions = store.questions();
        questions.splice(0, 1);
        patchState(store, {questions: questions})

        this.increment_question_count();

        if (questions.length === 0) {
          patchState(store, {all_answered: true})
        }
      },

      increment_question_count() {
        const count = store.question_count()
        patchState(store, {question_count: count+1});
      },

      increment_amount_of_correct_answers() {
        let amount = store.amount_of_correct_answers()+1;
        patchState(store, {amount_of_correct_answers: amount});
      },

      start_timer() {
        this.pause_timer();
        store.interval = setInterval(() => {
          let time = store.time() + 1;
          patchState(store, {time: time})
          patchState(store, {timer: this.transform(time)})
        }, 1000);
      },

      transform(value: number): string {
        const minutes: number = Math.floor(value / 60);
        const seconds: number = value - minutes * 60;
        return this.pad(minutes, 2) + ':' + this.pad(seconds,2)
      },

      pad(num: number, size: number): string {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
      },

      pause_timer() {
        clearInterval(store.interval);
      },

      reset_store() {
        const categories = store.categories();
        patchState(store, initialState);
        patchState(store, {categories: categories})
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
