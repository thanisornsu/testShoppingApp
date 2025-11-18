// fixtures/testData.js

export const TestData = {
    users: {
        standard: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        locked: {
            username: 'locked_out_user',
            password: 'secret_sauce'
        },
        problem: {
            username: 'problem_user',
            password: 'secret_sauce'
        }
    },
    
    products: {
        backpack: 'sauce-labs-backpack',
        bikeLight: 'sauce-labs-bike-light',
        boltTShirt: 'sauce-labs-bolt-t-shirt',
        fleeceJacket: 'sauce-labs-fleece-jacket'
    },
    
    checkoutInfo: {
        valid: {
            firstName: 'John',
            lastName: 'Doe',
            postalCode: '12345'
        },
        thailand: {
            firstName: 'Somchai',
            lastName: 'Jaidee',
            postalCode: '10110'
        }
    }
};