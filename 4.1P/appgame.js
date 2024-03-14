Vue.createApp({
    data() {
        return {
            'number': null,
            'guess': null,
            'hint': ''
        }
    },
    methods: {
        getRandomInt: function(lower, upper) {
            return Math.floor(Math.random() * upper) + lower
        },
        init: function() {
            this.number = this.getRandomInt(1, 100);
            this.hint = 'Start Guessing';
        },
        checkGuess: function() {
            if (!guess) return;
            if (this.guess > this.number)
                this.hint = 'Guess lower';
            else if (this.guess < this.number)
                this.hint = 'Guess higher';
            else
                this.hint = 'You got it!';
        },
        reveal: function() {
            this.guess = this.number;
        }
    },
    created: function () {
        this.init();
    }
}).mount('#app');