const solr = require('solr-client');

const client = solr.createClient({
    host: process.env.SOLR_HOST,
    port: process.env.SOLR_PORT,
    core: process.env.SOLR_CORE
    // path: 'http'
});


class SolrConnection {

    async addNewItem(body) {
        try {
            console.log(`--- Adding new data ---`);
            const obj = await client.add(body);
            console.log(`--- Data added ---`)
    
        } catch (error) {
            console.log(error)
            console.log('error addNewItem function')        
        }
    }

    async removeItemById(id) {
        try {
            console.log(`--- Deleting new data ---`);            
            const field = 'id';
            id = '12';
            const obj = await client.delete(field, id);
            console.log(`--- Data deleted ---`)

        } catch (error) {
            console.log(error)
            console.log('error addNewItem function')        
        }
    }

}

module.exports = new SolrConnection();