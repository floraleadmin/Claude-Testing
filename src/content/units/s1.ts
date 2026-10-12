// Section 1 – Erste Schritte (A1)
import { A, C, N, NP, P, Q, S, T, V, W, story, unit } from '../dsl';

const u01 = unit({
  id: 'u01',
  title: 'Hallo!',
  description: 'Begrüßen, verabschieden, danke und bitte',
  tips: [
    T(
      'Hallo und tschüss',
      `
      **Dag** kann „Hallo“ und „Tschüss“ heißen. **Hoi** ist locker, **hallo** passt fast immer.

      Die Grüße nach Tageszeit schreibt man zusammen: **goedemorgen**, **goedemiddag**, **goedenavond**. **Welterusten** sagt man nur vor dem Schlafengehen.

      Zum Abschied: **tot ziens** (auf Wiedersehen), **doei** (tschüss), **tot morgen** (bis morgen), **tot straks** (bis später).
      `,
      [
        ['Goedemorgen!', 'Guten Morgen!'],
        ['Doei, tot morgen!', 'Tschüss, bis morgen!'],
      ],
    ),
    T(
      'Danke und bitte',
      `
      - **dank je (wel)**: zu Leuten, die du duzt
      - **dank u (wel)**: höflich, zu Leuten, die du siezt
      - **alsjeblieft** und **alstublieft** heißen „bitte“ und auch „bitte schön“, wenn du jemandem etwas gibst.

      In den Niederlanden duzt man viel schneller als in Deutschland, auch Kollegen und oft auch Fremde im Alltag.
      `,
      [
        ['Dank u wel!', 'Vielen Dank!'],
        ['Ja, alsjeblieft.', 'Ja, bitte.'],
      ],
    ),
    T(
      'Aussprache: die wichtigsten Laute',
      `
      | Schreibung | klingt ungefähr wie | Beispiel |
      |---|---|---|
      | g, ch | „ch“ in „ach“ | *goed, dag* |
      | oe | „u“ in „gut“ | *goed, doei* |
      | ie | „ie“ in „Liebe“ | *ziens* |
      | eu | „ö“ in „schön“ | *neus* |
      | uu, u | „ü“ in „früh“ | *u* |
      | ij, ei | etwa „äi“ | *mijn, klein* |
      | ui | etwa „öi“, mit runden Lippen | *huis* |
      | sch | „s“ + „ch“ | *school* |

      Ein doppelter Vokal ist lang: *maan*. Ein einzelner Vokal am Silbenende ist auch lang: *ma-ken*.
      `,
    ),
  ],
  words: [
    W('hallo', 'hallo', 'interj', { emoji: '👋' }),
    W('hoi', 'hallo (locker)', 'interj'),
    W('dag', 'hallo / tschüss', 'interj', { id: 'dag-groet' }),
    W('goedemorgen', 'guten Morgen', 'interj', { emoji: '🌅' }),
    W('goedemiddag', 'guten Tag (nachmittags)', 'interj'),
    W('goedenavond', 'guten Abend', 'interj', { emoji: '🌆' }),
    W('welterusten', 'gute Nacht', 'interj', { emoji: '🌙' }),
    P('tot ziens', 'auf Wiedersehen'),
    W('doei', 'tschüss', 'interj'),
    P('tot morgen', 'bis morgen'),
    P('tot straks', 'bis später'),
    W('ja', 'ja', 'interj'),
    W('nee', 'nein', 'interj'),
    P('dank je', 'danke'),
    P('dank je wel', 'danke schön'),
    P('dank u wel', 'vielen Dank (höflich)'),
    W('alsjeblieft', 'bitte', 'adv'),
    W('alstublieft', 'bitte (höflich)', 'adv'),
    W('sorry', 'Entschuldigung', 'interj'),
    P('hoe gaat het', 'wie geht es'),
    A('goed', 'gut', 'goede beter best'),
    W('heel', 'sehr', 'adv'),
    A('prima', 'prima', '- - -'),
    W('en', 'und', 'conj'),
    W('met', 'mit', 'prep'),
  ],
  sentences: [
    S('Hallo, hoe gaat het?', "Hallo, wie geht es?|Hallo, wie geht's?|Hallo, wie geht es dir?"),
    S('Goed, dank je.', 'Gut, danke.'),
    S('Heel goed, dank je wel!', 'Sehr gut, danke schön!|Sehr gut, vielen Dank!'),
    S('Goedemorgen, hoe gaat het met je?', "Guten Morgen, wie geht es dir?|Guten Morgen, wie geht's dir?"),
    S('Goed, en met jou?', 'Gut, und dir?|Gut, und wie geht es dir?'),
    S('Prima, dank u wel.', 'Prima, vielen Dank.|Prima, danke schön.'),
    S('Hoe gaat het met u?', 'Wie geht es Ihnen?'),
    S('Tot ziens!', 'Auf Wiedersehen!'),
    S('Doei, tot morgen!', 'Tschüss, bis morgen!'),
    S('Dag, tot straks!', 'Tschüss, bis später!|Tschüss, bis gleich!'),
    S('Welterusten!', 'Gute Nacht!|Schlaf gut!'),
    S('Nee, dank je.', 'Nein, danke.'),
    S('Ja, alsjeblieft.', 'Ja, bitte.'),
    S('Alstublieft!', 'Bitte schön!|Bitte sehr!|Bitte!'),
    S('Sorry!', 'Entschuldigung!|Sorry!|Tut mir leid!'),
    S('Goedenavond!', 'Guten Abend!'),
    S('Goedemiddag!', 'Guten Tag!|Guten Nachmittag!'),
    S('Dag Anna!', 'Hallo, Anna!|Tschüss, Anna!'),
  ],
  cloze: [
    C('Hoe {gaat} het?', 'gaat|gaan|ga', 'Wie geht es?'),
    C('Goed, {dank} je.', 'dank|goed|met', 'Gut, danke.'),
    C('Tot {ziens}!', 'ziens|zien|zie', 'Auf Wiedersehen!'),
    C('{Goedemorgen}, Anna!', 'Goedemorgen|Goedenavond|Welterusten', 'Guten Morgen, Anna!'),
    C('Dank u {wel}!', 'wel|goed|met', 'Vielen Dank!'),
    C('Goed, en {met} jou?', 'met|en|tot', 'Gut, und dir?'),
    C('Tot {morgen}!', 'morgen|goed|heel', 'Bis morgen!'),
  ],
  story: story('st01', 'Goedemorgen!', 'Guten Morgen!', [
    ['Anna', 'Goedemorgen, meneer Jansen!', 'Guten Morgen, Herr Jansen!'],
    ['Meneer Jansen', 'Goedemorgen, Anna! Hoe gaat het?', 'Guten Morgen, Anna! Wie geht es?'],
    ['Anna', 'Heel goed, dank u wel. En met u?', 'Sehr gut, vielen Dank. Und Ihnen?'],
    Q('Wie geht es Anna?', ['Sehr gut', 'Nicht so gut', 'Sie ist müde'], 0),
    ['Meneer Jansen', 'Prima, dank je.', 'Bestens, danke.'],
    ['Anna', 'Tot straks!', 'Bis später!'],
    ['Meneer Jansen', 'Dag Anna, tot straks!', 'Tschüss, Anna, bis später!'],
    Q('Was sagt Anna zum Abschied?', ['Bis später!', 'Gute Nacht!', 'Guten Abend!'], 0),
  ]),
});

