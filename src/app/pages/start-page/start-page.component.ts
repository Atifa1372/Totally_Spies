import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent implements OnInit{
  private router: Router = inject(Router);

  async ngOnInit(): Promise<void> {
    await this.sleep(2500);
    this.redirect_to_category_select_page();
  }

  async sleep(ms: number): Promise<void> {
    return new Promise(
      (sleep) => setTimeout(sleep, ms));
  }
  redirect_to_category_select_page() {
    this.router.navigate(['category-select']).then();
  }
}
