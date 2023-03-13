let formulario = document.getElementById("cadastrarUsuario"); // puxar formulário
let submit = document.getElementById("btn-cadastro"); // para o botão


const nomeUsuario = document.getElementById("nomeCadastro");
const cadastroEmail = document.getElementById("emailCadastro");
const senhaCadastro = document.getElementById("senhaCadastro");
const confirmaSenha = document.getElementById("confSenhaCadastro");

let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios') ?? '[]');

function cadastrar() {

    //Validação do campo nome:

    if (nomeUsuario.value === '' || nomeUsuario.value.length < 3) {
        nomeUsuario.focus();
        alert('Insira um nome no campo indicado. (Min. 03 caracteres)');
        return false;
    };

    //Validação do campo email:

    if (cadastroEmail.value === '' || cadastroEmail.value.indexOf('@') == -1 || cadastroEmail.value.indexOf('.') == -1) {
        cadastroEmail.focus();
        alert('Preencha o campo e-mail corretamente.');
        return false;
    };

    //Validação do campo senha:

    if (senhaCadastro.value === '' || senhaCadastro.value.length < 6) {
        senhaCadastro.focus();
        alert('Preencha o campo senha. A senha deve possuir pelo menos seis caracteres.');
        return false;
    };

    //Validação confirmação de senha:

    if (confirmaSenha.value !== senhaCadastro.value) {
        confirmaSenha.focus();
        alert('As senhas não correspondem!');
        return false;
    } else if (confirmaSenha.value === '') {
        confirmaSenha.focus();
        alert('O campo de confirmação de senha está vazio. Informe novamente sua senha para confirmação');
        return false;
    }

    return true;

};

submit.addEventListener('click', function(event) {
    event.preventDefault();

    let cadastro = cadastrar();

    if (!cadastro) {
        console.log('Não foi possível cadastrar');
        return;
    }

    const usuarioExistente = listaUsuarios.some((usuario) => usuario.email === cadastroEmail.value);
    if (usuarioExistente) {
        alert ('Já existe um usuário cadastrado com este email.');
        return;
    };

    const usuario = {
        nome: nomeUsuario.value,
        email: cadastroEmail.value,
        senha: senhaCadastro.value,
        listaDeRecados: [],
    };

    listaUsuarios.push(usuario);
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    alert('Usuário cadastrado com sucesso!');
    window.location.href = 'login.html'
    formulario.reset();

});