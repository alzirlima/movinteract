# 🎬 Movinteract — Catálogo de Filmes Interativo

Aplicação web desenvolvida em **React** integrada à API oficial do **The Movie Database (TMDb)**. Este projeto foi concebido como trabalho prático individual da disciplina **T242 - Desenvolvimento Plataformas Web**, ministrada pelo Prof. Bruno Lopes no Centro de Ciências Tecnológicas da Universidade de Fortaleza (UNIFOR).

---

## 📌 Sumário
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades e Entregáveis](#-funcionalidades-e-entregáveis)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura de Pastas](#-arquitetura-de-pastas)
- [Instalação e Execução](#-instalação-e-execução)
- [Configuração de Variáveis de Ambiente](#-configuração-de-variáveis-de-ambiente)
- [Decisões Técnicas de Engenharia](#-decisões-técnicas-de-engenharia)
- [Uso Ético de Inteligência Artificial](#-uso-ético-de-inteligência-artificial)
- [Autor](#-autor)

---

## 📖 Sobre o Projeto
O **Movinteract** é uma Single Page Application (SPA) que permite explorar filmes em alta no cinema, pesquisar títulos em tempo real com validação de formulários, consultar fichas técnicas detalhadas e gerenciar uma lista persistente de títulos favoritos diretamente no navegador.

---

## 🚀 Funcionalidades e Entregáveis

O projeto cumpre os cinco marcos de entrega estipulados no plano de ensino:

1. **Entregável 1: Layout Base e Sistema de Rotas SPA**
   - Roteamento completo com `react-router-dom` (`BrowserRouter`, `Routes`, `Route`).
   - Layout com `<header>` e `<footer>` compartilhados utilizando `<Outlet />`.
   - Navegação com `NavLink` aplicando destaque visual exclusivo para rota ativa (`isActive`).
   - Página 404 amigável (`*`) com botão de retorno à rota raiz.

2. **Entregável 2: Página Inicial — Filmes Populares (`/`)**
   - Consumo do endpoint `/movie/popular` do TMDb via `fetch` assíncrono.
   - Execução controlada com `useEffect` e array de dependências vazio (`[]`).
   - Gerenciamento dos estados de dados, carregamento (*loading*) e tratamento de erros com `useState`.
   - Componente reutilizável `MovieCard` recebendo dados via `props` e renderizado via `.map()` com chave única baseada no ID do filme.

3. **Entregável 3: Página de Detalhes (`/filme/:id`)**
   - Rota dinâmica capturando o identificador do filme através do hook `useParams`.
   - Disparo de requisição assíncrona ao endpoint `/movie/{id}` com dependência explícita `[id]` no `useEffect`.
   - Navegação programática via histórico do navegador (`useNavigate(-1)`) no botão de retorno.
   - Exibição de pôster em alta resolução, nota média, data de lançamento, gêneros e sinopse.

4. **Entregável 4: Página de Busca (`/busca`)**
   - Formulário controlado com `useState`, `value` e `onChange`.
   - Intercepção de envio com `onSubmit` e bloqueio de recarregamento com `e.preventDefault()`.
   - Validação impedindo pesquisas vazias ou com espaços em branco através do método `.trim()`.
   - Feedback visual imediato na tela em caso de falha de validação ou ausência de resultados.

5. **Entregável 5: Favoritos e Persistência Local (`/favoritos`)**
   - Sistema de favoritos que respeita a **imutabilidade de estado**: adição com *spread operator* (`[...]`) e remoção com `.filter()`.
   - Persistência no navegador através da Web Storage API (`localStorage.getItem` e `localStorage.setItem`) com serialização `JSON`.
   - Gerenciamento de contexto centralizado via `<Outlet context={{ favoritos, alternarFavorito }} />` e hook `useOutletContext()`.
   - Tratamento de interface amigável quando a lista de favoritos estiver vazia.

---

## 🛠️ Tecnologias Utilizadas

- **[React](https://react.dev/) (v18+)**: Biblioteca para construção de interfaces orientadas a componentes e hooks.
- **[Vite](https://vitejs.dev/)**: Ferramenta de build e servidor de desenvolvimento de alta performance.
- **[React Router DOM](https://reactrouter.com/) (v6+)**: Gerenciamento de rotas e navegação declarativa em SPA.
- **[TMDb API (v3)](https://developer.themoviedb.org/docs)**: Fonte de dados de catálogo cinematográfico.
- **CSS3 Moderno**: Layouts responsivos construídos com Flexbox e CSS Grid.

---

## 📂 Arquitetura de Pastas

```text
movinteract/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Estrutura base com Header, Outlet e Footer
│   │   ├── Navbar.jsx          # Barra de navegação com NavLink e isActive
│   │   └── MovieCard.jsx       # Card reutilizável de apresentação e favoritos
│   ├── pages/
│   │   ├── Home.jsx            # Listagem de filmes populares
│   │   ├── Detalhes.jsx        # Ficha detalhada do filme com useParams
│   │   ├── Busca.jsx           # Formulário controlado e listagem de busca
│   │   ├── Favoritos.jsx       # Lista de filmes salvos via localStorage
│   │   └── NaoEncontrada.jsx   # Página de erro 404 amigável
│   ├── App.css                 # Folha de estilos consolidada (Grid, Flexbox, UI)
│   ├── index.css               # Reset estrutural e variáveis globais
│   ├── App.jsx                 # Configuração de rotas da aplicação
│   └── main.jsx                # Ponto de entrada e montagem no DOM
├── .env.example                # Exemplo de configuração de variáveis de ambiente
├── .gitignore                  # Arquivos desconsiderados pelo versionamento (inclui .env e node_modules)
├── index.html
├── package.json
└── README.md
```

---

## ⚙️ Instalação e Execução

### Pré-requisitos
- **Node.js** (versão 18 ou superior instalada)
- Gerenciador de pacotes **npm**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/movinteract.git
   cd movinteract
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as credenciais da API:**
   Crie um arquivo `.env` na raiz do projeto (mesmo nível do `package.json`):
   ```bash
   cp .env.example .env
   ```
   Adicione a sua chave obtida no portal do TMDb:
   ```env
   VITE_TMDB_API_KEY=sua_chave_real_aqui
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. Acesse no navegador através do endereço local informado no terminal (normalmente `http://localhost:5173`).

---

## 🔐 Configuração de Variáveis de Ambiente

Por questões de segurança e integridade das credenciais acadêmicas, o arquivo `.env` contendo a chave de acesso da API TMDb **não é versionado no Git** (protegido via `.gitignore`).

Para reproduzir a execução:
1. Registre uma conta gratuita em [themoviedb.org](https://www.themoviedb.org/).
2. Solicite uma chave de API para fins educacionais em **Configurações > API**.
3. Atribua o token à variável `VITE_TMDB_API_KEY` no arquivo `.env`.

---

## 💡 Decisões Técnicas de Engenharia

- **Por que `useEffect` com `[]` na Home e `[id]` em Detalhes?**  
  Na página inicial, a listagem deve ser executada uma única vez quando o componente é montado. Já em `Detalhes`, a dependência `[id]` assegura que, se o usuário navegar entre filmes diferentes sem desmontar a tela, a requisição seja disparada novamente para sincronizar a interface com o novo parâmetro da URL.
- **Imutabilidade nos Favoritos:**  
  O estado do React depende da detecção de novas referências de memória para reagendar a renderização. Métodos mutativos como `.push()` alteram o array original no mesmo endereço de memória. Foi empregado o operador *spread* (`[...]`) para inserções e o método `.filter()` para remoções, produzindo arrays novos de forma previsível e imutável.
- **Inicialização Otimizada com `useState`:**  
  Para evitar leituras síncronas desnecessárias do disco a cada ciclo de renderização, o `localStorage.getItem` é encapsulado dentro de uma função anônima de inicialização preguiçosa (*lazy initialization*): `useState(() => { ... })`.

---

## 📜 Uso Ético de Inteligência Artificial

Este trabalho foi desenvolvido em conformidade com o **Guia de Uso Ético de Inteligência Artificial no Ensino Superior** da Universidade de Fortaleza, adotando os seguintes parâmetros:

- **Nível de Uso:** Nível 2 (Brainstorming e Planejamento) e Nível 3 (Assistência com Revisão e Depuração).
- **Ferramenta Utilizada:** Gemini (Google).
- **Finalidade:** Esclarecimento conceitual sobre ganchos do React Router v6, diagnóstico de erros de compilação de módulos e orientação arquitetural para persistência de dados.
- **Integridade Acadêmica:** Nenhuma credencial foi exposta e todo o código-fonte foi compreendido, implementado e testado pelo estudante, estando apto para a arguição oral com o docente.

A **Declaração de Uso de Inteligência Artificial** correspondente encontra-se arquivada no repositório (`DECLARACAO_USO_IA.md`) e foi devidamente assinada digitalmente com validade jurídica via plataforma **Gov.br**.

---

## 👤 Autor

**Francisco Alzir Lima Júnior**  
Bacharelado em Análise e Desenvolvimento de Sistemas
Centro de Ciências Tecnológicas (CCT) — Universidade de Fortaleza (UNIFOR)
