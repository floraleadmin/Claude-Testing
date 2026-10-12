// Section 5 – Mittelstufe (A2–B1)
import { A, C, N, NP, P, Q, S, T, V, W, story, unit } from '../dsl';

const u41 = unit({
  id: 'u41',
  title: 'Relativsätze',
  description: 'die, dat, wie, wat und waarin, waarop, waarmee',
  tips: [
    T(
      'die oder dat?',
      `
      - **die** für **de**-Wörter und für den Plural: *de man die …, de boeken die …*
      - **dat** für **het**-Wörter im Singular: *het huis dat …*

      Achtung, das Deutsche hilft nicht: „das Fahrrad, **das** …“ = *de fiets* **die** *…*

      Das Verb steht am Ende: *De man die daar staat, is mijn buurman.*
      `,
      [
        ['De man die daar staat, is mijn buurman.', 'Der Mann, der dort steht, ist mein Nachbar.'],
        ['Het huis dat ik koop, is oud.', 'Das Haus, das ich kaufe, ist alt.'],
      ],
    ),
    T(
      'Mit Präposition',
      `
      - Bei Personen: Präposition + **wie**: *de vrouw met wie ik praat*
      - Bei Dingen: **waar** + Präposition: *het huis waarin we wonen, de stoel waarop je zit, de pen waarmee ik schrijf*

      Das entspricht dem deutschen „in dem / worin“, „auf dem / worauf“.
      `,
      [['De vrouw met wie ik praat, is lerares.', 'Die Frau, mit der ich spreche, ist Lehrerin.']],
    ),
    T(
      'wat',
      `
      Nach *alles, iets, niets, het enige* und nach einem ganzen Satz steht **wat**:

      - *Alles wat je zegt, is waar.*
      - *Dat is het enige wat ik weet.*
      `,
    ),
  ],
  words: [
    V('dromen', 'träumen', 'droom droomt dromen | droomde droomden | gedroomd h'),
    W('die', 'der, die (Relativpronomen)', 'pron', { id: 'die-rel' }),
    W('dat', 'das (Relativpronomen)', 'pron', { id: 'dat-rel' }),
    W('wat', 'was (Relativpronomen)', 'pron', { id: 'wat-rel' }),
    W('waarin', 'in dem, worin', 'adv'),
    W('waarop', 'auf dem, worauf', 'adv'),
    W('waarmee', 'mit dem, womit', 'adv'),
    W('waarover', 'über den, worüber', 'adv'),
    W('waarvan', 'von dem, wovon', 'adv'),
    A('waar', 'wahr', 'ware - -', { id: 'waar-adj' }),
    A('enig', 'einzig', 'enige - -'),
    A('beroemd', 'berühmt', 'beroemde beroemder beroemdst'),
    N('de schrijver', 'der Schriftsteller', 'schrijvers'),
    N('de schilder', 'der Maler', 'schilders'),
    N('het schilderij', 'das Gemälde', 'schilderijen', '🖼️'),
    N('het gebouw', 'das Gebäude', 'gebouwen'),
    N('de parel', 'die Perle', 'parels'),
    V('schilderen', 'malen', 'schilder schildert schilderen | schilderde schilderden | geschilderd h'),
    V('lenen', 'leihen', 'leen leent lenen | leende leenden | geleend h'),
    V('bedoelen', 'meinen', 'bedoel bedoelt bedoelen | bedoelde bedoelden | bedoeld h'),
  ],
  sentences: [
    S('De man die daar staat, is mijn buurman.', 'Der Mann, der dort steht, ist mein Nachbar.'),
    S('Het huis dat ik koop, is oud.', 'Das Haus, das ich kaufe, ist alt.'),
    S('De boeken die ik lees, zijn spannend.', 'Die Bücher, die ich lese, sind spannend.'),
    S('Is dat de fiets die je hebt gekocht?|Is dat de fiets die je gekocht hebt?', 'Ist das das Fahrrad, das du gekauft hast?'),
    S('Het meisje dat naast me woont, heet Mila.', 'Das Mädchen, das neben mir wohnt, heißt Mila.'),
    S('Dat is de stad waar ik geboren ben.|Dat is de stad waar ik ben geboren.', 'Das ist die Stadt, in der ich geboren bin.|Das ist die Stadt, wo ich geboren bin.'),
    S('Het huis waarin we wonen, is groot.', 'Das Haus, in dem wir wohnen, ist groß.'),
    S('De stoel waarop je zit, is kapot.', 'Der Stuhl, auf dem du sitzt, ist kaputt.'),
    S('De vrouw met wie ik praat, is lerares.', 'Die Frau, mit der ich spreche, ist Lehrerin.'),
    S('Alles wat je zegt, is waar.', 'Alles, was du sagst, ist wahr.'),
    S('Is er iets wat ik kan doen?', 'Gibt es etwas, was ich tun kann?'),
    S('De film waarover we praten, is nieuw.', 'Der Film, über den wir reden, ist neu.'),
    S('Dat is het enige wat ik weet.', 'Das ist das Einzige, was ich weiß.'),
    S(
      'De schrijver die dit boek heeft geschreven, is beroemd.|De schrijver die dit boek geschreven heeft, is beroemd.',
      'Der Schriftsteller, der dieses Buch geschrieben hat, ist berühmt.',
    ),
    S('Het schilderij dat daar hangt, is van Van Gogh.', 'Das Gemälde, das dort hängt, ist von Van Gogh.'),
    S('Ken je iemand die Nederlands spreekt?', 'Kennst du jemanden, der Niederländisch spricht?'),
    S('Waar is het boek dat ik je heb geleend?|Waar is het boek dat ik je geleend heb?', 'Wo ist das Buch, das ich dir geliehen habe?'),
    S('De collega met wie ik werk, komt uit Gent.', 'Die Kollegin, mit der ich arbeite, kommt aus Gent.|Der Kollege, mit dem ich arbeite, kommt aus Gent.'),
    S('Het gebouw dat je ziet, is het station.', 'Das Gebäude, das du siehst, ist der Bahnhof.'),
    S('De pen waarmee ik schrijf, is blauw.', 'Der Stift, mit dem ich schreibe, ist blau.'),
    S('Mensen die roken, leven korter.', 'Menschen, die rauchen, leben kürzer.'),
    S('Dat is precies wat ik bedoel.', 'Das ist genau das, was ich meine.|Das ist genau, was ich meine.'),
    S('De kinderen die buiten spelen, zijn blij.', 'Die Kinder, die draußen spielen, sind froh.|Die Kinder, die draußen spielen, sind glücklich.'),
    S(
      'De schilder die dit schilderij heeft geschilderd, woonde in Delft.|De schilder die dit schilderij geschilderd heeft, woonde in Delft.',
      'Der Maler, der dieses Gemälde gemalt hat, wohnte in Delft.',
    ),
    S('Is dit de sleutel die je zoekt?', 'Ist das der Schlüssel, den du suchst?'),
    S('Het land waarvan ik droom, is ver weg.', 'Das Land, von dem ich träume, ist weit weg.'),
  ],
  cloze: [
    C('De man {die} daar staat, is mijn buurman.', 'die|dat|wie', 'Der Mann, der dort steht, ist mein Nachbar.'),
    C('Het huis {dat} ik koop, is oud.', 'dat|die|wat', 'Das Haus, das ich kaufe, ist alt.'),
    C('Het meisje {dat} naast me woont, heet Mila.', 'dat|die', 'Das Mädchen, das neben mir wohnt, heißt Mila.'),
    C('De vrouw met {wie} ik praat, is lerares.', 'wie|die|wat', 'Die Frau, mit der ich spreche, ist Lehrerin.'),
    C('Alles {wat} je zegt, is waar.', 'wat|dat|die', 'Alles, was du sagst, ist wahr.'),
    C('Het huis {waarin} we wonen, is groot.', 'waarin|dat|wie', 'Das Haus, in dem wir wohnen, ist groß.'),
    C('Is dat de fiets {die} je hebt gekocht?', 'die|dat', 'Ist das das Fahrrad, das du gekauft hast?'),
  ],
  story: story('st41', 'In het museum', 'Im Museum', [
    ['Gids', 'Het schilderij dat u hier ziet, is van Johannes Vermeer.', 'Das Gemälde, das Sie hier sehen, ist von Johannes Vermeer.'],
    ['Anna', 'Is dat de schilder die in Delft woonde?', 'Ist das der Maler, der in Delft wohnte?'],
    ['Gids', 'Precies. Hij woonde zijn hele leven in Delft.', 'Genau. Er wohnte sein ganzes Leben in Delft.'],
    Q('Von wem ist das Gemälde?', ['Von Vermeer', 'Von Van Gogh', 'Von einem unbekannten Maler'], 0),
    ['Anna', 'En het meisje met de parel? Waar hangt dat?', 'Und das Mädchen mit dem Perlenohrring? Wo hängt das?'],
    ['Gids', 'Dat schilderij hangt in Den Haag, in het Mauritshuis.', 'Dieses Gemälde hängt in Den Haag, im Mauritshuis.'],
    Q('Wo hängt das „Mädchen mit dem Perlenohrring“?', ['In Den Haag', 'In Delft', 'In Amsterdam'], 0),
  ]),
});

