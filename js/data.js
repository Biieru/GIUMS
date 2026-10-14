/* ============================================================
   GIUMS — conteúdo editável
   Tudo que muda com frequência mora aqui: status das comissões,
   preços, links e a lista da galeria.

   Para trocar um placeholder por arte real:
   1. coloque o arquivo em assets/art/  (ex.: assets/art/dragao-lava.jpg)
   2. no item da galeria, troque  src: null  por  src: 'assets/art/dragao-lava.jpg'
   ============================================================ */

const SITE = {
  commissionsOpen: false,        // true => badge verde "Open"
  priceSheetUpdated: '02/2026',  // data da tabela de preços dela
  usdToBrl: 4.99,                // cotação USD→BRL usada para converter os preços
  rateDate: '2026-10-09',        // data dessa cotação (AAAA-MM-DD) — atualize junto com usdToBrl
  email: '',                     // preencha para exibir o e-mail na seção de contato
  links: {
    instagram: 'https://www.instagram.com/giums/',
    patreon:   'https://www.patreon.com/giums',
    kofi:      'https://ko-fi.com/giumsart',
    loja:      'https://giums.lojavirtualnuvem.com.br/',
    discord:   'https://discord.gg/A27tX44ba8',
    deviantart:'https://giums.deviantart.com/',
    twitter:   'https://twitter.com/giums1',
    twitch:    'https://www.twitch.tv/giums',
    oldsite:   'https://giums.weebly.com/'
  }
};

/* tone = paleta do placeholder: ember | violet | crimson | bone | toxic
   ratio = proporção da peça (largura / altura)
   featured = aparece na faixa de artes logo abaixo do hero (não use em 18+) */
const WORKS = [
  { id: 1,  title: { en: 'Molten Wyrm',        pt: 'Wyrm de Lava' },       cat: ['creatures'],            ratio: '4/5',  tone: 'ember',   src: null, featured: true },
  { id: 2,  title: { en: 'Horned Knight',      pt: 'Cavaleira Chifruda' }, cat: ['characters'],           ratio: '3/4',  tone: 'crimson', src: null, featured: true },
  { id: 3,  title: { en: 'Ash Valley',         pt: 'Vale de Cinzas' },     cat: ['concept'],              ratio: '16/10',tone: 'violet',  src: null, featured: true },
  { id: 4,  title: { en: 'Bone Oracle',        pt: 'Oráculo de Ossos' },   cat: ['characters', 'ocs'],    ratio: '4/5',  tone: 'bone',    src: null, featured: true },
  { id: 5,  title: { en: 'Creature Sheet I',   pt: 'Folha de Criatura I' },cat: ['creatures', 'concept'], ratio: '1/1',  tone: 'toxic',   src: null, featured: true },
  { id: 6,  title: { en: 'Sketchbook Pages',   pt: 'Páginas do Sketchbook' },cat: ['traditional'],        ratio: '3/4',  tone: 'bone',    src: null },
  { id: 7,  title: { en: 'Drakeborn Duo',      pt: 'Dupla Draconiana' },   cat: ['characters', 'ocs'],    ratio: '4/5',  tone: 'ember',   src: null, featured: true },
  { id: 8,  title: { en: 'Ink & Ember',        pt: 'Tinta & Brasa' },      cat: ['traditional'],          ratio: '1/1',  tone: 'crimson', src: null },
  { id: 9,  title: { en: 'Throne Ruins',       pt: 'Ruínas do Trono' },    cat: ['concept'],              ratio: '16/10',tone: 'violet',  src: null, featured: true },
  { id: 10, title: { en: 'Anatomy Study',      pt: 'Estudo de Anatomia' }, cat: ['characters'],           ratio: '3/4',  tone: 'bone',    src: null, featured: true },
  { id: 11, title: { en: 'After Dark',         pt: 'Depois do Escuro' },   cat: ['nsfw', 'characters'],   ratio: '4/5',  tone: 'crimson', src: null, nsfw: true },
  { id: 12, title: { en: 'Scale & Silk',       pt: 'Escama & Seda' },      cat: ['nsfw', 'ocs'],          ratio: '1/1',  tone: 'violet',  src: null, nsfw: true }
];

/* [nome EN, nome PT, preço USD]  — BRL = USD × usdToBrl */
const SERVICES = [
  {
    id: 'sketch',
    name: { en: 'Linearts / Sketches', pt: 'Linearts / Sketches' },
    note: { en: 'Blank background, no changes. Half & full body may use blank or blackbox.', pt: 'Fundo em branco, sem alterações. Meio corpo e corpo inteiro: fundo branco ou blackbox.' },
    nsfw: '+30%',
    rows: [
      [ 'Bust', 'Busto', 40 ],
      [ 'Half body', 'Meio corpo', 70 ],
      [ 'Full body', 'Corpo inteiro', 95 ]
    ]
  },
  {
    id: 'colored',
    name: { en: 'Colored Lineart', pt: 'Lineart Colorido' },
    note: { en: 'Flat or gradient painting.', pt: 'Pintura chapada ou em degradê.' },
    nsfw: '+50%',
    rows: [
      [ 'Portrait', 'Retrato', 85 ],
      [ 'Half body', 'Meio corpo', 140 ],
      [ 'Full body', 'Corpo inteiro', 160 ]
    ]
  },
  {
    id: 'painting',
    name: { en: 'Painting', pt: 'Pintura' },
    note: { en: 'Full rendering. Portraits include a simple background.', pt: 'Renderização completa. Retratos incluem fundo simples.' },
    nsfw: '+50%',
    rows: [
      [ 'Portrait', 'Retrato', 110 ],
      [ 'Half body', 'Meio corpo', 200 ],
      [ 'Full body', 'Corpo inteiro', 300 ]
    ]
  },
  {
    id: 'designs',
    name: { en: 'Sheets & Designs', pt: 'Sheets & Designs' },
    note: { en: 'Reference sheets are not always available — ask first.', pt: 'Reference sheets nem sempre estão disponíveis — pergunte antes.' },
    nsfw: '+50%',
    rows: [
      [ 'Sketch sheet (2–3 sketches)', 'Sketch sheet (2–3 sketches)', 190 ],
      [ 'Custom OC', 'OC customizado', 150 ],
      [ 'Reference sheet', 'Reference sheet', 240 ]
    ]
  }
];

const ADDONS = [
  { en: 'Companions (familiars, animals, steeds)', pt: 'Companheiros (familiares, animais, montarias)', val: '+25%' },
  { en: 'Frame or simple background',              pt: 'Moldura ou fundo simples',                     usd: 50 },
  { en: 'Painted background',                      pt: 'Fundo pintado',                                usd: 100 },
  { en: 'Complexity (exceptional cases)',          pt: 'Complexidade (casos excepcionais)',            val: 'up to +50%' },
  { en: 'Alteration — minor',                      pt: 'Alteração — pequena',                          usd: 20 },
  { en: 'Alteration — medium',                     pt: 'Alteração — média',                            usd: 50 },
  { en: 'Alteration — major',                      pt: 'Alteração — grande',                           usd: 70 },
  { en: 'Reference sheet: extra outfit',           pt: 'Reference sheet: roupa extra',                 usd: 80 },
  { en: 'Reference sheet: weapon design',          pt: 'Reference sheet: design de arma',              usd: 80 },
  { en: 'Reference sheet: body details (1–3 close-ups)', pt: 'Reference sheet: detalhes do corpo (1–3 close-ups)', usd: 50 },
  { en: 'Reference sheet: inventory',              pt: 'Reference sheet: inventário',                  usd: 100 }
];
