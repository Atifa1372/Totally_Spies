import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http: HttpClient = inject(HttpClient);
  private api_url: string = environment.api_url;

  getCategories(): Observable<any> {
    return this.http.get(
      `${this.api_url}/api/ShaffIT/categories`
    )
  }
}