const u42 = unit({
  id: 'u42',
  title: 'Denn, also, sondern',
  description: 'want, dus, maar, zowel … als, noch … noch',
  tips: [
    T(
      'want oder omdat?',
      `
      Beide begründen. Der Unterschied ist die Wortstellung:

      - **want** („denn“): normale Hauptsatz-Stellung: *Ik blijf thuis, want ik ben ziek.*
      - **omdat** („weil“): Verb am Ende: *Ik blijf thuis, omdat ik ziek ben.*
      `,
      [['Ik blijf thuis, want ik ben ziek.', 'Ich bleibe zu Hause, denn ich bin krank.']],
    ),
    T(
      'maar = aber und sondern',
      `
      Das Niederländische hat kein eigenes Wort für „sondern“:

      - *Ik drink geen koffie, maar thee.* „… sondern Tee.“
      - *niet alleen … maar ook* „nicht nur … sondern auch“
      `,
      [['Ik drink geen koffie, maar thee.', 'Ich trinke keinen Kaffee, sondern Tee.']],
    ),
    T(
      'dus, zowel … als, noch … noch',
      `
      - **dus** („also“): danach normale Stellung oder Inversion: *dus we blijven* / *dus blijven we*
      - **zowel … als** – sowohl … als auch
      - **noch … noch** – weder … noch
      - **bovendien** – außerdem, **trouwens** – übrigens
      `,
    ),
  ],
  words: [
    W('want', 'denn', 'conj'),
    W('dus', 'also', 'conj'),
    W('noch', 'weder … noch', 'conj'),
    W('zowel', 'sowohl', 'conj'),
    P('niet alleen', 'nicht nur'),
    W('bovendien', 'außerdem', 'adv'),
    W('trouwens', 'übrigens', 'adv'),
    W('daardoor', 'dadurch', 'adv'),
    W('overal', 'überall', 'adv'),
    N('de keuze', 'die Wahl, die Entscheidung', 'keuzes'),
    A('verlegen', 'schüchtern', '- - -'),
    W('Brussel', 'Brüssel', 'name'),
  ],
  sentences: [
    S('Ik blijf thuis, want ik ben ziek.', 'Ich bleibe zu Hause, denn ich bin krank.'),
    S('Hij komt niet, want hij heeft geen tijd.', 'Er kommt nicht, denn er hat keine Zeit.'),
    S('Het regent, dus we blijven binnen.|Het regent, dus blijven we binnen.', 'Es regnet, also bleiben wir drinnen.'),
    S('Ik wil graag komen, maar ik kan niet.', 'Ich würde gern kommen, aber ich kann nicht.|Ich möchte gern kommen, aber ich kann nicht.'),
    S('Ik spreek zowel Duits als Nederlands.', 'Ich spreche sowohl Deutsch als auch Niederländisch.'),
    S('Hij is niet alleen slim, maar ook aardig.', 'Er ist nicht nur klug, sondern auch nett.'),
    S('Ik drink geen koffie, maar thee.', 'Ich trinke keinen Kaffee, sondern Tee.'),
    S('Ik heb noch tijd noch geld.', 'Ich habe weder Zeit noch Geld.'),
    S('Het is laat en bovendien ben ik moe.', 'Es ist spät und außerdem bin ich müde.'),
    S('Trouwens, heb je mijn sleutels gezien?', 'Übrigens, hast du meine Schlüssel gesehen?'),
    S('Ik heb het druk, dus ik bel je morgen.|Ik heb het druk, dus bel ik je morgen.', 'Ich habe viel zu tun, also rufe ich dich morgen an.'),
    S('Kom je, of blijf je thuis?', 'Kommst du oder bleibst du zu Hause?'),
    S('Ze woont in Gent, maar ze werkt in Brussel.', 'Sie wohnt in Gent, aber sie arbeitet in Brüssel.'),
    S('Ik ben moe, want ik heb slecht geslapen.', 'Ich bin müde, denn ich habe schlecht geschlafen.'),
    S('De trein had vertraging, daardoor was ik te laat.', 'Der Zug hatte Verspätung, dadurch war ich zu spät.|Der Zug hatte Verspätung, deshalb kam ich zu spät.'),
    S('Het is een moeilijke keuze.', 'Es ist eine schwierige Wahl.|Das ist eine schwierige Entscheidung.'),
    S('Hij leest en zij kijkt televisie.', 'Er liest und sie sieht fern.'),
    S('Ik heb honger, dus ik maak een broodje.|Ik heb honger, dus maak ik een broodje.', 'Ich habe Hunger, also mache ich mir ein Brötchen.|Ich habe Hunger, also mache ich ein Brötchen.'),
    S('Neem een jas mee, anders heb je het koud.', 'Nimm eine Jacke mit, sonst frierst du.|Nimm eine Jacke mit, sonst ist dir kalt.'),
    S(
      'Zowel mijn broer als mijn zus woont in Utrecht.|Zowel mijn broer als mijn zus wonen in Utrecht.',
      'Sowohl mein Bruder als auch meine Schwester wohnen in Utrecht.|Sowohl mein Bruder als auch meine Schwester wohnt in Utrecht.',
    ),
    S('Hij zegt niets, want hij is verlegen.', 'Er sagt nichts, denn er ist schüchtern.'),
    S('We kunnen fietsen of lopen.', 'Wir können mit dem Rad fahren oder zu Fuß gehen.'),
    S('Overal liggen boeken.', 'Überall liegen Bücher.'),
    S('Ik eet niet alleen vlees, maar ook vis.', 'Ich esse nicht nur Fleisch, sondern auch Fisch.'),
  ],
  cloze: [
    C('Ik blijf thuis, want {ik ben} ziek.', 'ik ben|ben ik', 'Ich bleibe zu Hause, denn ich bin krank.'),
    C('Ik drink geen koffie, {maar} thee.', 'maar|want|dus', 'Ich trinke keinen Kaffee, sondern Tee.'),
    C('Ik heb {noch} tijd noch geld.', 'noch|nog|ook', 'Ich habe weder Zeit noch Geld.'),
    C('Ik spreek {zowel} Duits als Nederlands.', 'zowel|niet|ook', 'Ich spreche sowohl Deutsch als auch Niederländisch.'),
    C('Het regent, {dus} we blijven binnen.', 'dus|want|maar', 'Es regnet, also bleiben wir drinnen.'),
    C('Hij is niet alleen slim, maar {ook} aardig.', 'ook|nog|al', 'Er ist nicht nur klug, sondern auch nett.'),
  ],
  story: story('st42', 'Een moeilijke keuze', 'Eine schwierige Wahl', [
    ['Bram', 'Ik wil een nieuwe telefoon, maar ik weet niet welke.', 'Ich will ein neues Handy, aber ich weiß nicht, welches.'],
    ['Lotte', 'Deze is mooi, maar hij is duur.', 'Das hier ist schön, aber es ist teuer.'],
    ['Bram', 'Ja, en hij is niet alleen duur, maar ook zwaar.', 'Ja, und es ist nicht nur teuer, sondern auch schwer.'],
    Q('Was ist das Problem mit dem ersten Handy?', ['Es ist teuer und schwer', 'Es ist hässlich', 'Es ist zu klein'], 0),
    ['Lotte', 'Dan neem je deze. Hij is licht, dus je kunt hem overal meenemen.', 'Dann nimmst du dieses. Es ist leicht, also kannst du es überall mitnehmen.'],
    ['Bram', 'Maar die heeft noch een goede camera noch veel geheugen.', 'Aber das hat weder eine gute Kamera noch viel Speicher.'],
    ['Lotte', 'Bram, je moet kiezen, anders koop je nooit iets!', 'Bram, du musst dich entscheiden, sonst kaufst du nie etwas!'],
    Q('Was sagt Lotte am Ende?', ['Bram muss sich entscheiden', 'Bram soll beide kaufen', 'Bram soll warten'], 0),
  ]),
});

const u43 = unit({
  id: 'u43',
  title: 'Wenn ich reich wäre',
  description: 'Konditional mit zou und zouden, höfliche Bitten, Wünsche',
  tips: [
    T(
      'zou + Infinitiv',
      `
      „Würde“ heißt **zou** (Singular) oder **zouden** (Plural), mit dem Infinitiv am Ende:

      - *Ik zou dat niet doen.* „Ich würde das nicht tun.“
      - *Wat zou jij doen?*
      `,
      [['Wat zou jij doen?', 'Was würdest du tun?']],
    ),
    T(
      'Höflich bitten',
      `
      - *Zou u het raam kunnen sluiten?* „Könnten Sie das Fenster schließen?“
      - *Zou je me kunnen helpen?* „Könntest du mir helfen?“
      - *Ik zou graag … willen.* „Ich hätte gern …“
      `,
      [['Zou u het raam kunnen sluiten?', 'Könnten Sie das Fenster schließen?']],
    ),
    T(
      'Wenn … wäre',
      `
      Im Bedingungssatz steht meistens das Imperfekt, im Hauptsatz *zou*:

      *Als ik rijk was, zou ik een groot huis kopen.* „Wenn ich reich wäre, würde ich …“

      Weitere Bedeutungen von *zou*:
      - *Hij zou om acht uur komen.* „Er sollte / wollte um acht kommen.“
      - *Zou het morgen regenen?* „Ob es morgen regnet?“
      `,
    ),
  ],
  words: [
    N('de wens', 'der Wunsch', 'wensen'),
    V('wensen', 'wünschen', 'wens wenst wensen | wenste wensten | gewenst h'),
    N('de loterij', 'die Lotterie', 'loterijen'),
    N('de wereld', 'die Welt', 'werelden', '🌍'),
    N('de plaats', 'der Platz, der Ort; die Stelle', 'plaatsen'),
    V('rondreizen', 'herumreisen', 'reis reist reizen | reisde reisden | rondgereisd hz', { sep: 'rond' }),
    W('vaker', 'öfter', 'adv'),
    W('miljoen', 'Million', 'num'),
  ],
  sentences: [
    S('Ik zou graag een kop koffie willen.', 'Ich hätte gern eine Tasse Kaffee.|Ich möchte gern eine Tasse Kaffee.'),
    S('Zou u het raam kunnen sluiten?', 'Könnten Sie das Fenster schließen?|Würden Sie das Fenster schließen?'),
    S('Zou je me kunnen helpen?', 'Könntest du mir helfen?|Würdest du mir helfen?'),
    S('Als ik rijk was, zou ik een groot huis kopen.', 'Wenn ich reich wäre, würde ich ein großes Haus kaufen.'),
    S('Als ik tijd had, zou ik vaker lezen.', 'Wenn ich Zeit hätte, würde ich öfter lesen.'),
    S('Ik zou dat niet doen.', 'Ich würde das nicht tun.|Ich würde das nicht machen.'),
    S('Wat zou jij doen?', 'Was würdest du tun?|Was würdest du machen?'),
    S('In jouw plaats zou ik naar de dokter gaan.', 'An deiner Stelle würde ich zum Arzt gehen.'),
    S('Ik zou graag in Amsterdam wonen.', 'Ich würde gern in Amsterdam wohnen.'),
    S('We zouden naar het strand gaan, maar het regende.', 'Wir wollten an den Strand gehen, aber es regnete.|Wir wollten an den Strand, aber es hat geregnet.'),
    S(
      'Als ik de loterij zou winnen, zou ik de wereld rondreizen.',
      'Wenn ich in der Lotterie gewinnen würde, würde ich um die Welt reisen.|Wenn ich im Lotto gewinnen würde, würde ich um die Welt reisen.',
    ),
    S('Wat zou je wensen?', 'Was würdest du dir wünschen?'),
    S('Ik wens je een fijne dag.', 'Ich wünsche dir einen schönen Tag.'),
    S('Het zou leuk zijn als je komt.', 'Es wäre schön, wenn du kommst.|Es wäre schön, wenn du kämst.'),
    S('Hij zou om acht uur komen.', 'Er sollte um acht Uhr kommen.|Er wollte um acht Uhr kommen.'),
    S('Zou het morgen regenen?', 'Ob es morgen regnet?'),
    S('Ik zou het niet weten.', 'Das weiß ich nicht.|Keine Ahnung.'),
    S('Als ik jou was, zou ik het doen.', 'Wenn ich du wäre, würde ich es tun.|An deiner Stelle würde ich es tun.'),
    S('Zouden jullie wat stiller kunnen zijn?', 'Könntet ihr etwas leiser sein?|Könntet ihr ein bisschen leiser sein?'),
    S('Ik zou graag meer reizen.', 'Ich würde gern mehr reisen.'),
    S('Dat zou ik nooit doen!', 'Das würde ich nie tun!'),
    S('Mijn wens is een huis aan zee.', 'Mein Wunsch ist ein Haus am Meer.'),
    S('De wereld is groot.', 'Die Welt ist groß.'),
    S('Zou je dat willen herhalen?', 'Würdest du das wiederholen?|Könntest du das wiederholen?'),
    S('Wat zou jij doen met een miljoen euro?', 'Was würdest du mit einer Million Euro machen?'),
  ],
  cloze: [
    C('{Zou} u het raam kunnen sluiten?', 'Zou|Zal|Zouden', 'Könnten Sie das Fenster schließen?'),
    C('Als ik rijk {was}, zou ik een huis kopen.', 'was|ben|word', 'Wenn ich reich wäre, würde ich ein Haus kaufen.'),
    C('Wat {zou} jij doen?', 'zou|zouden|zal', 'Was würdest du tun?'),
    C('We {zouden} naar het strand gaan.', 'zou|zouden|zullen', 'Wir wollten an den Strand gehen.'),
    C('In jouw {plaats} zou ik gaan.', 'plaats|tijd|stad', 'An deiner Stelle würde ich gehen.'),
    C('Ik {wens} je een fijne dag.', 'wens|wenst|wensen', 'Ich wünsche dir einen schönen Tag.'),
  ],
  story: story('st43', 'Een miljoen euro', 'Eine Million Euro', [
    ['Sem', 'Wat zou jij doen als je een miljoen euro had?', 'Was würdest du tun, wenn du eine Million Euro hättest?'],
    ['Mila', 'Ik zou de wereld rondreizen! En jij?', 'Ich würde um die Welt reisen! Und du?'],
    ['Sem', 'Ik zou een huis aan zee kopen, met een groot zwembad.', 'Ich würde ein Haus am Meer kaufen, mit einem großen Schwimmbad.'],
    Q('Was würde Mila tun?', ['Um die Welt reisen', 'Ein Haus kaufen', 'Nichts'], 0),
    ['Mila', 'En zou je nog werken?', 'Und würdest du noch arbeiten?'],
    ['Sem', 'Nee! Nou ja… misschien een beetje. Anders zou ik me vervelen.', 'Nein! Na ja … vielleicht ein bisschen. Sonst würde ich mich langweilen.'],
    Q('Warum würde Sem vielleicht doch arbeiten?', ['Sonst würde er sich langweilen', 'Er braucht Geld', 'Er mag seinen Chef'], 0),
  ]),
});