const u02 = unit({
  id: 'u02',
  title: 'Wer bist du?',
  description: 'Sich vorstellen: Name, Herkunft, Wohnort, Sprachen',
  tips: [
    T(
      'zijn – sein',
      `
      | | zijn |
      |---|---|
      | ik | ben |
      | jij / je | bent |
      | u | bent |
      | hij / zij / het | is |
      | wij / jullie / zij | zijn |

      **u** ist die höfliche Anrede („Sie“). Das Verb steht dabei im Singular: *u bent*, *u woont*.
      `,
      [
        ['Ik ben Anna.', 'Ich bin Anna.'],
        ['Bent u mevrouw De Vries?', 'Sind Sie Frau De Vries?'],
      ],
    ),
    T(
      'Regelmäßige Verben im Präsens',
      `
      Den **Stamm** bekommst du, wenn du **-en** vom Infinitiv abschneidest: *wonen → woon*.

      - **ik** + Stamm: *ik woon*
      - **jij / u / hij / zij / het** + Stamm + **t**: *jij woont*
      - **wij / jullie / zij** + Infinitiv: *wij wonen*

      Endet der Stamm schon auf **t**, kommt kein zweites t dazu: *jij heet*.

      Lange Vokale werden doppelt geschrieben, wenn die Silbe geschlossen ist: *wonen → ik woon*, *spreken → ik spreek*.
      `,
      [
        ['Ik woon in Amsterdam.', 'Ich wohne in Amsterdam.'],
        ['Anna woont in Berlijn.', 'Anna wohnt in Berlin.'],
      ],
    ),
    T(
      'Fragen mit jij: das t fällt weg',
      `
      In Fragen steht das Verb vor dem Subjekt. Steht **jij** oder **je** direkt nach dem Verb, fällt das **t** weg:

      - *Jij woont in Berlijn.* → *Woon jij in Berlijn?*
      - *Je spreekt Duits.* → *Spreek je Duits?*

      Bei **u**, **hij** und **zij** bleibt das t: *Woont u hier? Komt hij uit België?*
      `,
      [
        ['Waar kom je vandaan?', 'Woher kommst du?'],
        ['Waar komt u vandaan?', 'Woher kommen Sie?'],
      ],
    ),
    T(
      'Länder, Sprachen, Herkunft',
      `
      Falscher Freund: **Duits** heißt „Deutsch“, **Nederlands** heißt „Niederländisch“ (auf Englisch „Dutch“).

      Bei der Nationalität steht kein Artikel: *Ik ben Duitser.* „Ich bin Deutscher.“ Eine Frau sagt *Ik ben Duitse.*

      **Nederland** ist Singular und hat keinen Artikel: *Ik woon in Nederland.* „Ich wohne in den Niederlanden.“
      `,
      [['Ik ben Duitser.', 'Ich bin Deutscher.']],
    ),
  ],
  words: [
    W('ik', 'ich', 'pron'),
    W('jij', 'du', 'pron'),
    W('je', 'du (unbetont)', 'pron', { id: 'je-subj' }),
    W('u', 'Sie (höflich)', 'pron'),
    V('zijn', 'sein', 'ben bent is zijn | was waren | geweest z'),
    V('heten', 'heißen', 'heet heet heten | heette heetten | geheten h'),
    V('komen', 'kommen', 'kom komt komen | kwam kwamen | gekomen z'),
    V('wonen', 'wohnen', 'woon woont wonen | woonde woonden | gewoond h'),
    V('spreken', 'sprechen', 'spreek spreekt spreken | sprak spraken | gesproken h'),
    W('waar', 'wo', 'adv'),
    W('vandaan', 'her (woher)', 'adv'),
    W('hoe', 'wie', 'adv'),
    W('uit', 'aus', 'prep'),
    W('in', 'in', 'prep'),
    W('ook', 'auch', 'adv'),
    P('een beetje', 'ein bisschen'),
    P('prettig kennis te maken', 'freut mich, dich kennenzulernen'),
    N('de meneer', 'der Herr', 'meneren'),
    N('de mevrouw', 'die Frau (Anrede)', 'mevrouwen'),
    W('Duitsland', 'Deutschland', 'name', { emoji: '🇩🇪' }),
    W('Nederland', 'die Niederlande', 'name', { emoji: '🇳🇱' }),
    W('België', 'Belgien', 'name', { emoji: '🇧🇪' }),
    W('Oostenrijk', 'Österreich', 'name', { emoji: '🇦🇹' }),
    W('Zwitserland', 'die Schweiz', 'name', { emoji: '🇨🇭' }),
    N('het Nederlands', 'Niederländisch (Sprache)', '-'),
    N('het Duits', 'Deutsch (Sprache)', '-', undefined, { note: 'Falscher Freund: Duits heißt Deutsch.' }),
    N('het Engels', 'Englisch (Sprache)', '-'),
    N('de Duitser', 'der Deutsche', 'Duitsers'),
    N('de Nederlander', 'der Niederländer', 'Nederlanders'),
  ],
  sentences: [
    S('Ik ben Anna.', 'Ich bin Anna.'),
    S('Ik heet Tom.', 'Ich heiße Tom.'),
    S('Hoe heet je?', 'Wie heißt du?'),
    S('Hoe heet u?', 'Wie heißen Sie?'),
    S('Ik kom uit Duitsland.', 'Ich komme aus Deutschland.'),
    S('Waar kom je vandaan?', 'Woher kommst du?|Wo kommst du her?'),
    S('Waar komt u vandaan?', 'Woher kommen Sie?|Wo kommen Sie her?'),
    S('Ik woon in Amsterdam.', 'Ich wohne in Amsterdam.'),
    S('Waar woon je?', 'Wo wohnst du?'),
    S('Anna woont in Berlijn.', 'Anna wohnt in Berlin.'),
    S('Tom komt uit Nederland.', 'Tom kommt aus den Niederlanden.'),
    S('Ik spreek een beetje Nederlands.', 'Ich spreche ein bisschen Niederländisch.|Ich spreche ein wenig Niederländisch.'),
    S('Spreek je Duits?', 'Sprichst du Deutsch?'),
    S('Ja, ik spreek Duits en Engels.', 'Ja, ich spreche Deutsch und Englisch.'),
    S('Ik ben Duitser.', 'Ich bin Deutscher.'),
    S(
      'Prettig kennis te maken!',
      'Freut mich, dich kennenzulernen!|Freut mich, Sie kennenzulernen!|Schön, dich kennenzulernen!|Schön, Sie kennenzulernen!|Freut mich!',
    ),
    S('Ik ben Emma en ik kom uit Oostenrijk.', 'Ich bin Emma und ich komme aus Österreich.|Ich bin Emma und komme aus Österreich.'),
    S('Daan woont ook in België.', 'Daan wohnt auch in Belgien.'),
    S('Ik heet Lisa, en jij?', 'Ich heiße Lisa, und du?'),
    S('Woon je in Nederland?', 'Wohnst du in den Niederlanden?'),
    S('Goedemiddag, meneer Jansen.', 'Guten Tag, Herr Jansen.'),
    S('Bent u mevrouw De Vries?', 'Sind Sie Frau De Vries?'),
    S('Jij bent Tom.', 'Du bist Tom.'),
    S('Anna is in Zwitserland.', 'Anna ist in der Schweiz.'),
    S('Daan is Nederlander.', 'Daan ist Niederländer.'),
  ],
  cloze: [
    C('Ik {ben} Anna.', 'ben|bent|is', 'Ich bin Anna.'),
    C('Jij {bent} Tom.', 'ben|bent|zijn', 'Du bist Tom.'),
    C('Anna {woont} in Berlijn.', 'woon|woont|wonen', 'Anna wohnt in Berlin.'),
    C('Waar {kom} je vandaan?', 'kom|komt|komen', 'Woher kommst du?'),
    C('Ik kom {uit} Duitsland.', 'uit|in|met', 'Ich komme aus Deutschland.'),
    C('Ik {spreek} een beetje Nederlands.', 'spreek|spreekt|spreken', 'Ich spreche ein bisschen Niederländisch.'),
    C('Hoe {heet} u?', 'heet|heten|ben', 'Wie heißen Sie?'),
    C('{Spreek} je Duits?', 'Spreek|Spreekt|Spreken', 'Sprichst du Deutsch?'),
    C('Waar {woont} u?', 'woon|woont|wonen', 'Wo wohnen Sie?'),
  ],
  story: story('st02', 'In de trein', 'Im Zug', [
    ['Daan', 'Hallo! Ik ben Daan.', 'Hallo! Ich bin Daan.'],
    ['Anna', 'Hoi Daan, ik heet Anna.', 'Hi, Daan, ich heiße Anna.'],
    ['Daan', 'Waar kom je vandaan, Anna?', 'Woher kommst du, Anna?'],
    ['Anna', 'Ik kom uit Duitsland, uit Keulen.', 'Ich komme aus Deutschland, aus Köln.'],
    Q('Woher kommt Anna?', ['Aus Köln', 'Aus Amsterdam', 'Aus Belgien'], 0),
    ['Daan', 'Spreek je Nederlands?', 'Sprichst du Niederländisch?'],
    ['Anna', 'Ja, een beetje.', 'Ja, ein bisschen.'],
    ['Daan', 'Heel goed! Ik woon in Utrecht.', 'Sehr gut! Ich wohne in Utrecht.'],
    Q('Wo wohnt Daan?', ['In Utrecht', 'In Köln', 'In Berlin'], 0),
    ['Anna', 'Prettig kennis te maken, Daan!', 'Freut mich, dich kennenzulernen, Daan!'],
    Q('Spricht Anna Niederländisch?', ['Ja, ein bisschen', 'Nein, gar nicht', 'Ja, sehr gut'], 0),
  ]),
});

