let users = document.getElementById('users');
let grades = document.getElementById('grades');
let absences = document.getElementById('absences');
let ocurrences = document.getElementById('ocurrences');
let closeBtnUsers = document.getElementById('close-btn-users');
let closeBtnGrades = document.getElementById('close-btn-grades');
let closeBtnAbsences = document.getElementById('close-btn-absences');
let closeBtnOcurrences = document.getElementById('close-btn-ocurrences');
let modal = document.querySelector('.modal');
let teachersUsersBoard = document.querySelector('.students');
let teachersGradesBoard = document.querySelector('.grades');
let teachersAbsencesBoard = document.querySelector('.absences');
let teachersOcurrencesBoard = document.querySelector('.ocurrences');

var btnCadastrar = document.getElementById('btnCadastrar');
var btnAdicionarNota = document.getElementById('btnAdicionarNota');
var btnAdicionarFalta = document.getElementById('btnAdicionarFaltas');
var btnAdicionarOcorrencia = document.getElementById('btnAdicionarOcorrencia');

// Alunos
users.addEventListener('click', function () {
    modal.style.display = 'flex';
    if (window.matchMedia("(min-width: 430px)").matches) {
        teachersUsersBoard.style.display = 'flex';
    } else {
        teachersUsersBoard.style.display = 'block';
    }
    teachersGradesBoard.style.display = 'none';
    teachersAbsencesBoard.style.display = 'none';
    teachersOcurrencesBoard.style.display = 'none';
});

closeBtnUsers.addEventListener('click', function () {
    modal.style.display = 'none';
    teachersUsersBoard.style.display = 'none';
    teachersGradesBoard.style.display = 'none';
    teachersAbsencesBoard.style.display = 'none';
    teachersOcurrencesBoard.style.display = 'none';
});

// Notas
grades.addEventListener('click', function () {
    modal.style.display = 'flex';
    if (window.matchMedia("(min-width: 430px)").matches) {
        teachersGradesBoard.style.display = 'flex';
    } else {
        teachersGradesBoard.style.display = 'block';
    }
    teachersAbsencesBoard.style.display = 'none';
    teachersOcurrencesBoard.style.display = 'none';
    teachersUsersBoard.style.display = 'none';
});

closeBtnGrades.addEventListener('click', function () {
    modal.style.display = 'none';
    teachersGradesBoard.style.display = 'none';
    teachersAbsencesBoard.style.display = 'none';
    teachersOcurrencesBoard.style.display = 'none';
    teachersUsersBoard.style.display = 'none';
});

//Faltas
absences.addEventListener('click', function () {
    modal.style.display = 'flex';
    teachersAbsencesBoard.style.display = 'flex';
    teachersGradesBoard.style.display = 'none';
    teachersOcurrencesBoard.style.display = 'none';
    teachersUsersBoard.style.display = 'none';
});

closeBtnAbsences.addEventListener('click', function () {
    modal.style.display = 'none';
    teachersAbsencesBoard.style.display = 'none';
    teachersGradesBoard.style.display = 'none';
    teachersOcurrencesBoard.style.display = 'none';
    teachersUsersBoard.style.display = 'none';
});

//Ocorrências
ocurrences.addEventListener('click', function () {
    modal.style.display = 'flex';
    if (window.matchMedia("(min-width: 430px)").matches) {
        teachersOcurrencesBoard.style.display = 'flex';
    } else {
        teachersOcurrencesBoard.style.display = 'block';
    }
    teachersGradesBoard.style.display = 'none';
    teachersAbsencesBoard.style.display = 'none';
    teachersUsersBoard.style.display = 'none';
});

closeBtnOcurrences.addEventListener('click', function () {
    modal.style.display = 'none';
    teachersOcurrencesBoard.style.display = 'none';
    teachersGradesBoard.style.display = 'none';
    teachersAbsencesBoard.style.display = 'none';
    teachersUsersBoard.style.display = 'none';
});

//Alunos
//------------------- Cadastrar novo usuário -------------------

