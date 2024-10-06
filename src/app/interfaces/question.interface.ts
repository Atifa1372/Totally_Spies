import {Answer} from "./answer.interface";
import {Category} from "./category.interface";

export interface Question {
  id: number,
  text: string,
  answers: Answer[]
  category: Category
}
