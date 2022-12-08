const momment = require('moment');


// const isDate = ( value, rest ) => { <<-- "rest" contiene toda la info relacionada con el request.
const isDate = ( value ) => {
    if ( !value ) {
        return false;
    }

    const fecha = momment( value );

    if ( fecha.isValid() ) {
        return true;        
    } else {
        return false;
    }
}



module.exports = { isDate };