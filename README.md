### API CRUD de Funcionários

Este projeto consiste em uma API CRUD de funcionários, permitindo a criação, edição, visualização e exclusão de informações de funcionários. A API é disponibilizada por meio de lambdas diretamente na AWS, utilizando o framework Serverless.

#### Passo a passo para rodar o projeto

Antes de iniciar a configuração do projeto, verifique se você possui o Node instalado em sua máquina. A versão mínima do Node requerida e homologada é 16.20.2.

1. **Instalação do Node**

   Para instalar o Node, visite o [site oficial do Node.js](https://nodejs.org) e siga as instruções de instalação compatíveis com o seu sistema operacional.

2. **Instalação do AWS SDK e configuração de login**

   O projeto utiliza o AWS SDK para conectar e interagir com os serviços da AWS. Siga os passos abaixo para instalar o AWS CLI e configurar suas credenciais:

   Abra o terminal (ou prompt de comando) e execute o seguinte comando para instalar o AWS CLI:
   ```
   $ npm install -g aws-cli
   ```
   Após a instalação, execute o comando `aws configure` no terminal e digite suas credenciais da AWS quando solicitado. Certifique-se de ter permissões adequadas para criar e gerenciar os recursos necessários para a API.

3. **Instalação do Serverless**

   A API foi desenvolvida utilizando o Serverless Framework para facilitar a implantação na AWS Lambda. Siga os passos abaixo para instalar o Serverless:

   Abra o terminal (ou prompt de comando) e execute o seguinte comando para instalar o Serverless:
   ```
   $ npm install -g serverless
   ```
   Após a instalação, navegue até o diretório raiz do projeto e execute o seguinte comando para instalar as dependências do projeto:
   ```
   $ npm install
   ```



#### Persistência de dados

Esta API utiliza o serviço DynamoDB da AWS para persistência dos dados dos funcionários. Antes de executar o projeto, certifique-se de ter uma instância do DynamoDB configurada na sua conta da AWS.

#### Execução do projeto

Após realizar todas as etapas de instalação e configuração descritas acima, você pode executar o projeto rodando o seguinte comando na raiz do projeto:
```
$ serverless deploy
```
Este comando fará o deploy da API para a AWS Lambda e irá fornecer a URL necessária para realizar as requisições.

### Apis já disponibilizada pelos próximos 30 dias.
Para esse projeto foi disponiblizado os seguintes endpoints:
1. Criação de Funcionário

```
POST - https://rzr11ciqh5.execute-api.us-east-1.amazonaws.com/production/api/employees
```
#### Body
```
{
    "name": "Jaidson Dantas",
    "age": 30,
    "office": "Teste"
}
```

2. Atualização de Funcionário

```
PUT - https://rzr11ciqh5.execute-api.us-east-1.amazonaws.com/production/api/employees/{id}
```
#### Body
```
{
    "name": "Jaidson Dantas",
    "age": 30,
    "office": "Teste"
}
```

3. Busca de Funcionários

```
GET - https://rzr11ciqh5.execute-api.us-east-1.amazonaws.com/api/employees
```
#### Response
```
{
    "Items": [
        {
            "office": "Teste",
            "id": "e8eb97df-3965-4ca9-bbe1-ff6583b5665a",
            "name": "Jaidson Dantas",
            "age": 30
        }
    ],
    "Count": 1,
    "ScannedCount": 1
}
```

3. Remoção de Funcionários

```
DELETE - https://rzr11ciqh5.execute-api.us-east-1.amazonaws.com/api/employees/{id}
```
🤪 Foi disponibiliado na raiz do projeto uma collection para uso no postman.

#### Créditos

Este projeto foi desenvolvido por Jaidson Dantas em fevereiro de 2024.