const u03 = unit({
  id: 'u03',
  title: 'Menschen',
  description: 'de, het und een; er, sie, es; Menschen beschreiben',
  tips: [
    T(
      'de, het und een',
      `
      Das Niederländische hat nur zwei bestimmte Artikel:

      - **de** für männliche und weibliche Wörter: *de man, de vrouw*
      - **het** für sächliche Wörter: *het kind, het meisje*

      Im Plural steht immer **de**: *de kinderen*.

      Der unbestimmte Artikel ist immer **een**: *een man, een vrouw, een kind*.

      Lerne jedes Nomen mit seinem Artikel. Verkleinerungen auf **-je** haben immer **het**: *het meisje*.
      `,
      [
        ['De man is aardig.', 'Der Mann ist nett.'],
        ['Het kind is blij.', 'Das Kind ist froh.'],
      ],
    ),
    T(
      'hij, zij, het',
      `
      - **hij** = er
      - **zij** oder **ze** = sie
      - **het** = es

      **ze** ist die unbetonte Form von **zij**. Im Alltag hört man meistens *ze*.

      Bei Menschen zählt das natürliche Geschlecht: *het meisje → ze*.
      `,
      [['Ze is jong en blij.', 'Sie ist jung und froh.']],
    ),
    T(
      'dit, dat und wie',
      `
      *Dit is …* heißt „Das (hier) ist …“, *Dat is …* heißt „Das (da) ist …“.

      Achtung: **wie** heißt „wer“! *Wie is dat?* „Wer ist das?“

      **heel** und **erg** heißen beide „sehr“: *heel jong*, *erg aardig*.
      `,
      [['Wie is dat?', 'Wer ist das?']],
    ),
  ],
  words: [
    W('de', 'der / die (Artikel)', 'det'),
    W('het', 'das (Artikel) / es', 'det'),
    W('een', 'ein / eine', 'det'),
    W('hij', 'er', 'pron'),
    W('zij', 'sie', 'pron'),
    W('ze', 'sie (unbetont)', 'pron'),
    N('de man', 'der Mann', 'mannen', '👨'),
    N('de vrouw', 'die Frau', 'vrouwen', '👩'),
    N('de jongen', 'der Junge', 'jongens', '👦'),
    N('het meisje', 'das Mädchen', 'meisjes', '👧'),
    N('het kind', 'das Kind', 'kinderen', '🧒'),
    N('de vriend', 'der Freund', 'vrienden'),
    N('de vriendin', 'die Freundin', 'vriendinnen'),
    N('de baby', 'das Baby', "baby's", '👶'),
    N('de mens', 'der Mensch', 'mensen'),
    N('de buurman', 'der Nachbar', 'buren/buurmannen'),
    N('de buurvrouw', 'die Nachbarin', 'buurvrouwen'),
    W('wie', 'wer', 'pron'),
    W('dit', 'das (hier) / dieses', 'pron'),
    W('dat', 'das (da) / jenes', 'pron'),
    W('of', 'oder', 'conj'),
    W('maar', 'aber', 'conj'),
    W('erg', 'sehr', 'adv'),
    A('aardig', 'nett', 'aardige aardiger aardigst'),
    A('leuk', 'nett, lustig, toll', 'leuke leuker leukst'),
    A('lief', 'lieb', 'lieve liever liefst'),
    A('ziek', 'krank', 'zieke zieker ziekst'),
    A('moe', 'müde', '- - -'),
    A('blij', 'froh', 'blije blijer blijst'),
    A('jong', 'jung', 'jonge jonger jongst'),
    A('oud', 'alt', 'oude ouder oudst'),
  ],
  sentences: [
    S('Dat is Tom.', 'Das ist Tom.'),
    S('Wie is dat?', 'Wer ist das?'),
    S('Dat is een man.', 'Das ist ein Mann.'),
    S('Dit is een vrouw.', 'Das ist eine Frau.|Dies ist eine Frau.'),
    S('Is dat een jongen of een meisje?', 'Ist das ein Junge oder ein Mädchen?'),
    S('Het meisje is lief.', 'Das Mädchen ist lieb.'),
    S('De man is aardig.', 'Der Mann ist nett.'),
    S('De vrouw is erg aardig.', 'Die Frau ist sehr nett.'),
    S('Hij is moe.', 'Er ist müde.'),
    S('Zij is ziek.', 'Sie ist krank.'),
    S('Het kind is blij.', 'Das Kind ist froh.|Das Kind ist glücklich.'),
    S('De baby is heel jong.', 'Das Baby ist sehr jung.'),
    S('Tom is een vriend.', 'Tom ist ein Freund.'),
    S('Lisa is een vriendin.', 'Lisa ist eine Freundin.'),
    S('De buurman is oud, maar hij is leuk.', 'Der Nachbar ist alt, aber er ist nett.|Der Nachbar ist alt, aber er ist lustig.'),
    S('De buurvrouw is ook aardig.', 'Die Nachbarin ist auch nett.'),
    S('Is hij ziek?', 'Ist er krank?'),
    S('Nee, hij is moe.', 'Nein, er ist müde.'),
    S('Ze is jong en blij.', 'Sie ist jung und froh.|Sie ist jung und glücklich.'),
    S('Het is een kind.', 'Es ist ein Kind.|Das ist ein Kind.'),
    S('De jongen is leuk.', 'Der Junge ist nett.|Der Junge ist lustig.'),
    S('Wie is de man?', 'Wer ist der Mann?'),
    S('De mensen zijn aardig.', 'Die Menschen sind nett.|Die Leute sind nett.'),
  ],
  cloze: [
    C('{De} man is aardig.', 'De|Het|Dit', 'Der Mann ist nett.'),
    C('{Het} meisje is lief.', 'De|Het|Deze', 'Das Mädchen ist lieb.'),
    C('Hij {is} moe.', 'ben|bent|is', 'Er ist müde.'),
    C('Dat is {een} vrouw.', 'een|het|dit', 'Das ist eine Frau.'),
    C('Het {kind} is blij.', 'kind|man|vrouw', 'Das Kind ist froh.'),
    C('De {vrouw} is erg aardig.', 'vrouw|meisje|kind', 'Die Frau ist sehr nett.'),
    C('{Wie} is dat?', 'Wie|Waar|Hoe', 'Wer ist das?'),
  ],
  story: story('st03', 'Wie is dat?', 'Wer ist das?', [
    ['Lisa', 'Tom, wie is dat?', 'Tom, wer ist das?'],
    ['Tom', 'Dat is Daan. Hij is een vriend.', 'Das ist Daan. Er ist ein Freund.'],
    ['Lisa', 'Is hij aardig?', 'Ist er nett?'],
    ['Tom', 'Ja, hij is erg aardig en leuk.', 'Ja, er ist sehr nett und lustig.'],
    Q('Wer ist Daan?', ['Ein Freund von Tom', 'Toms Nachbar', 'Ein Kind'], 0),
    ['Lisa', 'En wie is de vrouw?', 'Und wer ist die Frau?'],
    ['Tom', 'Dat is Emma, de buurvrouw.', 'Das ist Emma, die Nachbarin.'],
    ['Lisa', 'Ze is heel jong!', 'Sie ist sehr jung!'],
    ['Tom', 'Ja, maar ze is moe. De baby is ziek.', 'Ja, aber sie ist müde. Das Baby ist krank.'],
    Q('Warum ist Emma müde?', ['Das Baby ist krank', 'Sie ist alt', 'Sie ist krank'], 0),
  ]),
});

const u04 = unit({
  id: 'u04',
  title: 'Familie',
  description: 'hebben, Familienmitglieder, mein und dein',
  tips: [
    T(
      'hebben – haben',
      `
      | | hebben |
      |---|---|
      | ik | heb |
      | jij / je | hebt |
      | u | hebt / heeft |
      | hij / zij / het | heeft |
      | wij / jullie / zij | hebben |

      In der Frage fällt das t wieder weg: *Heb jij een broer?*

      Bei **u** sind *u hebt* und *u heeft* beide richtig.
      `,
      [
        ['Ik heb een broer.', 'Ich habe einen Bruder.'],
        ['Heeft u kinderen?', 'Haben Sie Kinder?'],
      ],
    ),
    T(
      'Possessivpronomen',
      `
      | | |
      |---|---|
      | mijn | mein |
      | jouw / je | dein |
      | uw | Ihr (höflich) |
      | zijn | sein |
      | haar | ihr |
      | ons / onze | unser |
      | jullie | euer |
      | hun | ihr (Plural) |

      **ons** steht nur vor **het**-Wörtern im Singular: *ons gezin*. Sonst heißt es **onze**: *onze hond, onze kinderen*.

      Die anderen Formen ändern sich nie: *mijn vader, mijn moeder, mijn kind*.
      `,
      [
        ['Ons gezin woont in Gent.', 'Unsere Familie wohnt in Gent.'],
        ['Onze opa is oud.', 'Unser Opa ist alt.'],
      ],
    ),
    T(
      'wij, jullie, zij',
      `
      - **wij / we** = wir
      - **jullie** = ihr
      - **zij / ze** = sie (Plural)

      Alle drei stehen mit dem Infinitiv: *wij hebben, jullie hebben, zij hebben*.
      `,
      [['Hebben jullie een hond?', 'Habt ihr einen Hund?']],
    ),
    T(
      'Falsche Freunde in der Familie',
      `
      - **de neef** = der Neffe oder der Cousin
      - **de nicht** = die Nichte oder die Cousine. Für „nicht“ sagt man **niet**.
      - **het gezin** = Eltern mit ihren Kindern; **de familie** = die ganze Verwandtschaft.
      `,
    ),
  ],
  words: [
    V('hebben', 'haben', 'heb hebt heeft hebben | had hadden | gehad h'),
    W('wij', 'wir', 'pron'),
    W('we', 'wir (unbetont)', 'pron'),
    W('jullie', 'ihr / euer', 'pron'),
    W('mijn', 'mein / meine', 'det'),
    W('jouw', 'dein / deine', 'det'),
    W('je', 'dein / deine (unbetont)', 'det', { id: 'je-bez' }),
    W('zijn', 'sein / seine', 'det', { id: 'zijn-bez' }),
    W('haar', 'ihr / ihre', 'det'),
    W('ons', 'unser (vor het-Wörtern)', 'det'),
    W('onze', 'unser / unsere', 'det'),
    W('hun', 'ihr / ihre (Plural)', 'det'),
    W('uw', 'Ihr / Ihre (höflich)', 'det'),
    W('van', 'von', 'prep'),
    N('de familie', 'die Familie, die Verwandtschaft', 'families'),
    N('het gezin', 'die Familie (Eltern und Kinder)', 'gezinnen'),
    N('de vader', 'der Vater', 'vaders'),
    N('de moeder', 'die Mutter', 'moeders'),
    NP('de ouders', 'die Eltern'),
    N('de broer', 'der Bruder', 'broers'),
    N('de zus', 'die Schwester', 'zussen'),
    N('de zoon', 'der Sohn', 'zonen'),
    N('de dochter', 'die Tochter', 'dochters'),
    N('de opa', 'der Opa', "opa's", '👴'),
    N('de oma', 'die Oma', "oma's", '👵'),
    N('de oom', 'der Onkel', 'ooms'),
    N('de tante', 'die Tante', 'tantes'),
    N('de neef', 'der Neffe / der Cousin', 'neven'),
    N('de nicht', 'die Nichte / die Cousine', 'nichten'),
    N('de hond', 'der Hund', 'honden', '🐕'),
    N('de kat', 'die Katze', 'katten', '🐈'),
  ],
  sentences: [
    S('Ik heb een broer.', 'Ich habe einen Bruder.'),
    S('Heb je een zus?', 'Hast du eine Schwester?'),
    S('Ja, ik heb een zus en een broer.', 'Ja, ich habe eine Schwester und einen Bruder.'),
    S('Mijn vader heet Peter.', 'Mein Vater heißt Peter.'),
    S('Mijn moeder komt uit België.', 'Meine Mutter kommt aus Belgien.'),
    S('Hij heeft een dochter.', 'Er hat eine Tochter.'),
    S('Haar zoon is heel lief.', 'Ihr Sohn ist sehr lieb.'),
    S('Wij hebben een hond.', 'Wir haben einen Hund.'),
    S('Jullie hebben een kat.', 'Ihr habt eine Katze.'),
    S('Mijn ouders wonen in Duitsland.', 'Meine Eltern wohnen in Deutschland.'),
    S('Onze opa is oud.', 'Unser Opa ist alt.|Unser Großvater ist alt.'),
    S('Hun oma woont in Utrecht.', 'Ihre Oma wohnt in Utrecht.|Ihre Großmutter wohnt in Utrecht.'),
    S('Is dat jouw broer?', 'Ist das dein Bruder?'),
    S('Nee, dat is mijn neef.', 'Nein, das ist mein Cousin.|Nein, das ist mein Neffe.'),
    S('Mijn nicht heet Fleur.', 'Meine Cousine heißt Fleur.|Meine Nichte heißt Fleur.'),
    S('Heeft u kinderen?|Hebt u kinderen?', 'Haben Sie Kinder?'),
    S('Hoe heet je zus?', 'Wie heißt deine Schwester?'),
    S('Zijn dochter heet Emma.', 'Seine Tochter heißt Emma.'),
    S('Mijn oom en tante wonen in Gent.', 'Mein Onkel und meine Tante wohnen in Gent.'),
    S('Hebben jullie een hond?', 'Habt ihr einen Hund?'),
    S('Ze hebben een zoon en een dochter.', 'Sie haben einen Sohn und eine Tochter.'),
    S('Uw zoon is erg aardig.', 'Ihr Sohn ist sehr nett.'),
    S('De kat van mijn oma is oud.', 'Die Katze meiner Oma ist alt.|Die Katze von meiner Oma ist alt.'),
    S('Ons gezin woont in Gent.', 'Unsere Familie wohnt in Gent.'),
  ],
  cloze: [
    C('Ik {heb} een broer.', 'heb|hebt|heeft', 'Ich habe einen Bruder.'),
    C('Hij {heeft} een dochter.', 'heb|hebt|heeft', 'Er hat eine Tochter.'),
    C('Wij {hebben} een hond.', 'hebt|heeft|hebben', 'Wir haben einen Hund.'),
    C('{Heb} je een zus?', 'Heb|Hebt|Heeft', 'Hast du eine Schwester?'),
    C('{Ons} gezin woont in Gent.', 'Ons|Onze', 'Unsere Familie wohnt in Gent.'),
    C('{Onze} hond heet Max.', 'Ons|Onze', 'Unser Hund heißt Max.'),
    C('Mijn ouders {wonen} in Duitsland.', 'woon|woont|wonen', 'Meine Eltern wohnen in Deutschland.'),
    C('Hoe heet {haar} broer?', 'haar|mijn|jouw', 'Wie heißt ihr Bruder?'),
  ],
  story: story('st04', 'Mijn familie', 'Meine Familie', [
    ['Emma', 'Dit is mijn familie.', 'Das ist meine Familie.'],
    ['Emma', 'Mijn vader heet Jan en mijn moeder heet Sophie.', 'Mein Vater heißt Jan und meine Mutter heißt Sophie.'],
    ['Emma', 'Ik heb een broer. Hij heet Bram.', 'Ich habe einen Bruder. Er heißt Bram.'],
    Q('Wie heißt Emmas Bruder?', ['Bram', 'Jan', 'Sophie'], 0),
    ['Emma', 'Bram heeft een dochter, Mila. Ze is mijn nicht.', 'Bram hat eine Tochter, Mila. Sie ist meine Nichte.'],
    Q('Wer ist Mila?', ['Emmas Nichte', 'Emmas Schwester', 'Emmas Mutter'], 0),
    ['Emma', 'Wij hebben ook een hond en een kat.', 'Wir haben auch einen Hund und eine Katze.'],
    ['Emma', 'De hond heet Max. Hij is oud, maar heel lief.', 'Der Hund heißt Max. Er ist alt, aber sehr lieb.'],
    Q('Wie ist Max?', ['Alt, aber sehr lieb', 'Jung und krank', 'Klein und müde'], 0),
  ]),
});