const u44 = unit({
  id: 'u44',
  title: 'Das Passiv',
  description: 'worden + Partizip, is gebouwd, door = von',
  tips: [
    T(
      'Das Passiv',
      `
      **worden** + Partizip, wie „werden“ im Deutschen:

      - *Het huis wordt gebouwd.* „Das Haus wird gebaut.“
      - Vergangenheit: *Het huis werd gebouwd.* „… wurde gebaut.“
      `,
      [['In België wordt Nederlands gesproken.', 'In Belgien wird Niederländisch gesprochen.']],
    ),
    T(
      'Perfekt im Passiv: ohne geworden',
      `
      Achtung: Im Perfekt steht **zijn** + Partizip, ohne „worden“:

      - *Mijn fiets is gestolen!* „Mein Fahrrad ist gestohlen worden!“
      - *Het probleem is opgelost.* „Das Problem ist gelöst worden.“
      `,
      [['Mijn fiets is gestolen!', 'Mein Fahrrad ist gestohlen worden!']],
    ),
    T(
      'door = von',
      `
      Wer etwas tut, steht mit **door** (nicht *van*): *door de politie* „von der Polizei“.

      Unpersönlich mit **er**: *Er wordt veel gefietst.* „Es wird viel Rad gefahren.“
      `,
      [['De dief werd door de politie gezien.', 'Der Dieb wurde von der Polizei gesehen.']],
    ),
  ],
  words: [
    W('door', 'von (im Passiv)', 'prep', { id: 'door-passief' }),
    V('uitvinden', 'erfinden', 'vind vindt vinden | vond vonden | uitgevonden h', { sep: 'uit' }),
    V('stelen', 'stehlen', 'steel steelt stelen | stal stalen | gestolen h'),
    V('repareren', 'reparieren', 'repareer repareert repareren | repareerde repareerden | gerepareerd h'),
    V('vieren', 'feiern', 'vier viert vieren | vierde vierden | gevierd h'),
    V('bezorgen', 'liefern, zustellen', 'bezorg bezorgt bezorgen | bezorgde bezorgden | bezorgd h'),
    V('oplossen', 'lösen', 'los lost lossen | loste losten | opgelost h', { sep: 'op' }),
    V('ophalen', 'abholen', 'haal haalt halen | haalde haalden | opgehaald h', { sep: 'op' }),
    V('kloppen', 'klopfen; stimmen', 'klop klopt kloppen | klopte klopten | geklopt h'),
    N('het pakket', 'das Paket', 'pakketten'),
    N('de dief', 'der Dieb', 'dieven'),
    N('de politie', 'die Polizei', '-', '🚓'),
    N('de garage', 'die Werkstatt; die Garage', 'garages'),
    N('de post', 'die Post', '-', '📬'),
    N('het slot', 'das Schloss (an der Tür)', 'sloten', '🔒'),
    P('op slot', 'abgeschlossen'),
    W('o', 'oh', 'interj'),
  ],
  sentences: [
    S('Het huis wordt gebouwd.', 'Das Haus wird gebaut.'),
    S('De brief wordt morgen geschreven.', 'Der Brief wird morgen geschrieben.'),
    S('In België wordt Nederlands gesproken.', 'In Belgien wird Niederländisch gesprochen.'),
    S('Mijn fiets is gestolen!', 'Mein Fahrrad ist gestohlen worden!|Mein Fahrrad wurde gestohlen!'),
    S('De auto wordt gerepareerd.', 'Das Auto wird repariert.'),
    S('Het pakket wordt vandaag bezorgd.', 'Das Paket wird heute geliefert.|Das Paket wird heute zugestellt.'),
    S('De winkel wordt om negen uur geopend.', 'Der Laden wird um neun Uhr geöffnet.'),
    S(
      'Het boek is door een Nederlandse schrijver geschreven.',
      'Das Buch ist von einem niederländischen Schriftsteller geschrieben worden.|Das Buch wurde von einem niederländischen Schriftsteller geschrieben.',
    ),
    S('De dief werd door de politie gezien.', 'Der Dieb wurde von der Polizei gesehen.'),
    S('Het huis werd lang geleden gebouwd.', 'Das Haus wurde vor langer Zeit gebaut.'),
    S('Er wordt veel gefietst in Nederland.', 'In den Niederlanden wird viel Rad gefahren.'),
    S('Hier wordt niet gerookt.', 'Hier wird nicht geraucht.'),
    S('Koningsdag wordt elk jaar gevierd.', 'Der Königstag wird jedes Jahr gefeiert.'),
    S('De brug is gisteren geopend.', 'Die Brücke ist gestern eröffnet worden.|Die Brücke wurde gestern eröffnet.'),
    S('Wanneer wordt de post bezorgd?', 'Wann wird die Post zugestellt?'),
    S('Het eten wordt gekookt.', 'Das Essen wird gekocht.'),
    S('Het probleem is opgelost.', 'Das Problem ist gelöst.|Das Problem wurde gelöst.|Das Problem ist gelöst worden.'),
    S('Door wie is de fiets uitgevonden?', 'Von wem wurde das Fahrrad erfunden?|Von wem ist das Fahrrad erfunden worden?'),
    S('Het wordt vaak gezegd.', 'Es wird oft gesagt.|Das wird oft gesagt.'),
    S('De garage repareert mijn auto.', 'Die Werkstatt repariert mein Auto.'),
    S('Mijn auto wordt door de garage gerepareerd.', 'Mein Auto wird von der Werkstatt repariert.'),
    S('De kinderen worden om drie uur opgehaald.', 'Die Kinder werden um drei Uhr abgeholt.'),
    S('Het pakket is al bezorgd.', 'Das Paket ist schon geliefert worden.|Das Paket wurde schon geliefert.'),
    S('Er wordt op de deur geklopt.', 'Es klopft an der Tür.|Es wird an die Tür geklopft.'),
    S('Heb je de deur op slot gedaan?', 'Hast du die Tür abgeschlossen?'),
  ],
  cloze: [
    C('Het huis {wordt} gebouwd.', 'wordt|word|heeft', 'Das Haus wird gebaut.'),
    C('Mijn fiets {is} gestolen!', 'is|heeft|!werdt', 'Mein Fahrrad ist gestohlen worden!'),
    C('In België wordt Nederlands {gesproken}.', 'gesproken|spreekt|!gespreekt', 'In Belgien wird Niederländisch gesprochen.'),
    C('De dief werd {door} de politie gezien.', 'door|van|bij', 'Der Dieb wurde von der Polizei gesehen.'),
    C('Hier wordt niet {gerookt}.', 'gerookt|!gerookd|rookt', 'Hier wird nicht geraucht.'),
    C('Het probleem is {opgelost}.', 'opgelost|!geoplost|oplost', 'Das Problem ist gelöst worden.'),
  ],
  story: story('st44', 'Mijn fiets is gestolen!', 'Mein Fahrrad ist gestohlen worden!', [
    ['Lucas', 'Mijn fiets is gestolen!', 'Mein Fahrrad ist gestohlen worden!'],
    ['Sophie', 'O nee! Waar stond hij?', 'Oh nein! Wo stand es?'],
    ['Lucas', 'Voor het station. Ik had hem niet op slot gezet.', 'Vor dem Bahnhof. Ich hatte es nicht abgeschlossen.'],
    Q('Wo wurde das Fahrrad gestohlen?', ['Vor dem Bahnhof', 'Vor der Schule', 'Im Park'], 0),
    ['Sophie', 'In Nederland worden elk jaar veel fietsen gestolen. Je moet naar de politie.', 'In den Niederlanden werden jedes Jahr viele Fahrräder gestohlen. Du musst zur Polizei.'],
    ['Lucas', 'Ja, maar wordt hij ooit gevonden?', 'Ja, aber wird es jemals gefunden?'],
    ['Sophie', 'Misschien. Soms worden fietsen in de gracht gevonden!', 'Vielleicht. Manchmal werden Fahrräder in der Gracht gefunden!'],
    Q('Wo werden manchmal Fahrräder gefunden?', ['In der Gracht', 'Im Wald', 'Am Strand'], 0),
  ]),
});

