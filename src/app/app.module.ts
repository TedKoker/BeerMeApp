import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerbodyComponent } from './beerbody/beerbody.component';
import { BeerloadingComponent } from './beerbody/beerloading/beerloading.component';
import { BeerlistComponent } from './beerbody/beerlist/beerlist.component';
import { BeeritamComponent } from './beerbody/beerlist/beeritam/beeritam.component';
import { BeerService } from './sevices/beerService';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MateModule } from './mate.modul';

@NgModule({
  declarations: [
    AppComponent,
    BeerbodyComponent,
    BeerloadingComponent,
    BeerlistComponent,
    BeeritamComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MateModule
  ],
  providers: [
    BeerService,
    
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
