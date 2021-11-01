btnOut = document.getElementById('btnOut');

//Deslogando um usuário
btnOut.addEventListener('click', () => {

    firebase.auth().signOut().then(() => {
        window.open('../../');
        window.close();
        console.log('Usuário deslogado.')
    }).catch(error => {
        console.log(error); //then() não retorna nada
    })
});