const u45 = unit({
  id: 'u45',
  title: 'Zu tun, um zu tun',
  description: 'te + Infinitiv, om … te, aan het + Infinitiv',
  tips: [
    T(
      'te + Infinitiv',
      `
      Nach Verben wie *proberen, beginnen, vergeten, hopen, besluiten, weigeren* steht **te** + Infinitiv:

      - *Ik probeer Nederlands te spreken.*
      - Trennbare Verben: *op te staan* („aufzustehen“)
      `,
      [['Ik probeer Nederlands te spreken.', 'Ich versuche, Niederländisch zu sprechen.']],
    ),
    T(
      'om … te = um … zu',
      `
      - Zweck: *Ik ga naar de winkel om brood te kopen.*
      - Nach Adjektiven: *Het is moeilijk om vroeg op te staan.*
      - *Ik heb geen tijd om te koken.*
      `,
      [['Ik ga naar de winkel om brood te kopen.', 'Ich gehe in den Laden, um Brot zu kaufen.']],
    ),
    T(
      'Gerade dabei',
      `
      - **aan het** + Infinitiv: *Ik ben aan het koken.* „Ich koche gerade.“
      - **zitten / staan / liggen te**: *Hij zit te lezen.* „Er sitzt da und liest.“
      `,
      [['Ik ben aan het koken.', 'Ich koche gerade.']],
    ),
  ],
  words: [
    W('om', 'um (om … te)', 'conj', { id: 'om-te' }),
    W('te', 'zu (vor dem Infinitiv)', 'part', { id: 'te-inf' }),
    P('aan het', 'gerade dabei (aan het koken)'),
    V('besluiten', 'beschließen', 'besluit besluit besluiten | besloot besloten | besloten h'),
    V('weigeren', 'sich weigern', 'weiger weigert weigeren | weigerde weigerden | geweigerd h'),
    V('sparen', 'sparen', 'spaar spaart sparen | spaarde spaarden | gespaard h'),
    V('oefenen', 'üben', 'oefen oefent oefenen | oefende oefenden | geoefend h'),
    A('mogelijk', 'möglich', 'mogelijke - -'),
    A('onmogelijk', 'unmöglich', 'onmogelijke - -'),
    N('het woord', 'das Wort', 'woorden'),
  ],
  sentences: [
    S('Ik probeer Nederlands te spreken.', 'Ich versuche, Niederländisch zu sprechen.'),
    S('Ik ga naar de winkel om brood te kopen.', 'Ich gehe in den Laden, um Brot zu kaufen.'),
    S('Het is moeilijk om vroeg op te staan.', 'Es ist schwer, früh aufzustehen.'),
    S('Vergeet niet de deur dicht te doen.', 'Vergiss nicht, die Tür zuzumachen.'),
    S('Ik ben van plan om naar Gent te gaan.', 'Ich habe vor, nach Gent zu fahren.'),
    S('Hij zit te lezen.', 'Er sitzt da und liest.|Er liest gerade.'),
    S('Ik ben aan het koken.', 'Ich koche gerade.|Ich bin am Kochen.'),
    S('Wat ben je aan het doen?', 'Was machst du gerade?'),
    S('We sparen om een huis te kopen.', 'Wir sparen, um ein Haus zu kaufen.'),
    S('Het is leuk om Nederlands te leren.', 'Es macht Spaß, Niederländisch zu lernen.|Es ist schön, Niederländisch zu lernen.'),
    S('Ik hoop je snel te zien.', 'Ich hoffe, dich bald zu sehen.'),
    S('Ze begint te huilen.', 'Sie fängt an zu weinen.|Sie beginnt zu weinen.'),
    S('Hij weigert te betalen.', 'Er weigert sich zu bezahlen.'),
    S('Ik heb besloten om te verhuizen.', 'Ich habe beschlossen umzuziehen.'),
    S('Ik heb geen tijd om te koken.', 'Ich habe keine Zeit zu kochen.|Ich habe keine Zeit zum Kochen.'),
    S('Je hoeft niets te betalen.', 'Du musst nichts bezahlen.|Du brauchst nichts zu bezahlen.'),
    S('Het is niet mogelijk om hier te parkeren.', 'Es ist nicht möglich, hier zu parken.'),
    S('Ik oefen elke dag om beter te worden.', 'Ich übe jeden Tag, um besser zu werden.'),
    S('De kinderen liggen te slapen.', 'Die Kinder schlafen.|Die Kinder liegen im Bett und schlafen.'),
    S('Ze staat op de bus te wachten.', 'Sie steht da und wartet auf den Bus.|Sie wartet auf den Bus.'),
    S('Ik vraag hem om te helpen.', 'Ich bitte ihn zu helfen.|Ich bitte ihn um Hilfe.'),
    S('Het is onmogelijk om alles te weten.', 'Es ist unmöglich, alles zu wissen.'),
    S('Ik beloof je om op tijd te komen.', 'Ich verspreche dir, pünktlich zu kommen.'),
    S('Wij zijn aan het eten.', 'Wir essen gerade.|Wir sind beim Essen.'),
    S('Hij is gestopt met werken om te studeren.', 'Er hat aufgehört zu arbeiten, um zu studieren.'),
    S('Dit woord is moeilijk.', 'Dieses Wort ist schwierig.|Dieses Wort ist schwer.'),
  ],
  cloze: [
    C('Ik probeer Nederlands {te} spreken.', 'te|om|aan', 'Ich versuche, Niederländisch zu sprechen.'),
    C('Ik ga naar de winkel {om} brood te kopen.', 'om|te|aan', 'Ich gehe in den Laden, um Brot zu kaufen.'),
    C('Het is moeilijk om vroeg {op te staan}.', 'op te staan|te opstaan|opstaan', 'Es ist schwer, früh aufzustehen.'),
    C('Ik ben {aan} het koken.', 'aan|op|in', 'Ich koche gerade.'),
    C('Hij {zit} te lezen.', 'zit|is|heeft', 'Er sitzt da und liest.'),
    C('We sparen om een huis te {kopen}.', 'kopen|koopt|gekocht', 'Wir sparen, um ein Haus zu kaufen.'),
  ],
  story: story('st45', 'Nederlands leren', 'Niederländisch lernen', [
    ['Anna', 'Ik probeer elke dag een beetje Nederlands te leren.', 'Ich versuche, jeden Tag ein bisschen Niederländisch zu lernen.'],
    ['Jan', 'Goed zo! Hoe doe je dat?', 'Gut so! Wie machst du das?'],
    ['Anna', 'Ik gebruik een app om woorden te oefenen. En ik lees de krant.', 'Ich benutze eine App, um Wörter zu üben. Und ich lese die Zeitung.'],
    Q('Wozu benutzt Anna eine App?', ['Um Wörter zu üben', 'Um Musik zu hören', 'Um Freunde anzurufen'], 0),
    ['Jan', 'Ben je nu ook aan het oefenen?', 'Übst du jetzt auch gerade?'],
    ['Anna', 'Ja! Ik zit een Nederlands boek te lezen.', 'Ja! Ich sitze hier und lese ein niederländisches Buch.'],
    ['Jan', 'Is het niet moeilijk om alles te begrijpen?', 'Ist es nicht schwer, alles zu verstehen?'],
    ['Anna', 'Soms wel, maar het is leuk om nieuwe woorden te leren.', 'Manchmal schon, aber es macht Spaß, neue Wörter zu lernen.'],
    Q('Was liest Anna gerade?', ['Ein niederländisches Buch', 'Die Zeitung', 'Einen Brief'], 0),
  ]),
});

