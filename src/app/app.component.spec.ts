import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let select: HTMLSelectElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    select = fixture.debugElement.query(By.css('.select-option')).nativeElement;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  describe('dropdown', () => {
    it('should bind the configured value', async(() => {
      let p = fixture.debugElement.nativeElement.querySelector('p');
      fixture.detectChanges();
      component.selectedOption = new FormControl(component.options[1]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let text = select.options[select.selectedIndex].label;
        expect(text).toBe('label2');
        expect(p.textContent).toBe('label2');
      });
    }));

    it('should change the value on selection change', async(() => {
      fixture.detectChanges();
      select.value = select.options[2].value;
      select.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let text = select.options[select.selectedIndex].label;
        expect(text).toBe('label3');
      });
    }));

    it('should execute the component method on change', fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'onOptionChange');
      select.value = select.options[2].value;
      select.dispatchEvent(new Event('change'));
      tick();
      expect(component.onOptionChange).toHaveBeenCalled();
    }));
  });
  describe('buttons', () => {
    it('should click set button', async(() => {
      fixture.detectChanges();
      let buttonElement = fixture.debugElement.query(By.css('.set-button'));
      let p = fixture.debugElement.nativeElement.querySelector('.person-name');
      buttonElement.triggerEventHandler('click', null);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.personName).toBe('Jane Doe');
        expect(p.textContent).toBe('Jane Doe');
      });
    }));

    // DOUBT: Why are no options displayed in dropdown after adding this test case?
    it('should click send button - fakeAsync', fakeAsync(() => {
      let sendButton = fixture.debugElement.query(By.css('.send-button'));
      spyOn(component, 'sendData');
      sendButton.triggerEventHandler('click', null);
      tick();
      expect(component.sendData).toHaveBeenCalled();
    }));

    it('should click send button - async', async(() => {
      let sendButton = fixture.debugElement.query(By.css('.send-button'));
      spyOn(component, 'sendData');
      sendButton.triggerEventHandler('click', null);
      fixture.whenStable().then(() => {
        expect(component.sendData).toHaveBeenCalled();
      });
    }));

    it('should click Edit button', fakeAsync(() => {
      let editButton = fixture.debugElement.query(By.css('.edit-button'));
      spyOn(component, 'editPerson');
      editButton.triggerEventHandler('click', null);
      tick();
      expect(component.editPerson).toHaveBeenCalled();
    }));

    // this test case is purely to increase the code coverage. Not testing anything useful here.
    xit('should click send button and Edit button- wrote this to increase code coverage...', async(() => {
      // component.sendData();
      // component.editPerson(1);
      fixture.detectChanges();
      let sendButton = fixture.debugElement.query(By.css('.send-button'));
      let editButton = fixture.debugElement.query(By.css('.edit-button'));
      sendButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      editButton.triggerEventHandler('click', null);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.sendData).toHaveBeenCalled();
        expect(component.editPerson).toHaveBeenCalled();
      });
    }));
  });
  describe('input fields', () => {
    it('should bind input text value to Component property', () => {
      const hostElement = fixture.nativeElement;
      const nameInput: HTMLInputElement = hostElement.querySelector('#nameId');
      const ageInput: HTMLInputElement = hostElement.querySelector('#ageId');
      fixture.detectChanges();
      nameInput.value = 'Jane Doe';
      ageInput.value = '20';
      nameInput.dispatchEvent(new Event('input'));
      ageInput.dispatchEvent(new Event('input'));
      expect(component.name.value).toBe('Jane Doe');
      expect(component.age.value).toBe('20');
    });

    it('should perform display binding in HTML template', async(() => {
      const hostElement = fixture.nativeElement;
      const nameInput: HTMLInputElement = hostElement.querySelector('#nameId');
      const ageInput: HTMLInputElement = hostElement.querySelector('#ageId');
      const displayName: HTMLInputElement =
        hostElement.querySelector('#disName');
      const displayAge: HTMLInputElement = hostElement.querySelector('#disAge');
      fixture.detectChanges();
      fixture.whenStable().then((val) => {
        nameInput.value = 'Jane Doe';
        ageInput.value = '20';
        nameInput.dispatchEvent(new Event('input'));
        ageInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(displayName.textContent).toBe('Jane Doe');
        expect(displayAge.textContent).toBe('20');
      });
    }));
  });
});
