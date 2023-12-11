import { defineStore } from 'pinia';
import axios from '../api.js';
import { useAuthStore as authStore } from '../stores/auth.js';

export const useTimeStore = defineStore('time', {
    state: () => ({ 
        timeInSeconds: 600, // 10 Minuten in Sekunden (10 * 60)
        initialTime: 600, // Speichert den Ausgangswert der Zeit
        timer: null,
        isRunning: false,
        lastEarnedCoinTime: null, // Speichert den Zeitpunkt des letzten Coin-Erwerbs
        earnInterval: 61, // Zeitintervall, in dem ein Coin verdient werden kann (in Sekunden)
    }),
    getters: {
        time: (state) => {
            const hours = Math.floor(state.timeInSeconds / 3600);
            const minutes = Math.floor((state.timeInSeconds % 3600) / 60);
            const seconds = state.timeInSeconds % 60;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
    },
    actions: {
        startTimer() {
            if (!this.isRunning) {
                this.isRunning = true;
                this.initialTime = this.timeInSeconds;
                this.timer = setInterval(() => {
                    this.timeInSeconds--;
                    this.checkEarnCoin();
                }, 1000); // Aktualisiert die Zeit alle 1000ms (1 Sekunde)
            }
        },
        stopTimer() {
            if (this.isRunning) {
                this.isRunning = false;
                this.timeInSeconds = this.initialTime;
                clearInterval(this.timer); // Stoppt den Timer
            }
        },
        up() {
            if (this.timeInSeconds < 10800) {
                this.timeInSeconds += 300;
            }
        },
        down() {
            if (this.timeInSeconds > 600) {
                this.timeInSeconds -= 300;
            }
        },
        async checkEarnCoin() {
            const currentTime = Math.floor(Date.now() / 1000); // Aktuelle Zeit in Sekunden
            // Überprüfe, ob das Zeitintervall für den Coin-Erwerb abgelaufen ist
            if (!this.lastEarnedCoinTime ||
                currentTime - this.lastEarnedCoinTime >= this.earnInterval
            ) {
                this.lastEarnedCoinTime = currentTime;
                await this.earnCoin(); // Verdienen eines Coins
            }
        },
        async earnCoin() {
            const token = localStorage.getItem('authToken');
            if (!token) {
                return;
            }
            try {
                await axios.post(`/me/earn`, {}, {
                headers: { Authorization: `Bearer ${token}` }
                });
                await authStore().getUser();
            } catch (error) {
                // Wenn der Vorgang abgelehnt wird, dann soll es so sein.
            }
        }
    },
})