btnCadastrar.addEventListener('click', () => {

    let email = document.getElementById('registerEmail').value;
    let senha = document.getElementById('registerPassword').value;
    let classeFrutos = document.getElementById('registerClass');
    let turma = classeFrutos.options[classeFrutos.selectedIndex].value;
    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() => {

            alert('O usuário ' + email + ' foi cadastrado com sucesso!')
            firebase.firestore().collection(turma).doc(email).set({
                nome: document.getElementById('registerName').value,
                turma: document.getElementById('registerClass').value,
                senha: document.getElementById('registerPassword').value,
                nascimento: document.getElementById('registerBirthday').value,
                email: document.getElementById('registerEmail').value,
                responsavel: document.getElementById('registerResponsavel').value,
                telefone: document.getElementById('registerTel').value,
                disciplinas: {
                    portugues: { '1bi': { nota: '' }, '2bi': { nota: '' }, '3bi': { nota: '' }, '4bi': { nota: '' }, 'media': { nota: '' } },
                    matematica: { '1bi': { nota: '' }, '2bi': { nota: '' }, '3bi': { nota: '' }, '4bi': { nota: '' }, 'media': { nota: '' } },
                    ciencias: { '1bi': { nota: '' }, '2bi': { nota: '' }, '3bi': { nota: '' }, '4bi': { nota: '' }, 'media': { nota: '' } },
                    historia: { '1bi': { nota: '' }, '2bi': { nota: '' }, '3bi': { nota: '' }, '4bi': { nota: '' }, 'media': { nota: '' } },
                    geografia: { '1bi': { nota: '' }, '2bi': { nota: '' }, '3bi': { nota: '' }, '4bi': { nota: '' }, 'media': { nota: '' } },
                    ingles: { '1bi': { nota: '' }, '2bi': { nota: '' }, '3bi': { nota: '' }, '4bi': { nota: '' }, 'media': { nota: '' } },
                    edFisica: { '1bi': { nota: '' }, '2bi': { nota: '' }, '3bi': { nota: '' }, '4bi': { nota: '' }, 'media': { nota: '' } }
                }
            })
        })
        .catch(() => {
            alert('Não foi possivel registrar este usuário.')
        });
})

//------------------- Listando os alunos cadastrados -------------------

function alterarSelected() {
    //acessando a coleção que foi criada no firebase e o documento dentro dessa colação (linkada por meio da var config).
    let alunosFrutosListar = document.getElementById('turma');
    let listandoAlunos = alunosFrutosListar.options[alunosFrutosListar.selectedIndex].value;

    firebase.firestore().collection(listandoAlunos).get().then((snapshot) => {
        nomesAlunos = document.getElementById('nomesAlunos');
        let html = '';

        snapshot.forEach((doc) => {
            let aluno = doc.data(); //retorna um objeto com as informações do aluno.
            //console.log(aluno.nome);
            html += '<option value="' + aluno.nome.toLowerCase() + '@alunoescolafrutos.com' + '">' + aluno.nome + '</option>';
        });
        nomesAlunos.innerHTML = html;
    }); //get é uma promise que resolve algo e depois executa um then(callback). get() pega todos os dados da coleção.
    // callback retorna um objeto (snapshot -> foto de como está a nossa coleção)
    // para cada um dos documentos da coleção fazemos uma ação.
};


//------------------- Descadastrando usuários -------------------

btnDescadastrar.addEventListener('click', () => {

    let alunosFrutosListar = document.getElementById('turma');
    let listandoAlunos = alunosFrutosListar.options[alunosFrutosListar.selectedIndex].value;

    let selecaoAluno = document.getElementById('nomesAlunos');
    let mostraAluno = selecaoAluno.options[selecaoAluno.selectedIndex].value;
    //console.log(selecaoAluno);
    //console.log(mostraAluno);

    firebase.firestore().collection(listandoAlunos).doc(mostraAluno).delete().then(() => {
        console.log("Document successfully deleted!");
        alert('O usuário ' + mostraAluno + ' foi excluído com sucesso!')
    }).catch((error) => {
        console.error("Error removing document: ", error);
        alert('Não foi possivel excluir este usuário.')
    });
});

