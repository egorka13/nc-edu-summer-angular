import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CounterComponent} from './counter/counter.component';
import {TodoComponent} from './todo/todo.component';
import {FormsModule} from '@angular/forms';
import {BoldDirective} from './bold.directive';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TodoComponent,
    BoldDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
