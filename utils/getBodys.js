const setNote = (littleNewData) => {
    return {
        id: Number(littleNewData.customId),
        _id: littleNewData._id,
        anuary: littleNewData.anuary ?? false,
        content: littleNewData.content ?? '',
        // customId: segundoID,
        date: new Date(littleNewData.date) ?? '',
        editionRef: littleNewData.editionRef ?? null,
        idMegamedia: `cIDM-${littleNewData.idMegamedia}` ?? null,
        idOriginal: littleNewData.idOriginal ?? null,
        isPublished: littleNewData.isPublished ?? false,
        isSelleable: littleNewData.isSelleable ?? false,
        isYearbook: littleNewData.isYearbook ?? false,
        LastModifyDate: new Date(littleNewData.LastModifyDate) ?? new Date().toISOString(),
        modifierAuthor: littleNewData.modifierAuthor ?? '',
        noteBookRef: littleNewData.noteBookRef ?? null,
        originalAuthor: littleNewData.originalAuthor ?? '',
        page: littleNewData.page ?? '',
        publicationRef: littleNewData.publicationRef ?? null,
        published: littleNewData.published ?? false,
        salable: littleNewData.salable ?? false,
        section: littleNewData.section ?? null,
        sectionRef: littleNewData.sectionRef ?? null,
        status: littleNewData.status ?? false,
        subTitle: littleNewData.subTitle ?? '',
        title: littleNewData.title ?? '',
        isEditedByGalileo: littleNewData.isEditedByGalileo ?? false,
        isNewId: littleNewData.isNewId,
        customId: Number(littleNewData.customId) ?? 1,
        customIdReverse: Number(littleNewData.customIdReverse) ?? 1,
    }
}

const setDataBase = (type) => {
    const selectDataBase = (cType) => {
        switch(cType) {
            case 'Notas':
            return process.env.SOLR_CORE;
        case 'Imagenes':
            return process.env.SOLR_COREF;
        case 'PDFs':
            return process.env.SOLR_COREP;
        }
    }

    return {
        host: process.env.SOLR_HOST,
        port: process.env.SOLR_PORT,
        core: selectDataBase(type)
        // path: 'http'
    };
}
// Notas Imagenes PDFs

const bodyFortype = (type) => {
    switch(type) {
        case 'Notas':
            return {
                date: 'date',
                publication: 'publicationRef',
                notebook: 'noteBookRef',
                whereSearch: [
                    'content',
                    'title',
                    'subTitle',
                    'originalAuthor',
                    'modifierAuthor',
                ]
            };
        case 'Imagenes':
            return {
                date: 'publicationDate',
                publication: 'publicationRef',
                notebook: 'noteBookRef',
                whereSearch: [
                    'description',
                    'place',
                    'material',
                    'observations',
                ],
            };
        case 'PDFs':
            return {
                date: 'datePublication',
                publication: 'publication',
                notebook: 'noteBook'
            };
    }
}

module.exports = {
    setNote,
    bodyFortype,
    setDataBase
}