//Notas
//------------------- Cadastrando notas -------------------

//Listando alunos
function alterarSelectedNotas() {

    let alunosFrutosListarNotas = document.getElementById('notasTurmas');
    let listandoAlunosNotas = alunosFrutosListarNotas.options[alunosFrutosListarNotas.selectedIndex].value;

    firebase.firestore().collection(listandoAlunosNotas).get().then((snapshot) => {
        nomesAlunosNotas = document.getElementById('notasSelectAlunos');
        let html = '';

        snapshot.forEach((doc) => {
            let aluno = doc.data(); //retorna um objeto com as informações do aluno.
            //console.log(aluno.nome);
            html += '<option value="' + aluno.nome.toLowerCase() + '@alunoescolafrutos.com' + '">' + aluno.nome + '</option>';
        });
        nomesAlunosNotas.innerHTML = html;
    });
};

//Adicionando notas

btnAdicionarNota.addEventListener('click', function () {
    //acessando a coleção
    let alunosFrutosListarNotas = document.getElementById('notasTurmas');
    let listandoAlunosNotas = alunosFrutosListarNotas.options[alunosFrutosListarNotas.selectedIndex].value;

    //acessando o aluno
    nomesAlunosNotas = document.getElementById('notasSelectAlunos');
    let mostraAlunoNota = nomesAlunosNotas.options[nomesAlunosNotas.selectedIndex].value;

    // console.log(listandoAlunosNotas);
    // console.log(mostraAlunoNota);

    //Acessando disciplinas
    let todasDisciplinas = document.getElementById('disciplinas');
    let materias = todasDisciplinas.options[todasDisciplinas.selectedIndex].value;

    // //Acessando bimestres
    let todosBimestres = document.getElementById('bimestre');
    let notaBimestre = todosBimestres.options[todosBimestres.selectedIndex].value;

    // //input do valor da Nota
    let valorNotaDoInput = document.getElementById('inputValorNota').value;


    firebase.firestore().collection(listandoAlunosNotas).doc(mostraAlunoNota).set({

        ['disciplinas']:
        {
            [materias]: {
                [notaBimestre]: {
                    nota: parseFloat(valorNotaDoInput)
                }
            }
        }
    }, { merge: true }).then(() => {
        console.log("Documento modificado com sucesso");
        alert("A nota foi adicionada com sucesso!");
    }).catch(err => {
        console.log(err);
        alert("A nota não pôde ser adicionada. Verifique se o email cadastrado do aluno está correto.")
    });

});


//Faltas
//------------------- Cadastrando faltas -------------------

//Listando alunos
function alterarSelectedFaltas() {

    let alunosFrutosListarFaltas = document.getElementById('faltasTurma');
    let listandoAlunosFaltas = alunosFrutosListarFaltas.options[alunosFrutosListarFaltas.selectedIndex].value;

    firebase.firestore().collection(listandoAlunosFaltas).get().then((snapshot) => {
        nomesAlunosFaltas = document.getElementById('faltasSelectAlunos');
        let html = '';

        snapshot.forEach((doc) => {
            let aluno = doc.data(); //retorna um objeto com as informações do aluno.
            //console.log(aluno.nome);
            html += '<option value="' + aluno.nome.toLowerCase() + '@alunoescolafrutos.com' + '">' + aluno.nome + '</option>';
        });
        nomesAlunosFaltas.innerHTML = html;
    });
};


//Adicionando faltas

