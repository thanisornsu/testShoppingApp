import {test, expect} from '@playwright/test';


const BASE_URL = 'https://jsonplaceholder.typicode.com/';

test('Get API successfully', async ({request})=> {
    console.log('Start Get API')
    const response = await request.get(`${BASE_URL}/posts/`);
    // console.log(`response: ${response}`)
    const responseStatus = await response.status();
    // const responseHeader = JSON.stringify( response.headers(), null, 2);
    const responseHeader = await response.headers();

    const responseJson =  await response.json();

    // const responseJson =  JSON.stringify(await response.json(), null, 2);

    // console.log(`response status: ${responseStatus}`)

    // console.log(`response body: ${responseJson}`)
     console.log('Total items:', responseJson.length);
    console.log('First item:', responseJson[0].userID);
    // console.log('First item:', responseJson[0]);
    // console.log('First item userId:', responseJson[0].userId);
// console.log('First item id:', responseJson[0].id);
// console.log('First item title:', responseJson[0].title);
// console.log('First item body:', responseJson[0].body)
    // expect(responseStatus).toBe(200);
    // expect(responseJson.length).toBeGreaterThan(0);
    // expect(responseHeader['content-type']).toContain('application/json; charset=utf-8');



    //test Loop For
    // let index = 1;

    // แค่ต้องการ index เพื่อแสดงหมายเลข
    // for (const [index, post] of responseJson.entries()) {
    //     console.log(`${index + 1}. ${post.title}`);
    // }

       for (const post of responseJson.slice(0, 5)) {
        console.log(`Title: ${post.title}`);
        console.log(`Body: ${post.body.substring(0, 50)}...`);
    }
    
    // for (const post of responseJson) {
    //             // console.log(`Post: ${post[index].id} `);
    //             //  console.log(`${index}. ${post.id}`)

    //     console.log(`Post  ${index}: ${post.userId}`)
    //     index++
    // }
    //  for (const post of responseJson) {
    //     console.log(`${index}. ${post.id}`)
    //         // if (post.userId === 1) {
    //             // console.log(`${index}. [ID: ${post.id}] ${post.title.substring(0, 50)}...`);
    //             index++;
    //         // }
    //         // if (index > 5) break; // แค่ 5 รายการ;
    //     };
    
    // for (let index=0;index < responseJson.length;index++){
    //     console.log(`${index+1} Post ID: ${responseJson[index].id}`  )
    // }

});