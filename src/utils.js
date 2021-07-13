const getDateNumberToString = number => {
    if (number < 10) number = `0${number}`;
    return number;
}

const getDayOfWeek = 
    indexDay => {
     switch(indexDay){
        case 0: 
            return 'Domingo';
        case 1:
            return 'Segunda-Feira;';
        case 2:
            return 'Terça-Feira';
        case 3:
            return 'Quarta-Feira';
        case 4:
            return 'Quinta-Feira';
        case 5:
            return 'Sexta-Feira';
        case 6:
            return 'Sábado';
        default:
            return 'Inválido'
    }
};

const getTodayIni = 
    () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0);

const getTodayEnd = 
    () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59);

const getDateToString = date => {
    const day = getDateNumberToString(date.getDate());
    const month = getDateNumberToString(date.getMonth());
    const fyear = date.getFullYear();

    return `${day}/${month}/${fyear}`
};

const getDateToTimeString =
    date => `${getDateNumberToString(date.getHours())}:${getDateNumberToString(date.getMinutes())}`;

const isLastScheduleOfLastDay = date => date.getHours() < 5;

module.exports = {
    getDayOfWeek,
    getDateNumberToString,
    getTodayIni,
    getTodayEnd,
    getDateToString,
    getDateToTimeString,
    isLastScheduleOfLastDay,
}