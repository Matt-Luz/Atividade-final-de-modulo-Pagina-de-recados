//Variaveis puxadas do html

const formRecados = document.getElementById('formRecados'); //Form para os recados

const sair = document.getElementById('btn-sair'); //Botão sair para evento futuro

const tituloRecados = document.getElementById('tituloRecados');
const descricaoRecados = document.getElementById('descricaoRecados');
const submit = document.getElementById('btn-salvarRecado');

////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////

const usuarioAtivo = JSON.parse(localStorage.getItem('usuarioAtivo'));

const recadosLista = JSON.parse(localStorage.getItem('recadosLista') ?? '[]');

//Verificação de usuário ativo:

if (!usuarioAtivo) {
    alert('Usuário não conectado.')
    window.location.href = 'login.html'
};


//Mudança nome do usuário na barra:

document.getElementById('olaUser').textContent = `Olá ${usuarioAtivo.nome}`;


//Evento do botão de sair:

sair.addEventListener('click', () => {
    localStorage.removeItem('usuarioAtivo');
    window.location.href = 'login.html'
});

////////////////////////////////////////////////////////////////

//Validar se os campos estão em branco:

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

//Evento botão salvar recado

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
        
    recadosLista.push(objRecados);
    usuarioAtivo.listaDeRecados.push(objRecados);
        
    localStorage.setItem('usuarioAtivo', JSON.stringify(usuarioAtivo.listaDeRecados));
    localStorage.setItem('ultimoId', objRecados.id);
    localStorage.setItem('recadosLista', JSON.stringify(recadosLista));

    const email = sessionStorage.getItem('email');

});

//////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////

//Evento e funções para ir para a tabela:

document.addEventListener('DOMContentLoaded', () => {
    
    for (const recadoAdc of recadosLista) {
        const tbody = document.querySelector('#tbody');
        const tr = document.createElement('tr');
        tr.id = `rec-${recadoAdc.id}`;
        adcRecadoNaLista(recadoAdc, tr);
        tbody.appendChild(tr);
    };


});

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

//Funções botões:

function excluirRecado(idRecado) {
    const indiceRecado = recadosLista.findIndex((recado) => recado.id === idRecado);

    if (indiceRecado === -1) {
        alert('Não foi possível localozar o recado que você quer excluir.');
        return;
    };

    recadosLista.splice(indiceRecado, 1);

    localStorage.setItem('recadosLista', JSON.stringify(recadosLista));

    const trRecado = document.querySelector(`#rec-${idRecado}`);
    trRecado.remove();
};

function editarRecado(idRecado) {
    const indiceRecado = recadosLista.findIndex((recado) => recado.id === idRecado);

    if (indiceRecado === -1) {
        alert('Não foi possível localozar o recado que você quer excluir.');
        return;
    };

    const novoTitulo = prompt('Titulo: ', recadosLista[indiceRecado].titulo);
    const novaDescricao = prompt('Descrição: ', recadosLista[indiceRecado].descricao);

    recadosLista[indiceRecado].titulo = novoTitulo;
    recadosLista[indiceRecado].descricao = novaDescricao;

    localStorage.setItem('recadosLista', JSON.stringify(recadosLista));

    const trEditarRecado = document.querySelector(`#rec-${idRecado}`);
    trEditarRecado.innerHTML = ''

    adcRecadoNaLista(recadosLista[indiceRecado], trEditarRecado);

};