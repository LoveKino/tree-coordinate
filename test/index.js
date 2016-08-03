'use strict';

let assert = require('assert');

let {
    direction
} = require('../');

describe('index', () => {
    it('one', () => {
        let {
            width, height
        } = direction(0, {
            markCoord: (node, {
                x, y
            }) => {
                assert.equal(x, 5);
                assert.equal(y, 0);
            },

            getChildren: () => {},

            widthGap: 10,
            heightUnit: 5
        });

        assert.equal(width, 10);
        assert.equal(height, 0);
    });

    it('simple', () => {
        let {
            width, height
        } = direction(0, {
            markCoord: (node, {
                x, y
            }) => {
                if (node === 0) {
                    assert.equal(x, 10);
                    assert.equal(y, 0);
                } else if (node === 1) {
                    assert.equal(x, 5);
                    assert.equal(y, 5);
                } else if (node === 2) {
                    assert.equal(x, 15);
                    assert.equal(y, 5);
                }
            },

            getChildren: (node) => {
                if (node === 0) {
                    return [1, 2];
                }
            },

            widthGap: 10,
            heightUnit: 5
        });

        assert.equal(width, 20);
        assert.equal(height, 5);
    });

    it('base', () => {
        let {
            width, height
        } = direction(0, {
            markCoord: (node, {
                x, y
            }) => {
                if (node === 5) {
                    assert.equal(x, 25);
                    assert.equal(y, 15);
                }
            },
            getChildren: (node) => {
                if (node === 0) {
                    return [1, 2];
                } else if (node === 2) {
                    return [3, 4];
                } else if (node === 4) {
                    return [5];
                }
            },

            widthGap: 10,
            heightUnit: 5
        });

        assert.equal(width, 30);
        assert.equal(height, 15);
    });
});
