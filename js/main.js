BigNumber.set({
    ROUNDING_MODE: 3
});

var app = new Vue({
    el: '#app',

    data: {
        lastTick: Date.now(),
        score: new BigNumber(0),
        xp: new BigNumber(0),
        tickMult: new BigNumber(10),
        increaser: new BigNumber(1),
        increaserMult: new BigNumber(1),
        increaserBaseMult: new BigNumber(1),
        producer: new BigNumber(0),
        producerMult: new BigNumber(1),
        producerBaseMult: new BigNumber(1),
        producerCost: new BigNumber(10),
        upgrader: new BigNumber(0),
        upgraderMult: new BigNumber(1),
        upgraderBaseMult: new BigNumber(1),
        upgraderCost: new BigNumber(5),
        upgrades: [
            new BigNumber(10)
        ]
    },

    methods: {
        toExp: function (n) {
            if (n.gte(1000000)) {
                return n.toPrecision(3).replace('+', '');
            }
            else {
                return n.toFixed(1);
            }
        },

        tick: function () {
            tick(this);
        },

        buyProducer: function () {
            if (this.score.gte(this.producerCost)) {
                this.score = this.score.minus(this.producerCost);
                this.producer = this.producer.plus(1);
                this.producerCost = this.producerCost.times(5);
            }
        },

        buyUpgrader: function () {
            if (this.producer.gte(this.upgraderCost)) {
                this.producer = this.producer.minus(this.upgraderCost);
                this.upgrader = this.upgrader.plus(1);
            }
        },

        buyUpgrade: function (n) {
            if (n == 0) {
                if (this.xp.gte(this.upgrades[0])) {
                    this.xp = this.xp.minus(this.upgrades[0]);
                    this.upgrades[0] = this.upgrades[0].times(10);
                    this.producerBaseMult = this.producerBaseMult.times(2);
                }
            }
        }
    },

    mounted: function () {
        var loop = setInterval(this.tick, 33);
    }
});
