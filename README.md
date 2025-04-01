# Desaparecidos App

## Dados de Inscrição
- **Nome**: Leony Tamio Hatakeyama
- **Email**: leonytamio@gmail.com

## Sobre o Projeto
Este é um projeto prático desenvolvido como parte do processo seletivo para o perfil de Desenvolvedor Front-end. A aplicação é uma **Single Page Application (SPA)** que consome a API pública da Polícia Judiciária Civil de Mato Grosso (`https://abitus-api.geia.vip/api/v1/pessoas`) para listar pessoas desaparecidas, exibir detalhes de cada caso e permitir o envio de informações por cidadãos. O projeto foi implementado com foco em responsividade, componentização e boas práticas de desenvolvimento.

### Funcionalidades
1. **Tela Inicial**:
   - Lista pessoas desaparecidas ou localizadas em cards com imagem, nome, sexo, idade e status.
   - Paginação com 10 itens por página e controles de "Anterior" e "Próximo".
   - Campo de pesquisa por nome com atualização dinâmica.
2. **Tela de Detalhamento**:
   - Exibe informações detalhadas de uma pessoa, com destaque visual para o status (desaparecido ou localizado).
   - Inclui dados da última ocorrência, como datas e vestimentas.
3. **Tela de Envio de Informações**:
   - Formulário para envio de informações sobre uma pessoa, com campos para texto, local, data (com máscara) e upload de foto.

## Tecnologias Utilizadas
- **Angular 19**: Framework principal, utilizando **standalone components** para uma arquitetura moderna e sem módulos tradicionais.
- **TypeScript**: Linguagem para tipagem estática e segurança no código.
- **Tailwind CSS**: Framework CSS para estilização responsiva e design limpo.
- **ngx-mask**: Biblioteca para aplicar máscaras no campo de data do formulário.
- **HttpClient**: Módulo nativo do Angular para requisições HTTP em tempo real à API.
- **Docker**: Containerização para empacotar a aplicação e suas dependências.
- **Git**: Controle de versão, hospedado no GitHub.

## Como o Projeto Foi Feito
O desenvolvimento seguiu os seguintes passos:
1. **Estruturação**: Criado com `ng new desaparecidos-app --standalone --style=css`, utilizando standalone components para eliminar a necessidade de `NgModule`.
2. **Modelos**: Definidos em `src/app/models/pessoa.ts` com interfaces TypeScript para `Pessoa` e `InfoSubmission`, além de enums para `Sexo` e `TipoCartaz`.
3. **Serviço**: Implementado em `src/app/services/pessoa.service.ts` para consumir a API com métodos para listar pessoas, obter detalhes e enviar informações.
4. **Componentes**:
   - `header` e `footer`: Componentes globais adicionados ao `app.component` para navegação e informações fixas.
   - `pessoa-card`: Componente reutilizável para exibir cada pessoa na lista.
   - `pessoa-lista`: Tela inicial com paginação e pesquisa.
   - `pessoa-detalhe`: Tela de detalhamento com destaque ao status.
   - `dialog`: Formulário para envio de informações.
5. **Roteamento**: Configurado em `app.routes.ts` com **Lazy Loading** para carregar as telas sob demanda.
6. **Estilização**: Usado Tailwind CSS para um layout responsivo, com grid para cards e flexbox para header/footer.
7. **Containerização**: Criado um `Dockerfile` para build e deploy com Nginx.

## Pré-requisitos para Rodar
- **Node.js**: Versão 22 ou superior.
- **npm**: Versão compatível com o Node.js.
- **Docker**: Para rodar em container.
- **Git**: Para clonar o repositório.

## Passo a Passo para Rodar o Projeto

### Opção 1: Rodar Localmente
1. **Clone o Repositório**:
   git clone https://github.com/leonytamio/seletivo-SEPLAG.git <br/>
   cd desaparecidos-app
2. **Instale as Dependências**:
   npm install
3. **Execute a Aplicação**:
   ng serve
3. **Acesse no Navegador**:
   Abra http://localhost:4200 para ver a aplicação.

### Opção 2: Rodar com Docker
1. **Clone o Repositório**:
   git clone https://github.com/leonytamio/seletivo-SEPLAG.git <br/>
   cd desaparecidos-app
2. **Construa a Imagem Docker**:
   docker build -t desaparecidos-app .
3. **Execute o Container**:
   docker run -p 80:80 desaparecidos-app
3. **Acesse no Navegador**:
   Abra http://localhost para ver a aplicação.
