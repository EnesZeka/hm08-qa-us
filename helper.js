module.exports = {
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000);
        return `${countryCode}${number}`;
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    },
    getCardNumber: function() {
        const cardPrefix = "4111"; // A fictitious Visa card prefix
        const randomSuffix = String(Math.floor(Math.random() * 1_000_000_000)).padStart(12, '0'); // Ensures the suffix is 12 digits
        return `${cardPrefix}${randomSuffix}`;
    },
    getCardCode: function() {
        return Math.floor(Math.random() * 900) + 100; // Generates a random number between 100 and 999
    }
};
