import {ExcelComponent} from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div
        id="formula"
        class="input"
        contenteditable="true"
        spellcheck="false">
    </div>
    `;
  }

  onInput(event) {
    const text = $(event.target).text();
    this.$emit('formula:input', text);
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value);
    });
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onKeydown(evt) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(evt.key)) {
      evt.preventDefault();
      this.$emit('formula:done');
    }
  }
}
