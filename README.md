# API de Gerenciamento de Biblioteca

Este projeto é uma API RESTful para gerenciar o funcionamento de uma biblioteca, permitindo o cadastro de autores, usuários, livros e o controle de empréstimos.

Este projeto foi desenvolvido como parte de um trabalho acadêmico.

## Tecnologias Utilizadas

-   Node.js
-   Express.js (para roteamento e servidor)
-   MongoDB (com Mongoose)
-   Dotenv (para gerenciamento de variáveis de ambiente)

## Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd <nome-da-pasta>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    -   Crie um arquivo `.env` na raiz do projeto.
    -   Copie o conteúdo do `.env.example` para dentro do `.env`.
    -   Substitua os valores (especialmente `MONGODB_URI`) pela sua string de conexão real do MongoDB Atlas.

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor estará disponível em `http://localhost:3000` (ou na porta definida no seu `.env`).

## Endpoints da API

O prefixo base para todas as rotas é `/api`.

### Autores (`/api/authors`)

-   `POST /` : Cadastra um novo autor.
-   `GET /` : Lista todos os autores.

### Usuários (`/api/users`)

-   `POST /` : Cadastra um novo usuário.
-   `GET /` : Lista todos os usuários.

### Livros (`/api/books`)

-   `POST /` : Cadastra um novo livro (requer um ID de autor existente).
-   `GET /` : Lista todos os livros (populando os dados do autor).

### Empréstimos (`/api/loans`)

-   `POST /` : Realiza um novo empréstimo (requer `userId` e `bookId`). Atualiza o status do livro para indisponível.
-   `GET /` : Lista todos os empréstimos (populando dados do usuário e do livro).