const allNotes = require('../models/allNotes');
const oldNotes = require('../models/oldNotes2');

const { setNote } = require('../utils/getBodys');
const { addNewItem, removeItemById } = require('../utils/solr_connection');
class OrderContainer {

    async sendInformationToSolr(req, res) {
        try {
            console.log(`-- Sending information to solr --`);
            // for(let i = 2024; i >= 1925; i--) {
            for(let i = 2015; i >= 2015; i--) {
                console.log(`- ${i} -`);

                const nextYear = i + 1;
                const body = {
                    date: {
                        $gte: new Date(`${i}-01-01`),
                        $lt: new Date(`${nextYear}-01-01`),
                    }
                }

                const notes = [];
                const getNotes = await allNotes.find(body).limit(2);
                const getOldNotes = await allNotes.find(body).limit(2);

                for(const littleNote of getNotes) notes.push(setNote(littleNote));
                for(const littleNote of getOldNotes) notes.push(setNote(littleNote));

            }

            await removeItemById();
            res.status(200).json({
                ok: true,
                msg: 'hola'
            });
        } catch (error) {
            console.log(`--- Error from sendInformationToSolr ---`);
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: error
            });
        }
    }

}
// 

module.exports = new OrderContainer();