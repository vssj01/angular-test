import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  options: { id: string; label: string }[];
  selectedOption: any;
  personName: string;
  name = new FormControl();
  age = new FormControl();

  ngOnInit() {
    this.options = [
      { id: 'a', name: 'a', label: 'label1' },
      { id: 'b', name: 'b', label: 'label2' },
      { id: 'c', name: 'c', label: 'label3' },
    ].map((obj) => {
      return { id: obj.id, label: obj.label };
    });
    console.log('===: ', this.options);
    this.selectedOption = new FormControl(this.options[0]);
  }

  onOptionChange() {
    console.log(this.selectedOption.value.id);
  }

  setName() {
    this.personName = 'Jane Doe';
  }

  sendData() {
    console.log('sending data');
  }

  editPerson(id: number) {
    console.log('editing persion', id);
  }
}
