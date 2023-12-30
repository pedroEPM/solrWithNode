 
const { sendInformationToSolr, getAllItems } = require('../../controllers/orderContainer.js') 
module.exports = (app) => {
    app.get('/v1/orderContainer', sendInformationToSolr),
    app.get('/v1/getItemsOrderContainer', getAllItems)
    
}