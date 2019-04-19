const { TIME: { SECOND, MINUTE, DAY, DAYS, MONTHS, TIMESTAMP: { TOKENS } } } = require('./Constants');

class Timestamp {
    constructor(pattern) {
        this.pattern = pattern;

        this._template = Timestamp._patch(pattern);
    }

    static _display(template, time) {
        let output = '';
        const parsedTime = Timestamp._resolveDate(time);
        for (const { content, type } of template) output += content || Timestamp[type](parsedTime);
        return output;
    }

    static utc(time = new Date()) {
        time = Timestamp._resolveDate(time);
        return new Date(time.valueOf() + Timestamp.timezoneOffset);
    }

    static displayArbitrary(pattern, time = new Date()) {
        return Timestamp._display(Timestamp._patch(pattern), time);
    }

    toString() {
        return this.display();
    }

    edit(pattern) {
        this.pattern = pattern;
        this._template = Timestamp._patch(pattern);
        return this;
    }

    displayUTC(time) {
        return Timestamp._display(this._template, Timestamp.utc(time));
    }

    display(time = new Date()) {
        return Timestamp._display(this._template, time);
    }

    static _patch(pattern) {
        const template = [];
        for (let i = 0; i < pattern.length; i++) {
            let current = '';
            const currentChar = pattern[i];
            if (currentChar in TOKENS) {
                current += currentChar;
                while (pattern[i + 1] === currentChar && current.length < TOKENS[currentChar]) current += pattern[++i];
                template.push({ type: current, content: null });
            } else if (currentChar === '[') {
                while (i + 1 < pattern.length && pattern[i + 1] !== ']') current += pattern[++i];
                i++;
                template.push({ type: 'literal', content: current });
            } else {
                current += currentChar;
                while (i + 1 < pattern.length && !(pattern[i + 1] in TOKENS) && pattern[i + 1] !== '[') current += pattern[++i];
                template.push({ type: 'literal', content: current });
            }
        }

        return template;
    }

    static _resolveDate(time) {
        return time instanceof Date ? time : new Date(time);
    }
}

Timestamp.timezoneOffset = new Date().getTimezoneOffset() * 60000;

// Dates

Timestamp.Y =
    Timestamp.YY = time => String(time.getFullYear()).slice(0, 2);

Timestamp.YYY =
    Timestamp.YYYY = time => String(time.getFullYear());

Timestamp.Q = time => String((time.getMonth() + 1) / 3);

Timestamp.M = time => String(time.getMonth() + 1);

Timestamp.MM = time => String(time.getMonth() + 1).padStart(2, '0');

Timestamp.MMM =
    Timestamp.MMMM = time => MONTHS[time.getMonth()];

Timestamp.D = time => String(time.getDate());

Timestamp.DD = time => String(time.getDate()).padStart(2, '0');

Timestamp.DDD =
    Timestamp.DDDD = time => {
        const start = new Date(time.getFullYear(), 0, 0);
        const diff = ((time.getMilliseconds() - start.getMilliseconds()) + (start.getTimezoneOffset() - time.getTimezoneOffset())) * MINUTE;
        return String(Math.floor(diff / DAY));
    };

Timestamp.d = time => {
    const day = String(time.getDate());
    if (day !== '11' && day.endsWith('1')) return `${day}st`;
    if (day !== '12' && day.endsWith('2')) return `${day}nd`;
    if (day !== '13' && day.endsWith('3')) return `${day}rd`;
    return `${day}th`;
};

Timestamp.dd = time => DAYS[time.getDay()].slice(0, 2);

Timestamp.ddd = time => DAYS[time.getDay()].slice(0, 3);

Timestamp.dddd = time => DAYS[time.getDay()];

Timestamp.X = time => String(time.valueOf() / SECOND);

Timestamp.x = time => String(time.valueOf());

// Times

Timestamp.H = time => String(time.getHours());

Timestamp.HH = time => String(time.getHours()).padStart(2, '0');

Timestamp.h = time => String(time.getHours() % 12);

Timestamp.hh = time => String(time.getHours() % 12).padStart(2, '0');

Timestamp.a = time => time.getHours() < 12 ? 'am' : 'pm';

Timestamp.A = time => time.getHours() < 12 ? 'AM' : 'PM';

Timestamp.m = time => String(time.getMinutes());

Timestamp.mm = time => String(time.getMinutes()).padStart(2, '0');

Timestamp.s = time => String(time.getSeconds());

Timestamp.ss = time => String(time.getSeconds()).padStart(2, '0');

Timestamp.S = time => String(time.getMilliseconds());

Timestamp.SS = time => String(time.getMilliseconds()).padStart(2, '0');

Timestamp.SSS = time => String(time.getMilliseconds()).padStart(3, '0');

// Locales

/* eslint max-len:0 new-cap:0 */

Timestamp.T = (time) => `${Timestamp.h(time)}:${Timestamp.mm(time)} ${Timestamp.A(time)}`;

Timestamp.t = (time) => `${Timestamp.h(time)}:${Timestamp.mm(time)}:${Timestamp.ss(time)} ${Timestamp.A(time)}`;

Timestamp.L = (time) => `${Timestamp.MM(time)}/${Timestamp.DD(time)}/${Timestamp.YYYY(time)}`;

Timestamp.l = (time) => `${Timestamp.M(time)}/${Timestamp.DD(time)}/${Timestamp.YYYY(time)}`;

Timestamp.LL = (time) => `${Timestamp.MMMM(time)} ${Timestamp.DD(time)}, ${Timestamp.YYYY(time)}`;

Timestamp.ll = (time) => `${Timestamp.MMMM(time).slice(0, 3)} ${Timestamp.DD(time)}, ${Timestamp.YYYY(time)}`;

Timestamp.LLL = (time) => `${Timestamp.LL(time)} ${Timestamp.T(time)}`;

Timestamp.lll = (time) => `${Timestamp.ll(time)} ${Timestamp.T(time)}`;

Timestamp.LLLL = (time) => `${Timestamp.dddd(time)}, ${Timestamp.LLL(time)}`;

Timestamp.llll = (time) => `${Timestamp.ddd(time)} ${Timestamp.lll(time)}`;

Timestamp.Z =
    Timestamp.ZZ = time => {
        const offset = time.getTimezoneOffset();
        return `${offset >= 0 ? '+' : '-'}${String(offset / -60).padStart(2, '0')}:${String(offset % 60).padStart(2, '0')}`;
    };


module.exports = Timestamp;