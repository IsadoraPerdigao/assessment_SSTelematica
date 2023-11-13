# UDP Server/Client

## Configuração

1. Certifique-se de que você possui o Node.js instalado e rode o comando `npm install` no terminal para instalar as dependências do projeto.

2. Criar arquivo .env com base no arquivo .env.example preenchendo as informações de configuração do banco:
    DB_USER
    DB_PASSWORD
    DB_HOST
    DB_SCHEMA
    DB_PORT

## Iniciaização do servidor

*Na inicialização do servidor, ele cria a tabela de registro de evento caso a mesma não exista.*

Inicie o servidor com o comando `npm start`:

```
npm start
> assessment@1.0.0 start
> node server.js

Database connected
server listening 0.0.0.0:41234
```

Mensagens recebidas serão persistidas na tabela `dev_status`.

## Inicialização do cliente

*Após a iniciaização, o cliente irá enviar uma mensagem a cada 5 segundos para o servidor*

Inicie o cliente com o comando `npm run client`:

```
npm run client
> assessment@1.0.0 client
> node client.js

Sending message >DATA1,66,231112231728,1,ID=418<

```

## Interrupção da aplicação
Para interromper a execução, tanto do servidor como do cliente, utilize `ctrl + c`. 