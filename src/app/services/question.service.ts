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
      `${this.api_url}/api/ShaffIT/questions/random?categoryId=${category_id}&count=${amount_of_questions}`
    )
  }

  getQuestionsByAmount(amount_of_questions: number): Observable<any> {
    return this.http.get(
      `${this.api_url}/api/ShaffIT/questions/random/all?count=${amount_of_questions}`
    )
  }
}
