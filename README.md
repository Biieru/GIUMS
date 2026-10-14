# GIUMS | Artist Portfolio

**Portfólio artístico interativo desenvolvido com HTML, CSS e JavaScript.**

Website criado para apresentar o trabalho de **GIUMS**, artista e ilustradora especializada em personagens, criaturas, concept art e universos de fantasia.

O projeto combina identidade visual personalizada, galeria categorizada, apresentação de serviços e informações comerciais em uma experiência web voltada ao mercado artístico.

## Sobre o projeto

O GIUMS-SITE foi desenvolvido com o objetivo de centralizar a presença profissional da artista, reunindo trabalhos, serviços de ilustração, informações sobre comissões e canais de contato.

A aplicação utiliza tecnologias web nativas, sem dependência de frameworks ou ferramentas de compilação.

## Tecnologias

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estrutura e organização do conteúdo |
| CSS3 | Layout, identidade visual e responsividade |
| JavaScript | Interatividade e gerenciamento de conteúdo |
| Objetos JavaScript | Configuração de serviços, preços e galeria |

## Funcionalidades

### Portfólio artístico

- Galeria organizada por categorias.
- Destaque para trabalhos selecionados.
- Apresentação de personagens, criaturas e concept art.
- Organização de conteúdo artístico tradicional e digital.
- Identificação de conteúdo adulto em categoria específica.

### Comissões e serviços

- Apresentação de modalidades de ilustração.
- Tabelas de preços e serviços adicionais.
- Indicador configurável de disponibilidade para comissões.
- Conversão demonstrativa de preços entre USD e BRL.
- Links para redes sociais, loja e plataformas profissionais.

### Gerenciamento de conteúdo

As informações frequentemente atualizadas são centralizadas em `js/data.js`, permitindo modificar conteúdo sem alterar diretamente a estrutura HTML.

Entre as configurações disponíveis estão:

- Status das comissões.
- Serviços e preços.
- Taxa de câmbio utilizada na conversão.
- Links externos.
- Categorias e trabalhos da galeria.
- Imagens e metadados das obras.

**Observação:** a taxa de câmbio é configurada manualmente e não representa uma cotação em tempo real.

## Estrutura do projeto

```text
GIUMS-SITE/
├── assets/           # Imagens e recursos visuais
├── css/              # Estilos da interface
├── js/               # Scripts e conteúdo configurável
│   └── data.js
├── index.html        # Página principal
├── render.yaml       # Configuração de implantação
└── README.md
```

## Como executar

Clone o repositório:

```bash
git clone https://github.com/Biieru/GIUMS-SITE.git
cd GIUMS-SITE
```

Inicie um servidor local:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000` no navegador.

Não é necessário instalar dependências adicionais.

## Personalização da galeria

Os trabalhos são configurados no array `WORKS`, localizado em `js/data.js`.

Cada registro possui informações como título, categoria, proporção da imagem, estilo visual e destaque.

Para adicionar uma ilustração:

1. Adicione o arquivo de imagem à pasta de recursos apropriada.
2. Localize o trabalho correspondente no array `WORKS`.
3. Substitua `src: null` pelo caminho da imagem.
4. Atualize o título e as categorias conforme necessário.

### Estado atual

A estrutura da galeria está implementada, mas os registros ainda utilizam imagens de demonstração (*placeholders*).

A substituição desses elementos pelas obras definitivas integra as próximas etapas de desenvolvimento.

## Conceitos aplicados

- Desenvolvimento front-end sem frameworks.
- Manipulação do DOM.
- Organização de dados e conteúdo dinâmico.
- Desenvolvimento de interfaces responsivas.
- Criação de galerias e componentes visuais.
- Design orientado à identidade de marca.
- Estruturação de serviços e informações comerciais.
- Separação entre conteúdo configurável e apresentação.

## Melhorias futuras

- Finalização da galeria com obras definitivas.
- Otimização de imagens e carregamento.
- Aprimoramento da acessibilidade.
- Melhorias de SEO.
- Testes de responsividade e navegação.
- Automatização opcional das taxas de câmbio.
- Validação de links externos.
- Aprimoramento da organização dos scripts.

## Créditos

**Desenvolvimento web:** Gabriel Coelho de Araújo.

**Artista e conteúdo artístico:** GIUMS.

As ilustrações e os materiais artísticos apresentados pertencem aos seus respectivos titulares. A disponibilização do código-fonte não concede automaticamente direitos de reutilização das obras.

## Desenvolvedor

**Gabriel Coelho de Araújo**

[GitHub](https://github.com/Biieru) · [Portfólio](https://biieru.github.io/)

---

**HTML5 · CSS3 · JavaScript · Front-end · UI/UX · Web Design**
