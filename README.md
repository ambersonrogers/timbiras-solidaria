# Timbiras Solidária 🏹
> **Tecnologia que encurta distâncias, combate a fome e apoia a agricultura familiar em Timbiras (Maranhão).**

Alinhado ao **Objetivo de Desenvolvimento Sustentável nº 2 da ONU (ODS 2 — Fome Zero e Agricultura Sustentável)**, este projeto representa a entrega da **Atividade Avaliativa 2 (Nota 2)** da disciplina de **Desenvolvimento Web** do Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas da **Universidade Estadual do Maranhão (UEMA)** — Polo Universitário de Timbiras.

---

## 👥 Equipe Timbiranos
- **Amberson Lindoso**
- **Kelly Sousa**
- **Jhony Fernandes**
- **Weldes Reis**

---

## 🌐 Acessos e Demonstração Online
- 🚀 **Aplicação Publicada em Produção:** [https://timbiras-solidaria.vercel.app](https://timbiras-solidaria.vercel.app)
- 💻 **Repositório no GitHub:** [https://github.com/ambersonrogers/timbiras-solidaria](https://github.com/ambersonrogers/timbiras-solidaria)
- 📑 **Slides da Apresentação em PDF Oficial:** [Download do PDF](https://timbiras-solidaria.vercel.app/Relatorio_Atividade_2_Slides.pdf)
- 📊 **Slides da Apresentação Editáveis (PowerPoint PPTX):** [Download do PPTX](https://timbiras-solidaria.vercel.app/Relatorio_Atividade_2_Slides.pptx)
- 🖥️ **Apresentação Online dos Slides (13 Telas):** [Visualizar Slides Web](https://timbiras-solidaria.vercel.app/slides.html)
- 📖 **Relatório Técnico Completo (ABNT):** [RELATORIO_ATIVIDADE_2.md](RELATORIO_ATIVIDADE_2.md)

---

## 📁 Estrutura e Descrição dos Arquivos do Projeto

| Arquivo / Pasta | Tipo / Linguagem | Descrição e Responsabilidade no Projeto |
| :--- | :---: | :--- |
| `package.json` | JSON | Configuração de dependências (React 19, Leaflet, Bootstrap) e scripts npm de automação (`dev`, `build`, `lint`). |
| `package-lock.json` | JSON | Bloqueio de versões exatas da árvore de dependências instaladas via Node Package Manager. |
| `vite.config.js` | JavaScript | Configuração do empacotador Vite e do plugin oficial para React. |
| `vercel.json` | JSON | Regras de reescrita de rotas para deploy contínuo em nuvem como Single Page Application na Vercel. |
| `index.html` | HTML5 | Ponto de entrada do navegador, metadados de visualização e container principal `#root` da aplicação React. |
| `RELATORIO_ATIVIDADE_2.md` | Markdown | Relatório técnico acadêmico detalhado nas normas ABNT com o memorial descritivo completo da Nota 2. |
| `Relatorio_Atividade_2_Slides.pdf` | Documento PDF | Apresentação oficial da Atividade 2 formatada em 13 lâminas 16:9 de acordo com a ABNT. |
| `Relatorio_Atividade_2_Slides.pptx` | Microsoft PowerPoint | Apresentação em slides totalmente editável (.pptx) para a defesa e ajustes presenciais. |
| `slides.html` | HTML5/CSS3 | Visualizador web dos slides para apresentação direta através de qualquer navegador web. |
| `README.md` | Markdown | Documentação principal com visão geral, links de acesso e guia de execução da aplicação. |
| `src/` | Diretório (JSX/CSS) | Código-fonte da aplicação React: componentes modulares, estilos visuais e gerenciamento de estado. |
| `public/` | Diretório (Estáticos) | Recursos estáticos servidos diretamente na raiz do servidor (áudio, slides e imagens). |
| `img/` | Diretório (Mídia) | Galeria de fotografias reais da iniciativa e capturas de tela comprobatórias da aplicação. |
| `.gitignore` | Configuração Git | Definição de arquivos e diretórios ignorados pelo controle de versão Git (ex.: `node_modules`). |
| `.oxlintrc.json` | JSON | Configuração de regras estritas de análise estática de código e conformidade com boas práticas. |

---

## 📸 Evidências Visuais da Aplicação

| 1. Início e Painel de Metas | 2. Consumo em Tempo Real da API do IBGE |
|:---:|:---:|
| ![Início Desktop](./img/captura_desktop.png) | ![API do IBGE](./img/captura_api_ibge.png) |

| 3. Formulário Solidário & PIX | 4. Transparência por Bairro | 5. Responsividade Mobile |
|:---:|:---:|:---:|
| ![Doação](./img/captura_doacao.png) | ![Prestação de Contas](./img/captura_prestacao_contas.png) | ![Mobile](./img/captura_mobile_menu.png) |

---

## 🛠️ Tecnologias e Recursos Desenvolvidos

- **React 19 & Vite:** Arquitetura Single Page Application (SPA), componentização modular, divisão de responsabilidades e hooks (`useState`, `useEffect`, `useRef`, `useMemo`).
- **Consumo de API Pública Governamental (IBGE):**
  - Endpoint oficial: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/MA/municipios`
  - Requisição assíncrona com **Fetch API** e tratamento resiliente de conexões lentas (estados de carregamento, erro amigável, botão de retry e proteção com `AbortController`).
  - Apresentação visual de Códigos Oficiais do IBGE de 7 dígitos e microrregiões geográficas.
- **Cartografia com Leaflet:** Mapa interativo integrado com animação de foco (`mapa.flyTo`) ao selecionar cidades parceiras da Região dos Cocais.
- **Interatividade Humana e DOM:**
  - Validação inteligente de campos obrigatórios com emissão instantânea de **Recibo Solidário Digital** (`REC-XXXXXX`).
  - Busca instantânea nos 13 bairros e na Zona Rural com normalização de acentos ortográficos.
  - Seleção rápida de doação por chips com um clique ('1 Cesta', '2 Cestas', etc.).
  - Cópia instantânea da chave PIX solidária institucional via **Clipboard API**.
  - Player de acolhimento com a canção *Imagine*, com controle de volume deslizante, equalizador animado e botão de recolhimento.
  - Menu móvel expansível que fecha automaticamente ao selecionar qualquer item.
- **Persistência Local:** Gravação do saldo de arrecadação no `localStorage`.

---

## 💻 Como Rodar o Projeto na Sua Máquina

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/ambersonrogers/timbiras-solidaria.git
   cd timbiras-solidaria
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra no navegador pelo endereço informado (ex.: `http://localhost:5173`).

4. **Compilar para produção e rodar análise de código:**
   ```bash
   npm run build
   npm run lint
   ```

---

## 🎓 Vínculo Acadêmico
Trabalho desenvolvido para a disciplina de **Desenvolvimento Web**, sob as diretrizes avaliativas da **Universidade Estadual do Maranhão (UEMA)**. Todos os direitos reservados à **Equipe Timbiranos** (2024–2026).
