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
            // console.log(`--- Adding new data ---`);
            const obj = await client.add(body);
            // console.log(`--- Data added ---`)

        } catch (error) {
            console.log(error)
            console.log('error addNewItem function')
        }
    }

    async removeItemById(id) {
        try {
            console.log(`--- Deleting new data ---`);
            const field = 'id';
            id = '*';
            const obj = await client.delete(field, id);
            console.log(`--- Data deleted ---`)

        } catch (error) {
            console.log(error)
            console.log('error Remove item function')
        }
    }

    async customGet(body) {
        try {
            const query = `fq=date%3A%20%5B%221943-01-01T00%3A00%3A00Z%22%20TO%20%221943-12-31T00%3A00%3A00Z%22%5D&indent=true&q.op=AND&q=content%3A%20*Alemania*&rows=20&start=10&useParams=`;
            // const query = 'fq=date%3A%20%5B%221943-01-01T00%3A00%3A00Z%22%20TO%20%221943-12-31T00%3A00%3A00Z%22%5D&indent=true&q.op=AND&q=content%3A%20*Alemania*&rows=20&start=10&useParams=';
            return await client.search(body);
            // return await client.doQuery()
            //     .q({content : 'piñata'})
            //     .start(0)
            //     .rows(10);

        } catch (error) {
            console.log(error)
            console.log('error get items function')
        }

    }

}

module.exports = new SolrConnection();