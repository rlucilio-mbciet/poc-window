import { CreateStore } from './create-store';

window.store = {
  users: new CreateStore({
    state: {
      name: 'init',
    },
    getters: {
      upperName: (state) => state.name.toUpperCase(),
    },
    mutations: {
      setName(value) {
        if (this) {
          this.state.name = value;
        }
      },
    },
    actions: {
      fetchName() {
        const mockFetch = () => 'Fetch name';

        this.mutations.setName(mockFetch());
      },
    },
  }),
};