btnAdicionarFalta.addEventListener('click', function () {
    //acessando a coleção
    let alunosFrutosListarFaltas = document.getElementById('faltasTurma');
    let listandoAlunosFaltas = alunosFrutosListarFaltas.options[alunosFrutosListarFaltas.selectedIndex].value;

    //acessando o aluno
    nomesAlunosFaltas = document.getElementById('faltasSelectAlunos');
    let mostraAlunoFalta = nomesAlunosFaltas.options[nomesAlunosFaltas.selectedIndex].value;

    //Acessando disciplinas
    let todasDisciplinas = document.getElementById('disciplinasFaltas');
    let materiasFaltas = todasDisciplinas.options[todasDisciplinas.selectedIndex].value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    let materiasFaltasLowerCase = materiasFaltas.toLowerCase();

    // //Acessando a quantidade de faltas
    let quantidadeFaltasTotal = document.getElementById('inputFaltasQuantidade');
    let faltasTotal = quantidadeFaltasTotal.options[quantidadeFaltasTotal.selectedIndex].value;

    firebase.firestore().collection(listandoAlunosFaltas).doc(mostraAlunoFalta).set({

        ['faltas']: {
            [materiasFaltasLowerCase]: {
                quantidade: parseFloat(faltasTotal)
            }
        }

    }, { merge: true }).then(() => {
        alert("As faltas foram atualizadas com sucesso!");
    }).catch(err => {
        console.log(err);
        alert("As faltas não puderam ser lançadas no sistema. Verifique se o email cadastrado do aluno está correto.")
    });
});


//Ocorrências
//------------------- Cadastrando ocorrências -------------------

//Listando alunos
function alterarSelectedOcorrencias() {

    let alunosFrutosListarOcorrencias = document.getElementById('ocorrenciasTurma');
    let listandoAlunosOcorrencias = alunosFrutosListarOcorrencias.options[alunosFrutosListarOcorrencias.selectedIndex].value;
    console.log(listandoAlunosOcorrencias);
    firebase.firestore().collection(listandoAlunosOcorrencias).get().then((snapshot) => {
        nomesAlunosOcorrencias = document.getElementById('ocorrenciasSelectAlunos');
        let html = '';

        snapshot.forEach((doc) => {
            let aluno = doc.data(); //retorna um objeto com as informações do aluno.
            //console.log(aluno.nome);
            html += '<option value="' + aluno.nome.toLowerCase() + '@alunoescolafrutos.com' + '">' + aluno.nome + '</option>';
        });
        nomesAlunosOcorrencias.innerHTML = html;
    });
};

//Adicionando ocorrências

btnAdicionarOcorrencia.addEventListener('click', function () {
    //Acessando a coleção
    let alunosFrutosListarOcorrencias = document.getElementById('ocorrenciasTurma');
    let listandoAlunosOcorrencias = alunosFrutosListarOcorrencias.options[alunosFrutosListarOcorrencias.selectedIndex].value;

    //Acessando o aluno
    nomesAlunosOcorrencias = document.getElementById('ocorrenciasSelectAlunos');
    let mostraAlunoOcorrencia = nomesAlunosOcorrencias.options[nomesAlunosOcorrencias.selectedIndex].value;

    //Acessando classificação da ocorrência
    let classificaOcorrencias = document.getElementById('classificaOcorrencias');
    let mostraOcorrencias = classificaOcorrencias.options[classificaOcorrencias.selectedIndex].value;

    //Acessando a data da ocorrência
    let pickDataOcorrencia = document.getElementById('pickDataOcorrencia').value.split('-').reverse().join('/');

    //Acessando a descrição da ocorrência
    let pickDescricaoOcorrencia = document.getElementById('pickDescricaoOcorrencia').value;

    firebase.firestore().collection(listandoAlunosOcorrencias).doc(mostraAlunoOcorrencia).set({

        ['ocorrencias']:
        {
            [mostraOcorrencias]: {
                [pickDataOcorrencia]: {
                    descricao: pickDescricaoOcorrencia
                }
            }
        }

    }, { merge: true }).then(() => {
        alert("Nova ocorrência adicionada com sucesso!");
    }).catch(err => {
        console.log(err);
        alert("A nova ocorrência não pôde ser lançada no sistema. Verifique se o email cadastrado do aluno está correto.")
    });
});
