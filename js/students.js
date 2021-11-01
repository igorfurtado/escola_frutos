let studentGrades = document.getElementById('students-grades');
let studentsAbsences = document.getElementById('students-absences');
let studentsOcurrences = document.getElementById('students-ocurrences');
let closeBtnGrades = document.getElementById('close-btn-grades');
let closeBtnAbsences = document.getElementById('close-btn-absences');
let closeBtnOcurrences = document.getElementById('close-btn-ocurrences');
let modal = document.querySelector('.modal');
let studentsGradesBoard = document.querySelector('.students-grades');
let studentsAbsencesBoard = document.querySelector('.students-absences');
let studentsOcurrencesBoard = document.querySelector('.students-ocurrences');

// Notas

studentGrades.addEventListener('click', function () {
    modal.style.display = 'flex';
    studentsGradesBoard.style.display = 'flex';
    studentsAbsencesBoard.style.display = 'none';
    studentsOcurrencesBoard.style.display = 'none';
});

closeBtnGrades.addEventListener('click', function () {
    modal.style.display = 'none';
    studentsGradesBoard.style.display = 'none';
    studentsAbsencesBoard.style.display = 'none';
    studentsOcurrencesBoard.style.display = 'none';
});

//Faltas
studentsAbsences.addEventListener('click', function () {
    modal.style.display = 'flex';
    studentsAbsencesBoard.style.display = 'flex';
    studentsGradesBoard.style.display = 'none';
    studentsOcurrencesBoard.style.display = 'none';
});

closeBtnAbsences.addEventListener('click', function () {
    modal.style.display = 'none';
    studentsAbsencesBoard.style.display = 'none';
    studentsGradesBoard.style.display = 'none';
    studentsOcurrencesBoard.style.display = 'none';
});

//Ocorrências
studentsOcurrences.addEventListener('click', function () {
    modal.style.display = 'flex';
    studentsOcurrencesBoard.style.display = 'flex';
    studentsGradesBoard.style.display = 'none';
    studentsAbsencesBoard.style.display = 'none';
});

closeBtnOcurrences.addEventListener('click', function () {
    modal.style.display = 'none';
    studentsOcurrencesBoard.style.display = 'none';
    studentsGradesBoard.style.display = 'none';
    studentsAbsencesBoard.style.display = 'none';
});

//Capturando email do usuario na página de login
let loginSalvo = localStorage.getItem('login');
//console.log(loginSalvo);

//Personalizando o campo 'nome do aluno' com seu e-mail:
let bemVindoAluno = document.getElementById('bemVindoAluno');
function cumprimentaAluno() {
    let turmasExistentes = ['1A', '1B', '2A', '2B', '3A', '3B'];
    for (var i = 0; i < turmasExistentes.length; i++) {
        function loadingAlunos() {
            firebase.firestore().collection(turmasExistentes[i]).get().then((snapshot) => {
                snapshot.forEach((doc) => {

                    let aluno = doc.data(); //retorna um objeto com as informações do aluno.
                    let arrayTurma = [];
                    arrayTurma.push(aluno.email);
                    if (arrayTurma.includes(loginSalvo)) {
                        let turmaEncontrada = aluno.turma;

                        firebase.firestore().collection(turmaEncontrada).doc(loginSalvo).get().then((doc) => {
                            let usuario = doc.data();
                            nomeDoUsuario = usuario.nome;
                            bemVindoAluno.innerHTML = [nomeDoUsuario] + '!';
                        }).catch(err => {
                            console.log(err);
                        });
                    };
                });
            });
        };
        loadingAlunos();
    };
}
cumprimentaAluno();

//Capturando caixa de texto que mostra as faltas
let faltasField = document.getElementById('faltasField');

function checaFaltas() {
    let faltasDisciplinas = document.getElementById('faltasDisciplinas');
    let disciplinasFaltas = faltasDisciplinas.options[faltasDisciplinas.selectedIndex].value;
    let turmasExistentes = ['1A', '1B', '2A', '2B', '3A', '3B'];

    for (var i = 0; i < turmasExistentes.length; i++) {
        function loadingAlunos() {
            firebase.firestore().collection(turmasExistentes[i]).get().then((snapshot) => {
                snapshot.forEach((doc) => {

                    let aluno = doc.data(); //retorna um objeto com as informações do aluno.
                    let arrayTurma = [];
                    arrayTurma.push(aluno.email);
                    if (arrayTurma.includes(loginSalvo)) {
                        let turmaEncontrada = aluno.turma;

                        firebase.firestore().collection(turmaEncontrada).doc(loginSalvo).get().then((doc) => {
                            let usuario = doc.data();
                            let faltasField = document.getElementById('faltasField');
                            quantFaltas = usuario.faltas[disciplinasFaltas].quantidade;
                            if (quantFaltas > 0) {
                                faltasField.innerHTML = quantFaltas;
                            }
                        }).catch(err => {
                            console.log(err);
                            faltasField.innerHTML = '0';
                            alert("Você não possui faltas desta disciplina.")
                        });
                    };
                });
            });
        };
        loadingAlunos();
    };
};

