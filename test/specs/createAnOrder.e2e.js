const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    });



    
    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeExisting();
    });





    it('should fill the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        await expect($(`div=${phoneNumber}`)).toBeExisting();
    });





    it('should add a card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        const cardNumber = helper.getCardNumber();
        const cardCode   = helper.getCardCode();

        await page.addPaymentMethodCard(cardNumber, cardCode)

        await expect (await $(`${page.paymentMethodAddedCard}` )).toBeExisting();    
    });





    it('should write the driver a message', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const message= "Waiting outside";
        await page.fillMessageDriver(message);

        await expect($(page.messageDriverField)).toHaveValue(message);
    });





    it('should order a Blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        await page.selectSupportive();

        await page.addBlanketAndHandkerchiefs();

        await expect($(page.blanketSwitchStatus)).toBeChecked();
    });





    it('should order 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        await page.selectSupportive();

        const iceCreamQty = 2;
        await page.addIceCream(iceCreamQty);

        await expect ($(`div=${iceCreamQty}`)).toBeExisting();
    });




    it.only('should open the car search modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        await page.selectSupportive();

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        const cardNumber = helper.getCardNumber();
        const cardCode   = helper.getCardCode();

        await page.addPaymentMethodCard(cardNumber, cardCode)

        const message= "Waiting outside";
        await page.fillMessageDriver(message);


        await page.clickOrderTaxi();

        const carSearchModal = await $(page.carSearchModal); 

        await expect(carSearchModal).toBeDisplayed(); 
    });
})