const u46 = unit({
  id: 'u46',
  title: 'Natur und Umwelt',
  description: 'Landschaft, Tiere, Deiche, Umweltschutz',
  tips: [
    T(
      'Tiere',
      `
      | | |
      |---|---|
      | het schaap – de schapen | das Schaf |
      | het varken – de varkens | das Schwein |
      | het konijn – de konijnen | das Kaninchen |
      | de eend – de eenden | die Ente |
      | de bij – de bijen | die Biene |
      | de vlinder – de vlinders | der Schmetterling |
      | de muis – de muizen | die Maus |
      `,
    ),
    T(
      'Typisch Nederland',
      `
      Die Niederlande sind flach (*vlak*). Etwa ein Viertel des Landes liegt unter dem Meeresspiegel, deshalb gibt es überall Deiche (*dijken*). Früher pumpten Mühlen (*molens*) das Wasser ab.

      **het meer** heißt „der See“, **de zee** „das Meer“. Verwechslungsgefahr!
      `,
      [['In het meer zwemmen eenden.', 'Im See schwimmen Enten.']],
    ),
    T(
      'Umwelt',
      `
      Falscher Freund: **het milieu** heißt „die Umwelt“.

      - *afval scheiden* – Müll trennen
      - *energie besparen* – Energie sparen
      - *het klimaat verandert* – das Klima ändert sich
      `,
      [['We moeten het milieu beschermen.', 'Wir müssen die Umwelt schützen.']],
    ),
  ],
  words: [
    N('de natuur', 'die Natur', '-', '🌿'),
    N('het meer', 'der See', 'meren', undefined, { id: 'meer-noun' }),
    N('het eiland', 'die Insel', 'eilanden'),
    N('het gras', 'das Gras', '-'),
    N('het blad', 'das Blatt', 'bladeren/bladen', '🍃'),
    N('de vlinder', 'der Schmetterling', 'vlinders', '🦋'),
    N('de bij', 'die Biene', 'bijen', '🐝', { id: 'bij-dier' }),
    N('de eend', 'die Ente', 'eenden', '🦆'),
    N('het konijn', 'das Kaninchen', 'konijnen', '🐇'),
    N('de muis', 'die Maus', 'muizen', '🐭'),
    N('het schaap', 'das Schaf', 'schapen', '🐑'),
    N('het varken', 'das Schwein', 'varkens', '🐖'),
    N('de wortel', 'die Karotte; die Wurzel', 'wortels', '🥕'),
    N('de dijk', 'der Deich', 'dijken'),
    N('de molen', 'die Mühle', 'molens'),
    N('het milieu', 'die Umwelt', '-', '♻️'),
    N('het afval', 'der Müll', '-', '🗑️'),
    N('het klimaat', 'das Klima', '-'),
    N('de energie', 'die Energie', '-'),
    N('het plastic', 'das Plastik', '-'),
    N('het deel', 'der Teil', 'delen'),
    N('de zeespiegel', 'der Meeresspiegel', '-'),
    V('scheiden', 'trennen', 'scheid scheidt scheiden | scheidde scheidden | gescheiden h'),
    V('beschermen', 'schützen', 'bescherm beschermt beschermen | beschermde beschermden | beschermd h'),
    V('groeien', 'wachsen', 'groei groeit groeien | groeide groeiden | gegroeid z'),
    V('plukken', 'pflücken', 'pluk plukt plukken | plukte plukten | geplukt h'),
    V('besparen', 'sparen (einsparen)', 'bespaar bespaart besparen | bespaarde bespaarden | bespaard h'),
    V('vangen', 'fangen', 'vang vangt vangen | ving vingen | gevangen h'),
    A('vies', 'schmutzig; eklig', 'vieze viezer viest'),
    A('vlak', 'flach', 'vlakke vlakker vlakst'),
  ],
  sentences: [
    S('Nederland is erg vlak.', 'Die Niederlande sind sehr flach.'),
    S('Er zijn veel dijken en molens.', 'Es gibt viele Deiche und Mühlen.'),
    S('We wandelen graag in de natuur.', 'Wir wandern gern in der Natur.|Wir gehen gern in der Natur spazieren.'),
    S('Het bos is groen en rustig.', 'Der Wald ist grün und ruhig.'),
    S('In het meer zwemmen eenden.', 'Im See schwimmen Enten.'),
    S('Op het eiland wonen veel vogels.', 'Auf der Insel leben viele Vögel.'),
    S('De bijen vliegen van bloem naar bloem.', 'Die Bienen fliegen von Blume zu Blume.'),
    S('Kijk, een vlinder!', 'Schau, ein Schmetterling!'),
    S('De schapen staan in het gras.', 'Die Schafe stehen im Gras.'),
    S('Het konijn eet een wortel.', 'Das Kaninchen frisst eine Karotte.|Das Kaninchen frisst eine Möhre.'),
    S('In de herfst vallen de bladeren.', 'Im Herbst fallen die Blätter.'),
    S('De bomen groeien langzaam.', 'Die Bäume wachsen langsam.'),
    S('We moeten het milieu beschermen.', 'Wir müssen die Umwelt schützen.'),
    S('In Nederland scheiden we ons afval.', 'In den Niederlanden trennen wir unseren Müll.'),
    S('Gebruik minder plastic.', 'Benutze weniger Plastik.|Verwende weniger Plastik.'),
    S('Het klimaat verandert.', 'Das Klima ändert sich.|Das Klima verändert sich.'),
    S('We besparen energie.', 'Wir sparen Energie.'),
    S('Het water in de rivier is vies.', 'Das Wasser im Fluss ist schmutzig.'),
    S('De kat vangt een muis.', 'Die Katze fängt eine Maus.'),
    S('Op de boerderij zijn varkens en koeien.', 'Auf dem Bauernhof gibt es Schweine und Kühe.|Auf dem Bauernhof sind Schweine und Kühe.'),
    S('Je mag hier geen bloemen plukken.', 'Du darfst hier keine Blumen pflücken.|Man darf hier keine Blumen pflücken.'),
    S('Wat een mooi uitzicht over het meer!', 'Was für eine schöne Aussicht über den See!|Was für eine schöne Aussicht auf den See!'),
    S('De molen staat bij de dijk.', 'Die Mühle steht am Deich.'),
    S('Er ligt veel afval op het strand.', 'Am Strand liegt viel Müll.|Es liegt viel Müll am Strand.'),
    S('Ik hou van de natuur.', 'Ich liebe die Natur.'),
    S('Een groot deel van Nederland ligt onder de zeespiegel.', 'Ein großer Teil der Niederlande liegt unter dem Meeresspiegel.'),
  ],
  cloze: [
    C('In het {meer} zwemmen eenden.', 'meer|zee|rivier', 'Im See schwimmen Enten.'),
    C('De bomen {groeien} langzaam.', 'groei|groeit|groeien', 'Die Bäume wachsen langsam.'),
    C('We moeten het milieu {beschermen}.', 'beschermen|beschermd|beschermt', 'Wir müssen die Umwelt schützen.'),
    C('Nederland is erg {vlak}.', 'vlak|vlakke', 'Die Niederlande sind sehr flach.'),
    C('In de herfst vallen de {bladeren}.', 'bladeren|blad', 'Im Herbst fallen die Blätter.'),
    C('{De} vlinder is mooi.', 'De|Het', 'Der Schmetterling ist schön.'),
    C('{Het} schaap staat in het gras.', 'De|Het', 'Das Schaf steht im Gras.'),
  ],
  story: story('st46', 'Op de dijk', 'Auf dem Deich', [
    ['Lotte', 'Zullen we fietsen? Het is prachtig weer.', 'Wollen wir Rad fahren? Es ist herrliches Wetter.'],
    ['Bram', 'Goed idee. We kunnen over de dijk naar de molen fietsen.', 'Gute Idee. Wir können über den Deich zur Mühle radeln.'],
    ['Lotte', 'Kijk, daar staan schapen op de dijk!', 'Schau, da stehen Schafe auf dem Deich!'],
    Q('Was sehen die beiden auf dem Deich?', ['Schafe', 'Kühe', 'Pferde'], 0),
    ['Bram', 'Wist je dat een groot deel van Nederland onder de zeespiegel ligt?', 'Wusstest du, dass ein großer Teil der Niederlande unter dem Meeresspiegel liegt?'],
    ['Lotte', 'Ja, daarom zijn de dijken zo belangrijk.', 'Ja, deshalb sind die Deiche so wichtig.'],
    Q('Warum sind die Deiche so wichtig?', ['Viel Land liegt unter dem Meeresspiegel', 'Wegen der Schafe', 'Für die Mühlen'], 0),
  ]),
});

const u47 = unit({
  id: 'u47',
  title: 'Medien und Technik',
  description: 'Handy, Computer, Internet, Nachrichten schreiben',
  tips: [
    T(
      'Technikwörter',
      `
      Viele Wörter kommen aus dem Englischen. Sie bekommen niederländische Endungen:

      - *downloaden – downloadde – gedownload*
      - *printen – printte – geprint*
      - *appen – appte – geappt* (per Messenger schreiben)
      - Plural oft mit **-s**: *computers, apps, websites*
      `,
      [['Ik app je straks.', 'Ich schreibe dir gleich.']],
    ),
    T(
      'Es funktioniert nicht',
      `
      - *Het werkt niet.* „Es funktioniert nicht.“
      - Umgangssprachlich: *Het doet het niet.*
      - *Mijn telefoon is leeg.* „Mein Akku ist leer.“
      `,
      [['De printer doet het niet.', 'Der Drucker funktioniert nicht.']],
    ),
  ],
  words: [
    N('de computer', 'der Computer', 'computers', '💻'),
    N('de laptop', 'der Laptop', 'laptops'),
    N('de telefoon', 'das Telefon, das Handy', 'telefoons', '📱'),
    N('het internet', 'das Internet', '-', '🌐'),
    N('de website', 'die Website', 'websites'),
    N('de app', 'die App', 'apps'),
    N('de e-mail', 'die E-Mail', 'e-mails', '📧'),
    N('het wachtwoord', 'das Passwort', 'wachtwoorden'),
    N('het scherm', 'der Bildschirm', 'schermen', '🖥️'),
    N('de batterij', 'der Akku, die Batterie', 'batterijen', '🔋'),
    N('de oplader', 'das Ladegerät', 'opladers'),
    N('de/het wifi', 'das WLAN', '-', '📶'),
    N('de printer', 'der Drucker', 'printers', '🖨️'),
    N('de camera', 'die Kamera', "camera's"),
    N('het geheugen', 'das Gedächtnis; der Speicher', 'geheugens'),
    N('de video', 'das Video', "video's"),
    N('het programma', 'das Programm; die Sendung', "programma's"),
    N('de router', 'der Router', 'routers'),
    N('het papier', 'das Papier', '-', '📄'),
    V('opladen', 'aufladen', 'laad laadt laden | laadde laadden | opgeladen h', { sep: 'op' }),
    V('downloaden', 'herunterladen', 'download downloadt downloaden | downloadde downloadden | gedownload h'),
    V('installeren', 'installieren', 'installeer installeert installeren | installeerde installeerden | geïnstalleerd h'),
    V('inloggen', 'sich einloggen', 'log logt loggen | logde logden | ingelogd h', { sep: 'in' }),
    V('printen', 'drucken', 'print print printen | printte printten | geprint h'),
    V('appen', 'per Messenger schreiben', 'app appt appen | appte appten | geappt h'),
    V('typen', 'tippen', 'typ typt typen | typte typten | getypt h'),
    V('opstarten', 'starten, hochfahren', 'start start starten | startte startten | opgestart h', { sep: 'op' }),
    A('leeg', 'leer', 'lege leger leegst'),
    A('online', 'online', '- - -'),
    A('digitaal', 'digital', 'digitale - -'),
    W('tegenwoordig', 'heutzutage', 'adv'),
    W('opnieuw', 'neu, noch einmal', 'adv'),
    P('nog steeds', 'immer noch'),
  ],
  sentences: [
    S('Mijn telefoon is leeg.', 'Mein Akku ist leer.|Mein Handy ist leer.'),
    S('Waar is de oplader?', 'Wo ist das Ladegerät?'),
    S('Ik moet mijn telefoon opladen.', 'Ich muss mein Handy aufladen.'),
    S('Wat is het wachtwoord van de wifi?', 'Wie lautet das WLAN-Passwort?|Was ist das Passwort für das WLAN?'),
    S('Ik stuur je een e-mail.', 'Ich schicke dir eine E-Mail.'),
    S('Heb je mijn bericht gelezen?', 'Hast du meine Nachricht gelesen?'),
    S('Ik app je straks.', 'Ich schreibe dir gleich.|Ich schreibe dir nachher.'),
    S('De computer werkt niet.', 'Der Computer funktioniert nicht.'),
    S('Ik kan niet inloggen.', 'Ich kann mich nicht einloggen.'),
    S('Download de app gratis.', 'Lade die App kostenlos herunter.'),
    S('Ik heb een nieuw programma geïnstalleerd.', 'Ich habe ein neues Programm installiert.'),
    S('Kun je dit voor me printen?', 'Kannst du das für mich drucken?|Kannst du mir das ausdrucken?'),
    S('Ik lees het nieuws online.', 'Ich lese die Nachrichten online.'),
    S('Het scherm is kapot.', 'Der Bildschirm ist kaputt.'),
    S('Hij zit de hele dag op zijn telefoon.', 'Er hängt den ganzen Tag am Handy.|Er ist den ganzen Tag am Handy.'),
    S('Ik heb geen internet.', 'Ich habe kein Internet.'),
    S('De batterij is bijna leeg.', 'Der Akku ist fast leer.'),
    S('Ik heb een video gemaakt.', 'Ich habe ein Video gemacht.'),
    S('Het programma begint om acht uur.', 'Die Sendung beginnt um acht Uhr.'),
    S('Ik typ een brief op mijn laptop.', 'Ich tippe einen Brief auf meinem Laptop.|Ich schreibe einen Brief auf meinem Laptop.'),
    S('De printer doet het niet.', 'Der Drucker funktioniert nicht.|Der Drucker geht nicht.'),
    S('Tegenwoordig is alles digitaal.', 'Heutzutage ist alles digital.'),
    S('Ik heb mijn wachtwoord vergeten.', 'Ich habe mein Passwort vergessen.'),
    S('Mag ik een foto van je maken?', 'Darf ich ein Foto von dir machen?'),
    S('Start de computer opnieuw op.', 'Starte den Computer neu.'),
    S('De website werkt nog steeds niet.', 'Die Website funktioniert immer noch nicht.'),
  ],
  cloze: [
    C('Mijn telefoon is {leeg}.', 'leeg|lege', 'Mein Akku ist leer.'),
    C('Ik moet mijn telefoon {opladen}.', 'opladen|laad op', 'Ich muss mein Handy aufladen.'),
    C('Ik heb een nieuw programma {geïnstalleerd}.', 'geïnstalleerd|!geinstalleerd|installeer', 'Ich habe ein neues Programm installiert.'),
    C('Ik heb mijn wachtwoord {vergeten}.', 'vergeten|vergeet|vergat', 'Ich habe mein Passwort vergessen.'),
    C('De computer {werkt} niet.', 'werkt|werk|werken', 'Der Computer funktioniert nicht.'),
    C('Ik kan niet {inloggen}.', 'inloggen|log in', 'Ich kann mich nicht einloggen.'),
  ],
  story: story('st47', 'Geen wifi!', 'Kein WLAN!', [
    ['Mila', 'Papa, de wifi werkt niet!', 'Papa, das WLAN funktioniert nicht!'],
    ['Papa', 'Heb je de router al opnieuw opgestart?', 'Hast du den Router schon neu gestartet?'],
    ['Mila', 'Ja, maar het doet het nog steeds niet.', 'Ja, aber es geht immer noch nicht.'],
    Q('Was funktioniert nicht?', ['Das WLAN', 'Der Fernseher', 'Das Telefon'], 0),
    ['Papa', 'Dan heb je een uur geen internet. Lees een boek!', 'Dann hast du eine Stunde kein Internet. Lies ein Buch!'],
    ['Mila', 'Een boek? Op papier?', 'Ein Buch? Auf Papier?'],
    ['Papa', 'Ja. Zo deden we dat vroeger!', 'Ja. So haben wir das früher gemacht!'],
    Q('Was soll Mila machen?', ['Ein Buch lesen', 'Fernsehen', 'Schlafen'], 0),
  ]),
});

