BigNumber.set({
    ROUNDING_MODE: 3
});

var app = new Vue({
    el: '#app',

    data: {
        lastTick: Date.now(),
        score: new BigNumber(0),
        xp: new BigNumber(0),
        tickMult: new BigNumber(1),
        increaser: new BigNumber(1),
        increaserMult: new BigNumber(1),
        increaserBaseMult: new BigNumber(1),
        producer: new BigNumber(0),
        producerMult: new BigNumber(1),
        producerBaseMult: new BigNumber(1),
        producerCost: new BigNumber(10),
        producerCostMult: new BigNumber(5),
        upgrader: new BigNumber(0),
        upgraderMult: new BigNumber(1),
        upgraderBaseMult: new BigNumber(1),
        upgraderCost: new BigNumber(5),
        upgrades: [
            [false, '10'],    // inc x3
            [false, '30'],    // prod x2
            [false, '100'],   // prod cost mult 5 -> 3
            [false, '500']    // inc x5
        ],
        bonuses: [
            [false, '1e6'],    // inc x10
            [false, '1e10'],   // prod x5
            [false, '1e21'],   // upg x2
            [false, '1e33'],   // inc x20
            [false, '1e50'],   // prod x10
            [false, '1e80'],   // upg x4
            [false, '1e100'],  // inc x60
            [false, '1e200'],  // prod x30
            [false, '1e300']   // upg x12
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
                this.producerCost = this.producerCost.times(this.producerCostMult);
            }
        },

        buyUpgrader: function () {
            if (this.producer.gte(this.upgraderCost)) {
                this.producer = this.producer.minus(this.upgraderCost);
                this.producerCost = this.producerCost.div(2);
                this.upgrader = this.upgrader.plus(1);
            }
        },

        buyUpgrade: function (n) {
            if (n == 0) {
                if (!this.upgrades[n][0] && this.xp.gte(this.upgrades[n][1])) {
                    this.xp = this.xp.minus(this.upgrades[n][1]);
                    this.increaserBaseMult = this.increaserBaseMult.times(3);
                    this.upgrades[n][0] = true;
                }
            }
            else if (n == 1) {
                if (!this.upgrades[n][0] && this.xp.gte(this.upgrades[n][1])) {
                    this.xp = this.xp.minus(this.upgrades[n][1]);
                    this.producerBaseMult = this.producerBaseMult.times(2);
                    this.upgrades[n][0] = true;
                }
            }
            else if (n == 2) {
                if (!this.upgrades[n][0] && this.xp.gte(this.upgrades[n][1])) {
                    this.xp = this.xp.minus(this.upgrades[n][1]);
                    this.producerCostMult = new BigNumber(3);
                    this.upgrades[n][0] = true;
                }
            }
            else if (n == 3) {
                if (!this.upgrades[n][0] && this.xp.gte(this.upgrades[n][1])) {
                    this.xp = this.xp.minus(this.upgrades[n][1]);
                    this.increaserBaseMult = this.increaserBaseMult.times(5);
                    this.upgrades[n][0] = true;
                }
            }
        }
    },

    mounted: function () {
        var loop = setInterval(this.tick, 33);
    }
});
