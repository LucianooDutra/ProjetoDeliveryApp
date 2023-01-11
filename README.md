# Projeto App delivery!

## Sobre o projeto:

O App delivery é um aplicativo de vendas de produtos para uma distribuidora de bebidas.

O projeto Fullstack JavaScript desenvolvido em grupo. Foi desenvolvido uma API consumindo um banco de dados, utilizando principios SOLID e arquitetura MSC com JavaScript, POO e dockerização(dockerfile, docker-compose). Utilizando modelagem de dados através do Sequelize, onde tem a finalidade de ser consumida por um front-end, que foi desenvolvido utilizando o React, context, HTML, CSS.

- O aplicativo tem:

  - Acesso via login: tanto clientes como pessoas vendedoras, assim como a pessoa que administra o sistema, porém para funções diferentes: (1) A pessoa cliente, que compra da lista de produtos; (2) A pessoa vendedora, que aprova, prepara e entrega; (3) A pessoa administradora, que gerencia quem usa o aplicativo;
  - A comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos possui detalhes sobre seus pedidos;
  - Se a pessoa cliente fez o pedido, o mesmo aparece para a pessoa vendedora em seu dash de pedidos após a atualização da página. A pessoa cliente, por sua vez, deve tem as informações sobre seu pedido quando sua página for atualizada, ou seja, tem informações se o pedido está sendo preparado ou se já saiu pra entrega;

 - A API é responsavel por:

 - Criar e manipular dados com MySQL através do Sequelize, armazenando os dados;
 - Autenticação de usuários, vendedores e administrador utilizando o JWT;
 - Listar clubs cadastrados;
 - Listar partidas em andamento e finalizados;
 - Criar novas partidas;
 - Atualizar placar em partidas em andamento;
 - Finalizar partidas em andamento;
 - Gerar um leaderboard de time de fora e time de casa, e de modo geral, utilizando ordenação avaliativos de critérios para o placar;
 - Realizando a dockerização do back-end e front-end, utilizando docker-compose;

# Técnologias utilizadas:

 - JavaScript;
 - Node.js;
 - Sequelize;
 - Express.js;
 - MYSQL;
 - Docker;
 - ES6;
 - JWT;
 - axios;
 - React;
 - HTML;
 - CSS;
 - Testes: Mocha, Chai, Sinon, Jest e react-testing-library;

## Instalando as dependências

<details>

  ```json
    git clone git@github.com:LucianooDutra/ProjetoDeliveryApp.git
    cd ProjetoDeliveryApp/ 
    npm install
  ```

</details>

## Executando a aplicação

<details>

Para rodar a aplicação você vai precisar ter o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado e usar os seguintes comandos no terminal:

  ```json
    npm start
  ```
  
- Irá abrir a tela do seu navegador com a aplicação rodando.

</details>

## Para rodar o back-end

<details>
 <summary><strong>Observações:</strong></summary><br />

Para realizar as requisições em back-end, você pode usar a extensão Thunder Client do VSCode ou os clientes HTTP Postman ou Insomnia, ou ainda utilizar o próprio frontend pra navegar entre as telas.

  - [Thunder Client](https://www.thunderclient.com/)
  - [Postman](https://www.postman.com/)
  - [Insomnia](https://insomnia.rest/)

</details>

## Rodando o front-end

<details>
 <summary><strong>Front-End</strong></summary><br />

- Para rodar o front-end que consome a API desenvolvida basta executar o comando abaixo a partir da raiz do projeto:

  ```json
    cd front-end/ && npm start
  ```

- Para realizar o login na aplicação, com o perfil de administrador e poder adicionar um novo vendedor, terá que acessar com os seguintes dados:

  ```json
    login: adm@deliveryapp.com
    senha: --adm2@21!!--
  ```
  
- Para realizar o login na aplicação, com o perfil de vendedor e poder ter acesso a todas as vendas no seu nome, terá que acessar com os seguintes dados:

  ```json
    login: fulana@deliveryapp.com
    senha: fulana@123
  ```

</details>


  <summary>
    <strong>🪛 Scripts relevantes do <code>package.json</code> principal</strong>
  </summary><br>

<details>
  **São os scripts da raiz do projeto (`./package.json`) e não das aplicações individuais `./front-end/package.json` e `./back-end/package.json`**:

  - `start`: Limpa as portas `3000` e `3001` e simula a inicialização no avaliador. Também prepara o campo rodando o `Sequelize` para restaurar o **banco de dados de testes** (final `-test`) e sobe a aplicação com `pm2` em modo `fork` (uma instância para cada aplicação). Nesse modo, as alterações não são assistidas;
    - *uso (na raiz do projeto): `npm start`*

  - `stop`: Para e deleta as aplicações rodando no `pm2`;
    - *uso (na raiz do projeto): `npm stop`*

  - `dev`: Limpa as portas `3000` e `3001` e sobe a aplicação com `pm2` em modo `fork` (uma instância pra cada aplicação). Nesse modo, as atualizações são assistidas (modo `watch`);
    - *uso (na raiz do projeto): `npm run dev`*

  - `dev:prestart`: A partir da raiz, esse comando faz o processo de instalação de dependências (`npm i`) nos dois projetos (`./front-end` e `./back-end`) e roda o `Sequelize` no `./back-end` (lembrar de configurar o `.env` no mesmo);
    - *uso (na raiz do projeto): `npm run dev:prestart`*

  - `db:reset`: Roda os scripts do `Sequelize` restaurando o **banco de dados de desenvolvimento** (final `-dev`). Utilize esse script caso ocorra algum problema no seu banco local;
    - *uso (na raiz do projeto): `npm run db:reset`*

  - `db:reset:debug`: Roda os scripts do `Sequelize` restaurando o **banco de dados de desenvolvimento** (final `-dev`). Utilize esse script caso ocorra algum problema no seu banco local. Esse comando também é capaz de retornar informações detalhadas de erros (quando ocorrerem no processo);
    - *uso (na raiz do projeto): `npm run db:reset:debug`*

  - `test <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de testes** (final `-test`);
    - *uso (na raiz do projeto): `npm test`, `npm test 01login 02register` ou ainda `npm run test 01 02`*

  - `test:dev <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`); 
    - *uso (na raiz do projeto): `npm run test:dev`, `npm run test:dev 01login 02register` ou ainda `npm test:dev 01 02`*;

  - `test:dev:open <nomes-dos-arquivos>`: Roda todos os testes (ou uma parte deles caso `<nomes-dos-arquivos>` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`), exemplo `npm test:dev:open 01login 02register` ou ainda `npm test:dev:open 01 02`. Esse teste deve abrir uma janela mostrando o comportamento das páginas;
    - *uso (na raiz do projeto): `npm run test:dev:open`, `npm run test:dev:open 01login 02register` ou ainda `npm test:dev:open 01 02`*;

  - `test:dev:report "<nomes-dos-arquivos>"`: Roda todos os testes (ou uma parte deles caso `"<nomes-dos-arquivos>"` seja definido) utilizando o **banco de dados de desenvolvimento** (final `-dev`). Esse teste devolve um output em texto com o resultado de todos os testes. Os `logs` são gerados em `./__tests__/reports`.
    - *uso (na raiz do projeto): `npm run test:dev:report`, `npm run test:dev:report "01login 02register"` ou ainda `npm run test:dev:report "01 02"`*;
    
   - `npm run dev:prestart` (esse comando também restaurará o banco de dados, caso o `.env` esteja configurado corretamente).

</details>