const u05 = unit({
  id: 'u05',
  title: 'Essen und Trinken',
  description: 'eten, drinken, Lebensmittel, de oder het',
  tips: [
    T(
      'de oder het?',
      `
      Etwa zwei Drittel aller Nomen haben **de**. Ein paar Faustregeln für **het**:

      - Verkleinerungen auf **-je**: *het meisje*
      - Infinitive als Nomen: *het eten* (das Essen)
      - Sprachen: *het Nederlands*
      - viele Wörter mit **ge-** und **be-**: *het gezin* (aber nicht alle)

      Das Deutsche hilft oft nicht: *het brood* (das Brot), aber *de kaas* (der Käse); *het bier* (das Bier), aber *de wijn* (der Wein). Lerne jedes Wort mit Artikel.
      `,
      [
        ['Het brood is lekker.', 'Das Brot ist lecker.'],
        ['De soep is lekker.', 'Die Suppe ist lecker.'],
      ],
    ),
    T(
      'eten und drinken',
      `
      | | eten | drinken |
      |---|---|---|
      | ik | eet | drink |
      | jij / u / hij / zij | eet | drinkt |
      | wij / jullie / zij | eten | drinken |

      Der Stamm von *eten* endet schon auf **t**, deshalb: *jij eet, hij eet*.
      `,
      [
        ['Hij eet brood met kaas.', 'Er isst Brot mit Käse.'],
        ['Wij drinken koffie.', 'Wir trinken Kaffee.'],
      ],
    ),
    T(
      'Ohne Artikel',
      `
      Wie im Deutschen steht bei Stoffen und Mengen oft kein Artikel: *Ik drink water.* „Ich trinke Wasser.“ *Fruit is lekker.* „Obst ist lecker.“

      Mittags isst man in den Niederlanden oft nur ein paar Butterbrote (*boterhammen*), zum Beispiel mit Käse.
      `,
    ),
  ],
  words: [
    V('eten', 'essen', 'eet eet eten | at aten | gegeten h'),
    V('drinken', 'trinken', 'drink drinkt drinken | dronk dronken | gedronken h'),
    N('het water', 'das Wasser', '-', '💧'),
    N('de koffie', 'der Kaffee', '-', '☕'),
    N('de thee', 'der Tee', '-', '🍵'),
    N('de melk', 'die Milch', '-', '🥛'),
    N('het sap', 'der Saft', 'sappen', '🧃'),
    N('het bier', 'das Bier', 'bieren', '🍺'),
    N('de wijn', 'der Wein', 'wijnen', '🍷'),
    N('het brood', 'das Brot', 'broden', '🍞'),
    N('de kaas', 'der Käse', 'kazen', '🧀'),
    N('het ei', 'das Ei', 'eieren', '🥚'),
    N('de appel', 'der Apfel', 'appels/appelen', '🍎'),
    N('de banaan', 'die Banane', 'bananen', '🍌'),
    N('de sinaasappel', 'die Orange', 'sinaasappels/sinaasappelen', '🍊'),
    N('de boterham', 'das Butterbrot, die Scheibe Brot', 'boterhammen', '🥪'),
    N('de soep', 'die Suppe', 'soepen', '🍲'),
    N('het vlees', 'das Fleisch', '-', '🥩'),
    N('de vis', 'der Fisch', 'vissen', '🐟'),
    N('de groente', 'das Gemüse', 'groenten/groentes', '🥦'),
    N('het fruit', 'das Obst', '-', '🍇'),
    N('de rijst', 'der Reis', '-', '🍚'),
    N('de aardappel', 'die Kartoffel', 'aardappels/aardappelen', '🥔'),
    A('lekker', 'lecker', 'lekkere lekkerder lekkerst'),
    P('eet smakelijk', 'guten Appetit'),
  ],
  sentences: [
    S('Ik eet een appel.', 'Ich esse einen Apfel.'),
    S('Jij drinkt water.', 'Du trinkst Wasser.'),
    S('Hij eet brood met kaas.', 'Er isst Brot mit Käse.'),
    S('Wij drinken koffie.', 'Wir trinken Kaffee.'),
    S('Drink je thee of koffie?', 'Trinkst du Tee oder Kaffee?'),
    S('Ik drink melk.', 'Ich trinke Milch.'),
    S('Het kind eet een banaan.', 'Das Kind isst eine Banane.'),
    S('De soep is lekker.', 'Die Suppe ist lecker.'),
    S('Het brood is erg lekker.', 'Das Brot ist sehr lecker.'),
    S('Eet je vlees?', 'Isst du Fleisch?'),
    S('Nee, ik eet vis.', 'Nein, ich esse Fisch.'),
    S('Zij eten rijst met groente.', 'Sie essen Reis mit Gemüse.'),
    S('Mijn zus eet een ei.', 'Meine Schwester isst ein Ei.'),
    S('Jullie drinken sap.', 'Ihr trinkt Saft.'),
    S('De man drinkt bier.', 'Der Mann trinkt Bier.'),
    S('De vrouw drinkt wijn.', 'Die Frau trinkt Wein.'),
    S('Ik eet een boterham met kaas.', 'Ich esse ein Butterbrot mit Käse.|Ich esse eine Scheibe Brot mit Käse.'),
    S('Fruit is lekker.', 'Obst ist lecker.'),
    S('Eet smakelijk!', 'Guten Appetit!'),
    S('Hij eet een sinaasappel.', 'Er isst eine Orange.|Er isst eine Apfelsine.'),
    S('De aardappel is lekker.', 'Die Kartoffel ist lecker.'),
    S('Ik drink thee met melk.', 'Ich trinke Tee mit Milch.'),
  ],
  cloze: [
    C('{Het} brood is lekker.', 'De|Het', 'Das Brot ist lecker.'),
    C('{De} soep is lekker.', 'De|Het', 'Die Suppe ist lecker.'),
    C('{Het} water is lekker.', 'De|Het', 'Das Wasser ist lecker.'),
    C('{De} kaas is lekker.', 'De|Het', 'Der Käse ist lecker.'),
    C('Ik eet {een} appel.', 'een|het', 'Ich esse einen Apfel.'),
    C('Hij {eet} brood.', 'eet|eten', 'Er isst Brot.'),
    C('Wij {drinken} koffie.', 'drink|drinkt|drinken', 'Wir trinken Kaffee.'),
    C('{Drink} je thee?', 'Drink|Drinkt|Drinken', 'Trinkst du Tee?'),
  ],
  story: story('st05', 'Het ontbijt', 'Das Frühstück', [
    ['Lotte', 'Goedemorgen! Eet je een boterham?', 'Guten Morgen! Isst du ein Butterbrot?'],
    ['Sem', 'Ja, graag. Met kaas, alsjeblieft.', 'Ja, gern. Mit Käse, bitte.'],
    ['Lotte', 'Drink je koffie of thee?', 'Trinkst du Kaffee oder Tee?'],
    ['Sem', 'Thee met melk.', 'Tee mit Milch.'],
    Q('Was trinkt Sem?', ['Tee mit Milch', 'Kaffee', 'Saft'], 0),
    ['Lotte', 'Ik drink koffie en ik eet een appel.', 'Ich trinke Kaffee und esse einen Apfel.'],
    ['Sem', 'Het brood is lekker!', 'Das Brot ist lecker!'],
    ['Lotte', 'Ja, en de kaas ook.', 'Ja, und der Käse auch.'],
    Q('Was isst Lotte?', ['Einen Apfel', 'Ein Ei', 'Suppe'], 0),
  ]),
});

