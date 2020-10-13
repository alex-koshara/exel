export class Emitter {
  constructor() {
    this.listeners = [];
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });

    return true;
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] = this.listeners[event]
          .filter(listener => listener !== fn);
    };
  }
}

// Example
// const emitter = new Emitter();

// const unsub = emitter.subscribe('vlad', data => console.log('Sub:', data));

// emitter.emit('vlad', 42);

// unsub();

// emitter.emit('vlad', 42);
