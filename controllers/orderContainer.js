const allNotes = require('../models/allNotes');
const oldNotes = require('../models/oldNotes2');

const { setNote } = require('../utils/getBodys');
const { setCustomParams } = require('../utils/setParams');
const { addNewItem, removeItemById, customGet } = require('../utils/solr_connection');
class OrderContainer {

    async sendInformationToSolr(req, res) {
        try {
            console.log(`-- Sending information to solr --`);
            // for(let i = 1925; i <= 2024; i++) {
            for(let i = 2024; i >= 1925; i--) {
                console.log(`- ${i} -`);

                const nextYear = i + 1;
                const body = {
                    date: {
                        $gte: new Date(`${i}-01-01`),
                        $lt: new Date(`${nextYear}-01-01`),
                    }
                }

                const notes = [];
                const getNotes = await allNotes.find(body);
                const getOldNotes = await oldNotes.find(body);

                for(const littleNote of getNotes) notes.push(setNote(littleNote));
                for(const littleNote of getOldNotes) notes.push(setNote(littleNote));

                for(const isNewNote of notes) {
                    isNewNote.date = isNewNote.date.setHours(0, 0, 0);
                    isNewNote.LastModifyDate = isNewNote.LastModifyDate.setHours(0, 0, 0);
                    
                    isNewNote.date = new Date(isNewNote.date).toISOString();
                    isNewNote.LastModifyDate = new Date(isNewNote.LastModifyDate).toISOString();

                    await addNewItem(isNewNote);
                }
            }

            // await removeItemById();
            res.status(200).json({
                ok: true,
                msg: 'Added all items'
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

    async getAllItems(req, res) {
        try {
            console.log('Starting get items');

            // console.log(req.body)

            const newParams = setCustomParams(req.body);
 
            const newData = await customGet(newParams);

            if(req.body.firstTimeSearch === 'false') {
                newData?.response?.docs?.map(littleData => {
                    const littleObjs = Object.keys(littleData);
                    for(const n of littleObjs) {
                        littleData[n] = littleData[n][0];
                    }
                })
                
                res.status(200).json({
                    ok: true,
                    data: newData?.response?.docs
                });
            }else {
                res.status(200).json({
                    ok: true,
                    data: newData?.response?.numFound
                });
            }
        } catch (error) {
            console.log(`--- Error from getAllItems OrderContainer ---`);
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