const u06 = unit({
  id: 'u06',
  title: 'Zahlen bis 20',
  description: 'Zählen, Alter, rechnen',
  tips: [
    T(
      'Zahlen 0–20',
      `
      | | | | |
      |---|---|---|---|
      | 0 nul | 5 vijf | 10 tien | 15 vijftien |
      | 1 één | 6 zes | 11 elf | 16 zestien |
      | 2 twee | 7 zeven | 12 twaalf | 17 zeventien |
      | 3 drie | 8 acht | 13 dertien | 18 achttien |
      | 4 vier | 9 negen | 14 veertien | 19 negentien |
      | | | | 20 twintig |

      Achtung: *dertien* (drei → *der-*) und *veertien* (vier → *veer-*), *achttien* mit zwei t.

      **één** schreibt man mit Akzenten, wenn es „eins“ heißt, damit man es von *een* („ein“) unterscheiden kann.
      `,
    ),
    T(
      'Alter und Mengen',
      `
      *Hoe oud ben je?* „Wie alt bist du?“ – *Ik ben twintig (jaar oud).*

      Nach Zahlen bleiben **jaar** und **euro** im Singular: *twintig jaar*, *drie euro*.

      **hoeveel** heißt „wie viel“ und „wie viele“.
      `,
      [
        ['Ik ben twintig jaar oud.', 'Ich bin zwanzig Jahre alt.'],
        ['Ik heb nog drie euro.', 'Ich habe noch drei Euro.'],
      ],
    ),
    T(
      "met z'n tweeën",
      `
      „Zu zweit, zu dritt, zu viert“ heißt *met z'n tweeën, met z'n drieën, met z'n vieren*. **z'n** ist die Kurzform von *zijn*.
      `,
      [["We zijn met z'n tweeën.", 'Wir sind zu zweit.']],
    ),
  ],
  words: [
    W('nul', 'null', 'num', { emoji: '0️⃣' }),
    W('één', 'eins', 'num', { emoji: '1️⃣' }),
    W('twee', 'zwei', 'num', { emoji: '2️⃣', forms: 'tweeën' }),
    W('drie', 'drei', 'num', { emoji: '3️⃣', forms: 'drieën' }),
    W('vier', 'vier', 'num', { emoji: '4️⃣', forms: 'vieren' }),
    W('vijf', 'fünf', 'num', { emoji: '5️⃣' }),
    W('zes', 'sechs', 'num', { emoji: '6️⃣' }),
    W('zeven', 'sieben', 'num', { emoji: '7️⃣' }),
    W('acht', 'acht', 'num', { emoji: '8️⃣' }),
    W('negen', 'neun', 'num', { emoji: '9️⃣' }),
    W('tien', 'zehn', 'num', { emoji: '🔟' }),
    W('elf', 'elf', 'num'),
    W('twaalf', 'zwölf', 'num'),
    W('dertien', 'dreizehn', 'num'),
    W('veertien', 'vierzehn', 'num'),
    W('vijftien', 'fünfzehn', 'num'),
    W('zestien', 'sechzehn', 'num'),
    W('zeventien', 'siebzehn', 'num'),
    W('achttien', 'achtzehn', 'num'),
    W('negentien', 'neunzehn', 'num'),
    W('twintig', 'zwanzig', 'num'),
    W('hoeveel', 'wie viel / wie viele', 'adv'),
    N('het jaar', 'das Jahr', 'jaren'),
    N('het nummer', 'die Nummer', 'nummers'),
    N('de euro', 'der Euro', "euro's", '💶'),
    V('tellen', 'zählen', 'tel telt tellen | telde telden | geteld h'),
    W('plus', 'plus', 'prep'),
    W('min', 'minus', 'prep'),
    W('nog', 'noch', 'adv'),
    W('pas', 'erst', 'adv'),
    W('al', 'schon', 'adv'),
    W('tot', 'bis', 'prep'),
    W("z'n", 'sein (Kurzform)', 'det'),
  ],
  sentences: [
    S('Ik ben twintig jaar oud.', 'Ich bin zwanzig Jahre alt.'),
    S('Hoe oud ben je?', 'Wie alt bist du?'),
    S('Mijn zus is zestien.', 'Meine Schwester ist sechzehn.'),
    S('Hij heeft drie kinderen.', 'Er hat drei Kinder.'),
    S('Wij hebben twee katten.', 'Wir haben zwei Katzen.'),
    S('Ik heb vijf appels.', 'Ich habe fünf Äpfel.'),
    S('Hoeveel kinderen heeft u?|Hoeveel kinderen hebt u?', 'Wie viele Kinder haben Sie?'),
    S('Twee plus drie is vijf.', 'Zwei plus drei ist fünf.|Zwei plus drei sind fünf.|Zwei plus drei gleich fünf.'),
    S('Tien min vier is zes.', 'Zehn minus vier ist sechs.|Zehn minus vier sind sechs.|Zehn minus vier gleich sechs.'),
    S('Mijn opa is oud, maar mijn broer is pas elf.', 'Mein Opa ist alt, aber mein Bruder ist erst elf.'),
    S('De baby is één jaar oud.', 'Das Baby ist ein Jahr alt.'),
    S('Ik tel tot tien.', 'Ich zähle bis zehn.'),
    S('Het kind telt tot twintig.', 'Das Kind zählt bis zwanzig.'),
    S('Hoeveel is acht plus negen?', 'Wie viel ist acht plus neun?|Wie viel sind acht plus neun?'),
    S('Acht plus negen is zeventien.', 'Acht plus neun ist siebzehn.|Acht plus neun sind siebzehn.'),
    S("We zijn met z'n tweeën.|We zijn met zijn tweeën.", 'Wir sind zu zweit.'),
    S('Mijn nummer is twaalf.', 'Meine Nummer ist zwölf.'),
    S('Ik heb nog drie euro.', 'Ich habe noch drei Euro.'),
    S('Dat is veertien euro.', 'Das sind vierzehn Euro.|Das macht vierzehn Euro.'),
    S('Hoe oud is je moeder?', 'Wie alt ist deine Mutter?'),
    S('Mijn neef is achttien jaar oud.', 'Mein Cousin ist achtzehn Jahre alt.|Mein Neffe ist achtzehn Jahre alt.'),
    S('Ik ben al negentien.', 'Ich bin schon neunzehn.'),
    S('Ik tel van nul tot dertien.', 'Ich zähle von null bis dreizehn.'),
  ],
  cloze: [
    C('Ik ben twintig {jaar} oud.', 'jaar|jaren', 'Ich bin zwanzig Jahre alt.'),
    C('Hoe {oud} ben je?', 'oud|veel|goed', 'Wie alt bist du?'),
    C('{Hoeveel} kinderen heeft u?', 'Hoeveel|Hoe|Wie', 'Wie viele Kinder haben Sie?'),
    C('Twee plus twee is {vier}.', 'vier|vijf|drie', 'Zwei plus zwei ist vier.'),
    C('Drie plus vijf is {acht}.', 'zes|acht|negen', 'Drei plus fünf ist acht.'),
    C('Ik heb drie {appels}.', 'appel|appels', 'Ich habe drei Äpfel.'),
    C('Dat is tien {euro}.', "euro|euro's", 'Das sind zehn Euro.'),
  ],
  story: story('st06', 'Hoe oud ben je?', 'Wie alt bist du?', [
    ['Mila', 'Hoi! Ik ben Mila. Ik ben acht.', 'Hi! Ich bin Mila. Ich bin acht.'],
    ['Sem', 'Ik ben Sem. Ik ben al tien!', 'Ich bin Sem. Ich bin schon zehn!'],
    Q('Wie alt ist Sem?', ['Zehn', 'Acht', 'Zwölf'], 0),
    ['Mila', 'Heb je broers of zussen?', 'Hast du Brüder oder Schwestern?'],
    ['Sem', 'Ja, ik heb twee zussen. Ze zijn vijftien en zeventien.', 'Ja, ich habe zwei Schwestern. Sie sind fünfzehn und siebzehn.'],
    ['Mila', 'Ik heb een broer. Hij is pas één jaar oud.', 'Ich habe einen Bruder. Er ist erst ein Jahr alt.'],
    Q('Wie viele Schwestern hat Sem?', ['Zwei', 'Eine', 'Drei'], 0),
    ['Sem', 'En ik heb drie katten!', 'Und ich habe drei Katzen!'],
    ['Mila', 'Drie katten? Wat leuk!', 'Drei Katzen? Wie toll!'],
    Q('Wie viele Katzen hat Sem?', ['Drei', 'Zwei', 'Keine'], 0),
  ]),
});

