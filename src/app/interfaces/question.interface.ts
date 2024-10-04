import {Answer} from "./answer.interface";
import {Category} from "./category.interface";

export interface Question {
  Id: number,
  Text: string,
  Answers: Answer[]
  Category: Category
}
