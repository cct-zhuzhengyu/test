export class CalendarDate {
  today: boolean = false;
  disabled: boolean = false;

  constructor(public value: number, disabled?: boolean) {
    if (disabled !== undefined) {
      this.disabled = disabled;
    }
  }
}
