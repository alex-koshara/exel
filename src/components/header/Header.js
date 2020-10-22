import {ExcelComponent} from '@core/ExcelComponent';
import { $ } from '@core/dom';
import { changeTitle } from '../../redux/actions';
import { defaultTitle } from '../../constants';
import { debounce } from '../../core/utils';

export class Header extends ExcelComponent {
  static className = 'header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <div class="excel__header header">
        <input type="text" class="header__input input" value="${title}">
        <div class="header__btns">

          <div class="button">
            <i class="material-icons">delete</i>
          </div>
          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
        </div>
      </div>
    `;
  }

  onInput(evt) {
    console.log('on Input');
    const $target = $(evt.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
