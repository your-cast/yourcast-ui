import {NgModule} from '@angular/core';
import {Footer} from "./components/footer/footer";
import {NotFoundComponent} from "./components/not-found/not-found.component";

@NgModule({
  declarations: [
    Footer,
    NotFoundComponent
  ],
  exports: [
    Footer,
    NotFoundComponent
  ],
})
export class SharedModule {
}
