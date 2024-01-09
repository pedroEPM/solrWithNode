const { removeAccents } = require('./setFlatText');
const { bodyFortype } = require('./getBodys');

const setCustomParams = (body) => {

    const cBodyForType = bodyFortype(body.search);
    const startQuery = 'q=';
    let customQuery = startQuery;
    const wordsToFind = [];
    // /*imageBody.hide = imageBodyA.hide =*/ noteBody.hide = { $ne: true };

    if (body.ignoredwords && !body.key) {
        body.ignoredwords.trim().split(' ').sort(function (a, b) {
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }).forEach(word => {
            if (word.trim() !== '') wordsToFind.push({ isIgnored: true, word: removeAccents(word).toLowerCase().trim() })
        });
    }

    if (body.keywords && !body.key) {
        body.keywords.trim().split(' ').sort(function (a, b) {
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }).forEach(word => {
            if (word.trim() !== '') wordsToFind.push({ isIgnored: false, word: removeAccents(word).toLowerCase().trim() })
        });
    }

    if (body.keysentence && !body.key) {
        wordsToFind.push({ isIgnored: false, word: removeAccents(body.keysentence).replace(/\s+/g, ' ').toLowerCase().trim() });
    }

    const whereSearch = cBodyForType.whereSearch;

    if (wordsToFind.length > 0) {
        let newString = '';
        for(const littleWhereSearch of whereSearch) {
            newString = newString + '(';
            wordsToFind.forEach((word, index) => {
                if (!word.isIgnored && index === 0) newString = newString + `${littleWhereSearch}: \"${word.word}\"`;
                if (!word.isIgnored && index !== 0) newString = newString + ` AND ${littleWhereSearch}: \"${word.word}\"`;
                if (word.isIgnored && index === 0) newString = newString + `-${littleWhereSearch}: \"${word.word}\"`;
                if (word.isIgnored && index !== 0) newString = newString + ` AND -${littleWhereSearch}: \"${word.word}\"`;
            });
            newString = newString + ')';
        }

        newString = newString.replaceAll(')(', ') OR (');
        
        newString = newString.trim();
        if(body.search === 'PDFs') {

            customQuery = startQuery + 'NOT idMongoPDF:null AND' + '(' + newString + ')';
        } else {
            customQuery = startQuery + '(' + newString + ')';
        }
    }

    if (body.date && body.dateRange && !body.key) {
        let firstDate = new Date(body.dateRange).setHours(0, 0, 0);
        let secondDate = new Date(body.date).setHours(23, 59, 59);
        firstDate = new Date(firstDate).toISOString();
        secondDate = new Date(secondDate).toISOString();
        const customDate = `${cBodyForType.date}:[${firstDate} TO ${secondDate}]`;
        if(customQuery === startQuery){
            customQuery = startQuery + customDate;
        } else {
            customQuery = customQuery + ` AND ${customDate}`;

        }
    }

    if (body.publicationRef && !body.key) {
        const findByPublication = `${cBodyForType.publication}:${body.publicationRef}`;
        if(customQuery === startQuery){
            customQuery = startQuery + findByPublication;
        } else {
            customQuery = customQuery + ` AND ${findByPublication}`;
        }
    }

    if (body.noteBookRef && !body.key) {
        const findByNotebook = `${cBodyForType.notebook}:${body.noteBookRef}`;
        if(customQuery === startQuery){
            customQuery = startQuery + findByNotebook;
        } else {
            customQuery = customQuery + ` AND ${findByNotebook}`;
        }
    }

    if(customQuery === startQuery) customQuery = startQuery + '*:*';



    // const returnOnlyPDF = '&fl=idMongoPDF'
    const returnOnlyPDF = '&fl=date publicationRef notebookRef page'
    const rowsAndStart = `&rows=${body.cLimit}&start=${body.cSkip}&sort=${body.cSort === -1 ? 'customId asc' : 'customIdReverse asc'}`;
    if(customQuery === startQuery) {
        customQuery = startQuery + rowsAndStart;
    } else {
        customQuery = customQuery + rowsAndStart;
    }

    // if(body.search === 'PDFs') customQuery = customQuery + returnOnlyPDF;

    if(body.firstTimeSearch === 'false') console.log(customQuery);

    customQuery = customQuery
                        .replaceAll(' ', '%20')
                        .replaceAll(':', '%3A');

    return customQuery;
}


module.exports = {
    setCustomParams
}