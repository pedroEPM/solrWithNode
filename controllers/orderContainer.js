const allNotes = require('../models/allNotes');
const oldNotes = require('../models/oldNotes2');

const allImages = require('../models/Imagesc');
const oldImages = require('../models/Imagesc2');

const { setNote, setImage } = require('../utils/getBodys');
const { setCustomParams } = require('../utils/setParams');
const { addNewItem, removeItemById, customGet } = require('../utils/solr_connection');
class OrderContainer {

    async sendInformationToSolr(req, res) {
        try {
            console.log(`-- Sending information to solr --`);
            // for(let i = 2005; i <= 2005; i++) {
                // for(let i = 1925; i <= 2024; i++) {
            
            // for(let i = 2024; i >= 2016; i--) {
            for(let i = 1930; i >= 1930; i--) {
                console.log(`- ${i} -`);

                const nextYear = i + 1;
                const body = {
                    publicationDate: {
                    // date: {
                        $gte: new Date(`${i}-01-01`),
                        $lt: new Date(`${nextYear}-01-01`),
                    }, 
                }

                const notes = [];
                // const getNotes = await allNotes.find(body);
                // const getOldNotes = await oldNotes.find(body);
                const getNotes = await allImages.find(body);                
                const getOldNotes = await oldImages.find(body).limit(2);

                for(const littleNote of getNotes) {
                    // console.log(setNote(littleNote))
                    // notes.push(setNote(littleNote));
                    // notes.push(setImage(littleNote));
                }

                for(const littleNote of getOldNotes) {
                    // console.log(setNote(littleNote))
                    // notes.push(setNote(littleNote));
                    notes.push(setImage(littleNote));
                }

                for(const isNewNote of notes) {
 

                    // NOTES
                    // isNewNote.date = isNewNote.date.setHours(0, 0, 0);
                    // isNewNote.LastModifyDate = isNewNote.LastModifyDate.setHours(0, 0, 0);
                    
                    // isNewNote.date = new Date(isNewNote.date).toISOString();
                    // isNewNote.LastModifyDate = new Date(isNewNote.LastModifyDate).toISOString();


                    // IMAGES
                    isNewNote.publicationDate.setHours(0, 0, 0);
                    // isNewNote.LastModifyDate = isNewNote.LastModifyDate.setHours(0, 0, 0);
                    
                    isNewNote.publicationDate = new Date(isNewNote.publicationDate).toISOString();
                    // isNewNote.LastModifyDate = new Date(isNewNote.LastModifyDate).toISOString();

                    // await addNewItem(isNewNote, {search: 'Notas'});
                    await addNewItem(isNewNote, {search: 'Imagenes'});
                    // await removeItemById(isNewNote.customId, {search: 'Imagenes'});
                    

                }
            }

            // await removeItemById(1398021, {search: 'Imagenes'});
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
 
            const newData = await customGet(newParams, req.body);

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