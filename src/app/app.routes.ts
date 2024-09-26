import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScorePageComponent} from "./pages/score-page/score-page.component";
import {StartPageComponent} from "./pages/start-page/start-page.component";
import {CategorySelectPageComponent} from "./pages/category-select-page/category-select-page.component";
import {CountSelectPageComponent} from "./pages/count-select-page/count-select-page.component";
import {EmojiComponent} from "./components/emoji/emoji.component";

export const routes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'score', component: ScorePageComponent},
  {path: 'category-select', component: CategorySelectPageComponent},
  {path: 'count-select/:category-id', component: CountSelectPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), EmojiComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
