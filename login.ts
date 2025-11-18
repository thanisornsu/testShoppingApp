console.log("This is the login module");

function Login(name: string) {
  return console.log(`Executing login function ${name}`);
}

const LanddingPage = (land: string) => {
    return console.log(`Executing landing page function ${land}`);
}


const tradingPage = (trade: string) => {
    return console.log(`Executing trading page function ${trade}`);
}

Login("Safe");
LanddingPage('HomePage');
tradingPage('TradeNow');


let user = "TestUser";
console.log(`Current user is: ${user}`);
export { Login };

let password = "TestPassword";
