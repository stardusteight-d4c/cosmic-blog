-> Criar um usuário

1. Deve-se primeiramente confirmar o endereço de email.
2. Gerar um token para o usuário e retornar tal token criptografado e descriptografado, assim
   deve-se ter um método que confirme e compare essas duas versões do token.
3. Confirmar o token comparando token criptografado e descriptografado.
4. Ao confirmar, publicar um camando para criação de usuário, caso contrário disparar um erro.

Meu domínio deve lidar com autenticação de email? Sendo que para criar um usuário, somente é
possível com um email autenticado?

Se o processo de autenticação de email faz parte das regras de negócio da sua aplicação, então
sim, o seu domínio deve lidar com isso.

Se você requer que um usuário seja autenticado antes de permitir a criação de uma conta, então
isso é uma regra de negócio e deve ser tratado pelo seu domínio. Isso pode envolver a geração
de um token de confirmação, o envio de um email para o endereço fornecido e a validação do
token quando o usuário clicar em um link de confirmação.

No entanto, se a autenticação de email for uma preocupação secundária, ou seja, se ela não
faz parte da lógica principal da sua aplicação, pode ser mais adequado lidar com isso em uma
camada externa, como um serviço de terceiros que forneça autenticação de email como um serviço.
Isso permitiria que você se concentrasse em outras áreas de sua aplicação, enquanto confia na
funcionalidade fornecida por um serviço externo para lidar com a autenticação de email.

Autenticação de email e criar um usuário são coisas diferentes,
Não é o serviço de usuário que deve autenticar o email, mesmo que para a criação seja
necessário passar por uma autenticação.

Login e Logout, devem ser métodos de Auth na camada de dominio, faz sentido simular isto no dominio com implementações falsas e na camada de infra de fato fazer uma implementação verdadeira??

Sim, faz sentido simular o login e logout no domínio com implementações falsas e depois implementar a
lógica real na camada de infraestrutura. Essa é uma prática comum em DDD, conhecida como
"port and adapter" ou "hexagonal architecture".

Essa abordagem permite separar a lógica de negócio da implementação técnica, tornando o
código mais modular e flexível. Além disso, a implementação das regras de negócio no domínio
facilita os testes unitários, já que as implementações falsas podem ser usadas para simular
diferentes cenários.

Na camada de infraestrutura, é possível implementar a lógica de autenticação real, que pode
envolver integração com sistemas externos, como um serviço de autenticação, por exemplo.
Dessa forma, as camadas de aplicação e de domínio não precisam saber os detalhes de implementação
da autenticação, apenas chamam os métodos definidos na interface de autenticação, que é
implementada na camada de infraestrutura.

Port and Adapter, também conhecido como Hexagonal Architecture ou Ports and Adapters Architecture, é um padrão de arquitetura de software que busca separar a lógica de negócio (domínio) das implementações técnicas (infraestrutura). Ele foi desenvolvido para facilitar a criação de aplicações escaláveis e sustentáveis, permitindo que o domínio permaneça inalterado mesmo quando as tecnologias e infraestruturas mudam.

O padrão é baseado na ideia de que a aplicação é dividida em duas partes principais: o núcleo (domínio) e as bordas (infraestrutura). O núcleo contém a lógica de negócio e é responsável por definir os conceitos e regras que são aplicáveis ao problema em questão. As bordas, por outro lado, são responsáveis por fornecer as interfaces necessárias para que o domínio possa ser utilizado.

Os "Ports" (portas) referem-se às interfaces que o domínio define para permitir que a infraestrutura se comunique com ele. Por exemplo, uma porta pode ser uma interface que define como salvar um objeto no banco de dados ou como enviar um e-mail. Os "Adapters" (adaptadores), por outro lado, são responsáveis por implementar essas interfaces e conectar o domínio com a infraestrutura específica que está sendo utilizada (banco de dados, serviço de e-mail, etc.).

O padrão de Port and Adapter ajuda a criar uma separação clara entre a lógica de negócio e as implementações técnicas, tornando a aplicação mais fácil de entender, manter e evoluir. Além disso, permite que diferentes infraestruturas possam ser facilmente conectadas ao domínio, facilitando a migração para outras tecnologias no futuro.

// Auth

1. Gerar token e enviar para um emailAdapter

- mailAdpter será uma dependência de AuthService: private mailAdapter: MailAdapter,
- Injetar mailAdpter
- chamar a implementação do mailAdpter no serviço de gerar token e enviar

Então vamos ver se eu entendi, adpters são classes que seguem um modelo de implementação, por exemplo posso ter uma classe definida como "class DomainMailAdapter implements MailAdapter" na qual MailAdpter é uma interface de como deve se comportar tal classe, neste caso a interface diz que a classe deve implementar um determinado método:

