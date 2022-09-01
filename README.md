<h1 align="center">STORE MANAGER 📦</h1>

![image](https://user-images.githubusercontent.com/96205316/187704342-639a9671-f74f-487a-b978-4c3aa5e0caf1.png)

## English 🇬🇧
<details>
  <summary>Click to expand!</summary>
  
### Description 📝
Store Manager is a RESTful API developed with the MSC (Model-Service-Controller) software architecture, through TDD (Test Driven Development) during the Back-end module at [Trybe](https://www.betrybe.com/).
The objective of this project was to simulate a management system for sales in drop shipping format, making it possible to create, read, update and delete (CRUD) both products and sales.

### Technologies and Tools 🔧
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm-logo"/>
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="docker-logo"/>
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="mysql-logo">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs-logo"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express-logo"/>
<img src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white" alt="mocha-logo"/>
<img src="https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white" alt="chai-logo"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" alt="postman-logo"/>
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="swagger-logo"/>

Store Manager was developed using **Docker** in an isolated development environment. Through **npm**, Node Package Manager, the **express-rescue** and **dotenv** libraries were installed to deal with asynchronous errors and environment variables, respectively. 
Using **Mocha**, **Chai** and **Sinon**, I developed this project through **TDD**, Test Driven Development, testing each layer of the **MSC** architecture.

- First, I wrote tests for the **Model** layer, which is responsible for data structure and manipulation through **MySQL**. All tests failed, then the Model layer was constructed and all tests passed.
- Secondly, the **Service** layer, which is responsible for business rules enforcement before any kind of contact with the database, was also tested and all tests failed. Then, the Service layer was constructed.
- Thirdly, tests for the **Controller** layer were written and also failed. The Controller layer is the one responsible for direct contact with the Client, using **Express.js** routes and endpoints. It was then constructed and all tests passed.   
<!-- end of the list -->
The **Express.js** framework was used to create and structure a flexible yet sturdy RESTful API, through various endpoints later on verified using **Postman**.
After the project's development, **Swagger** was used to write its documentation. 


### Installation 📋
1. Create a directory using the **mkdir** command:
```
  mkdir saraivais-projects
```

2. Access the directory using the **cd** command and clone the repository:
```
  cd saraivais-projects
  git clone git@github.com:saraivais/store-manager.git
```

3. Access the project directory and install it's dependencies:
```
  cd store-manager
  npm i
```

4. Lastly, use the **npm start** command and access the **API documentation** via browser, using the following url
```
  http://localhost:3000
```
  
### If you'd like more information, this API is also available on Postman!
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/22527487-4765869f-1932-4536-9cbb-f395f2dbd450?action=collection%2Ffork&collection-url=entityId%3D22527487-4765869f-1932-4536-9cbb-f395f2dbd450%26entityType%3Dcollection%26workspaceId%3D4534c73a-ce56-4dea-b0a6-84eac4889746)


</details>

## Português 🇧🇷
<details>
  <summary>Clique para expandir!</summary>
  
### Descrição 📝
Store Manager é uma API RESTful desenvolvida com a arquitetura de software MSC (Model-Service-Controller), através de TDD (Desenvolvimento orientado a Testes) durante o módulo Back-end da [Trybe](https://www.betrybe.com/).
O objetivo deste projeto foi simular um sistema de gestão de vendas no formato drop shipping, possibilitando a criação, leitura, atualização e exclusão (CRUD) tanto de produtos quanto de vendas.

### Tecnologias e Ferramentas 🔧
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm-logo"/>
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="docker-logo"/>
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" alt="mysql-logo">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs-logo"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express-logo"/>
<img src="https://img.shields.io/badge/Mocha-8D6748?style=for-the-badge&logo=Mocha&logoColor=white" alt="mocha-logo"/>
<img src="https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white" alt="chai-logo"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white" alt="postman-logo"/>
<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" alt="swagger-logo"/>

O Store Manager foi desenvolvido usando o **Docker** em um ambiente de desenvolvimento isolado. Por meio do **npm**, Node Package Manager, as bibliotecas **express-rescue** e **dotenv** foram instaladas para lidar com erros assíncronos e variáveis ​​de ambiente, respectivamente.
Usando **Mocha**, **Chai** e **Sinon**, desenvolvi este projeto por meio do **TDD**, Test Driven Development, testando cada camada da arquitetura **MSC**.

- Primeiro, escrevi testes para a camada **Model**, que é responsável pela estrutura e manipulação dos dados através do **MySQL**. Todos os testes falharam, então a camada Model foi construída e todos os testes foram aprovados.
- Em segundo lugar, a camada **Service**, que é responsável pela aplicação das regras de negócio antes de qualquer tipo de contato com o banco de dados, também foi testada e todos os testes falharam. Em seguida, foi construída a camada de Serviço.
- Em terceiro lugar, os testes para a camada **Controller** foram escritos e também falharam. A camada Controller é a responsável pelo contato direto com o Cliente, utilizando rotas e endpoints **Express.js**. Foi então construído e todos os testes passaram.
<!-- end of the list -->
O framework **Express.js** foi usado para criar e estruturar uma API RESTful flexível e robusta, por meio de vários endpoints verificados posteriormente usando o **Postman**.
Após o desenvolvimento do projeto, o **Swagger** foi utilizado para escrever sua documentação.
### Instalação 📋
1. Crie um diretório usando o comando **mkdir**:
```
  mkdir saraivais-projetos
```

2. Acesse o diretório usando o comando **cd** e clone o repositório:
```
  cd saraivais-projetos
  git clone git@github.com:saraivais/store-manager.git
```

3. Acesse o diretório do projeto e instale suas dependências:
```
  cd store-manager
  npm eu
```

4. Por fim, use o comando **npm start** e acesse a **documentação da API** pelo navegador, usando o seguinte URL
```
  http://localhost:3000
```
  
### Se você quiser mais informações, essa API também está disponível no Postman!
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/22527487-4765869f-1932-4536-9cbb-f395f2dbd450?action=collection%2Ffork&collection-url=entityId%3D22527487-4765869f-1932-4536-9cbb-f395f2dbd450%26entityType%3Dcollection%26workspaceId%3D4534c73a-ce56-4dea-b0a6-84eac4889746)
  
</details>