const u07 = unit({
  id: 'u07',
  title: 'Fragen stellen',
  description: 'wat, wie, waar, wanneer, waarom, welk; neue Verben',
  tips: [
    T(
      'Fragewörter',
      `
      | | |
      |---|---|
      | wat | was |
      | wie | wer |
      | waar | wo |
      | wanneer | wann |
      | waarom | warum |
      | hoe | wie |
      | hoeveel | wie viel |
      | welk / welke | welcher, welche, welches |

      Achtung: **wie** heißt „wer“ und **hoe** heißt „wie“.
      `,
      [
        ['Wie schrijft een brief?', 'Wer schreibt einen Brief?'],
        ['Hoe gaat het met je moeder?', 'Wie geht es deiner Mutter?'],
      ],
    ),
    T(
      'Wortstellung in Fragen',
      `
      W-Frage: Fragewort + Verb + Subjekt: *Wat lees je?*

      Ja/Nein-Frage: Verb + Subjekt: *Lees je een boek?*

      Denk an die Regel aus Kapitel 2: Nach dem Verb fällt vor **jij/je** das t weg: *Werk je hier?* aber *Werkt u hier?*
      `,
      [
        ['Wat lees je?', 'Was liest du?'],
        ['Werkt u thuis?', 'Arbeiten Sie zu Hause?'],
      ],
    ),
    T(
      'welk oder welke?',
      `
      **welk** steht vor **het**-Wörtern im Singular, sonst **welke**:

      - *welk boek* (*het boek*)
      - *welke krant* (*de krant*)
      - *welke boeken* (Plural)
      `,
      [['Welk boek lees je?', 'Welches Buch liest du?']],
    ),
    T(
      'Wohin?',
      `
      „Wohin gehst du?“ heißt *Waar ga je naartoe?* oder *Waar ga je heen?*

      **naar** heißt „nach“ oder „zu“: *naar school, naar huis, naar Amsterdam*. **gaan** ist unregelmäßig: *ik ga, jij gaat, wij gaan*.
      `,
      [['Ik ga naar school.', 'Ich gehe zur Schule.']],
    ),
  ],
  words: [
    W('wat', 'was', 'pron'),
    W('wanneer', 'wann', 'adv'),
    W('waarom', 'warum', 'adv'),
    W('welk', 'welches (vor het-Wörtern)', 'det'),
    W('welke', 'welcher / welche', 'det'),
    V('doen', 'tun, machen', 'doe doet doen | deed deden | gedaan h'),
    V('maken', 'machen', 'maak maakt maken | maakte maakten | gemaakt h'),
    V('lezen', 'lesen', 'lees leest lezen | las lazen | gelezen h'),
    V('schrijven', 'schreiben', 'schrijf schrijft schrijven | schreef schreven | geschreven h'),
    V('werken', 'arbeiten', 'werk werkt werken | werkte werkten | gewerkt h'),
    V('leren', 'lernen', 'leer leert leren | leerde leerden | geleerd h'),
    V('zien', 'sehen', 'zie ziet zien | zag zagen | gezien h'),
    V('gaan', 'gehen', 'ga gaat gaan | ging gingen | gegaan z'),
    N('het boek', 'das Buch', 'boeken', '📖'),
    N('de krant', 'die Zeitung', 'kranten', '📰'),
    N('de brief', 'der Brief', 'brieven', '✉️'),
    N('de school', 'die Schule', 'scholen', '🏫'),
    N('het huis', 'das Haus', 'huizen', '🏠'),
    W('hier', 'hier', 'adv'),
    W('daar', 'da, dort', 'adv'),
    W('thuis', 'zu Hause', 'adv'),
    W('naar', 'nach, zu', 'prep'),
    W('naartoe', 'hin (wohin)', 'adv'),
    W('over', 'über', 'prep'),
    W('terug', 'zurück', 'adv'),
  ],
  sentences: [
    S('Wat doe je?', 'Was machst du?|Was tust du?'),
    S('Ik lees een boek.', 'Ich lese ein Buch.'),
    S('Wat lees je?', 'Was liest du?'),
    S('Hij leest de krant.', 'Er liest die Zeitung.'),
    S('Waar werk je?', 'Wo arbeitest du?'),
    S('Ik werk hier.', 'Ich arbeite hier.'),
    S('Wanneer werk je?', 'Wann arbeitest du?'),
    S('Waarom leer je Nederlands?', 'Warum lernst du Niederländisch?'),
    S('Wie schrijft een brief?', 'Wer schreibt einen Brief?'),
    S('Mijn oma schrijft een brief.', 'Meine Oma schreibt einen Brief.|Meine Großmutter schreibt einen Brief.'),
    S('Waar ga je naartoe?|Waar ga je heen?', 'Wohin gehst du?|Wo gehst du hin?'),
    S('Ik ga naar school.', 'Ich gehe zur Schule.|Ich gehe in die Schule.'),
    S('Welk boek lees je?', 'Welches Buch liest du?'),
    S('Welke krant lees je?', 'Welche Zeitung liest du?'),
    S('Wat maakt hij?', 'Was macht er?'),
    S('Hij maakt soep.', 'Er macht Suppe.|Er kocht Suppe.'),
    S('Zie je de hond?', 'Siehst du den Hund?'),
    S('Ja, de hond is daar.', 'Ja, der Hund ist da.|Ja, der Hund ist dort.'),
    S('Hoe gaat het met je moeder?', 'Wie geht es deiner Mutter?'),
    S('Werkt u thuis?', 'Arbeiten Sie zu Hause?'),
    S('Wat leren de kinderen?', 'Was lernen die Kinder?'),
    S('Ze leren Duits.', 'Sie lernen Deutsch.'),
    S('Wat is dat?', 'Was ist das?'),
    S('Dat is mijn huis.', 'Das ist mein Haus.'),
  ],
  cloze: [
    C('{Wat} doe je?', 'Wat|Wie|Waar', 'Was machst du?'),
    C('{Waar} werk je?', 'Waar|Wat|Wanneer', 'Wo arbeitest du?'),
    C('{Welk} boek lees je?', 'Welk|Welke', 'Welches Buch liest du?'),
    C('{Welke} krant lees je?', 'Welk|Welke', 'Welche Zeitung liest du?'),
    C('{Lees} je een boek?', 'Lees|Leest|Lezen', 'Liest du ein Buch?'),
    C('Wat {leest} hij?', 'lees|leest|lezen', 'Was liest er?'),
    C('Ik ga {naar} school.', 'naar|uit|van', 'Ich gehe zur Schule.'),
    C('{Wie} schrijft een brief?', 'Wie|Hoe|Wat', 'Wer schreibt einen Brief?'),
  ],
  story: story('st07', 'Wat doe je?', 'Was machst du?', [
    ['Fleur', 'Hoi Bram! Wat doe je?', 'Hi, Bram! Was machst du?'],
    ['Bram', 'Ik lees een boek. En jij?', 'Ich lese ein Buch. Und du?'],
    ['Fleur', 'Ik werk. Welk boek lees je?', 'Ich arbeite. Welches Buch liest du?'],
    ['Bram', 'Een boek over Amsterdam.', 'Ein Buch über Amsterdam.'],
    Q('Was macht Bram?', ['Er liest ein Buch', 'Er arbeitet', 'Er schreibt einen Brief'], 0),
    ['Fleur', 'Waarom lees je over Amsterdam?', 'Warum liest du über Amsterdam?'],
    ['Bram', 'Ik ga morgen naar Amsterdam!', 'Ich fahre morgen nach Amsterdam!'],
    Q('Wann fährt Bram nach Amsterdam?', ['Morgen', 'Heute', 'Nie'], 0),
    ['Fleur', 'Leuk! Wanneer kom je terug?', 'Toll! Wann kommst du zurück?'],
    ['Bram', 'Zondag.', 'Am Sonntag.'],
    Q('Wann kommt Bram zurück?', ['Am Sonntag', 'Morgen', 'Heute'], 0),
  ]),
});

const u08 = unit({
  id: 'u08',
  title: 'Farben und Eigenschaften',
  description: 'Farben, Adjektive und die Endung -e',
  tips: [
    T(
      'Adjektive: mit oder ohne -e?',
      `
      Steht das Adjektiv **hinter** dem Nomen (nach *zijn*), bleibt es unverändert: *De auto is rood.*

      Steht es **vor** dem Nomen, bekommt es meistens ein **-e**: *de rode auto, een rode auto, rode auto's*.

      **Ausnahme:** Bei **het**-Wörtern im Singular ohne bestimmten Artikel gibt es kein -e: *een groot huis, koud water*. Aber: *het grote huis*.
      `,
      [
        ['Ik heb een rode auto.', 'Ich habe ein rotes Auto.'],
        ['Dat is een groot huis.', 'Das ist ein großes Haus.'],
        ['Het grote huis is mooi.', 'Das große Haus ist schön.'],
      ],
    ),
    T(
      'Rechtschreibung bei -e',
      `
      - Doppelter Vokal wird einfach, wenn die Silbe offen wird: *rood → rode, groot → grote, geel → gele*
      - Nach kurzem Vokal wird der Konsonant verdoppelt: *wit → witte*
      - **s** wird oft **z**, **f** wird **v**: *grijs → grijze, lief → lieve*

      **oranje** und **roze** bleiben immer gleich: *een oranje tas*.
      `,
    ),
    T(
      'Falsche Freunde',
      `
      - **lang** heißt bei Menschen „groß“: *De man is lang.* „Der Mann ist groß.“
      - „langsam“ heißt **langzaam**.
      - **de auto** und **de fiets** haben im Niederländischen den Artikel *de*, im Deutschen „das“.
      `,
    ),
  ],
  words: [
    A('rood', 'rot', 'rode - -', { emoji: '🔴' }),
    A('blauw', 'blau', 'blauwe - -', { emoji: '🔵' }),
    A('geel', 'gelb', 'gele - -', { emoji: '🟡' }),
    A('groen', 'grün', 'groene - -', { emoji: '🟢' }),
    A('wit', 'weiß', 'witte - -', { emoji: '⚪' }),
    A('zwart', 'schwarz', 'zwarte - -', { emoji: '⚫' }),
    A('oranje', 'orange', '- - -', { emoji: '🟠' }),
    A('bruin', 'braun', 'bruine - -', { emoji: '🟤' }),
    A('grijs', 'grau', 'grijze - -'),
    A('roze', 'rosa', '- - -'),
    A('paars', 'lila', 'paarse - -', { emoji: '🟣' }),
    A('groot', 'groß', 'grote groter grootst'),
    A('klein', 'klein', 'kleine kleiner kleinst'),
    A('mooi', 'schön', 'mooie mooier mooist'),
    A('lelijk', 'hässlich', 'lelijke lelijker lelijkst'),
    A('nieuw', 'neu', 'nieuwe nieuwer nieuwst'),
    A('lang', 'lang; groß (Person)', 'lange langer langst'),
    A('kort', 'kurz', 'korte korter kortst'),
    A('duur', 'teuer', 'dure duurder duurst'),
    A('goedkoop', 'billig, günstig', 'goedkope goedkoper goedkoopst'),
    A('snel', 'schnell', 'snelle sneller snelst'),
    A('langzaam', 'langsam', 'langzame langzamer langzaamst'),
    A('slecht', 'schlecht', 'slechte slechter slechtst'),
    A('warm', 'warm', 'warme warmer warmst'),
    A('koud', 'kalt', 'koude kouder koudst'),
    N('de kleur', 'die Farbe', 'kleuren', '🎨'),
    N('de auto', 'das Auto', "auto's", '🚗'),
    N('de fiets', 'das Fahrrad', 'fietsen', '🚲'),
    N('de tas', 'die Tasche', 'tassen', '👜'),
    N('de bloem', 'die Blume', 'bloemen', '🌸'),
    N('de jas', 'die Jacke, der Mantel', 'jassen', '🧥'),
    N('de stoel', 'der Stuhl', 'stoelen', '🪑'),
    N('de tafel', 'der Tisch', 'tafels'),
    V('kijken', 'schauen, gucken', 'kijk kijkt kijken | keek keken | gekeken h'),
  ],
  sentences: [
    S('De auto is rood.', 'Das Auto ist rot.'),
    S('Ik heb een rode auto.', 'Ich habe ein rotes Auto.'),
    S('De fiets is zwart.', 'Das Fahrrad ist schwarz.'),
    S('Het huis is groot.', 'Das Haus ist groß.'),
    S('Dat is een groot huis.', 'Das ist ein großes Haus.'),
    S('Het grote huis is mooi.', 'Das große Haus ist schön.'),
    S('Ik heb een nieuwe fiets.', 'Ich habe ein neues Fahrrad.'),
    S('Welke kleur heeft de tas?', 'Welche Farbe hat die Tasche?'),
    S('De tas is bruin.', 'Die Tasche ist braun.'),
    S('Mijn jas is blauw.', 'Meine Jacke ist blau.|Mein Mantel ist blau.'),
    S('De bloemen zijn geel en oranje.', 'Die Blumen sind gelb und orange.'),
    S('Het kleine kind is moe.', 'Das kleine Kind ist müde.'),
    S('Een klein kind drinkt melk.', 'Ein kleines Kind trinkt Milch.'),
    S('De auto is duur, maar de fiets is goedkoop.', 'Das Auto ist teuer, aber das Fahrrad ist billig.|Das Auto ist teuer, aber das Fahrrad ist günstig.'),
    S('Ik drink koude melk.', 'Ich trinke kalte Milch.'),
    S('De soep is warm.', 'Die Suppe ist warm.'),
    S('Een witte kat en een zwarte hond.', 'Eine weiße Katze und ein schwarzer Hund.'),
    S('Mijn opa heeft een grijze auto.', 'Mein Opa hat ein graues Auto.|Mein Großvater hat ein graues Auto.'),
    S('Dat is een mooie bloem.', 'Das ist eine schöne Blume.'),
    S('De man is lang.|De man is groot.', 'Der Mann ist groß.'),
    S('Een snelle auto is duur.', 'Ein schnelles Auto ist teuer.'),
    S('De fiets is oud en langzaam.', 'Das Fahrrad ist alt und langsam.'),
    S('Het rode boek is nieuw.', 'Das rote Buch ist neu.'),
    S('De stoel is lelijk.', 'Der Stuhl ist hässlich.'),
    S('Kijk, een groene tafel!', 'Schau, ein grüner Tisch!|Guck mal, ein grüner Tisch!'),
    S('Haar tas is roze en paars.', 'Ihre Tasche ist rosa und lila.'),
    S('De jas is kort.', 'Die Jacke ist kurz.|Der Mantel ist kurz.'),
    S('Dat is een slecht boek.', 'Das ist ein schlechtes Buch.'),
  ],
  cloze: [
    C('Ik heb een {rode} auto.', 'rood|rode', 'Ich habe ein rotes Auto.'),
    C('Dat is een {groot} huis.', 'groot|grote', 'Das ist ein großes Haus.'),
    C('Het {grote} huis is mooi.', 'groot|grote', 'Das große Haus ist schön.'),
    C('Een {klein} kind drinkt melk.', 'klein|kleine', 'Ein kleines Kind trinkt Milch.'),
    C('De fiets is {nieuw}.', 'nieuw|nieuwe', 'Das Fahrrad ist neu.'),
    C('Ik drink {koude} melk.', 'koud|koude', 'Ich trinke kalte Milch.'),
    C('Mijn {witte} kat is lief.', 'wit|witte', 'Meine weiße Katze ist lieb.'),
    C('Ik drink {koud} water.', 'koud|koude', 'Ich trinke kaltes Wasser.'),
  ],
  story: story('st08', 'De nieuwe fiets', 'Das neue Fahrrad', [
    ['Sophie', 'Kijk! Ik heb een nieuwe fiets.', 'Schau! Ich habe ein neues Fahrrad.'],
    ['Lucas', 'Hij is mooi! Welke kleur is dat?', 'Es ist schön! Welche Farbe ist das?'],
    ['Sophie', 'Blauw. En de tas is rood.', 'Blau. Und die Tasche ist rot.'],
    Q('Welche Farbe hat Sophies Fahrrad?', ['Blau', 'Rot', 'Schwarz'], 0),
    ['Lucas', 'Is de fiets duur?', 'Ist das Fahrrad teuer?'],
    ['Sophie', 'Nee, de fiets is goedkoop.', 'Nein, das Fahrrad ist billig.'],
    ['Lucas', 'Mijn fiets is oud en lelijk.', 'Mein Fahrrad ist alt und hässlich.'],
    ['Sophie', 'Maar hij is snel!', 'Aber es ist schnell!'],
    Q('Wie ist das Fahrrad von Lucas?', ['Alt, hässlich und schnell', 'Neu und blau', 'Teuer und langsam'], 0),
  ]),
});

