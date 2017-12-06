
var mails = [
    {
        id: 100,
        sender: 'John Doe',
        title: 'How are you today?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: false,
        time: Date.now(),
    },
    {
        id: 108,
        sender: 'Beyonce',
        title: 'How are you today?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: false,
        time: 1512574847800,
    },
    {
        id: 105,
        sender: 'Kim Kardashian',
        title: 'How are you today?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: true,
        time: Date.now(),
    },
    {
        id: 101,
        sender: 'Johnny  Balaloe',
        title: 'How is Are to  are you today?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: false,
        time: Date.now(),
    },
    {
        id: 102,
        sender: 'Ricky Martin',
        title: 'Vivin la vida loca??',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: false,
        time: Date.now(),
    },
    {
        id: 104,
        sender: 'Britney Spears',
        title: 'Hit me baby one more time!!',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: false,
        time: Date.now(),
    }
]

function getMails() {
    return new Promise((resolve, reject) => {
        if (true) {
            setTimeout(() => {
                resolve(mails)
            }, 1000)
        } else {
            reject('error!');
        }
    })
}

function getMailById(mailId) {
    return new Promise((resolve, reject) => {
        var mailIdx = getMailIdx(mailId)
        resolve(mails[mailIdx]);
    });
};

function saveMail(mail) {
    return new Promise((resolve, reject) => {
        mai.id = _getNextId()
        mails.push(mail);
        resolve(mail)
    });
};

function markRead(mailId) {
    var mailIdx = getMailIdx(mailId)
    mails[mailIdx].isRead = !mails[mailIdx].isRead;
}

function deleteMail(mailId) {
    var mailIdx = getMailIdx(mailId)
    mails.splice(mailIdx, 1);
    resolve(mails);
}

function getMailIdx(mailId) {
    return mails.findIndex(mail => mail.id === mailId)
}

function _getNextId() {
    var maxId = mails.reduce((acc, note) => {
        return (note.id > acc) ? note.id : acc
    }, 0);
    return maxId + 1;
};


export default {
    getMailById
}