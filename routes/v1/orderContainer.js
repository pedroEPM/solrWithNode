 
const { sendInformationToSolr } = require('../../controllers/orderContainer.js') 
module.exports = (app) => {
    app.get('/v1/orderContainer', sendInformationToSolr)
    
}