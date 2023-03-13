let formulario = document.getElementById('formLogin'); // form login
let submit = document.getElementById('btn-login'); // botão pra logar

//Puxar inputs:

const emailLogin = document.getElementById('emailLogin');
const senhaLogin = document.getElementById('senhaLogin');

//Função para logar e verificações:

function logar() {

    //Validação do campo email:

    if (emailLogin.value === '' || emailLogin.value.indexOf('@') == -1 || emailLogin.value.indexOf('.') == -1) {
        emailLogin.focus();
        alert('Preencha o campo e-mail corretamente.');
        return false;
    };

    //Validação do campo senha:

    if (senhaLogin.value === '' || senhaLogin.value.length < 6) {
        senhaLogin.focus();
        alert('Preencha o campo senha. A senha deve possuir pelo menos seis caracteres.');
        return false;
    };

    return true;

}

//Evento botão e logar:

submit.addEventListener('click', function(event) {
    event.preventDefault();

    let login = logar();

    if (!login) {
        return;
    }

    //Lista localStorage:
    const listaCadastrados = JSON.parse(localStorage.getItem('listaUsuarios') ?? '[]');

    //Buscar user no localStorage;

    if (listaCadastrados.length === 0) {
        alert('Usuario não cadastrado, por favor, realize seu cadastro.');
        formulario.reset();
        return;
    }

    //Verificar email e senha nos cadastrados:

    const usuarioCadastrado = listaCadastrados.find((usuario) => usuario.email === emailLogin.value && usuario.senha === senhaLogin.value);
    if (!usuarioCadastrado) {
        alert('Usuário ou senha inválidos!');
        formulario.reset();
        return;
    }

    localStorage.setItem('usuarioAtivo', JSON.stringify(usuarioCadastrado));
    window.location.href = 'recados.html';

});