//-------------------------------- Ocorrências --------------------------------
function mostraOcorrências() {

    let turmasExistentes = ['1A', '1B', '2A', '2B', '3A', '3B'];

    let dataDaPrimeiraOcorrencia = document.getElementById('dataDaPrimeiraOcorrencia');
    let classificacaoDaPrimeiraOcorrencia = document.getElementById('classificacaoDaPrimeiraOcorrencia');
    let descricaoDaPrimeiraOcorrencia = document.getElementById('descricaoDaPrimeiraOcorrencia');

    let dataDaSegundaOcorrencia = document.getElementById('dataDaSegundaOcorrencia');
    let classificacaoDaSegundaOcorrencia = document.getElementById('classificacaoDaSegundaOcorrencia');
    let descricaoDaSegundaOcorrencia = document.getElementById('descricaoDaSegundaOcorrencia');

    let dataDaTerceiraOcorrencia = document.getElementById('dataDaTerceiraOcorrencia');
    let classificacaoDaTerceiraOcorrencia = document.getElementById('classificacaoDaTerceiraOcorrencia');
    let descricaoDaTerceiraOcorrencia = document.getElementById('descricaoDaTerceiraOcorrencia');

    let dataDaQuartaOcorrencia = document.getElementById('dataDaQuartaOcorrencia');
    let classificacaoDaQuartaOcorrencia = document.getElementById('classificacaoDaQuartaOcorrencia');
    let descricaoDaQuartaOcorrencia = document.getElementById('descricaoDaQuartaOcorrencia');

    let dataDaQuintaOcorrencia = document.getElementById('dataDaQuintaOcorrencia');
    let classificacaoDaQuintaOcorrencia = document.getElementById('classificacaoDaQuintaOcorrencia');
    let descricaoDaQuintaOcorrencia = document.getElementById('descricaoDaQuintaOcorrencia');

    let dataDaSextaOcorrencia = document.getElementById('dataDaSextaOcorrencia');
    let classificacaoDaSextaOcorrencia = document.getElementById('classificacaoDaSextaOcorrencia');
    let descricaoDaSextaOcorrencia = document.getElementById('descricaoDaSextaOcorrencia');

    let dataDaSetimaOcorrencia = document.getElementById('dataDaSetimaOcorrencia');
    let classificacaoDaSetimaOcorrencia = document.getElementById('classificacaoDaSetimaOcorrencia');
    let descricaoDaSetimaOcorrencia = document.getElementById('descricaoDaSetimaOcorrencia');

    for (var i = 0; i < turmasExistentes.length; i++) {
        function loadingAlunos() {
            firebase.firestore().collection(turmasExistentes[i]).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    //Checando qual a turma do aluno que fez login:
                    let aluno = doc.data(); //retorna um objeto com as informações do aluno.
                    let arrayTurma = [];
                    arrayTurma.push(aluno.email);
                    if (arrayTurma.includes(loginSalvo)) {
                        let turmaEncontrada = aluno.turma;

                        firebase.firestore().collection(turmaEncontrada).doc(loginSalvo).get().then((doc) => {
                            let usuario = doc.data();

                            dataPrimeiraOcorrencia = Object.keys(Object.values(usuario.ocorrencias)[0])[0];
                            classificacaoPrimeiraOcorrencia = Object.keys(usuario.ocorrencias)[0];
                            descricaoPrimeiraOcorrencia = Object.values(Object.values(Object.values(Object.values(usuario.ocorrencias))[0])[0])[0];

                            dataDaPrimeiraOcorrencia.innerHTML = dataPrimeiraOcorrencia;
                            classificacaoDaPrimeiraOcorrencia.innerHTML = classificacaoPrimeiraOcorrencia;
                            descricaoDaPrimeiraOcorrencia.innerHTML = descricaoPrimeiraOcorrencia;


                            dataSegundaOcorrencia = Object.keys(Object.values(usuario.ocorrencias)[1])[0];
                            classificacaoSegundaOcorrencia = Object.keys(usuario.ocorrencias)[1];
                            descricaoSegundaOcorrencia = Object.values(Object.values(Object.values(Object.values(usuario.ocorrencias))[1])[0])[0];

                            dataDaSegundaOcorrencia.innerHTML = dataSegundaOcorrencia;
                            classificacaoDaSegundaOcorrencia.innerHTML = classificacaoSegundaOcorrencia;
                            descricaoDaSegundaOcorrencia.innerHTML = descricaoSegundaOcorrencia;


                            dataTerceiraOcorrencia = Object.keys(Object.values(usuario.ocorrencias)[2])[0];
                            classificacaoTerceiraOcorrencia = Object.keys(usuario.ocorrencias)[2];
                            descricaoTerceiraOcorrencia = Object.values(Object.values(Object.values(Object.values(usuario.ocorrencias))[2])[0])[0];

                            dataDaTerceiraOcorrencia.innerHTML = dataTerceiraOcorrencia;
                            classificacaoDaTerceiraOcorrencia.innerHTML = classificacaoTerceiraOcorrencia;
                            descricaoDaTerceiraOcorrencia.innerHTML = descricaoTerceiraOcorrencia;


                            dataQuartaOcorrencia = Object.keys(Object.values(usuario.ocorrencias)[3])[0];
                            classificacaoQuartaOcorrencia = Object.keys(usuario.ocorrencias)[3];
                            descricaoQuartaOcorrencia = Object.values(Object.values(Object.values(Object.values(usuario.ocorrencias))[3])[0])[0];

                            dataDaQuartaOcorrencia.innerHTML = dataQuartaOcorrencia;
                            classificacaoDaQuartaOcorrencia.innerHTML = classificacaoQuartaOcorrencia;
                            descricaoDaQuartaOcorrencia.innerHTML = descricaoQuartaOcorrencia;


                            dataQuintaOcorrencia = Object.keys(Object.values(usuario.ocorrencias)[4])[0];
                            classificacaoQuintaOcorrencia = Object.keys(usuario.ocorrencias)[4];
                            descricaoQuintaOcorrencia = Object.values(Object.values(Object.values(Object.values(usuario.ocorrencias))[4])[0])[0];

                            dataDaQuintaOcorrencia.innerHTML = dataQuintaOcorrencia;
                            classificacaoDaQuintaOcorrencia.innerHTML = classificacaoQuintaOcorrencia;
                            descricaoDaQuintaOcorrencia.innerHTML = descricaoQuintaOcorrencia;


                            dataSextaOcorrencia = Object.keys(Object.values(usuario.ocorrencias)[5])[0];
                            classificacaoSextaOcorrencia = Object.keys(usuario.ocorrencias)[5];
                            descricaoSextaOcorrencia = Object.values(Object.values(Object.values(Object.values(usuario.ocorrencias))[5])[0])[0];

                            dataDaSextaOcorrencia.innerHTML = dataSextaOcorrencia;
                            classificacaoDaSextaOcorrencia.innerHTML = classificacaoSextaOcorrencia;
                            descricaoDaSextaOcorrencia.innerHTML = descricaoSextaOcorrencia;


                            dataSetimaOcorrencia = Object.keys(Object.values(usuario.ocorrencias)[6])[0];
                            classificacaoSetimaOcorrencia = Object.keys(usuario.ocorrencias)[6];
                            descricaoSetimaOcorrencia = Object.values(Object.values(Object.values(Object.values(usuario.ocorrencias))[6])[0])[0];

                            dataDaSetimaOcorrencia.innerHTML = dataSetimaOcorrencia;
                            classificacaoDaSetimaOcorrencia.innerHTML = classificacaoSetimaOcorrencia;
                            descricaoDaSetimaOcorrencia.innerHTML = descricaoSetimaOcorrencia;
                        }).catch(() => {
                            if (dataDaPrimeiraOcorrencia === "" || dataDaPrimeiraOcorrencia === undefined || dataDaPrimeiraOcorrencia === null) {
                                alert("Você não possui ocorrências.")
                            };
                        });
                    };
                });
            });
        };
        loadingAlunos();
    };
};

