const patterns = [{
        username: /^[a-z\d]{4,12}$/i,
        isInvalid: function(input) {
            return input.value.length < 4 || input.value.length > 12;
        },
        listItems: document.querySelectorAll('.user-list li:nth-child(1)'),
    },
    {
        isInvalid: function(input) {
            return !input.value.match(/[0-9]/g);
        },
        listItems: document.querySelectorAll('.user-list li:nth-child(2)')
    },
    {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    },
    {
        password: /^[\w]{8,20}$/i
    }
];


const inputs = document.querySelectorAll('input');


const validate = (field, regex) => {
    if (regex.test(field.value)) {
        field.className = 'valid';
    } else {
        field.className = 'invalid';
    }
};

const validities = (fields) => {
    fields.forEach(input => {
        for (let i = 0; i < patterns.length; i++) {
            let isInvalid = patterns[i].isInvalid(input);
            let listElems = patterns[i].listItems;
            console.log(isInvalid);
            console.log(input.value);
            console.log(listElems);
            listElems.forEach(el => {
                if (el) {
                    if (isInvalid) {
                        el.className = 'invalid';
                        // el.classList.add('invalid');
                        // el.classList.remove('valid');
                    } else {
                        el.className = 'valid';
                        // el.classList.add('valid');
                        // el.classList.remove('invalid');
                    }
                }
            })

        }
    });
};

const checkInputs = (fields) => {
    fields.forEach(input => {
        input.addEventListener('keyup', e => {
            let regPat = patterns.filter(obj => obj[e.target.attributes.name.value]);
            validate(e.target, regPat[0][e.target.attributes.name.value]);
            console.log(regPat);
            validities(inputs);
        });
    });
}

checkInputs(inputs);

/* let userObj = patterns.filter(obj => obj.listItems);

userObj[0].listItems.forEach(item => {
    item.className = 'valid';
});

console.log(userObj[0].listItems[1]); */