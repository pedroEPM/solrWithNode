 
const { sendInformationToSolr, getAllItems, setIDFromPDFToNote } = require('../../controllers/orderContainer.js')
module.exports = (app) => {
    app.get('/v1/orderContainer', sendInformationToSolr),
    app.post('/v1/getItemsOrderContainer', getAllItems),
    app.post('/v1/setPDFIdToNote', setIDFromPDFToNote)
    
}