const u09 = unit({
  id: 'u09',
  title: 'Nein!',
  description: 'Verneinen mit niet und geen; nie, nichts, niemand',
  tips: [
    T(
      'niet oder geen?',
      `
      **geen** heißt „kein“. Es steht vor Nomen mit *een* oder ohne Artikel:

      - *Ik heb een auto.* → *Ik heb geen auto.*
      - *Ik drink koffie.* → *Ik drink geen koffie.*

      Sonst verneint man mit **niet**: *Ik rook niet. Dat is niet mijn fiets. De soep is niet warm.*
      `,
      [
        ['Ik heb geen auto.', 'Ich habe kein Auto.'],
        ['Ik rook niet.', 'Ich rauche nicht.'],
      ],
    ),
    T(
      'Wo steht niet?',
      `
      **niet** steht meistens am Satzende: *Ik ken Anna niet.*

      Vor Adjektiven, vor Präpositionen und vor dem, was man verneint, steht es davor: *niet warm, niet in Amsterdam, niet mijn fiets*.
      `,
      [['Nee, ik ken Anna niet.', 'Nein, ich kenne Anna nicht.']],
    ),
    T(
      'wel und jawel',
      `
      **wel** betont das Gegenteil einer Verneinung, ähnlich wie „schon“ oder „aber“: *Ik drink geen koffie, maar wel thee.*

      **jawel** heißt „doch“, als Antwort auf eine verneinte Frage: *Heb je geen tijd? – Jawel!*
      `,
      [['Jawel, ik heb wel tijd.', 'Doch, ich habe Zeit.']],
    ),
    T(
      'nie, nichts, niemand',
      `
      | | |
      |---|---|
      | nooit | nie |
      | niets | nichts |
      | niemand | niemand |
      | nog niet | noch nicht |
      | niet meer | nicht mehr |
      | altijd | immer |
      | vaak | oft |
      | soms | manchmal |
      `,
    ),
  ],
  words: [
    W('niet', 'nicht', 'adv'),
    W('geen', 'kein / keine', 'det'),
    W('wel', 'schon, doch (betont)', 'adv'),
    W('jawel', 'doch', 'interj'),
    W('nooit', 'nie', 'adv'),
    W('altijd', 'immer', 'adv'),
    W('vaak', 'oft', 'adv'),
    W('soms', 'manchmal', 'adv'),
    W('iets', 'etwas', 'pron'),
    W('niets', 'nichts', 'pron'),
    W('iemand', 'jemand', 'pron'),
    W('niemand', 'niemand', 'pron'),
    W('alles', 'alles', 'pron'),
    W('meer', 'mehr', 'adv'),
    V('weten', 'wissen', 'weet weet weten | wist wisten | geweten h'),
    V('kennen', 'kennen', 'ken kent kennen | kende kenden | gekend h'),
    V('begrijpen', 'verstehen', 'begrijp begrijpt begrijpen | begreep begrepen | begrepen h'),
    V('roken', 'rauchen', 'rook rookt roken | rookte rookten | gerookt h'),
    V('zwemmen', 'schwimmen', 'zwem zwemt zwemmen | zwom zwommen | gezwommen hz'),
    N('de tijd', 'die Zeit', 'tijden', '⏰'),
    N('het geld', 'das Geld', '-', '💶'),
    N('het probleem', 'das Problem', 'problemen'),
    N('de vraag', 'die Frage', 'vragen', '❓'),
    N('het antwoord', 'die Antwort', 'antwoorden'),
    A('kapot', 'kaputt', 'kapotte - -'),
  ],
  sentences: [
    S('Ik rook niet.', 'Ich rauche nicht.'),
    S('Ik heb geen auto.', 'Ich habe kein Auto.'),
    S('Hij heeft geen tijd.', 'Er hat keine Zeit.'),
    S('Wij hebben geen geld.', 'Wir haben kein Geld.'),
    S('Dat is niet mijn fiets.', 'Das ist nicht mein Fahrrad.'),
    S('De soep is niet warm.', 'Die Suppe ist nicht warm.'),
    S('Ik begrijp het niet.', 'Ich verstehe es nicht.|Ich verstehe das nicht.'),
    S('Ik weet het niet.', 'Ich weiß es nicht.|Ich weiß das nicht.'),
    S('Ken je Anna?', 'Kennst du Anna?'),
    S('Nee, ik ken Anna niet.', 'Nein, ich kenne Anna nicht.'),
    S('Hij eet geen vlees.', 'Er isst kein Fleisch.'),
    S('Ze drinkt nooit koffie.', 'Sie trinkt nie Kaffee.|Sie trinkt niemals Kaffee.'),
    S('Heb je geen tijd?', 'Hast du keine Zeit?'),
    S('Jawel, ik heb wel tijd.', 'Doch, ich habe Zeit.|Doch, ich habe schon Zeit.'),
    S('Niemand is thuis.', 'Niemand ist zu Hause.|Keiner ist zu Hause.'),
    S('Ik zie niets.', 'Ich sehe nichts.'),
    S('Hij zwemt nog niet.', 'Er schwimmt noch nicht.'),
    S('Ik rook niet meer.', 'Ich rauche nicht mehr.'),
    S('Ze zwemt altijd.', 'Sie schwimmt immer.'),
    S('Ik heb een vraag.', 'Ich habe eine Frage.'),
    S('Dat is geen probleem.', 'Das ist kein Problem.'),
    S('Ik weet het antwoord niet.', 'Ich weiß die Antwort nicht.'),
    S('Hij leest soms de krant.', 'Er liest manchmal die Zeitung.'),
    S('Wij eten vaak vis.', 'Wir essen oft Fisch.'),
    S('Alles is goed.', 'Alles ist gut.'),
    S('Ik drink geen koffie, maar wel thee.', 'Ich trinke keinen Kaffee, aber Tee.|Ich trinke keinen Kaffee, aber schon Tee.'),
    S('Ik zie iemand.', 'Ich sehe jemanden.|Ich sehe jemand.'),
    S('Ik weet iets.', 'Ich weiß etwas.'),
  ],
  cloze: [
    C('Ik heb {geen} auto.', 'geen|niet', 'Ich habe kein Auto.'),
    C('Ik rook {niet}.', 'geen|niet', 'Ich rauche nicht.'),
    C('Dat is {geen} probleem.', 'geen|niet', 'Das ist kein Problem.'),
    C('De soep is {niet} warm.', 'geen|niet', 'Die Suppe ist nicht warm.'),
    C('Hij eet {geen} vlees.', 'geen|niet', 'Er isst kein Fleisch.'),
    C('Ik weet het {niet}.', 'geen|niet', 'Ich weiß es nicht.'),
    C('Ik drink geen koffie, maar {wel} thee.', 'wel|niet|geen', 'Ich trinke keinen Kaffee, aber Tee.'),
    C('Ze drinkt {nooit} koffie.', 'nooit|niets|niemand', 'Sie trinkt nie Kaffee.'),
  ],
  story: story('st09', 'Geen tijd', 'Keine Zeit', [
    ['Jan', 'Pieter, heb je tijd?', 'Pieter, hast du Zeit?'],
    ['Pieter', 'Nee, sorry, ik heb geen tijd.', 'Nein, sorry, ich habe keine Zeit.'],
    ['Jan', 'Ook niet morgen?', 'Auch morgen nicht?'],
    ['Pieter', 'Morgen wel. Wat is het probleem?', 'Morgen schon. Was ist das Problem?'],
    Q('Wann hat Pieter Zeit?', ['Morgen', 'Heute', 'Nie'], 0),
    ['Jan', 'Mijn fiets is kapot.', 'Mein Fahrrad ist kaputt.'],
    ['Pieter', 'Geen probleem! Ik kom morgen.', 'Kein Problem! Ich komme morgen.'],
    Q('Was ist Jans Problem?', ['Sein Fahrrad ist kaputt', 'Er hat kein Geld', 'Er versteht nichts'], 0),
  ]),
});

