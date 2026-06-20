# Analytics Hub: Dashboard Integrado para Análise de Dados Acadêmicos

## Descrição do Projeto

O **Analytics Hub** é uma aplicação web interativa desenvolvida para facilitar a análise e gestão de dados acadêmicos, com foco em artigos científicos, autores e palavras-chave. A plataforma permite a importação de metadados de artigos (especificamente no formato CSV da Scopus), a visualização de métricas chave através de um dashboard dinâmico e a exploração de relações entre os dados.

Este projeto visa oferecer uma ferramenta robusta para pesquisadores, bibliotecários e analistas que necessitam processar grandes volumes de dados bibliográficos, identificar tendências, mapear redes de colaboração e gerenciar informações de forma eficiente.

## Funcionalidades Principais

O Analytics Hub é composto por diversos módulos interconectados, cada um com um propósito específico:

### 🏠 Dashboard Geral

Uma visão panorâmica do sistema, apresentando Key Performance Indicators (KPIs) e gráficos interativos:

*   **KPIs:** Número total de artigos indexados, autores mapeados e termos de pesquisa identificados.
*   **Gráficos:**
    *   **Evolução de Publicações por Ano:** Tendência do volume de artigos publicados ao longo do tempo.
    *   **Citações por Ano:** Análise da influência dos artigos com base no número de citações.
    *   **Top 10 Periódicos:** Ranking dos periódicos mais frequentes na base de dados.
    *   **Top 10 Autores:** Identificação dos autores mais prolíficos.
*   **Interatividade:** Todos os gráficos permitem 
drill-down para listar os artigos relacionados.

### 📄 Artigos e Publicações

Este módulo permite visualizar, editar e limpar metadados de artigos através de um data grid. As funcionalidades incluem:

*   **Visualização e Edição:** Interface para consultar e modificar os detalhes dos artigos.
*   **Limpeza e Padronização de Dados:** Pipelines automatizados para:
    *   Excluir registros sem resumo (abstract).
    *   Consolidar ISSN/ISBN e ocultar colunas brutas.
    *   Preencher `Access_Type` com 'SEM DADOS' quando ausente.
    *   Preencher DOI ausente.

### 👥 Rede de Autores

Um módulo dedicado à exploração de autores e suas colaborações:

*   **Consulta de Pesquisadores:** Listagem de autores e suas informações.
*   **Grafo de Coautoria:** Geração de um grafo interativo (Top 50) utilizando Vis Network para visualizar as relações de coautoria entre os pesquisadores.
*   **Drill-down:** Ao clicar em um nó do grafo, é possível listar as publicações associadas ao autor.

### 🔑 Análise de Tendências (Palavras-chave)

Focado na análise semântica e tendências de pesquisa:

*   **Nuvem de Palavras Interativa:** Visualização das 50 palavras-chave mais frequentes, com cores e tamanhos proporcionais à sua ocorrência, utilizando a biblioteca WordCloud2.js.
*   **Frequência de Termos:** Cálculo da frequência de ocorrência de palavras-chave.
*   **Drill-down:** Ao clicar em uma palavra na nuvem, são listados os artigos relacionados a esse termo.
*   **Controles de Visualização:** Opções para alterar o formato (círculo, quadrado, triângulo) e a proporção de rotação das palavras na nuvem.
*   **Exportação:** Funcionalidade para exportar a nuvem de palavras como imagem PNG.

### ☁️ Pipeline de Importação

Um módulo essencial para a ingestão e gestão inicial dos dados:

*   **Importação de CSV:** Carregamento de arquivos CSV (formato Scopus) com metadados de artigos.
*   **Processamento de Dados:** O pipeline de importação realiza a inserção e normalização dos dados nas tabelas de Artigos, Autores e Palavras-chave, incluindo a criação de relações entre eles.
*   **Zona de Risco:** Funcionalidade para redefinir completamente o banco de dados, apagando todos os dados e reiniciando os IDs (requer confirmação dupla e uma função RPC no Supabase).

## Tecnologias Utilizadas

O projeto Analytics Hub é construído com as seguintes tecnologias:

*   **Frontend:**
    *   **HTML5, CSS3, JavaScript:** Base da aplicação web.
    *   **Pico.css:** Framework CSS minimalista para estilização e responsividade.
    *   **Chart.js:** Biblioteca para criação de gráficos interativos no dashboard.
    *   **WordCloud2.js:** Biblioteca para geração de nuvens de palavras interativas.
    *   **Vis Network:** Utilizada para a visualização de grafos de coautoria.
    *   **PapaParse:** Biblioteca para parsing de arquivos CSV no lado do cliente.
    *   **jsPDF:** Para exportação de gráficos em formato PDF.
*   **Backend/Banco de Dados:**
    *   **Supabase:** Plataforma de backend como serviço (BaaS) que oferece banco de dados PostgreSQL, autenticação e APIs em tempo real. Utilizado para armazenamento e gestão dos dados.
    *   **Funções RPC (Supabase):** Para operações de banco de dados mais complexas, como a redefinição total do sistema.

## Estrutura do Projeto

O repositório `AnaliseDados` está organizado da seguinte forma:

