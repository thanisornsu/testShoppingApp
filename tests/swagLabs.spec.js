import {test, expect} from '@playwright/test';

test('login page has correct title', async ({page})=> {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();


    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
//     // add to array
//     const countItem = await page.locator('.inventory_item_name');
//     await expect(countItem).toHaveCount(6);

//     // //////////////// Check all item names
//     // const itemList = await page.locator('.inventory_item_name').allTextContents();
//     // let i = 0;
//     // itemList.forEach(item => {
//     //     console.log('Item:', i+1, item);
//     //     i++;
//     // })
//     // let j = 0;
//     // for (let item of itemList){
//     //     console.log(j+1, 'Iterating item:', item)
//     //     j++;
//     // }

//     ////////////////////// add to dictionary or object

//     const itemLocators = page.locator('.inventory_item');
//     const itemCount = await itemLocators.count();
//     const itemLocatorsArray = await itemLocators.all();

//     const itemList = [];
//     // console.log('Item Count:', itemCount);
//     // console.log('Item Locators:', itemLocatorsArray);
//     // console.log('Item Locators Array Length:', itemLocatorsArray.length);
//     ////////////  Can use for of  but need to use itemLocators.all();
//     // for (let item of itemLocatorsArray) {
//     //     console.log('Item locator:', item);

//     //     const itemName = await item.locator('.inventory_item_name').innerText();
//     //     const itemDescription = await item.locator('.inventory_item_desc').innerText();
//     //     const itemPrice = await item.locator('.inventory_item_price').innerText();
//     //     itemList.push({
//     //         name: itemName,
//     //         description: itemDescription,
//     //         price: itemPrice
//     //     });
//     //     k++;
//     // };
//     /// recommended way using for loop
//     for (let i = 0; i < itemCount; i++) {
//         const item = itemLocators.nth(i);
//         const itemName = await item.locator('.inventory_item_name').innerText();
//         const itemDescription = await item.locator('.inventory_item_desc').innerText();
//         const itemPrice = await item.locator('.inventory_item_price').innerText();


//         itemList.push({
//             name: itemName,
//             description: itemDescription,
//             price: itemPrice
//         });
//     }

//     // console.log('Item List:', JSON.stringify(itemList, null, 2));
//     // console.log('Total items:', itemList.length);

//     await expect(itemList[0].name).toEqual('Sauce Labs Backpack'); // example assertion);
//     await expect(itemList[5].name).toEqual('Test.allTheThings() T-Shirt (Red)'); // example assertion);

        
    
});

test('Collect the usernames from the login page', async ({page})=> {
    await page.goto('https://www.saucedemo.com/');
    const credentialsText = await page.locator('.login_credentials').innerText();
    // console.log('Credentials Text:', credentialsText);
    const credentialsLines = credentialsText.split('\n').map(line => line.trim()).filter(line => line !== '' && line !== 'Accepted usernames are:');
    // console.log('Credentials Lines:', credentialsLines);

    const inputStandardUser = await page.locator('[id="user-name"]');
    await inputStandardUser.fill(credentialsLines[0]);
    const inputPassword = await page.locator('[id="password"]');
    await inputPassword.fill("secret_sauce");

    // console.log(lockUser)
    const getPlaceholder = await page.locator('[id="user-name"]').getAttribute('placeholder')
    console.log('Get Placeholder: ', getPlaceholder)

});

test('Add one item successfully', async({page}) =>{
    console.log('Start Add item')
    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    ///Add to cart
    const getNameItemOne = await page.locator('#item_4_title_link').innerText();
    // const getPriceItemOne = await page.locator('xpath=//div[@class="pricebar"]//div[@class="inventory_item_price"]').first().innerText();
    const getPriceItemOne = await page.locator('xpath=//div[@class="pricebar"]//div[@class="inventory_item_price"]').nth(0).innerText();


    console.log(getNameItemOne, getPriceItemOne)
    await expect(getNameItemOne).toBe('Sauce Labs Backpack')&&(getPriceItemOne).toEqual('$29.99');
    await expect(getPriceItemOne).toEqual('$29.99');
    await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toHaveText('Add to cart');

    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    // await expect(page.locator("#add-to-cart-sauce-labs-backpack")).toHaveText('Add to cart');
    // await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toHaveText('Add to cart');
    // const getTextAddToCart = await page.locator('#add-to-cart-sauce-labs-backpack').innerText();
    // await expect(getTextAddToCart).toBe('Add to cart');

    //After click "Add to Cart" button change to Remove
    await expect(page.locator("#remove-sauce-labs-backpack")).toHaveText('Remove');

    // await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(1);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');


    await page.locator('[data-test="shopping-cart-badge"]').click();

    // await expect(page).toHaveURL('/cart/');
    
    await expect(page).toHaveURL(/cart/);


    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    // await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');

    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1');
    await page.locator('[name="checkout"]').click();

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
    //Input the information
    await page.locator('#first-name').fill('Safe');
    await page.locator('#last-name').fill('peace');
    await page.locator('#postal-code').fill('10000');
    await page.locator('#continue').click();

    await expect(page).toHaveURL(/checkout-step-two/);
    await page.locator('#finish').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    await page.locator('#back-to-products').click();
    console.log("Checkout: Completed")
});


test('Login error', async({page}) =>{
    console.log('Start Login error')
    await page.goto("https://www.saucedemo.com/");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce_error');
    await page.locator('#login-button').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').innerText();
    console.log('errormessage: ',errorMessage)
    await expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
    await page.locator('[data-test="error-button"]').click();
    expect(page.locator('[data-test="error"]')).toBeHidden();
    expect(page.locator('[data-test="error"]')).not.toBeVisible();

});