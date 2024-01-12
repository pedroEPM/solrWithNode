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

const setImage = (littleNewData) => {
    return {
        id: Number(littleNewData.customId),
        _id: littleNewData._id,
        idMegamedia: `cIDM-${littleNewData.idMegamedia}` ?? null,
        idOriginal: littleNewData.idOriginal ?? '',
        sectionRef: littleNewData.sectionRef ?? null,
        section: littleNewData.section ?? null,
        editionRef: littleNewData.editionRef ?? null,
        idNoticia: littleNewData.idNoticia ?? null,
        photographer: littleNewData.photographer ?? null,
        idAgency: littleNewData.idAgency ?? null,
        clasificationRef: littleNewData.clasificationRef ?? null,
        publicationRef: littleNewData.publicationRef ?? null,
        noteBookRef: littleNewData.noteBookRef ?? null,
        description: littleNewData.description ?? ' ',
        place: littleNewData.place ?? ' ',
        LastModifyDate: new Date(littleNewData.LastModifyDate) ?? new Date().toISOString(),
        material: littleNewData.material ?? ' ',
        publicationDate: littleNewData.publicationDate ?? new Date().toISOString(),
        dateStringInfo: littleNewData.dateStringInfo ?? new Date(),
        date: littleNewData.date ?? new Date().toISOString(),
        origenDate: littleNewData.origenDate ?? new Date().toISOString(),
        isPublished: littleNewData.isPublished ?? false,
        isYearBook: littleNewData.isYearBook ?? false,
        isSelleable: littleNewData.isSelleable ?? false,
        observations: littleNewData.observations ?? ' ',
        page: littleNewData.page ?? '0',
        status: littleNewData.status ?? false,
        externalFotographer: littleNewData.externalFotographer ?? '',
        imageSrc: littleNewData.imageSrc ?? '',
        folder: littleNewData.folder ?? '',
        ImageTitle: littleNewData.ImageTitle ?? '',
        isEditedByGalileo: littleNewData.isEditedByGalileo ?? false,
        isNewId: littleNewData.isNewId,
        customId: littleNewData.customId,
        customIdReverse: littleNewData.customIdReverse,
        odPdfName: littleNewData.odPdfName,

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
                return process.env.SOLR_CORE;
                // return process.env.SOLR_COREP;
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
    }
}

module.exports = {
    setNote,
    bodyFortype,
    setDataBase,
    setImage
}