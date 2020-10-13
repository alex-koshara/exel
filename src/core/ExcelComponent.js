import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];

    this.prepare();
  }
  // Возвращает шаблон Компонента
  toHTML() {
    return '';
  }

  // Уведомляем слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на события event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Настраиваем наш компонент до init
  prepare() {}

  // Инициализация компонента
  // Добавляем DOM слушатели
  init() {
    this.initDOMListeners();
  }

  // Удаляем DOM комопнент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
