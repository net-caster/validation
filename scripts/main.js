const patterns = [{
        username: /^[a-z\d]{4,12}$/i,
        isInvalid: function(input) {
            return input.value.length < 4 || input.value.length > 12;
        },
        listItems: document.querySelectorAll('.user-list li:nth-child(1)')
    },
    {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    },
    {
        password: /^[\w]{8,20}$/i
    }
];

const validities = [{

}]

const inputFields = document.querySelectorAll('input');


const validate = (field, regex) => {
    if (regex.test(field.value)) {
        field.className = 'valid';
    } else {
        field.className = 'invalid';
    }
}

const checkInputs = (inputs) => {
    inputs.forEach(input => {
        input.addEventListener('keyup', e => {
            // console.log(e.target.attributes.name.value);
            let regPat = patterns.filter(obj => obj[e.target.attributes.name.value]);
            // console.log(regPat);
            validate(e.target, regPat[0][e.target.attributes.name.value]);
        });
    });
}

checkInputs(inputFields);

/* let userObj = patterns.filter(obj => obj.listItems);

userObj[0].listItems.forEach(item => {
    item.className = 'valid';
})

console.log(userObj[0].listItem[1]); */