const u48 = unit({
  id: 'u48',
  title: 'Termine und Ämter',
  description: 'Gemeinde, Formulare, Versicherung, Termine verschieben',
  tips: [
    T(
      'Bei der Gemeinde',
      `
      Wer in die Niederlande zieht, meldet sich bei der **gemeente** an (*zich inschrijven*). Dafür braucht man einen Ausweis und oft den Mietvertrag.

      - *het formulier invullen* – das Formular ausfüllen
      - *ondertekenen* oder *tekenen* – unterschreiben (*tekenen* heißt auch „zeichnen“)
      - *het identiteitsbewijs* – der Ausweis
      `,
      [['U moet dit formulier invullen.', 'Sie müssen dieses Formular ausfüllen.']],
    ),
    T(
      'Termine',
      `
      - *een afspraak maken* – einen Termin machen
      - *afspreken* – sich verabreden: *Zullen we afspreken?*
      - *annuleren* – absagen
      - *verplaatsen* – verschieben
      - *vanaf maandag* – ab Montag
      `,
      [['Kunnen we de afspraak verplaatsen?', 'Können wir den Termin verschieben?']],
    ),
  ],
  words: [
    W('alle', 'alle', 'det'),
    N('de gemeente', 'die Gemeinde, die Stadtverwaltung', 'gemeenten/gemeentes'),
    N('het formulier', 'das Formular', 'formulieren', '📋'),
    N('de handtekening', 'die Unterschrift', 'handtekeningen'),
    N('het identiteitsbewijs', 'der Ausweis', 'identiteitsbewijzen'),
    N('de verzekering', 'die Versicherung', 'verzekeringen'),
    N('de zorgverzekering', 'die Krankenversicherung', 'zorgverzekeringen'),
    N('de huur', 'die Miete', 'huren'),
    N('het contract', 'der Vertrag', 'contracten'),
    N('het huurcontract', 'der Mietvertrag', 'huurcontracten'),
    N('de bankrekening', 'das Bankkonto', 'bankrekeningen'),
    N('de belasting', 'die Steuer', 'belastingen'),
    N('de wachtrij', 'die Warteschlange', 'wachtrijen'),
    N('het loket', 'der Schalter', 'loketten'),
    N('de ambtenaar', 'der Beamte, die Beamtin', 'ambtenaren'),
    N('het document', 'das Dokument', 'documenten'),
    N('de datum', 'das Datum', 'data/datums'),
    N('de geboortedatum', 'das Geburtsdatum', 'geboortedata/geboortedatums'),
    V('invullen', 'ausfüllen', 'vul vult vullen | vulde vulden | ingevuld h', { sep: 'in' }),
    V('ondertekenen', 'unterschreiben', 'onderteken ondertekent ondertekenen | ondertekende ondertekenden | ondertekend h'),
    V('tekenen', 'zeichnen; unterschreiben', 'teken tekent tekenen | tekende tekenden | getekend h', { id: 'tekenen-2' }),
    V('inschrijven', 'anmelden, einschreiben', 'schrijf schrijft schrijven | schreef schreven | ingeschreven h', { sep: 'in' }),
    V('aanvragen', 'beantragen', 'vraag vraagt vragen | vroeg vroegen | aangevraagd h', { sep: 'aan' }),
    V('afspreken', 'sich verabreden, vereinbaren', 'spreek spreekt spreken | sprak spraken | afgesproken h', { sep: 'af' }),
    V('annuleren', 'absagen, stornieren', 'annuleer annuleert annuleren | annuleerde annuleerden | geannuleerd h'),
    V('verplaatsen', 'verschieben', 'verplaats verplaatst verplaatsen | verplaatste verplaatsten | verplaatst h'),
    V('meebrengen', 'mitbringen', 'breng brengt brengen | bracht brachten | meegebracht h', { sep: 'mee' }),
    A('verplicht', 'verpflichtend, Pflicht', 'verplichte - -'),
    A('geldig', 'gültig', 'geldige - -'),
    W('vanaf', 'ab', 'prep'),
  ],
  sentences: [
    S('Ik heb een afspraak bij de gemeente.', 'Ich habe einen Termin bei der Gemeinde.|Ich habe einen Termin beim Bürgeramt.'),
    S('U moet dit formulier invullen.', 'Sie müssen dieses Formular ausfüllen.'),
    S('Vul hier uw naam en adres in.', 'Tragen Sie hier Ihren Namen und Ihre Adresse ein.'),
    S('Wat is uw geboortedatum?', 'Was ist Ihr Geburtsdatum?|Wie ist Ihr Geburtsdatum?'),
    S('Mag ik uw identiteitsbewijs zien?', 'Darf ich Ihren Ausweis sehen?'),
    S('Hier moet u ondertekenen.', 'Hier müssen Sie unterschreiben.'),
    S('Ik wil me inschrijven bij de gemeente.', 'Ich möchte mich bei der Gemeinde anmelden.'),
    S('Ik ben net verhuisd.', 'Ich bin gerade umgezogen.'),
    S('Een zorgverzekering is verplicht in Nederland.', 'Eine Krankenversicherung ist in den Niederlanden Pflicht.'),
    S('De huur is hoog.', 'Die Miete ist hoch.'),
    S('Ik heb het contract getekend.', 'Ich habe den Vertrag unterschrieben.'),
    S('Ik wil een bankrekening openen.', 'Ich möchte ein Bankkonto eröffnen.'),
    S('Is mijn paspoort nog geldig?', 'Ist mein Reisepass noch gültig?'),
    S('Ik moet een nieuw paspoort aanvragen.', 'Ich muss einen neuen Reisepass beantragen.'),
    S('Kunnen we de afspraak verplaatsen?', 'Können wir den Termin verschieben?'),
    S('Ik moet de afspraak annuleren.', 'Ich muss den Termin absagen.'),
    S('Zullen we voor dinsdag afspreken?', 'Sollen wir uns für Dienstag verabreden?|Wollen wir uns für Dienstag verabreden?'),
    S('We hebben om drie uur afgesproken.', 'Wir haben uns für drei Uhr verabredet.|Wir sind um drei Uhr verabredet.'),
    S('Er is een lange wachtrij.', 'Es gibt eine lange Warteschlange.|Die Schlange ist lang.'),
    S('Ga naar loket vier.', 'Gehen Sie zu Schalter vier.|Geh zu Schalter vier.'),
    S('Neem alle documenten mee.', 'Nehmen Sie alle Dokumente mit.|Nimm alle Dokumente mit.'),
    S('Vanaf maandag werk ik hier.', 'Ab Montag arbeite ich hier.'),
    S('Ik moet belasting betalen.', 'Ich muss Steuern zahlen.|Ich muss Steuern bezahlen.'),
    S('Welke datum is het vandaag?', 'Welches Datum ist heute?|Der Wievielte ist heute?'),
    S('De ambtenaar helpt me.', 'Der Beamte hilft mir.|Die Beamtin hilft mir.'),
    S('Uw handtekening, alstublieft.', 'Ihre Unterschrift, bitte.'),
    S('Heeft u een verzekering?', 'Haben Sie eine Versicherung?'),
  ],
  cloze: [
    C('U moet dit formulier {invullen}.', 'invullen|vul in|ingevuld', 'Sie müssen dieses Formular ausfüllen.'),
    C('Vul hier uw naam {in}.', 'in|uit|op', 'Tragen Sie hier Ihren Namen ein.'),
    C('Ik heb het contract {getekend}.', 'getekend|!getekent|tekende', 'Ich habe den Vertrag unterschrieben.'),
    C('Kunnen we de afspraak {verplaatsen}?', 'verplaatsen|verplaatst|!geverplaatst', 'Können wir den Termin verschieben?'),
    C('Is mijn paspoort nog {geldig}?', 'geldig|geldige', 'Ist mein Reisepass noch gültig?'),
    C('{Vanaf} maandag werk ik hier.', 'Vanaf|Van|Sinds', 'Ab Montag arbeite ich hier.'),
  ],
  story: story('st48', 'Bij de gemeente', 'Bei der Gemeinde', [
    ['Ambtenaar', 'Goedemorgen. Hoe kan ik u helpen?', 'Guten Morgen. Wie kann ich Ihnen helfen?'],
    ['Anna', 'Ik ben net naar Utrecht verhuisd en ik wil me inschrijven.', 'Ich bin gerade nach Utrecht gezogen und möchte mich anmelden.'],
    ['Ambtenaar', 'Heeft u uw paspoort en uw huurcontract meegebracht?', 'Haben Sie Ihren Reisepass und Ihren Mietvertrag mitgebracht?'],
    Q('Was möchte Anna bei der Gemeinde?', ['Sich anmelden', 'Einen Pass beantragen', 'Steuern zahlen'], 0),
    ['Anna', 'Ja, alstublieft.', 'Ja, bitte schön.'],
    ['Ambtenaar', 'Dank u. Wilt u dit formulier invullen en hier ondertekenen?', 'Danke. Würden Sie dieses Formular ausfüllen und hier unterschreiben?'],
    ['Anna', 'Natuurlijk. Moet ik nog iets anders doen?', 'Natürlich. Muss ich noch etwas anderes tun?'],
    ['Ambtenaar', 'Nee, dat was alles. Welkom in Utrecht!', 'Nein, das war alles. Willkommen in Utrecht!'],
    Q('Was hat Anna mitgebracht?', ['Pass und Mietvertrag', 'Ein Foto', 'Ihre Bankkarte'], 0),
  ]),
});

