var mails = [
    {
        id: 100,
        sender: 'Gal Gadot',
        senderPic: 'assets/senders-pics/gal_gadot.png',
        title: 'How are you today?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: true,
        time: Date.now(),
    },
    {
        id: 108,
        sender: 'Beyonce ',
        senderPic: 'assets/senders-pics/gal_gadot.png',
        title: 'How are you today? *OLDEST*',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: false,
        time: 1512581088594
    },
    {
        id: 105,
        sender: 'Kim Kardashian',
        senderPic: 'assets/senders-pics/gal_gadot.png',
        title: 'How are you today?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: true,
        time: Date.now(),
    },
    {
        id: 101,
        sender: 'Johnny  Balaloe',
        senderPic: 'assets/senders-pics/gal_gadot.png',
        title: 'How is Are to  are you today?',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: false,
        time: Date.now(),
    },
    {
        id: 102,
        sender: 'Ricky Martin',
        senderPic: 'assets/senders-pics/gal_gadot.png',
        title: 'Vivin la vida loca??',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis iste, nisi officia quaerat accusantium pariatur explicabo eaque, possimus reprehenderit corporis eius sed sunt non mollitia ipsa veniam rerum voluptatibus nostrum.',
        isRead: false,
        time: Date.now(),
    },
    {
        id: 104,
        sender: 'Britney Spears',
        senderPic: 'assets/senders-pics/gal_gadot.png',
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
        if (mail.id) {
            let mailIdx = mails.findIndex(currMail => {
                return currMail.id === mail.id
            })
            mails.splice(mailIdx, 1, mail)
        } else {
            mail.id = _getNextId()
            mails.unshift(mail);
        }
        resolve(mail)        
    });
};

function markRead(mailId) {
    var mailIdx = getMailIdx(mailId)
    return new Promise((resolve, reject) => {
        mails[mailIdx].isRead = !mails[mailIdx].isRead;
        resolve(mails);
    })

}

function deleteMail(mailId) {
    var mailIdx = getMailIdx(mailId)
    return new Promise((resolve, reject) => {
        mails.splice(mailIdx, 1);
        resolve(mails);
    })

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

function sortByDate() {
    return mails.sort((a, b) => {
        return b.time - a.time
    });
};

function sortByTitle() {
    console.log()
    return mails.sort((a, b) => {
        if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) return -1
        else return 1
    })
}

function filterUnread(){
    var results = []
    return new Promise((resolve, reject) => {
        results = mails.filter(mail => {
            return !mail.isRead
        });
        if (results.length) {
            console.log('res', results);
            resolve(results)
        }
        else reject([])
    });
}

function searchMail(query) {
    if(!query.trim()) return Promise.resolve(mails)
    var results = []
    return new Promise((resolve, reject) => {
        results = mails.filter(mail => {
            return mail.title.toLowerCase().includes(query.toLowerCase()) ||
                mail.text.toLowerCase().includes(query.toLowerCase()) ||
                mail.sender.toLowerCase().includes(query.toLowerCase());
        });
        if (results.length) {
            console.log('res', results);
            resolve(results)
        }
        else reject([])
    })

}
function emptyMail() {
    return {
        sender: 'Me!',
        senderPic: 'assets/senders-pics/gal_gadot.png',
        title: '',
        text: '',
        isRead: false,
        time: Date.now()
    }
}


export default {
    getMails,
    getMailById,
    deleteMail,
    markRead,
    sortByTitle,
    sortByDate,
    searchMail,
    filterUnread,
    emptyMail,
    saveMail,
}