//-------------------------------- Notas --------------------------------

function mostraNotas() {

    let turmasExistentes = ['1A', '1B', '2A', '2B', '3A', '3B'];

    //Pegando os campos de inputs das notas:
    //Português
    let portuguesPrimeiro = document.getElementById('portuguesPrimeiro');
    let portuguesSegundo = document.getElementById('portuguesSegundo');
    let portuguesTerceiro = document.getElementById('portuguesTerceiro');
    let portuguesQuarto = document.getElementById('portuguesQuarto');
    let portuguesMedia = document.getElementById('portuguesMedia');

    //Matemática
    let matematicaPrimeiro = document.getElementById('matematicaPrimeiro');
    let matematicaSegundo = document.getElementById('matematicaSegundo');
    let matematicaTerceiro = document.getElementById('matematicaTerceiro');
    let matematicaQuarto = document.getElementById('matematicaQuarto');
    let matematicaMedia = document.getElementById('matematicaMedia');

    //Ciências
    let cienciasPrimeiro = document.getElementById('cienciasPrimeiro');
    let cienciasSegundo = document.getElementById('cienciasSegundo');
    let cienciasTerceiro = document.getElementById('cienciasTerceiro');
    let cienciasQuarto = document.getElementById('cienciasQuarto');
    let cienciasMedia = document.getElementById('cienciasMedia');

    //História
    let historiaPrimeiro = document.getElementById('historiaPrimeiro');
    let historiaSegundo = document.getElementById('historiaSegundo');
    let historiaTerceiro = document.getElementById('historiaTerceiro');
    let historiaQuarto = document.getElementById('historiaQuarto');
    let historiaMedia = document.getElementById('historiaMedia');

    //Geografia
    let geografiaPrimeiro = document.getElementById('geografiaPrimeiro');
    let geografiaSegundo = document.getElementById('geografiaSegundo');
    let geografiaTerceiro = document.getElementById('geografiaTerceiro');
    let geografiaQuarto = document.getElementById('geografiaQuarto');
    let geografiaMedia = document.getElementById('geografiaMedia');

    //Inglês
    let inglesPrimeiro = document.getElementById('inglesPrimeiro');
    let inglesSegundo = document.getElementById('inglesSegundo');
    let inglesTerceiro = document.getElementById('inglesTerceiro');
    let inglesQuarto = document.getElementById('inglesQuarto');
    let inglesMedia = document.getElementById('inglesMedia');

    //Educação Física
    let edFisicaPrimeiro = document.getElementById('edFisicaPrimeiro');
    let edFisicaSegundo = document.getElementById('edFisicaSegundo');
    let edFisicaTerceiro = document.getElementById('edFisicaTerceiro');
    let edFisicaQuarto = document.getElementById('edFisicaQuarto');
    let edFisicaMedia = document.getElementById('edFisicaMedia');

    for (var i = 0; i < turmasExistentes.length; i++) {
        function loadingAlunos() {
            firebase.firestore().collection(turmasExistentes[i]).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    //Checando qual a turma do aluno que fez login:
                    let aluno = doc.data(); //retorna um objeto com as informações do aluno.
                    let arrayTurma = [];
                    arrayTurma.push(aluno.email);
                    if (arrayTurma.includes(loginSalvo)) {
                        let turmaEncontrada = aluno.turma;

                        firebase.firestore().collection(turmaEncontrada).doc(loginSalvo).get().then((doc) => {
                            let usuario = doc.data();

                            //Inserindo notas no controle acadêmico:
                            //Português
                            primeiraPortugues = Object.values(usuario.disciplinas.portugues['1bi'])[0];
                            segundaPortugues = Object.values(usuario.disciplinas.portugues['2bi'])[0];
                            terceiraPortugues = Object.values(usuario.disciplinas.portugues['3bi'])[0];
                            quartaPortugues = Object.values(usuario.disciplinas.portugues['4bi'])[0];
                            mediaPortugues = (primeiraPortugues + segundaPortugues + terceiraPortugues + quartaPortugues) / 4;

                            portuguesPrimeiro.innerHTML = primeiraPortugues;
                            portuguesSegundo.innerHTML = segundaPortugues;
                            portuguesTerceiro.innerHTML = terceiraPortugues;
                            portuguesQuarto.innerHTML = quartaPortugues;
                            portuguesMedia.innerHTML = mediaPortugues;

                            //Matemática
                            primeiraMatematica = Object.values(usuario.disciplinas.matematica['1bi'])[0];
                            segundaMatematica = Object.values(usuario.disciplinas.matematica['2bi'])[0];
                            terceiraMatematica = Object.values(usuario.disciplinas.matematica['3bi'])[0];
                            quartaMatematica = Object.values(usuario.disciplinas.matematica['4bi'])[0];
                            mediaMatematica = (primeiraMatematica + segundaMatematica + terceiraMatematica + quartaMatematica) / 4;

                            matematicaPrimeiro.innerHTML = primeiraMatematica;
                            matematicaSegundo.innerHTML = segundaMatematica;
                            matematicaTerceiro.innerHTML = terceiraMatematica;
                            matematicaQuarto.innerHTML = quartaMatematica;
                            matematicaMedia.innerHTML = mediaMatematica;

                            //Ciências
                            primeiraCiencias = Object.values(usuario.disciplinas.ciencias['1bi'])[0];
                            segundaCiencias = Object.values(usuario.disciplinas.ciencias['2bi'])[0];
                            terceiraCiencias = Object.values(usuario.disciplinas.ciencias['3bi'])[0];
                            quartaCiencias = Object.values(usuario.disciplinas.ciencias['4bi'])[0];
                            mediaCiencias = (primeiraCiencias + segundaCiencias + terceiraCiencias + quartaCiencias) / 4;

                            cienciasPrimeiro.innerHTML = primeiraCiencias;
                            cienciasSegundo.innerHTML = segundaCiencias;
                            cienciasTerceiro.innerHTML = terceiraCiencias;
                            cienciasQuarto.innerHTML = quartaCiencias;
                            cienciasMedia.innerHTML = mediaCiencias;

                            //História
                            primeiraHistoria = Object.values(usuario.disciplinas.historia['1bi'])[0];
                            segundaHistoria = Object.values(usuario.disciplinas.historia['2bi'])[0];
                            terceiraHistoria = Object.values(usuario.disciplinas.historia['3bi'])[0];
                            quartaHistoria = Object.values(usuario.disciplinas.historia['4bi'])[0];
                            mediaHistoria = (primeiraHistoria + segundaHistoria + terceiraHistoria + quartaHistoria) / 4;

                            historiaPrimeiro.innerHTML = primeiraHistoria;
                            historiaSegundo.innerHTML = segundaHistoria;
                            historiaTerceiro.innerHTML = terceiraHistoria;
                            historiaQuarto.innerHTML = quartaHistoria;
                            historiaMedia.innerHTML = mediaHistoria;

                            //Geografia
                            primeiraGeografia = Object.values(usuario.disciplinas.geografia['1bi'])[0];
                            segundaGeografia = Object.values(usuario.disciplinas.geografia['2bi'])[0];
                            terceiraGeografia = Object.values(usuario.disciplinas.geografia['3bi'])[0];
                            quartaGeografia = Object.values(usuario.disciplinas.geografia['4bi'])[0];
                            mediaGeografia = (primeiraGeografia + segundaGeografia + terceiraGeografia + quartaGeografia) / 4;

                            geografiaPrimeiro.innerHTML = primeiraGeografia;
                            geografiaSegundo.innerHTML = segundaGeografia;
                            geografiaTerceiro.innerHTML = terceiraGeografia;
                            geografiaQuarto.innerHTML = quartaGeografia;
                            geografiaMedia.innerHTML = mediaGeografia;

                            //Inglês
                            primeiraIngles = Object.values(usuario.disciplinas.ingles['1bi'])[0];
                            segundaIngles = Object.values(usuario.disciplinas.ingles['2bi'])[0];
                            terceiraIngles = Object.values(usuario.disciplinas.ingles['3bi'])[0];
                            quartaIngles = Object.values(usuario.disciplinas.ingles['4bi'])[0];
                            mediaIngles = (primeiraIngles + segundaIngles + terceiraIngles + quartaIngles) / 4;

                            inglesPrimeiro.innerHTML = primeiraIngles;
                            inglesSegundo.innerHTML = segundaIngles;
                            inglesTerceiro.innerHTML = terceiraIngles;
                            inglesQuarto.innerHTML = quartaIngles;
                            inglesMedia.innerHTML = mediaIngles;

                            //Educação Física
                            primeiraEdFisica = Object.values(usuario.disciplinas.edFisica['1bi'])[0];
                            segundaEdFisica = Object.values(usuario.disciplinas.edFisica['2bi'])[0];
                            terceiraEdFisica = Object.values(usuario.disciplinas.edFisica['3bi'])[0];
                            quartaEdFisica = Object.values(usuario.disciplinas.edFisica['4bi'])[0];
                            mediaEdFisica = (primeiraEdFisica + segundaEdFisica + terceiraEdFisica + quartaEdFisica) / 4;

                            edFisicaPrimeiro.innerHTML = primeiraEdFisica;
                            edFisicaSegundo.innerHTML = segundaEdFisica;
                            edFisicaTerceiro.innerHTML = terceiraEdFisica;
                            edFisicaQuarto.innerHTML = quartaEdFisica;
                            edFisicaMedia.innerHTML = mediaEdFisica;

                        }).catch((err) => {
                            console.log(err);
                        });
                    };
                });
            });
        };
        loadingAlunos();
    };
};