const u49 = unit({
  id: 'u49',
  title: 'Meinungen',
  description: 'Meinung sagen, zustimmen, widersprechen, abwägen',
  tips: [
    T(
      'Die eigene Meinung',
      `
      - *Ik vind (dat) …* „Ich finde (, dass) …“
      - *Ik denk dat …* „Ich glaube, dass …“
      - *Volgens mij …* „Meiner Meinung nach …“
      - *Eerlijk gezegd …* „Ehrlich gesagt …“
      `,
      [['Volgens mij heb je gelijk.', 'Meiner Meinung nach hast du recht.']],
    ),
    T(
      'Zustimmen und widersprechen',
      `
      - *Ik ben het met je eens.* „Ich stimme dir zu.“
      - *Ik ben het niet met je eens.* „Ich bin anderer Meinung.“
      - *Dat klopt.* „Das stimmt.“ – *Dat klopt niet.*
      - *Inderdaad.* „In der Tat. / Stimmt.“
      - *Onzin!* „Unsinn!“
      `,
      [['Ik ben het met je eens.', 'Ich stimme dir zu.']],
    ),
    T(
      'Abwägen',
      `
      - *Aan de ene kant … aan de andere kant …* „Einerseits … andererseits …“
      - *het voordeel* (der Vorteil), *het nadeel* (der Nachteil)
      `,
    ),
  ],
  words: [
    N('de mening', 'die Meinung', 'meningen'),
    P('volgens mij', 'meiner Meinung nach'),
    W('eens', 'einverstanden (het eens zijn)', 'adv', { id: 'eens-akkoord' }),
    W('oneens', 'nicht einverstanden', 'adv'),
    A('eerlijk', 'ehrlich; fair', 'eerlijke eerlijker eerlijkst'),
    P('eerlijk gezegd', 'ehrlich gesagt'),
    N('de onzin', 'der Unsinn', '-'),
    W('inderdaad', 'in der Tat, tatsächlich', 'adv'),
    A('juist', 'richtig', 'juiste - -'),
    A('fout', 'falsch', 'foute - -'),
    N('de fout', 'der Fehler', 'fouten', undefined, { id: 'fout-noun' }),
    V('twijfelen', 'zweifeln, unsicher sein', 'twijfel twijfelt twijfelen | twijfelde twijfelden | getwijfeld h'),
    V('overtuigen', 'überzeugen', 'overtuig overtuigt overtuigen | overtuigde overtuigden | overtuigd h'),
    V('vergelijken', 'vergleichen', 'vergelijk vergelijkt vergelijken | vergeleek vergeleken | vergeleken h'),
    N('het voordeel', 'der Vorteil', 'voordelen'),
    N('het nadeel', 'der Nachteil', 'nadelen'),
    N('het argument', 'das Argument', 'argumenten'),
    N('de discussie', 'die Diskussion', 'discussies'),
    P('aan de ene kant', 'einerseits'),
    P('aan de andere kant', 'andererseits'),
    A('ander', 'anderer, andere, anderes', 'andere - -'),
  ],
  sentences: [
    S('Wat is jouw mening?', 'Was ist deine Meinung?'),
    S('Ik vind dat een goed idee.', 'Ich finde das eine gute Idee.|Ich finde, das ist eine gute Idee.'),
    S('Volgens mij heb je gelijk.', 'Meiner Meinung nach hast du recht.|Ich glaube, du hast recht.'),
    S('Ik ben het met je eens.', 'Ich stimme dir zu.|Ich bin deiner Meinung.'),
    S('Ik ben het niet met je eens.|Ik ben het oneens met je.', 'Ich stimme dir nicht zu.|Ich bin nicht deiner Meinung.'),
    S('Eerlijk gezegd vind ik het saai.', 'Ehrlich gesagt finde ich es langweilig.'),
    S('Dat klopt.', 'Das stimmt.'),
    S('Dat klopt niet.', 'Das stimmt nicht.'),
    S('Ik denk dat je gelijk hebt.', 'Ich glaube, dass du recht hast.|Ich denke, dass du recht hast.'),
    S('Dat is onzin!', 'Das ist Unsinn!|Das ist Quatsch!'),
    S('Inderdaad, dat is waar.', 'In der Tat, das ist wahr.|Stimmt, das ist wahr.'),
    S('Dat antwoord is fout.', 'Diese Antwort ist falsch.|Die Antwort ist falsch.'),
    S('Iedereen maakt fouten.', 'Jeder macht Fehler.|Alle machen Fehler.'),
    S('Het antwoord is juist.', 'Die Antwort ist richtig.'),
    S('Ik twijfel nog.', 'Ich bin noch unsicher.|Ich zweifle noch.'),
    S('Je hebt me overtuigd.', 'Du hast mich überzeugt.'),
    S('Aan de ene kant is het duur, aan de andere kant is het mooi.', 'Einerseits ist es teuer, andererseits ist es schön.'),
    S('Wat zijn de voordelen en de nadelen?', 'Was sind die Vorteile und die Nachteile?'),
    S('Dat is een goed argument.', 'Das ist ein gutes Argument.'),
    S('We hebben een lange discussie gehad.', 'Wir hatten eine lange Diskussion.'),
    S('Je kunt Amsterdam niet met Berlijn vergelijken.', 'Man kann Amsterdam nicht mit Berlin vergleichen.|Du kannst Amsterdam nicht mit Berlin vergleichen.'),
    S('Ik geloof je, maar ik heb een andere mening.', 'Ich glaube dir, aber ich habe eine andere Meinung.'),
    S('Het is belangrijk om eerlijk te zijn.', 'Es ist wichtig, ehrlich zu sein.'),
    S('Wat denk jij?', 'Was denkst du?|Was meinst du?'),
    S('Misschien heb je gelijk.', 'Vielleicht hast du recht.'),
  ],
  cloze: [
    C('Ik ben het met je {eens}.', 'eens|een|één', 'Ich stimme dir zu.'),
    C('{Volgens} mij heb je gelijk.', 'Volgens|Voor|Bij', 'Meiner Meinung nach hast du recht.'),
    C('Dat {klopt} niet.', 'klopt|klop|kloppen', 'Das stimmt nicht.'),
    C('Je hebt me {overtuigd}.', 'overtuigd|overtuigt|!geovertuigd', 'Du hast mich überzeugt.'),
    C('{Eerlijk} gezegd vind ik het saai.', 'Eerlijk|Eerlijke|Eerlijker', 'Ehrlich gesagt finde ich es langweilig.'),
    C('Iedereen maakt {fouten}.', 'fouten|fout|!foutten', 'Jeder macht Fehler.'),
  ],
  story: story('st49', 'Fiets of auto?', 'Fahrrad oder Auto?', [
    ['Daan', 'Volgens mij is de fiets beter dan de auto.', 'Meiner Meinung nach ist das Fahrrad besser als das Auto.'],
    ['Sophie', 'Waarom vind je dat?', 'Warum findest du das?'],
    ['Daan', 'Fietsen is gezond en goed voor het milieu. Bovendien is het goedkoop.', 'Radfahren ist gesund und gut für die Umwelt. Außerdem ist es billig.'],
    Q('Was sagt Daan über das Radfahren?', ['Es ist gesund und billig', 'Es ist schnell', 'Es ist gefährlich'], 0),
    ['Sophie', 'Dat klopt, maar als het regent, is de auto fijner.', 'Das stimmt, aber wenn es regnet, ist das Auto angenehmer.'],
    ['Daan', 'Eerlijk gezegd fiets ik ook in de regen. Je wordt een beetje nat, maar dat is niet erg.', 'Ehrlich gesagt fahre ich auch im Regen Rad. Man wird ein bisschen nass, aber das ist nicht schlimm.'],
    ['Sophie', 'Oké, je hebt me bijna overtuigd!', 'Okay, du hast mich fast überzeugt!'],
    Q('Was ist Sophies Argument für das Auto?', ['Bei Regen ist es angenehmer', 'Es ist billiger', 'Es ist gesünder'], 0),
  ]),
});

