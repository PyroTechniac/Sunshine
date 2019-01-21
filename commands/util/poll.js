const { Command } = require('../../structures/Structures');
const emojiCharacters = require('../../assets/json/emoji-characters');
module.exports = class PollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            group: 'util',
            memberName: 'poll',
            guildOnly: true,
            description: 'Creates a poll with reactions',
            argsPromptLimit: 0,
            clientPermissions: ['EMBED_LINKS', 'ADD_REACTIONS'],
            args: [
                {
                    key: 'question',
                    prompt: 'What would you like to poll about?',
                    type: 'string',
                },
                {
                    key: 'answer1',
                    prompt: 'Enter the first answer',
                    type: 'string',
                    default: '',
                },
                {
                    key: 'answer2',
                    prompt: 'Enter the second answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer3',
                    prompt: 'Enter the third answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer4',
                    prompt: 'Enter the fourth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer5',
                    prompt: 'Enter the fifth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer6',
                    prompt: 'Enter the sixth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer7',
                    prompt: 'Enter the seventh answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer8',
                    prompt: 'Enter the eighth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer9',
                    prompt: 'Enter the ninth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer10',
                    prompt: 'Enter the tenth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer11',
                    prompt: 'Enter the eleventh answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer12',
                    prompt: 'Enter the twelvth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer13',
                    prompt: 'Enter the thirteenth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer14',
                    prompt: 'Enter the fourteenth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer15',
                    prompt: 'Enter the fifteenth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer16',
                    prompt: 'Enter the sixteenth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer17',
                    prompt: 'Enter the seventeenth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer18',
                    prompt: 'Enter the eighteenth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer19',
                    prompt: 'Enter the ninteenth answer',
                    type: 'string',
                    default: '',
                }, {
                    key: 'answer20',
                    prompt: 'Enter the twentith answer',
                    type: 'string',
                    default: '',
                },
            ],
        });
    }
    run(message, { question, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10, answer11, answer12, answer13, answer14, answer15, answer16, answer17, answer18, answer19, answer20 }) {
        const answerArray = [answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10, answer11, answer12, answer13, answer14, answer15, answer16, answer17, answer18, answer19, answer20];
        console.log(answerArray);
    }
};