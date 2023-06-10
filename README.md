
# API Restful com Node.js

Este é um projeto em atualização, de uma API de vendas desenvolvida em Node.js e TypeScript. A API permite gerenciar produtos, clientes e pedidos. O projeto usa o Express como framework, o PostgreSQL como banco de dados relacional, o Redis como banco de dados em memória e o Docker como ferramenta de conteinerização. O projeto também usa os serviços da AWS S3 para armazenar as imagens, EC2 para hospedar a aplicação e o SES para enviar e-mails.

## Funcionalidades

- Criação, edição e exclusão de produtos
- Criação e autenticação de usuários via JSON Web Token
- Criação de pedidos
- Atualização do perfil de usuário, incluindo envio de avatar
- Reset de senha via e-mail

## Stack Utilizada

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org)
- [Express](https://expressjs.com/pt-br/)
- [Ethereal](https://ethereal.email/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [AWS](https://aws.amazon.com/pt/)

## Instalação

Faça um clone deste repositório e instale no seu ambiente de desenvolvimento usando o seguinte comando:

```bash
https://github.com/felipfr/api-vendas.git
```
Depois:

```bash
cd api-vendas
npm install
```

Configure as variáveis de ambiente no arquivo `.env` e a configuração do banco de dados no arquivo `ormconfig.json`.

Execute a aplicação com o comando `npm run dev`. O servidor estará em execução no endereço http://localhost:3333.