const u50 = unit({
  id: 'u50',
  title: 'Niederlande und Belgien',
  description: 'Landeskunde, Feste und typische Redewendungen',
  tips: [
    T(
      'Zwei Länder, eine Sprache',
      `
      - Hauptstadt der Niederlande ist **Amsterdam**, Regierungssitz ist **Den Haag**. Es gibt zwölf Provinzen.
      - In **Belgien** spricht man Niederländisch (in Flandern), Französisch (in der Wallonie) und Deutsch (im Osten). **Brüssel** ist zweisprachig.
      - Das Niederländisch in Belgien klingt etwas anders, ist aber dieselbe Standardsprache.
      `,
      [['Amsterdam is de hoofdstad van Nederland.', 'Amsterdam ist die Hauptstadt der Niederlande.']],
    ),
    T(
      'Feste',
      `
      - **Koningsdag** (27. April): Geburtstag des Königs. Alle tragen Orange, überall ist Flohmarkt (*vrijmarkt*).
      - **Sinterklaas** (5. Dezember, in Belgien am Morgen des 6.): Geschenke und Gedichte für Kinder und Familie.
      `,
      [['Op Koningsdag dragen veel mensen oranje.', 'Am Königstag tragen viele Menschen Orange.']],
    ),
    T(
      'Redewendungen',
      `
      | | |
      |---|---|
      | met de deur in huis vallen | mit der Tür ins Haus fallen |
      | twee vliegen in één klap slaan | zwei Fliegen mit einer Klappe schlagen |
      | nu komt de aap uit de mouw | jetzt kommt die Wahrheit ans Licht |
      | de kat uit de boom kijken | erst einmal abwarten |
      | zo klaar als een klontje | sonnenklar |
      | Oost west, thuis best. | Zu Hause ist es am schönsten. |
      | Doe maar gewoon, dan doe je al gek genoeg. | Sei einfach normal, das ist verrückt genug. |
      `,
    ),
    T(
      'Wie geht es weiter?',
      `
      Mit diesem Kurs hast du die Grundlagen bis zum Einstieg in B1. Wiederhole regelmäßig im Bereich *Üben*, lies jeden Tag ein paar niederländische Sätze, hör niederländisches Radio und sprich, wann immer du kannst. *Succes!* (Viel Erfolg!)
      `,
    ),
  ],
  words: [
    N('de koningin', 'die Königin', 'koninginnen'),
    N('de Koningsdag', 'der Königstag', '-'),
    N('de provincie', 'die Provinz', 'provincies'),
    N('de hoofdstad', 'die Hauptstadt', 'hoofdsteden'),
    N('de regering', 'die Regierung', 'regeringen'),
    N('de traditie', 'die Tradition', 'tradities'),
    N('de cultuur', 'die Kultur', 'culturen'),
    N('de tulp', 'die Tulpe', 'tulpen'),
    N('het Frans', 'Französisch (Sprache)', '-'),
    NP('de spullen', 'die Sachen'),
    N('de vrijmarkt', 'der Flohmarkt (am Königstag)', 'vrijmarkten'),
    N('de aap', 'der Affe', 'apen', '🐒'),
    N('de mouw', 'der Ärmel', 'mouwen'),
    N('de vlieg', 'die Fliege', 'vliegen', '🪰'),
    N('de klap', 'der Schlag, die Klappe', 'klappen'),
    N('het klontje', 'das Stück Zucker', 'klontjes'),
    N('de kater', 'der Kater (Kopfschmerzen; Tier)', 'katers'),
    V('slaan', 'schlagen', 'sla slaat slaan | sloeg sloegen | geslagen h'),
    V('bloeien', 'blühen', 'bloei bloeit bloeien | bloeide bloeiden | gebloeid h'),
    A('tweetalig', 'zweisprachig', 'tweetalige - -'),
    A('direct', 'direkt', 'directe directer directst'),
    A('gek', 'verrückt', 'gekke gekker gekst'),
    A('Belgisch', 'belgisch', 'Belgische - -'),
    A('Vlaams', 'flämisch', 'Vlaamse - -'),
    W('men', 'man', 'pron'),
    W('hè', 'oder?, nicht wahr?', 'interj'),
    W('proficiat', 'herzlichen Glückwunsch (v. a. in Belgien)', 'interj'),
    W('succes', 'viel Erfolg', 'interj'),
    W('oost', 'Osten', 'noun'),
    W('west', 'Westen', 'noun'),
    W('Vlaanderen', 'Flandern', 'name'),
    W('Sinterklaas', 'Sinterklaas (Nikolaus)', 'name'),
    P('met de deur in huis vallen', 'mit der Tür ins Haus fallen'),
    P('de kat uit de boom kijken', 'erst einmal abwarten'),
    P('zo klaar als een klontje', 'sonnenklar'),
  ],
  sentences: [
    S('Amsterdam is de hoofdstad van Nederland.', 'Amsterdam ist die Hauptstadt der Niederlande.'),
    S('De regering zit in Den Haag.', 'Die Regierung sitzt in Den Haag.'),
    S('Nederland heeft twaalf provincies.', 'Die Niederlande haben zwölf Provinzen.'),
    S('Op Koningsdag dragen veel mensen oranje.', 'Am Königstag tragen viele Menschen Orange.'),
    S('Koningsdag is op zevenentwintig april.', 'Der Königstag ist am siebenundzwanzigsten April.'),
    S('Op vijf december vieren we Sinterklaas.', 'Am fünften Dezember feiern wir Sinterklaas.'),
    S('In België spreekt men Nederlands, Frans en Duits.', 'In Belgien spricht man Niederländisch, Französisch und Deutsch.'),
    S('In Vlaanderen spreken ze Nederlands.', 'In Flandern spricht man Niederländisch.|In Flandern sprechen sie Niederländisch.'),
    S('Brussel is tweetalig.', 'Brüssel ist zweisprachig.'),
    S('In Nederland zijn meer fietsen dan mensen.|In Nederland zijn er meer fietsen dan mensen.', 'In den Niederlanden gibt es mehr Fahrräder als Menschen.'),
    S('Nederlanders zijn vaak heel direct.', 'Niederländer sind oft sehr direkt.'),
    S('Doe maar gewoon, dan doe je al gek genoeg.', 'Sei einfach normal, das ist schon verrückt genug.'),
    S('Nu komt de aap uit de mouw!', 'Jetzt kommt die Wahrheit ans Licht!'),
    S('Hij valt met de deur in huis.', 'Er fällt mit der Tür ins Haus.'),
    S('Ik kijk eerst de kat uit de boom.', 'Ich warte erst einmal ab.'),
    S('We moeten eerst de kat uit de boom kijken.', 'Wir müssen erst einmal abwarten.'),
    S('Je moet niet met de deur in huis vallen.', 'Du sollst nicht mit der Tür ins Haus fallen.|Du musst nicht mit der Tür ins Haus fallen.|Man soll nicht mit der Tür ins Haus fallen.'),
    S('Op Koningsdag bezoeken de koning en de koningin een stad.', 'Am Königstag besuchen der König und die Königin eine Stadt.'),
    S('Sinterklaas is een oude traditie.', 'Sinterklaas ist eine alte Tradition.'),
    S('Gent is een Vlaamse stad.', 'Gent ist eine flämische Stadt.'),
    S('Mijn buurman is Belgisch.', 'Mein Nachbar ist Belgier.|Mein Nachbar ist belgisch.'),
    S('Zo sla je twee vliegen in één klap.', 'So schlägst du zwei Fliegen mit einer Klappe.'),
    S('Oost west, thuis best.', 'Zu Hause ist es am schönsten.'),
    S('Het is zo klaar als een klontje.', 'Das ist sonnenklar.'),
    S('Na het feest had hij een kater.', 'Nach der Party hatte er einen Kater.'),
    S('Ik heb er zin in!', 'Ich freue mich darauf!|Ich habe Lust darauf!'),
    S('Gezellig, hè?', 'Gemütlich, oder?|Schön, nicht wahr?'),
    S('Antwerpen is een grote stad in Vlaanderen.', 'Antwerpen ist eine große Stadt in Flandern.'),
    S('De tulpen bloeien in april.', 'Die Tulpen blühen im April.'),
    S('De Nederlandse cultuur is interessant.', 'Die niederländische Kultur ist interessant.'),
    S('Proficiat!', 'Herzlichen Glückwunsch!|Glückwunsch!'),
    S('Je spreekt al goed Nederlands!', 'Du sprichst schon gut Niederländisch!'),
    S('Succes met je examen!', 'Viel Erfolg bei deiner Prüfung!|Viel Glück bei deiner Prüfung!'),
  ],
  cloze: [
    C('Amsterdam is de {hoofdstad} van Nederland.', 'hoofdstad|regering|provincie', 'Amsterdam ist die Hauptstadt der Niederlande.'),
    C('Op Koningsdag dragen veel mensen {oranje}.', 'oranje|rood|groen', 'Am Königstag tragen viele Menschen Orange.'),
    C('Hij valt met de deur in {huis}.', 'huis|de kamer|de tuin', 'Er fällt mit der Tür ins Haus.'),
    C('Zo sla je twee vliegen in één {klap}.', 'klap|keer|dag', 'So schlägst du zwei Fliegen mit einer Klappe.'),
    C('In België spreekt {men} Nederlands, Frans en Duits.', 'men|man|mens', 'In Belgien spricht man Niederländisch, Französisch und Deutsch.'),
    C('Brussel is {tweetalig}.', 'tweetalig|tweetalige', 'Brüssel ist zweisprachig.'),
  ],
  story: story('st50', 'Koningsdag', 'Der Königstag', [
    ['Anna', 'Waarom draagt iedereen vandaag oranje?', 'Warum trägt heute jeder Orange?'],
    ['Jan', 'Het is Koningsdag! De verjaardag van de koning.', 'Es ist Königstag! Der Geburtstag des Königs.'],
    ['Anna', 'En waarom liggen er overal spullen op straat?', 'Und warum liegen überall Sachen auf der Straße?'],
    ['Jan', 'Dat is de vrijmarkt. Iedereen mag vandaag zijn oude spullen verkopen.', 'Das ist der Flohmarkt. Heute darf jeder seine alten Sachen verkaufen.'],
    Q('Was feiert man am Königstag?', ['Den Geburtstag des Königs', 'Neujahr', 'Den Sommeranfang'], 0),
    ['Anna', 'Wat gezellig! Ik koop een oude lamp voor twee euro.', 'Wie gemütlich! Ich kaufe eine alte Lampe für zwei Euro.'],
    ['Jan', 'En vanavond is er een groot feest in het centrum. Heb je zin?', 'Und heute Abend gibt es ein großes Fest im Zentrum. Hast du Lust?'],
    ['Anna', 'Ik heb er zin in!', 'Ich freue mich darauf!'],
    Q('Was kauft Anna?', ['Eine alte Lampe', 'Ein Fahrrad', 'Ein Buch'], 0),
  ]),
});

export default [u41, u42, u43, u44, u45, u46, u47, u48, u49, u50];
