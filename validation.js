(function () {
    'use strict';

    class Validation {
        constructor(criteria) {
            this.states = new Map();
            for (let obj of criteria) {
                this[obj.name] = obj;
                this.states.set(this[obj.name].name, true);
            }
        }

        toggleValidator(name, state) {
            if (state !== undefined) {
                this.states.set(name, state);
            } else {
                this.states.set(name, !this.states.get(name));
            }
        }

        validate(value) {
            return [...this.states.entries()].reduce((result, criterion) => {
                if (criterion[1]) {
                    if ( !this[criterion[0]].check(value) ) {
                        result.valid = false;
                        result.errors.set(criterion[0], this[criterion[0]].message(value));
                    }
                }
                return result;
            }, {
                valid: true,
                errors: new Map()
            });
        }
    }

    let criteria = [
        {
            name: 'isNumber',
            check: value => {
                return !isNaN(value);
            },
            message: value => {
                return `${value} is not a Number`;
            }
        },
        {
            name: 'isPositive',
            check: value => {
                return value >= 0;
            },
            message: value => {
                return `${value} is not Positive`;
            }
        },
        {
            name: 'isInteger',
            check: value => {
                return Number.isInteger(value);
            },
            message: value => {
                return `${value} is not Integer`;
            }
        }
    ];

    let validation = new Validation(criteria),
        validation2 = new Validation(criteria);

    validation.toggleValidator('isInteger');
    console.log(validation.validate(5.4));
    console.log(validation2.validate(-5.4));

})();