```ts
export interface SendMailData {
  subject: string;
  body: string;
}
export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}
```

Assim posso ter multiplas classes que implementam o mesmo método só que com implementações diferentes, porém que devem seguir a interface/contrato de um MailAdapter, e assim posso ter uma classe na camada de infraestrutura chamada NodemailerMailAdapter que implementará tal metódo e posso ter uma DomainMailAdapter no domínio que não utilizará nenhuma biblioteca ou serviço externo, apenas simulará o envio de email:

```ts
export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
      from: "Equipe Feedget <stardusteight.d4cc@gmail.com>",
      to: "stardusteight.d4cc@gmail.com",
      subject,
      html: body,
    });
  }
}

export class DomainMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
    console.log("O email foi enviado, confia!");
  }
}
```

E assim o meu AuthService deve ter um "private mailAdapter: MailAdapter" como dependência,
e assim um método "generateEmailToken" na qual vai chamar o método de MailAdapter passado como dependência:

```ts
const token = generateToken();

await this.mailAdapter.sendMail({
  subject: "Novo feedback",
  body: [
    `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
    `Aqui está seu token de acesso: ${token}`,
    `</div>`,
  ].join("\n"),
});
```

Mas que no caso do mailAdapter do domínio eu posso passar uma classe que implementa o método falso, certo?

Sim, você entendeu corretamente. Os adapters são classes que implementam uma interface definida pelo domínio, e são responsáveis por adaptar a funcionalidade da camada de infraestrutura para a camada de domínio, de modo que a camada de domínio não precise saber sobre a implementação da camada de infraestrutura. Eles fornecem uma maneira de se comunicar entre as camadas sem vazamento de abstração.

No seu exemplo, você tem duas classes diferentes que implementam a interface MailAdapter, cada uma com uma implementação diferente do método sendMail(). Na camada de domínio, você pode usar a classe DomainMailAdapter, que fornece uma implementação simulada do envio de email. E na camada de infraestrutura, você pode usar a classe NodemailerMailAdapter, que usa o serviço do Nodemailer para enviar o email de fato.

Ao injetar a dependência do adaptador de email na classe de serviço de autenticação, você pode trocar facilmente entre as implementações do adaptador, dependendo das necessidades da sua aplicação. Se você estiver em um ambiente de desenvolvimento, pode usar a implementação simulada para evitar o envio real de emails, e se estiver em produção, pode usar a implementação real que usa o serviço do Nodemailer.

---

Então eu poderia fazer este mesmo conceito para login e  e varificação de sessões do usuário certo?

Sim, o mesmo conceito pode ser aplicado para outros recursos que sua aplicação precise, como por exemplo a autenticação e verificação de sessão do usuário. Você pode criar uma interface que defina como esses recursos devem se comportar e então implementar diferentes adaptadores para cada uma dessas interfaces, dependendo das necessidades da sua aplicação.

Por exemplo, você pode criar uma interface chamada AuthAdapter que defina métodos como login, logout e getSession, e então ter diferentes implementações dessa interface para lidar com diferentes sistemas de autenticação e verificação de sessão.

Na camada de domínio, você pode criar uma classe AuthService que depende da interface AuthAdapter como uma de suas dependências e utiliza os métodos dessa interface para lidar com a autenticação e verificação de sessão. Na camada de infraestrutura, você pode implementar diferentes adaptadores para diferentes sistemas de autenticação e verificação de sessão, como por exemplo uma classe que utilize o Firebase Authentication e outra que utilize o Passport.js.





use-cases podem ficar na camada de aplicação?

Sim, os casos de uso (use-cases) podem ser implementados na camada de aplicação em uma arquitetura de software baseada em DDD. O objetivo da camada de aplicação é orquestrar a execução dos casos de uso e coordenar a interação entre as camadas de domínio e de infraestrutura.

Os casos de uso representam as ações que um usuário ou um sistema pode executar em relação ao domínio do negócio, e sua implementação pode envolver a interação com as camadas de domínio e infraestrutura para realizar tais ações. Na implementação dos casos de uso, a camada de aplicação pode fazer uso de serviços, adaptadores e outras classes da camada de infraestrutura, desde que sejam encapsulados por interfaces bem definidas.

No entanto, é importante ressaltar que a camada de aplicação não deve conter lógica de negócio ou detalhes de implementação relacionados ao domínio, uma vez que isso deve ser tratado pela camada de domínio. A camada de aplicação deve se concentrar em coordenar a execução dos casos de uso e na interação com as outras camadas, seguindo os princípios de separação de responsabilidades e isolamento de dependências.