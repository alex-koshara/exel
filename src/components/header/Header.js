import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'header';

  toHTML() {
    return `
    <div class="excel__header header">
    <input type="text" class="header__input input" value="Новая таблица">
    <div class="header__btns">

      <div class="button">
        <i class="material-icons">delete</i>
      </div>
      <div class="button">
        <i class="material-icons">exit_to_app</i>
      </div>
    </div>
    `;
  }
}
