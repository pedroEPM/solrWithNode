const setNote = (littleNewData) => {
    return {
        _id: littleNewData._id,
        anuary: littleNewData.anuary ?? false,
        content: littleNewData.content ?? '',
        // customId: segundoID,
        date: littleNewData.date ?? '',
        editionRef: littleNewData.editionRef ?? null,
        idMegamedia: littleNewData.idMegamedia ?? null,
        idOriginal: littleNewData.idOriginal ?? null,
        isPublished: littleNewData.isPublished ?? false,
        isSelleable: littleNewData.isSelleable ?? false,
        isYearbook: littleNewData.isYearbook ?? false,
        LastModifyDate: littleNewData.LastModifyDate ?? new Date().toISOString(),
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
        isNewId: littleNewData.isNewId
    }
}


module.exports = {
    setNote
}