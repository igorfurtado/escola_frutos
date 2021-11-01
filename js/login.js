
btnEntrar = document.getElementById('btn-entrar');

//Criando um novo usuário:

function criarUsuario() {
    let newUserEmail = "igor@alunoescolafrutos.com";
    let newUserPassword = "123igor";

    let auth = firebase.auth();
    auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword).then(user => {
        console.log(user);
    }).catch(error => {
        console.log(error);
    })
}

//criarUsuario();

//Logando um usuário:
btnEntrar.addEventListener('click', () => {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {

        const email = document.querySelector("#inputEmail").value;
        const senha = document.querySelector("#inputSenha").value;
        localStorage.setItem('login', email);
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(() => {

                let radioAluno = document.getElementById('radioAluno');
                let radioProfessor = document.getElementById('radioProfessor');

                if (radioAluno.checked) {
                    alert('Seja bem-vindo, aluno(a)!');
                    window.open('./pages/studentArea/');
                }
                else if (radioProfessor.checked) {
                    if (email === "eliza@escolafrutos.com") {
                        alert('Seja bem-vindo, professor(a)!')
                        window.open('./pages/teacherArea/');
                    }
                    else {
                        alert('Você não tem autorização para acessar a área do professor.');
                    }

                }
            })
            .catch(error => {
                alert('Usuário ou senha inválida.');
                console.log(error);
            });
    })
        .catch(err => { console.log(err) });
});

//Preparando um observador para o usuário. Quando ele mudar de estado, vai disparar o callback:
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('Usuário logado', user);
    }
    else {
        console.log('Ninguém logado.')
    }
});

//Opções de acesso existentes:
function showUsers() {
    alert(`Usuário aluno: emanuel@alunoescolafrutos.com | senha: 123emanuel
Usuário professor: eliza@escolafrutos.com | senha: 123eliza`)
};

showUsers();

