/* ============================================================
   Traduções EN / PT.  O HTML já vem em inglês; o PT substitui
   o conteúdo dos elementos com data-i18n="chave".
   ============================================================ */

const I18N = {
  en: {
    'status.closed': 'Commissions closed',
    'status.open': 'Commissions open',
    'status.hint': 'Slots open in seasons — join the Discord to know when.',
    'price.note': 'Base prices · sheet updated {date} · BRL at R$ {rate} per US$ (rate of {rateDate})',
    'nsfw': 'NSFW',
    'adult.title': '18+',
    'adult.hint': 'Click to reveal',
    'img.soon': 'Placeholder'
  },
  pt: {
    'nav.work': 'Trabalhos', 'nav.yathra': 'Yathra', 'nav.commissions': 'Comissões', 'nav.shop': 'Loja', 'nav.about': 'Sobre', 'nav.contact': 'Contato',

    'hero.eyebrow': 'Artista de Personagens &amp; Criaturas',
    'hero.lead': 'Fantasia sombria, mundos draconianos e coisas com dentes demais.',
    'hero.sub': 'Construindo <strong>YATHRA</strong> — um universo original.',
    'hero.cta1': 'Ver os trabalhos', 'hero.cta2': 'Comissões', 'hero.cap': 'Arte de IGNAVRAK! A Respiração do Primeiro Sol!',

    'work.eyebrow': 'Trabalhos selecionados',
    'work.title': 'Presas, escamas &amp; fogo',
    'work.intro': 'Peças digitais e tradicionais — criaturas, personagens, concept art e OCs.',
    'f.all': 'Tudo', 'f.creatures': 'Criaturas', 'f.characters': 'Personagens', 'f.concept': 'Concept', 'f.ocs': 'OCs', 'f.traditional': 'Tradicional',

    'y.eyebrow': 'Um universo original',
    'y.lead': 'Três anos em construção: um projeto de lore &amp; worldbuilding para RPG de mesa. Um mundo draconiano focado em conflitos, relações LGBTQIAP+ e artefatos fantásticos.',
    'y.cta': 'Entrar em YATHRA no Patreon',
    'y.t1': 'Conflitos', 'y.t2': 'Relações LGBTQIAP+', 'y.t3': 'Artefatos fantásticos',

    'c.eyebrow': 'Exemplos &amp; preços', 'c.title': 'Comissões',
    'c.addons': 'Adicionais, alterações &amp; extras',
    'c.rulesT': 'Antes de perguntar',
    'c.r1': 'Os valores são <strong>preços base</strong> — envie os detalhes do design e os adicionais desejados para receber um orçamento exato.',
    'c.r2': 'As vagas são limitadas e abrem em temporadas. Entre no Discord para saber quando abrem.',
    'c.r3': 'Entrega somente digital. Sem itens físicos.',
    'c.r4': 'NSFW disponível por uma porcentagem extra sobre o preço base.',
    'c.cta1': 'Entrar no Discord', 'c.cta2': 'Patreon',

    's.eyebrow': 'Merch físico?', 's.title': 'Leve um pedaço pra casa',
    's.kofi': 'Prints, adesivos e mais — envio internacional.',
    's.lojaT': 'Loja (Brasil)',
    's.loja': 'Camisetas e estampas exclusivas, com envio dentro do Brasil.',
    's.patreon': 'Wallpapers, lore dos OCs, sketches de worldbuilding, WIPs, brushes, adesivos &amp; prints, descontos e o grupo no Discord.',

    'a.eyebrow': 'Sobre', 'a.title': 'Oi, eu sou a Giu c:',
    'a.p1': 'Artista visual brasileira, nascida e criada em São Paulo. Desenho desde criança — começou com criaturas, alimentado por filmes e jogos como StarCraft e World of Warcraft, e depois virou um amor profundo por anatomia humana.',
    'a.p2': 'Autodidata, com bacharelado em Artes Visuais. Hoje vivo de fantasia sombria e alta fantasia, character design e da construção de YATHRA.',
    'a.name': '“Giums” é a abreviação do meu nome — o completo é longo e vive sendo pronunciado errado xD',
    'a.toolsT': 'Ferramentas', 'a.inspT': 'Inspirações', 'a.fromT': 'De', 'a.from': 'São Paulo, Brasil',
    'a.quote': 'Dias de pouca confiança existem. Continue mesmo assim.',

    'ct.eyebrow': 'Diga oi', 'ct.title': 'Vamos falar de dragões',
    'ct.intro': 'Dúvidas, orçamentos ou só quer mostrar seu OC? Me encontre por aqui.',

    'ft.legal': 'Todas as artes © Giums. Por favor, não reposte, redesenhe por cima, use comercialmente nem treine IA com elas sem permissão.',

    'status.closed': 'Comissões fechadas',
    'status.open': 'Comissões abertas',
    'status.hint': 'As vagas abrem em temporadas — entre no Discord para saber quando.',
    'price.note': 'Preços base · tabela atualizada em {date} · BRL na cotação de R$ {rate} por US$ ({rateDate})',
    'nsfw': 'NSFW',
    'adult.title': '18+',
    'adult.hint': 'Clique para revelar',
    'img.soon': 'Placeholder'
  }
};

let LANG = 'en';

function t(key, vars) {
  let s = (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key;
  if (vars) for (const k in vars) s = s.replace('{' + k + '}', vars[k]);
  return s;
}

/* guarda o texto em inglês na primeira troca para poder voltar */
function applyI18n() {
  document.documentElement.lang = LANG === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    const key = el.dataset.i18n;
    el.innerHTML = (LANG === 'pt' && I18N.pt[key]) ? I18N.pt[key] : el.dataset.en;
  });
  document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
}
