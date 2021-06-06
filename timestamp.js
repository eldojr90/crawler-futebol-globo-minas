const ini = new Date(2000,01,01,15,30,0);
const end = new Date(2000,01,01,16,30,0);

function parseTimeToStiring(time) {
    return time.getHours() + ':'+time.getMinutes();
}

const iniTimeString = parseTimeToStiring(ini);
const endTimeString = parseTimeToStiring(end);

console.log('ini:', iniTimeString);
console.log('end:', endTimeString);