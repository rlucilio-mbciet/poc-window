export class CreateStore {
  constructor({ state, getters, mutations, actions }) {
    this._getters = getters;
    this.getters = new Proxy(getters, {
      get: (target, name) => {
        if (name in this._getters) {
          return this._getters[name](state);
        }

        return target[name];
      },
    });

    this._mutations = mutations;
    this.mutations = new Proxy(mutations, {
      get: (target, name) => {
        if (name in this._mutations) {
          const that = this;
          return function (...args) {
            return target[name].apply(that, args);
          };
        }

        return target[name];
      },
    });

    this._actions = actions;
    this.actions = new Proxy(actions, {
      get: (target, name) => {
        if (name in this._actions) {
          const that = this;
          return function (...args) {
            return target[name].apply(that, args);
          };
        }

        return target[name];
      },
    });

    this.state = new Proxy(state, {
      set: (target, name, value) => {
        this.notify();

        target[name] = value;
        return true;
      },
    });

    this.notify();
  }

  subscribe(cb) {
    this.cb = cb;
    this.notify();
  }

  notify() {
    if (this.cb) {
      const store = {
        state: this.state,
        getters: this.getters,
        mutations: this.mutations,
        actions: this.actions,
      };
      Object.freeze(store);

      this.cb(store)
    } 
  }
}
