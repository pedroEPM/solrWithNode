const solr = require('solr-client');
const { setDataBase } = require('./getBodys');

class SolrConnection {

    async addNewItem(body) {
        try {

            console.log(setDataBase(body.search))
            const client = solr.createClient(setDataBase(body.search));
            // console.log(`--- Adding new data ---`);
            const obj = await client.add(body);
            // console.log(`--- Data added ---`)

        } catch (error) {
            console.log(error)
            console.log('error addNewItem function')
        }
    }

    async removeItemById(id, body) {
        try {
            const client = solr.createClient(setDataBase(body.search));

            console.log(`--- Deleting new data ---`);
            const field = 'id';
            // id = '*';
            const obj = await client.delete(field, id.toString());
            console.log(`--- Data deleted ---`)

        } catch (error) {
            console.log(error)
            console.log('error Remove item function')
        }
    }

    async customGet(body, oldBody) {
        try {
            const client = solr.createClient(setDataBase(oldBody.search));

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