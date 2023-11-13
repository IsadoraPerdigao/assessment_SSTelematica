# assessment
O projeto deve ser segmentado em duas etapas

#########################################################################
PRIMEIRA ETAPA
#########################################################################

Crie uma aplicação em Python, ou na linguagem de sua escolha, que funcione como um servidor de soquete UDP para receber pacotes no formato texto.

Certifique-se de que os pacotes recebidos sigam o formato especificado:

# >DATAtype,protocolo,yymmddhhmmss,status;ID=id<

exemplos: 

# >DATA1,66,220918235757,1;ID=123<
# >DATA2,66,220921230008,0;ID=456<

Crie uma função que analise o comando de entrada e efetue o parsing dos dados, armazenando-os em um arquivo JSON no formato a seguir:

{“type”: 1, “protocolo”: 66, “utc”: “2022-09-18 23:57:57”, “status”: 0, “id”: “123”}

Estabelecer uma base de dados local que inclua uma tabela única para acomodar esses dados. A tabela será denominada 'dev_status' e deverá compreender as seguintes colunas:

# type int
# protocolo int
# utc datetime
# status int
# id varchar

Utilize o banco de dados de preferência

#########################################################################
SEGUNDA ETAPA
#########################################################################

Crie um 'simulador' de comandos que gere pacotes de maneira aleatória, mantendo-se dentro do padrão estabelecido.

# >DATAtype,protocolo,yymmddhhmmss,status;ID=id<

seguindo as regras de:

 - type - só pode ser 1 ou 2
 - protocolo - só pode ser 66, 67 ou 68
 - data - NOW()
 - status - só pode ser 0 ou 1
 - id - deve conter somente 3 caracteres aleatórios

Quando o simulador é executado, ele deve permanecer em execução até ser interrompido. Deverá estabelecer uma conexão com o soquete e, a cada 5 segundos, enviar um conjunto de dados. 

#########################################################################

Fornecer uma descrição detalhada dos passos necessários para iniciar e executar o processo

BOA SORTE!
