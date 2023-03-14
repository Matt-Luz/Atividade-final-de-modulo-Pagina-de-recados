//Variaveis globais puxadas do html:

const formRecados = document.getElementById('formRecados'); //Form para os recados

const sair = document.getElementById('btn-sair'); //Botão sair para evento futuro

const tituloRecados = document.getElementById('tituloRecados');
const descricaoRecados = document.getElementById('descricaoRecados');
const submit = document.getElementById('btn-salvarRecado');

//////////////////////////////////////////////////////////////////////////////////

const usuarioAtivo = JSON.parse(localStorage.getItem('usuarioAtivo'));

//Verificação de usuário ativo:

if (!usuarioAtivo) {
    alert('Usuário não conectado.')
    window.location.href = 'login.html'
};

//////////////////////////////////////////////////////////////////////////////////

//Mudança nome do usuário na barra:

document.getElementById('olaUser').textContent = `Olá ${usuarioAtivo.nome}`;

/////////////////////////////////////////////////////////////////////////////////

//Evento do botão de sair:

sair.addEventListener('click', () => {
    localStorage.removeItem('usuarioAtivo');
    window.location.href = 'login.html'
});

/////////////////////////////////////////////////////////////////////////////////

//Validar se os campos do formulário estão em branco:

function validaCampos() {

    if (tituloRecados.value === '') {
        tituloRecados.focus();
        alert('Insira um título para seu recado!');
        return false;
    }
    
    if (descricaoRecados.value === '') {
        descricaoRecados.focus();
        alert('Insira uma descrição para o seu recado!');
        return false;
    }

    return true;
}

/////////////////////////////////////////////////////////////////

//Função para declaração do ID:

function proximoId() {
    let ultimoId = Number(localStorage.getItem('ultimoId') ?? '0');
    return ++ultimoId;
};

////////////////////////////////////////////////////////////////

//Evento botão salvar recado:

submit.addEventListener('click', function (event) {
    event.preventDefault()

    let valCampoRec = validaCampos();

    if (!valCampoRec) {
        return;
    }

    const objRecados = {
        id: proximoId(),
        titulo: tituloRecados.value,
        descricao: descricaoRecados.value,
    }
    
    usuarioAtivo.listaDeRecados.push(objRecados);
        
    localStorage.setItem('ultimoId', objRecados.id);

    atualizarUserAtivo();
    
    apagarRecadosDaTela();

    aparecerNaTela();

    formRecados.reset();

});

//////////////////////////////////////////////////////////////////////

//Evento e funções para ir para a tabela o recado:

document.addEventListener('DOMContentLoaded', () => {
    
    aparecerNaTela();

});

function aparecerNaTela() {
    
    for (const recadoAdc of usuarioAtivo.listaDeRecados) {
        const tbody = document.querySelector('#tbody');
        const tr = document.createElement('tr');
        tr.classList = 'linhaRecado';
        tr.id = `rec-${recadoAdc.id}`;
        adcRecadoNaLista(recadoAdc, tr);
        tbody.appendChild(tr);
    };
};

function adcRecadoNaLista(recadoAdc, tr) {
    
    const tdTitulo = document.createElement('td');
    tdTitulo.innerText = recadoAdc.titulo;
    tr.appendChild(tdTitulo);

    const tdDescricao = document.createElement('td');
    tdDescricao.innerText = recadoAdc.descricao;
    tr.appendChild(tdDescricao);

    const btnEditar = document.createElement('button');
    btnEditar.innerText = 'Editar';
    btnEditar.setAttribute('style', 'text-align:center; padding: 5px; margin-right:20px; margin-left: 20px; margin-top: 7px; border-radius: 7px; width: 7vw; text-transform: uppercase; ');
    btnEditar.onclick = () => editarRecado(recadoAdc.id);

    const btnExcluir = document.createElement('button');
    btnExcluir.innerText = 'Excluir';
    btnExcluir.setAttribute('style', 'text-align:center; padding: 5px; margin-right:20px; margin-left: 20px; margin-top: 7px; border-radius: 7px; width: 7vw; text-transform: uppercase; ');
    btnExcluir.onclick = () => excluirRecado(recadoAdc.id);

    tr.appendChild(btnEditar);
    tr.appendChild(btnExcluir);
};

///////////////////////////////////////////////////////////

//Função apagar recados da tela:

function apagarRecadosDaTela() {
    const recadoLinha = document.querySelectorAll('.linhaRecado');
    recadoLinha.forEach(recado => recado.remove());
}

//////////////////////////////////////////////////////////////////////////////

//Funções botões:

function excluirRecado(idRecado) {
    const indiceRecado = usuarioAtivo.listaDeRecados.findIndex((recado) => recado.id === idRecado);

    if (indiceRecado === -1) {
        alert('Não foi possível localozar o recado que você quer excluir.');
        return;
    };

    usuarioAtivo.listaDeRecados.splice(indiceRecado, 1);

    localStorage.setItem('usuarioAtivo', JSON.stringify(usuarioAtivo));

    const trRecado = document.querySelector(`#rec-${idRecado}`);
    trRecado.remove();

    atualizarUserAtivo();
};

function editarRecado(idRecado) {
    const indiceRecado = usuarioAtivo.listaDeRecados.findIndex((recado) => recado.id === idRecado);

    if (indiceRecado === -1) {
        alert('Não foi possível localozar o recado que você quer excluir.');
        return;
    };

    const novoTitulo = prompt('Titulo: ', usuarioAtivo.listaDeRecados[indiceRecado].titulo);
    const novaDescricao = prompt('Descrição: ', usuarioAtivo.listaDeRecados[indiceRecado].descricao);

    usuarioAtivo.listaDeRecados[indiceRecado].titulo = novoTitulo;
    usuarioAtivo.listaDeRecados[indiceRecado].descricao = novaDescricao;

    localStorage.setItem('usuarioAtivo', JSON.stringify(usuarioAtivo));

    const trEditarRecado = document.querySelector(`#rec-${idRecado}`);
    trEditarRecado.innerHTML = ''

    adcRecadoNaLista(usuarioAtivo.listaDeRecados[indiceRecado], trEditarRecado);

    atualizarUserAtivo();

};

//////////////////////////////////////////////////////////////////////////////////

//Função atualizar usuário ativo:

function atualizarUserAtivo() {
    const listaArmazenada = JSON.parse(localStorage.getItem('listaUsuarios'));
    
    const i = listaArmazenada.findIndex((usuario) => usuario.email === usuarioAtivo.email);

    listaArmazenada.splice(i, 1, usuarioAtivo);

    localStorage.setItem('listaUsuarios', JSON.stringify(listaArmazenada));
    localStorage.setItem('usuarioAtivo', JSON.stringify(usuarioAtivo));
}