
# Introdução

## Elementos Táticos
Quando estamos falando sobre DDD e precisamos olhar mais a fundo um bounded context, precisamos ser capazer de modelarmos de forma mais assertiva os seus principais componentes, comportamentos e individualidades, bem como suas relações.  

#### Entities 
Uma entidade é algo único que é capaz ser alterado de forma contínua durante um longo período de tempo. `Vernon`
Uma entidade é algo que possui uma continuidade em seu ciclo de vida e pode ser distinguida independente dos atributos que são importantes para a aplicação do usuário. Pode ser uma pessoa, cidade, carro, um ticket de loteria ou uma transação bancária.  `Vernon`

#### Value Objects
Quando você se preocupa apenas com os atributos de um elemento de um model, classifique isso como um Value Object. 
Trate o Value Object como imutável.


#### Agregados
 Um agregado é um conjunto de objetos associados que tratamos como uma unidade para propósito de mudança de dados. - Eric Evans

## Domain Services
Um serviço de domínio é uma operação sem estado que cumpre uma tarefa específica do domínio. Muitas vezes, a melhor indicação de que você deve criar um serviço no modelo de domínio é quando a operação que você precisa executar parece não se encaixar como um método em um Agregado ou um Objeto de valor.

Quando um processo ou transformação significativa no domínio não for uma responsabilidade natural de uma ENTIDADE ou OBJETO DE VALOR, adicione uma operação ao modelo como uma interface autônoma declarada como um SERVIÇO. Defina a interface baseada na linguagem do modelo de domínio e certifique-se de que o nome da operação faça parte do UBIQUITOUS LANGUAGE. Torne o SERVIÇO sem estado. 

`Vernon Vaughn`.

- Uma Entyidade pode realizar uma ação que vai afetar todas as entidades ?
- Como realizar uma operação em lote ?
- Como calcular algo cuja as informações constam em mais de uma entidade ?

### Domain Services - Cuidados

- Quando houver muitos Domain Services em seu projeto, TALVEZ, isso pode indicar que seus agregados estão anêmicos. 
- Domain Services são stateless.


