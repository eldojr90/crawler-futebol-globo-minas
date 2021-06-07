const numberToDateString = number => {
    if (number < 10) number = `0${number}`;
    return number;
}

const daysOfWeek = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
];

const getTodayIni = () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0);

const getTodayEnd = () => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59);

const getDateToString = date => {
    const day = numberToDateString(date.getDate());
    const month = numberToDateString(date.getMonth());
    const fyear = date.getFullYear();

    return `${day}/${month}/${fyear}`
};

const getDateToTimeString =
    date => `${numberToDateString(date.getHours())}:${numberToDateString(date.getMinutes())}`;

module.exports = {
    daysOfWeek,
    numberToDateString,
    getTodayIni,
    getTodayEnd,
    getDateToString,
    getDateToTimeString
}