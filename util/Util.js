const crypto = require('crypto');

const { SUCCESS_EMOJI_ID } = process.env;
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];
class Util {
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static shuffle(array) {
    const arr = array.slice(0);
    for (let i = arr.length - 1; i >= 0; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  static memberRolesMinusEveryone(member, guild) {
    return member.roles.reduce((acc, role) => ((role.id !== guild.defaultRole.id) ? `${acc} | ${role}` : acc));
  }

  static list(arr, conj = 'and') {
    const len = arr.length;
    return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
  }

  static randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static formatNumber(number) {
    return Number.parseFloat(number).toLocaleString(undefined, { maximumFractionDigits: 2 });
  }
}
module.exports = Util;
