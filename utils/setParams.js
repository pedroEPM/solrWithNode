const { removeAccents } = require('./setFlatText');

const setCustomParams = (body) => {
    
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


    let notIncluded = '';
    if (wordsToFind.length > 0) {
        let newString = '';
        wordsToFind.forEach(word => {
            if (!word.isIgnored) newString = newString + ` \"${word.word}\"`;
        });

        wordsToFind.forEach(word => {
             if (word.isIgnored) newString = newString + ` AND NOT \"${word.word}\"`;
        });
        
        newString = newString.trim();
        const allSearchs = `(content:*${newString}* OR title:*${newString}* OR subTitle:*${newString}* OR originalAuthor:*${newString}* OR modifierAuthor:*${newString}*)`;
        customQuery = startQuery + allSearchs;
    }

    if (body.date && body.dateRange && !body.key) {
        let firstDate = new Date(body.dateRange).setHours(0, 0, 0);
        let secondDate = new Date(body.date).setHours(23, 59, 59);
        firstDate = new Date(firstDate).toISOString();
        secondDate = new Date(secondDate).toISOString();
        const customDate = `date:[${firstDate} TO ${secondDate}]`;
        if(customQuery === startQuery){
            customQuery = startQuery + customDate;
        } else {
            customQuery = customQuery + ` AND ${customDate}`;

        }
    }

    if (body.publicationRef && !body.key) {
        const findByPublication = `publicationRef:${body.publicationRef}`;
        if(customQuery === startQuery){
            customQuery = startQuery + findByPublication;
        } else {
            customQuery = customQuery + ` AND ${findByPublication}`;
        }
    }

    if (body.noteBookRef && !body.key) {
        const findByNotebook = `noteBookRef:${body.noteBookRef}`;
        if(customQuery === startQuery){
            customQuery = startQuery + findByNotebook;
        } else {
            customQuery = customQuery + ` AND ${findByNotebook}`;
        }
    }

    if(customQuery === startQuery) customQuery = startQuery + '*:*';


    console.log(body.cSort)
    console.log(typeof body.cSort)
    const rowsAndStart = `&rows=${body.cLimit}&start=${body.cSkip}&sort=${body.cSort === '1' ? 'customId asc' : 'customIdReverse asc'}`;
    if(customQuery === startQuery) {
        customQuery = startQuery + rowsAndStart;
    } else {
        customQuery = customQuery + rowsAndStart;
    }

    console.log(customQuery);

    customQuery = customQuery
                        .replaceAll(' ', '%20')
                        .replaceAll(':', '%3A');

    return customQuery;
}


module.exports = {
    setCustomParams
}