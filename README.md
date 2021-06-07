# api-fatec-2s-gswatcher-production

Repositório usado para Deploy do projeto GSWatcher.

Para acessar o repositório raiz e conhecer mais sobre o projeto, [clique aqui.](https://github.com/vinicius-hso/api-fatec-2s-gswatcher)

## 
## 🏢 Hospedagem/Deploy no Heroku

###

### DASHBOARD

Acesse a aplicação em produção através do link abaixo:

* *🔗 [https://gswatcher.herokuapp.com/](https://gswatcher.herokuapp.com/)

* *Para verificar o código do deploy do Dashboard, acesse a branch "[Front-End](https://github.com/HarielThums/api-fatec-2s-gswatcher-production/tree/Front-End)"

### 

### API

A API do projeto pode ser acessada pelos seguinte links:

* *⚙️ [https://api-gswatcher.herokuapp.com/](https://api-gswatcher.herokuapp.com/)

* *Para verificar o código do deploy da API, acesse a branch "[Back-End](https://github.com/HarielThums/api-fatec-2s-gswatcher-production/tree/Back-End)"

###

#### Importante ressaltar que os dados da empresa somente serão visíveis, via validação por token.

Tendo em vista a sensibilidade dos dados, esses poderão apenas ser acessados via validação por token, por exemplo, a seguinte rota da API:
[https://api-gswatcher.herokuapp.com/api/projetos](https://api-gswatcher.herokuapp.com/api/projetos)
apresenta todos os projetos inseridos no banco de dados, mas esses só podem ser acessados através do token adquirido por um usuário ativo.
Garantindo assim, a segurança e privacidade das informações contidas na aplicação.