const u10 = unit({
  id: 'u10',
  title: 'Mehrzahl',
  description: 'Plural mit -en und -s; deze, die, dit, dat',
  tips: [
    T(
      'Plural mit -en',
      `
      Die meisten Nomen bekommen **-en**: *boek → boeken*. Dabei gelten die Schreibregeln:

      - Doppelvokal wird einfach: *boom → bomen, jaar → jaren*
      - Nach kurzem Vokal Konsonant verdoppeln: *bed → bedden, kat → katten*
      - **f** wird **v**, **s** wird **z**: *brief → brieven, huis → huizen*
      `,
      [['De bomen zijn groot.', 'Die Bäume sind groß.']],
    ),
    T(
      'Plural mit -s',
      `
      **-s** bekommen vor allem Nomen auf **-el, -em, -en, -er, -je**: *tafel → tafels, jongen → jongens, kamer → kamers, meisje → meisjes*.

      Nomen auf **a, i, o, u, y** bekommen **'s**: *auto → auto's, foto → foto's, baby → baby's*.

      Manche Wörter haben zwei Formen: *appels* und *appelen*.
      `,
      [["Ik heb veel foto's van mijn familie.", 'Ich habe viele Fotos von meiner Familie.']],
    ),
    T(
      'Unregelmäßige Formen',
      `
      *kind → kinderen, ei → eieren, stad → steden, schip → schepen, dag → dagen, koe → koeien*.
      `,
    ),
    T(
      'deze, die, dit, dat',
      `
      | | hier | da |
      |---|---|---|
      | de-Wort | deze stoel | die stoel |
      | het-Wort | dit bed | dat bed |
      | Plural | deze stoelen | die stoelen |

      Im Deutschen sagt man oft „dieser“ oder „der da“.
      `,
      [
        ['Deze stoel is nieuw.', 'Dieser Stuhl ist neu.'],
        ['Dit bed is groot.', 'Dieses Bett ist groß.'],
      ],
    ),
  ],
  words: [
    W('deze', 'dieser / diese', 'det'),
    W('die', 'der / die (da), jener', 'det'),
    W('veel', 'viel / viele', 'adv'),
    W('op', 'auf', 'prep'),
    N('het bed', 'das Bett', 'bedden', '🛏️'),
    N('de boom', 'der Baum', 'bomen', '🌳'),
    N('de deur', 'die Tür', 'deuren', '🚪'),
    N('het raam', 'das Fenster', 'ramen', '🪟'),
    N('de kamer', 'das Zimmer', 'kamers'),
    N('het glas', 'das Glas', 'glazen'),
    N('de stad', 'die Stadt', 'steden', '🏙️'),
    N('het schip', 'das Schiff', 'schepen', '🚢'),
    N('de koe', 'die Kuh', 'koeien', '🐄'),
    N('de foto', 'das Foto', "foto's", '📷'),
    N('de taal', 'die Sprache', 'talen'),
    N('het dier', 'das Tier', 'dieren'),
    N('de vogel', 'der Vogel', 'vogels', '🐦'),
    N('het paard', 'das Pferd', 'paarden', '🐎'),
    N('de pen', 'der Stift, der Kuli', 'pennen', '🖊️'),
    N('de sleutel', 'der Schlüssel', 'sleutels', '🔑'),
    N('de week', 'die Woche', 'weken'),
    N('de dag', 'der Tag', 'dagen'),
    A('open', 'offen', '- - -'),
    V('slapen', 'schlafen', 'slaap slaapt slapen | sliep sliepen | geslapen h'),
  ],
  sentences: [
    S('De bomen zijn groot.', 'Die Bäume sind groß.'),
    S('Deze stoel is nieuw.', 'Dieser Stuhl ist neu.'),
    S('Dit bed is groot.', 'Dieses Bett ist groß.|Das Bett hier ist groß.'),
    S('Die deur is rood.', 'Die Tür da ist rot.|Jene Tür ist rot.|Diese Tür ist rot.'),
    S('Dat raam is open.', 'Das Fenster da ist offen.|Jenes Fenster ist offen.|Dieses Fenster ist offen.'),
    S('Deze kamers zijn klein.', 'Diese Zimmer sind klein.'),
    S('Die huizen zijn duur.', 'Die Häuser da sind teuer.|Jene Häuser sind teuer.|Diese Häuser sind teuer.'),
    S('Het huis heeft vier ramen.', 'Das Haus hat vier Fenster.'),
    S('In de stad zijn veel mensen.|In de stad zijn er veel mensen.', 'In der Stadt sind viele Menschen.|In der Stadt gibt es viele Menschen.|In der Stadt sind viele Leute.'),
    S('Amsterdam en Utrecht zijn steden.', 'Amsterdam und Utrecht sind Städte.'),
    S('De koeien zijn zwart en wit.', 'Die Kühe sind schwarz und weiß.'),
    S("Ik heb veel foto's van mijn familie.", 'Ich habe viele Fotos von meiner Familie.'),
    S('De vogels zijn klein.', 'Die Vögel sind klein.'),
    S('Paarden zijn mooie dieren.', 'Pferde sind schöne Tiere.'),
    S('Welke talen spreek je?', 'Welche Sprachen sprichst du?'),
    S('Ik spreek twee talen.', 'Ich spreche zwei Sprachen.'),
    S('Waar zijn mijn sleutels?', 'Wo sind meine Schlüssel?'),
    S('De glazen zijn op de tafel.|De glazen staan op de tafel.', 'Die Gläser sind auf dem Tisch.|Die Gläser stehen auf dem Tisch.'),
    S('Deze pennen zijn blauw.', 'Diese Stifte sind blau.|Diese Kulis sind blau.'),
    S('De schepen zijn groot.', 'Die Schiffe sind groß.'),
    S('Een week heeft zeven dagen.', 'Eine Woche hat sieben Tage.'),
    S('Mijn ouders hebben twee honden en drie katten.', 'Meine Eltern haben zwei Hunde und drei Katzen.'),
    S('Deze appels zijn lekker.', 'Diese Äpfel sind lecker.'),
    S('Ik heb zes eieren.', 'Ich habe sechs Eier.'),
    S('De kinderen slapen.', 'Die Kinder schlafen.'),
  ],
  cloze: [
    C('{Deze} stoel is nieuw.', 'Deze|Dit', 'Dieser Stuhl ist neu.'),
    C('{Dit} bed is groot.', 'Deze|Dit', 'Dieses Bett ist groß.'),
    C('{Die} deur is rood.', 'Die|Dat', 'Die Tür da ist rot.'),
    C('{Dat} raam is open.', 'Die|Dat', 'Das Fenster da ist offen.'),
    C('Ik heb twee {katten}.', 'kat|katten', 'Ich habe zwei Katzen.'),
    C('Amsterdam en Utrecht zijn {steden}.', 'stad|steden', 'Amsterdam und Utrecht sind Städte.'),
    C("Ik heb veel {foto's}.", "foto|foto's", 'Ich habe viele Fotos.'),
    C('{Deze} appels zijn lekker.', 'Deze|Dit', 'Diese Äpfel sind lecker.'),
    C('Ik heb zes {eieren}.', 'ei|eieren', 'Ich habe sechs Eier.'),
  ],
  story: story('st10', 'Mijn kamer', 'Mein Zimmer', [
    ['Lotte', 'Dit is mijn kamer.', 'Das ist mein Zimmer.'],
    ['Lotte', 'Ik heb een bed, een tafel en twee stoelen.', 'Ich habe ein Bett, einen Tisch und zwei Stühle.'],
    ['Lotte', 'Het raam is groot.', 'Das Fenster ist groß.'],
    Q('Wie viele Stühle hat Lotte?', ['Zwei', 'Einen', 'Drei'], 0),
    ['Lotte', "Op de tafel zijn veel boeken en foto's.", 'Auf dem Tisch sind viele Bücher und Fotos.'],
    ['Lotte', 'Deze foto is van mijn familie.', 'Dieses Foto ist von meiner Familie.'],
    ['Lotte', 'En dat is mijn kat. Ze slaapt altijd op het bed!', 'Und das ist meine Katze. Sie schläft immer auf dem Bett!'],
    Q('Wo schläft die Katze?', ['Auf dem Bett', 'Auf dem Tisch', 'Auf dem Stuhl'], 0),
  ]),
});

export default [u01, u02, u03, u04, u05, u06, u07, u08, u09, u10];
