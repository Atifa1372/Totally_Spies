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
        if ((store.selected_category_id() || (store.selected_category_id() === 0) ) && store.selected_amount_of_questions() > 0) {
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
        }
      },

      load_categories() {
        let subscription = category_service.getCategories().subscribe(categories => {
          patchState(store, {categories: categories});
          subscription.unsubscribe();
        })
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
        const amount = store.amount_of_correct_answers()+1;
        patchState(store, {amount_of_correct_answers: amount});
        console.log(amount);
        console.log(store.amount_of_correct_answers());
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
