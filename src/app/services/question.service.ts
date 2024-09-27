import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class QuestionService {
  private http: HttpClient = inject(HttpClient);
  private api_url: string = environment.api_url;

  getQuestionsByAmountAndCategoryId(amount_of_questions: number, category_id: number): Observable<any> {
    return this.http.get(
      `${this.api_url}/api/SchaffIT/questions/random?category=${category_id}&count=${amount_of_questions}`
    )
  }
}
