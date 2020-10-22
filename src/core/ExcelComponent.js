import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
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

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Только изменения по подписанным полям
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
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
