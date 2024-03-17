import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

/*  
 * self defined js function
 * location: ./src/assets/
 * included: ./angular.json 
 *      projects> [project_name]> architect> build> options> scripts
 */
declare function setRadios(iNum:number):void;
declare function setOptions(iNum:number):void;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = '240316-ng01';

  // form inputs
  tsFormDef = new FormGroup({
    textInput: new FormControl(''),
    radioInput: new FormControl(''),
    selectInput: new FormControl(''),
    areaInput: new FormControl('')
  });
  // status message
  message = '';
  // radio created in ts
  radioList: string[] = ["following", "sizerComponent", "value","property"];
 
  /*
   * run self defined js when init
   */
  ngOnInit():void {
    // Item created ouside of html template
    setRadios(3);
    setOptions(5);
  }

  /*
   * form submit
   */  
  submitApplication() {
    var str = (this.tsFormDef.value.textInput ?? '') + "--" +
    (this.tsFormDef.value.radioInput ?? '')  + "--" +
    (this.tsFormDef.value.selectInput ?? '')  + "--" +
    (this.tsFormDef.value.areaInput ?? '');

    this.message = str;
  }
}
