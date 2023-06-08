//------ Elements
const Form = document.querySelector('.Login__form')
const Inputs = document.querySelectorAll('.Login__input')


const regExp = {
    user: /^\w{5,15}$/,
    password: /^\w{6,15}$/
}

Form.addEventListener('submit', async e=>{
    e.preventDefault()

    const body = {
        user: document.querySelector('#user-input').value,
        password: document.querySelector('#password-input').value
    }
    
    if(regExp.user.test(body.user) && regExp.password.test(body.password)){
        const response = await fetch('/login', {
                                    method:'post',
                                    body: JSON.stringify(body),
                                    headers: { 'content-type': 'application/json' }
                                }).then(res => res.json())  
    }
})

Form.addEventListener('keyup', e=>{
    const { target } = e

    if((target.name == 'user' || target.name == 'password')){
        if(target.value.length == 0 && target.classList.contains('Login__input--error')) return target.classList.remove('Login__input--error')
        
        if(regExp[target.name].test(target.value) && target.classList.contains('Login__input--error')){
            return target.classList.remove('Login__input--error')
        }

        if(!regExp[target.name].test(target.value) && !target.classList.contains('Login__input--error')){
            return target.classList.add('Login__input--error')
        }
    }
    
})

