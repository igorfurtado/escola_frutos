<p align="center">
  <img src="https://user-images.githubusercontent.com/70289587/139695761-1c01f0ec-43a1-4503-a43a-26a32d452151.png" alt="Logo Escola Frutos"/>
</p>

# Escola Frutos

Controle acadêmico desenvolvido para acesso de alunos e professores da Escola Frutos. Através deste, é possível implementação/consulta de notas, faltas e ocorrências, além do cadastro ou exclusão de usuários. Tecnologias utilizadas: Figma, HTML, CSS, JS e Firebase (Authentication & Database).


## Features

- Autenticação via Google Firebase;
- Banco de dados NoSQL: Firestore Database;
- Área do aluno: consulta de notas, faltas e ocorrências;
- Área do professor: cadastro/descadastro de alunos, lançamento de notas, lançamento de faltas e de ocorrências;
- Layout responsivo.


## Screenshots

<div align="center">
  <img src="https://user-images.githubusercontent.com/70289587/139697322-76cbea3b-5601-46f4-adec-aa36fb3e2dd0.png" alt="Login Escola Frutos"/>
</div>
<div style="display: inline-block";>
  <img src="https://user-images.githubusercontent.com/70289587/139697602-5afae5b5-2491-4902-856e-07f72ca79d2f.png" alt="Área do professor"/>
    <img src="https://user-images.githubusercontent.com/70289587/139697628-f2de9368-de0c-4ec8-9200-a6f53a71f695.png" alt="Área do aluno"/>
</div>


## Styles
<div style="display: inline-block";>
  <img src="https://user-images.githubusercontent.com/70289587/139697938-747e75ae-2753-4bbb-810f-84de28199c6d.png" alt="Paleta de cores"/>
    <img src="https://user-images.githubusercontent.com/70289587/139697963-88ece69e-820a-49e7-8753-4aa399bdbea5.png" alt="Tipografia"/>
</div>


## Tech Stack

**Client:** HTML, CSS & JS.

**Server:** Firebase Authentication & Firestore Database.

**Design:** Figma.


## FAQ

#### Não consigo realizar login utilizando o Safari para IOS ou outro browser.

Nos casos em que a mensagem de **login efetuado** é emitida mas não há direcionamento para a página do aluno ou do professor, é recomendado a desativação do bloqueador de pop-ups. Como alternativa ao uso do Safari para IOS, é recomendado o Chrome para IOS.

#### Não consigo visualizar os alunos cadastrados nas turmas na área do professor.

Para visualizar os alunos na área do professor em qualquer um dos menus, é necessário mudar a seleção atual da turma. Isso se dá pelo fato dos alunos serem mostrados na tela após um comando onchange() no menu de seleção.

#### Dificuldade em criar um novo usuário e acessar o sistema.

Para criar um novo usuário, é necessário acessar a área do professor e em seguida ir até o menu "Alunos". Em seguida, informar os dados do aluno. É de fundamelnatl importância que o e-mail cadastrado seja do tipo: exemplo **@alunoescolafrutos.com**.



## Authors

- [@igorfurtado](https://github.com/igorfurtado)


## License

[MIT](https://choosealicense.com/licenses/mit/)