```
AnaliseDados/
├── artigos.html             # Módulo de gestão e limpeza de artigos
├── autores.html             # Módulo de gestão de autores e grafo de coautoria
├── config.js                # Configurações do Supabase (URL e Key)
├── global.css               # Estilos CSS globais da aplicação
├── importar.html            # Módulo de importação de CSV e reset de dados
├── index.html               # Dashboard principal com KPIs e gráficos
├── palavras-chave.html      # Módulo de análise de palavras-chave e nuvem de palavras
└── supabase-client.js       # Cliente Supabase e utilitários de feedback (toasts)
```

## Como Executar o Projeto Localmente

Para configurar e executar o Analytics Hub em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

*   Um navegador web moderno (Chrome, Firefox, Edge, Safari).
*   Acesso a uma instância do **Supabase**.

### Configuração do Supabase

1.  **Crie um novo projeto no Supabase:** Acesse [Supabase](https://supabase.com/) e crie um novo projeto.
2.  **Obtenha as credenciais:** No seu projeto Supabase, vá em `Project Settings > API` e copie a `Project URL` e a `anon public` `Project API key`.
3.  **Configure o `config.js`:** No arquivo `AnaliseDados/config.js`, substitua os placeholders com suas credenciais:

    ```javascript
    // config.js
    export const SUPABASE_URL = 'SUA_URL_DO_SUPABASE';
    export const SUPABASE_KEY = 'SUA_CHAVE_ANON_PUBLIC_DO_SUPABASE';
    ```

4.  **Crie as tabelas no Supabase:** O projeto espera as seguintes tabelas no seu banco de dados PostgreSQL do Supabase. Você pode criá-las manualmente ou usar scripts SQL (se disponíveis no projeto original, o que não foi fornecido na análise).

    *   `Article`
    *   `Author`
    *   `Keyword`
    *   `Article_Author` (tabela de junção)
    *   `Article_keyword` (tabela de junção)

    **Exemplo de esquema básico (adaptar conforme necessário):**

    ```sql
    -- Tabela Article
    CREATE TABLE Article (
        ID SERIAL PRIMARY KEY,
        Title TEXT,
        Year INT,
        Source_Title TEXT,
        Quotation INT,
        DOI TEXT,
        Link TEXT,
        Abstract TEXT,
        ISSN TEXT,
        ISBN TEXT,
        Language TEXT,
        Document_Type TEXT,
        Access_Type TEXT
    );

    -- Tabela Author
    CREATE TABLE Author (
        ID TEXT PRIMARY KEY, -- ID do autor da Scopus
        Name TEXT,
        Full_Name TEXT
    );

    -- Tabela Keyword
    CREATE TABLE Keyword (
        ID SERIAL PRIMARY KEY,
        Keyword TEXT UNIQUE
    );

    -- Tabela de Junção Article_Author
    CREATE TABLE Article_Author (
        ID_Article INT REFERENCES Article(ID) ON DELETE CASCADE,
        ID_Author TEXT REFERENCES Author(ID) ON DELETE CASCADE,
        PRIMARY KEY (ID_Article, ID_Author)
    );

    -- Tabela de Junção Article_keyword
    CREATE TABLE Article_keyword (
        ID_Article INT REFERENCES Article(ID) ON DELETE CASCADE,
        ID_Keyword INT REFERENCES Keyword(ID) ON DELETE CASCADE,
        PRIMARY KEY (ID_Article, ID_Keyword)
    );
    ```

5.  **Crie a função RPC `truncate_all_tables` (Opcional, para a Zona de Risco):**

    No editor SQL do Supabase, crie a seguinte função para permitir a redefinição completa do banco de dados:

    ```sql
    CREATE OR REPLACE FUNCTION truncate_all_tables()
    RETURNS void AS $$
    DECLARE
        tablename text;
    BEGIN
        FOR tablename IN
            SELECT matviewname FROM pg_matviews WHERE schemaname = 'public' UNION ALL
            SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'sql_%'
        LOOP
            EXECUTE 'TRUNCATE TABLE ' || quote_ident(tablename) || ' RESTART IDENTITY CASCADE';
        END LOOP;
    END;
    $$ LANGUAGE plpgsql;
    ```

### Execução Local

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/CaiqueSil/AnaliseDados.git
    cd AnaliseDados
    ```

2.  **Abra os arquivos HTML:** Como este é um projeto frontend puro, você pode abrir os arquivos `index.html`, `artigos.html`, `autores.html`, `palavras-chave.html` ou `importar.html` diretamente no seu navegador. Não é necessário um servidor web para o desenvolvimento local, embora um servidor simples (como o `live-server` do VS Code) possa ser útil para recarregamento automático.

    *   Para o dashboard principal: `file:///caminho/para/AnaliseDados/index.html`

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues para sugestões de melhoria, relatar bugs ou enviar pull requests com novas funcionalidades.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes. (Assumindo licença MIT, caso contrário, ajustar).

## Autor

**Manus AI** (Gerado para CaiqueSil)

---

**Nota:** Este README foi gerado automaticamente com base na análise do código-fonte do repositório. Algumas seções, como a licença e detalhes específicos de contribuição, podem precisar de ajustes manuais pelo proprietário do projeto.
