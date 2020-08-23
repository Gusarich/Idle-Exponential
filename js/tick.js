function tick (that) {
    let date = Date.now();

    if (that.score.gte(10)) {
        that.increaserMult = new BigNumber(Math.log10(that.score));
    }
    else {
        that.increaserMult = new BigNumber(1);
    }

    if (that.increaser.gte(10)) {
        that.producerMult = new BigNumber(Math.log10(that.increaser));
    }
    else {
        that.producerMult = new BigNumber(1);
    }

    if (!that.upgrader.isZero() && that.producer.gte(2)) {
        that.upgraderMult = new BigNumber(Math.log2(that.producer));
    }
    else {
        that.upgraderMult = new BigNumber(1);
    }

    that.score = that.score.plus(that.increaser.times(that.increaserMult).times(that.increaserBaseMult).div(1000).times(date - that.lastTick).times(that.tickMult));
    that.increaser = that.increaser.plus(that.producer.times(that.producerMult).times(that.producerBaseMult).div(10000).times(date - that.lastTick).times(that.tickMult));
    that.xp = that.xp.plus(that.upgrader.times(that.upgraderMult).times(that.upgraderBaseMult).div(10000).times(date - that.lastTick).times(that.tickMult));

    for (let i = 0; i < that.bonuses.length; i += 1) {
        let bonus = that.bonuses[i];
        if (!bonus[0]) {
            if (that.score.gte(bonus[1])) {
                that.bonuses[i][0] = true;
                if (i == 0) {
                    that.increaserBaseMult = that.increaserBaseMult.times(10);
                }
                else if (i == 1) {
                    that.producerBaseMult = that.producerBaseMult.times(5);
                }
                else {
                    that.upgraderBaseMult = that.upgraderBaseMult.times(2);
                }
            }
        }
    }

    that.lastTick = date;
}
