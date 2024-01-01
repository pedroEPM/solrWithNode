const { removeAccents } = require('./setFlatText');

const setCustomParams = (body) => {
    
    let customQuery = '';
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

    if (wordsToFind.length > 0) {
        let newString = '';
        wordsToFind.forEach(word => {
            if (word.isIgnored) {
                newString = newString + ` -\"${word.word}\"`;
            } else {
                newString = newString + ` \"${word.word}\"`;
            }
        });

        const allSearchs = `content: ${newString} OR title: ${newString} OR subTitle: ${newString} OR originalAuthor: ${newString} OR modifierAuthor: ${newString}`;
        customQuery = allSearchs;
    }

    if (body.date && body.dateRange && !body.key) {
        let firstDate = new Date(body.dateRange).setHours(0, 0, 0);
        let secondDate = new Date(body.date).setHours(23, 59, 59);
        firstDate = new Date(firstDate).toISOString();
        secondDate = new Date(secondDate).toISOString();
        const customDate = `date: [${firstDate} TO ${secondDate}]`;
        if(customQuery === ''){
            customQuery = customDate;
        } else {
            customQuery = customQuery + ` AND ${customDate}`;

        }
    }

    if (body.publicationRef && !body.key) {
        const findByPublication = `publicationRef: ${body.publicationRef}`;
        if(customQuery === ''){
            customQuery = findByPublication;
        } else {
            customQuery = customQuery + ` AND ${findByPublication}`;
        }
    }

    if (body.noteBookRef && !body.key) {
        const findByNotebook = `noteBookRef: ${body.noteBookRef}`;
        if(customQuery === ''){
            customQuery = findByNotebook;
        } else {
            customQuery = customQuery + ` AND ${findByNotebook}`;
        }
    }

    // &rows=20&start=

    return {
        customQuery
    };
}


module.exports = {
    setCustomParams
}