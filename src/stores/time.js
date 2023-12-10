import { defineStore } from 'pinia';

export const useTimeStore = defineStore('time', {
    state: () => ({ 
        timeInSeconds: 600, // 10 Minuten in Sekunden (10 * 60)
        initialTime: 600, // Speichert den Ausgangswert der Zeit
        timer: null,
        isRunning: false,
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
    },
})