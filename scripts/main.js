const inputs = document.querySelectorAll('input');

const submit = document.querySelector('input[type="submit"]');

const form = document.getElementsByClassName('registration');

const events = ['keyup', 'focusout'];

const patterns = [{
        username: /^[a-zA-Z\d]{4,12}$/i,

    },
    {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    },
    {
        password: /^[a-zA-Z\d\@\!\-\+\?]{8,20}$/
    }
];

const invalidities = {
    username: [{
            isInvalid: function(input) {
                return input.value.length < 4 || input.value.length > 12;
            },
            listElems: document.querySelectorAll('.user-list li:nth-child(1)')
        },
        {
            isInvalid: function(input) {
                return !input.value.match(/[\d]/g);
            },
            listElems: document.querySelectorAll('.user-list li:nth-child(2)')
        },
        {
            isInvalid: function(input) {
                return input.value.match(/[^a-zA-Z\d]/g)
            },
            listElems: document.querySelectorAll('.user-list li:nth-child(3)')
        }
    ],
    email: [{
        isInvalid: function(input) {
            let value = patterns[1].email;
            return !input.value.match(value);
        },
        listElems: document.querySelectorAll('.email-list li:nth-child(1)')
    }],
    password: [{
            isInvalid: function(input) {
                return input.value.length < 8 || input.value.length > 20;
            },
            listElems: document.querySelectorAll('.password-list li:nth-child(1)')
        },
        {
            isInvalid: function(input) {
                return !input.value.match(/[\d]/g);
            },
            listElems: document.querySelectorAll('.password-list li:nth-child(2)')
        },
        {
            isInvalid: function(input) {
                return !input.value.match(/[A-Z]/g);
            },
            listElems: document.querySelectorAll('.password-list li:nth-child(3)')
        },
        {
            isInvalid: function(input) {
                return !input.value.match(/[\@\!\-\+\?]/g);
            },
            listElems: document.querySelectorAll('.password-list li:nth-child(4)')
        }
    ]
};

const checkRegex = (field, regex) => {
    if (regex.test(field.value)) {
        field.className = 'valid';
    } else {
        field.className = 'invalid';
    }
};

const validateFormat = fields => {
    fields.forEach(input => {
        for (let i = 0; i < events.length; i++) {
            input.addEventListener(events[i], e => {
                let inputValidities = invalidities[e.target.attributes.name.value];
                for (let i = 0; i < inputValidities.length; i++) {
                    let isInvalid = inputValidities[i].isInvalid(input);
                    let listItems = inputValidities[i].listElems;
                    listItems.forEach(el => {
                        if (el) {
                            if (isInvalid) {
                                el.className = 'invalid';
                            } else {
                                el.className = 'valid';
                            }
                        }
                    });
                }
            });
        }
    });
}

const checkInputs = fields => {
    fields.forEach(input => {
        for (let i = 0; i < events.length; i++) {
            input.addEventListener(events[i], e => {
                let regPat = patterns.filter(obj => obj[e.target.attributes.name.value]);
                checkRegex(e.target, regPat[0][e.target.attributes.name.value])
            });
        }
    });
}

const checkAllInputs = fields => {
    checkInputs(fields);
    validateFormat(fields);
}

checkAllInputs(inputs);