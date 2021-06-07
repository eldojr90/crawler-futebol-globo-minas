const requestPromise = require('request-promise');
const cheerio = require('cheerio');

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

const allSchedulesWeek = () => requestPromise({
    uri: 'https://redeglobo.globo.com/globominas/programacao/',
    transform: body => cheerio.load(body),
}).then($ => {
        let schedules = [];

        $('.schedule-item-inner').each((i, item) => {
            const unixTimestamp = $(item).find('.schedule-times').attr('data-start-time');

            const eventDate = new Date(unixTimestamp * 1000);
            const description = $(item).find('.schedule-item-content-soccer').text().trim();
            const dateString = getDateToString(eventDate);
            const timeString = getDateToTimeString(eventDate);
            const dayOfWeek = daysOfWeek[eventDate.getDay()];

            if (description !== '' && (eventDate > getTodayIni())) {
                schedules.push({
                    eventDate,
                    description,
                    dateString,
                    timeString,
                    dayOfWeek,
                });
            }
        });
        
        return schedules;
}).catch(err => console.log(err));

const schedulesToday = () => allSchedulesWeek().then(schedules =>
    schedules.filter(schedule => schedule.date >= getTodayIni() && schedule.date <= getTodayEnd()));

module.exports = {
    allSchedulesWeek,
    schedulesToday,
}

