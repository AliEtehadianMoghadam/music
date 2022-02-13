import { doc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  updateProfile,
} from '@/includes/firebase';

export default {
  // namespaced:true,
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  getters: {
    authModalShow: (state) => state.authModalShow,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
      console.log(state.authModalShow);
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    async register({ commit }, payload) {
      createUserWithEmailAndPassword(auth, payload.email, payload.password);

      await setDoc(doc(db, 'users'), {
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });
      updateProfile(auth.currentUser, {
        displayName: payload.name,
      });

      commit('toggleAuth');
    },
    async login({ commit }, payload) {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;
      if (user) {
        commit('toggleAuth');
      }
    },
    async signout({ commit }, payload) {
      await signOut(auth);
      commit('toggleAuth');
      if (payload.route.meta.requiredAuth) {
        payload.$router.push({ name: 'home' });
      }
    },
  },
};
