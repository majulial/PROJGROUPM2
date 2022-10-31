const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");
const cep = document.getElementById('cep');
const endereco = document.getElementById('endereco');
const numero = document.getElementById('numero');
const estado = document.getElementById('estado');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');


/* EVENTO CRIADO PARA QUE A PAG NÃO RECARREGUE QUANDO O BOTÃO "CRIAR CONTA" FOR CLICADO */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs () {
const usernameValue = username.value;
const emailValue = email.value;
const passwordValue = password.value;
const passwordConfirmationValue = passwordConfirmation.value;
const cepValue = cep.value;
const enderecoValue = endereco.value;
const numeroValue = numero.value;
const estadoValue = estado.value;
const bairroValue = bairro.value;
const cidadeValue = cidade.value;

if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório.");
} else {
    setSuccessFor(username);
}

if (emailValue === "") {
    setErrorFor (email, "O email é obrigatório");
} else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Insira um email válido.")
    
} else {
    setSuccessFor (email);
}

if (cepValue === "") {
    setErrorFor (cep, "insira um CEP.");
} else {
    setSuccessFor (cep);
}
if (enderecoValue === "") {
    setErrorFor (endereco, "insira um cep.");
} else {
    setSuccessFor (endereco);
}
if (numeroValue === "") {
    setErrorFor (numero, "insira um numero.");
} else {
    setSuccessFor (numero);
}
if (estadoValue === "") {
    setErrorFor (estado, "insira um estado.");
} else {
    setSuccessFor (estado);
}
if (bairroValue === "") {
    setErrorFor (bairro, "insira um bairro.");
} else {
    setSuccessFor (bairro);
}
if (cidadeValue === "") {
    setErrorFor (cidade, "insira uma cidade.");
} else {
    setSuccessFor (cidade);
}


if (passwordValue === "") {
    setErrorFor (password, "Crie uma senha.");
} else if (passwordValue.length < 6) {
    setErrorFor (password, "A senha deve ter no mínimo 6 caracteres.")
} else {
    setSuccessFor (password);
}


if (passwordConfirmationValue === "") {
    setErrorFor (passwordConfirmation, "A confirmação de senha é obrigatória.")
} else if (passwordConfirmationValue != passwordValue) {
    setErrorFor (passwordConfirmation, "Senhas não conferem!");
} else {
    setSuccessFor(passwordConfirmation);
}



// CONFIRMAÇÃO DE SENHA: OPERADOR DD COMPARAÇÃO DIFERENTE (!=) 



//EVENTO CRIADO PARA QUANDO O FORMULÁRIO ESTIVER TODO VÁLIDO

const formControls = form.querySelectorAll('.form-control')

const formIsValid = [...formControls].every((formControl) => { 
    return (formControl.className === "form-control success");
});


    if (formIsValid) {
        swal({
            title: "Cadastro Realizado!",
            icon: "success",
            button: "Ok!",
        });
    }




// PARA FAZER ESSA FUNÇÃO DE VALIDAÇÃO DOS FORMS, USANDO O "EVERY", FOI NECESSÁRIO TRANSFORMAR O (form.controls) EM UMA LISTA ARRAY [...formControls] PQ ELE NÃO É UM ARRAY PADRÃO DO JS E SIM UM NODE LIST. (QUE JÁ FOI EXPLICADO NA AULA 07 DO MÓDULO 02)

//PESQUISAR SOBRE NODE LIST
}


    function setErrorFor(input, message) {
        const formControl = input.parentElement;
        const small = formControl.querySelector("small");

        // ADICIONANDO MENSAGEM DE ERRO

        small.innerText = message;

        formControl.className = "form-control error";
    
    }

    function setSuccessFor(input) {
        const formControl = input.parentElement;

        formControl.className = "form-control success";

        //ADICIONANDO CLASSE DE SUCESSO AO INPUT USERNAME

      

    }

    function checkEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        );

    }


    const limparFormulario = (endereco) =>{
        document.getElementById('endereco').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
    }
    
    
    const preencherFormulario = (endereco) =>{
        document.getElementById('endereco').value = endereco.logradouro;
        document.getElementById('bairro').value = endereco.bairro;
        document.getElementById('cidade').value = endereco.localidade;
        document.getElementById('estado').value = endereco.uf;
    }
    
    
    const eNumero = (numero) => /^[0-9]+$/.test(numero);
    
    const cepValido = (cep) => cep.length == 8 && eNumero(cep); 
    
    const pesquisarCep = async() => {
        limparFormulario();
        
        const cep = document.getElementById('cep').value.replace("-","");
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        if (cepValido(cep)){
            const dados = await fetch(url);
            const endereco = await dados.json();
            if (endereco.hasOwnProperty('erro')){
                document.getElementById('endereco').value = 'CEP não encontrado!';
            }else {
                preencherFormulario(endereco);
            }
        }else{
            document.getElementById('cep').value = 'Insira um CEP válido!';
        }
         
    }
    
    document.getElementById('cep')
            .addEventListener('focusout',pesquisarCep);


        