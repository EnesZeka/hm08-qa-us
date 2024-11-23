module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    phoneCodeField: '//input[@id="code" and @placeholder="xxxx"]',
    cardNumberField: '//input[@id="number" and @name="number"]',
    cardCodeField: '//input[@name="code"]',
    messageDriverField: '#comment',


    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    supportivePlanButton: '//div[@class="tcard-title" and text()="Supportive"]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div.pp-plus-container',
    linkCardButton: '//button[@type="submit" and @class="button full" and text()="Link"]',
    paymentMethodModalCloseButton: '.payment-picker .section.active .close-button',
    blanketSwitchToggle: '.switch',
    blanketSwitchStatus: '.switch-input',
    iceCreamPlusButton: 'div.counter-plus',
    cardIcon: '//div[@class="pp-value"]/div[@class="pp-value-text" and text()="Card"]',
    paymentMethodAddedCard: 'div=Card',
    orderTaxiButton: '.smart-button',



    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: '.payment-picker .modal',
    carSearchModal: '.order-subbody',

    //Displays
    iceCreamDisplay: 'div.counter-value',
    


    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    selectSupportive: async function() {
        const supportivePlanButton = await $(this.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeExisting();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const phoneCodeField = await $(this.phoneCodeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await phoneCodeField.setValue(code)
        await $(this.confirmButton).click()
    },
    addPaymentMethodCard: async function(cardNumber, cardCode) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed({ timeout: 15000 });
        await addCardButton.click();

        const cardNumberField = await $(this.cardNumberField); 
        await cardNumberField.setValue(cardNumber);

        const cardCodeField = await $(this.cardCodeField);
        await cardCodeField.setValue(cardCode);

        //click the background for the cvv to lose focus so link button is active
        const paymentMethodModal = await $(this.paymentMethodModal);
        await paymentMethodModal.click();

        const linkCardButton = await $(this.linkCardButton);
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();

        const paymentMethodModalCloseButton = await $(this.paymentMethodModalCloseButton);
        await paymentMethodModalCloseButton.waitForClickable({ timeout: 5000 });
        await paymentMethodModalCloseButton.click();

    },
    fillMessageDriver: async function(message) {
        const messageDriverField = await $(this.messageDriverField);
        await messageDriverField.waitForDisplayed();
        await messageDriverField.setValue(message);

        
    },

    addBlanketAndHandkerchiefs: async function () {
        const blanketSwitchToggle = await $(this.blanketSwitchToggle);
        await blanketSwitchToggle.waitForDisplayed();
        await blanketSwitchToggle.click();  
    },
    addIceCream: async function (iceCreamQty) {
        const iceCreamPlusButton = await $(this.iceCreamPlusButton);
        await iceCreamPlusButton.waitForDisplayed();
        for (i = 0; i < iceCreamQty; i++) {
            await iceCreamPlusButton.click();
        }        
    },
    clickOrderTaxi: async function () {
        const orderTaxiButton = await $(this.orderTaxiButton);
        await orderTaxiButton.waitForDisplayed();
        await orderTaxiButton.click();  
    }


};