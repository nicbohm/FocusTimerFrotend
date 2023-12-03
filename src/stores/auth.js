import { defineStore } from 'pinia';
import axios from '../api.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({ 
        authUser: null, 
        isLoading: false,
        authError: false,
    }),
    getters: {
        user: (state) => state.authUser
    },
    actions: {
        async getUser() {
            // Ohne Token brauchen wir nicht los ziehen
            if (localStorage.getItem('authToken') == undefined) {
                return;
            }
            // Benutzerdaten herunterladen
            this.isLoading = true;
            try {
                const data = await axios.get(`/me/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                this.authUser = data.data;
            } catch (error) {
                // Der Token kann auch ablaufen, dann ist hier Schluss
                localStorage.removeItem('authToken');
            } finally {
                this.isLoading = false;
            }
        },
        async loginUser(data) {
            // Login durchführen
            this.isLoading = true;
            try {
              const response = await axios.post('/auth/login', {
                email: data.email,
                password: data.password,
              });
              localStorage.setItem('authToken', response.data);
              this.authError = false;
              // Wir wollen direkt alle Infos abspeichern
              this.getUser(); 
              this.router.push("/");
            } catch (error) {
                this.authError = true;
            } finally {
                this.isLoading = false;
            }
          },
          async registerUser(data) {
            // Registrierung durchführen
            this.isLoading = true;
            try {
                await axios.post("/auth/register", {
                    userName: data.username,
                    email: data.email,
                    password: data.password,
                });
                this.authError = false;
                // Wir wollen uns direkt anmelden und Infos laden
                this.loginUser(data);
                this.getUser();
              } catch (error) {
                  this.authError = true;
              } finally {
                  this.isLoading = false;
              }

          },
    },
})