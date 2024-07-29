import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import standalone components
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }