// Section 4 – Vergangenheit und Zukunft (A2)
import { A, C, N, P, Q, S, T, V, W, story, unit } from '../dsl';

const u31 = unit({
  id: 'u31',
  title: 'Perfekt mit hebben',
  description: "Regelmäßige Partizipien, 't kofschip, Vorsilben ohne ge-",
  tips: [
    T(
      'Das Perfekt',
      `
      Wie im Deutschen: **hebben** + Partizip am Satzende.

      - *Ik heb gisteren gewerkt.* „Ich habe gestern gearbeitet.“
      - *Heb je je huiswerk gemaakt?*

      Das regelmäßige Partizip: **ge** + Stamm + **t** oder **d**: *werken → gewerkt*, *wonen → gewoond*.
      `,
      [
        ['Ik heb gisteren gewerkt.', 'Ich habe gestern gearbeitet.'],
        ['Wij hebben in Amsterdam gewoond.', 'Wir haben in Amsterdam gewohnt.'],
      ],
    ),
    T(
      "t oder d? 't kofschip",
      `
      Endet der Stamm auf einen Konsonanten aus **'t kofschip** (t, k, f, s, ch, p), endet das Partizip auf **-t**: *gewerkt, gekookt, gepoetst, gefietst*.

      Sonst auf **-d**: *gewoond, gespeeld, gebeld, gedanst*… Moment: *dansen* hat den Stamm *dans* (s) → *gedanst*.

      Endet der Stamm schon auf t oder d, kommt nichts dazu: *gewacht, geantwoord*.

      Bei **v** und **z** im Infinitiv zählt dieser Buchstabe: *leven → geleefd*, *reizen → gereisd*.
      `,
      [['Ze hebben in Duitsland geleefd.', 'Sie haben in Deutschland gelebt.']],
    ),
    T(
      'Ohne ge-',
      `
      Verben mit den Vorsilben **be-, ge-, her-, ont-, ver-, er-** bekommen kein zusätzliches *ge-*: *betaald, gebruikt, herhaald, verhuisd*.

      Bei trennbaren Verben steht *ge* in der Mitte: *opgeruimd, opgebeld*.
      `,
      [['Ik heb mijn kamer opgeruimd.', 'Ich habe mein Zimmer aufgeräumt.']],
    ),
  ],
  words: [
    V('antwoorden', 'antworten', 'antwoord antwoordt antwoorden | antwoordde antwoordden | geantwoord h'),
    V('reizen', 'reisen', 'reis reist reizen | reisde reisden | gereisd hz'),
    V('leven', 'leben', 'leef leeft leven | leefde leefden | geleefd h'),
    V('hopen', 'hoffen', 'hoop hoopt hopen | hoopte hoopten | gehoopt h'),
    V('regelen', 'regeln, organisieren', 'regel regelt regelen | regelde regelden | geregeld h'),
    V('gebruiken', 'benutzen', 'gebruik gebruikt gebruiken | gebruikte gebruikten | gebruikt h'),
    V('verhuizen', 'umziehen', 'verhuis verhuist verhuizen | verhuisde verhuisden | verhuisd z'),
    V('bouwen', 'bauen', 'bouw bouwt bouwen | bouwde bouwden | gebouwd h'),
    V('huren', 'mieten', 'huur huurt huren | huurde huurden | gehuurd h'),
    A('vorig', 'vorig, letzte', 'vorige - -'),
    A('afgelopen', 'vergangen, letzte', '- - -'),
    W('vannacht', 'heute Nacht, letzte Nacht', 'adv'),
    W('ooit', 'je, jemals', 'adv'),
    W('net', 'gerade (eben)', 'adv'),
    N('het verleden', 'die Vergangenheit', '-'),
  ],
  sentences: [
    S('Ik heb gisteren gewerkt.|Gisteren heb ik gewerkt.', 'Ich habe gestern gearbeitet.|Gestern habe ich gearbeitet.'),
    S('Wij hebben in Amsterdam gewoond.', 'Wir haben in Amsterdam gewohnt.'),
    S('Heb je je huiswerk gemaakt?', 'Hast du deine Hausaufgaben gemacht?'),
    S('Ja, ik heb het al gemaakt.', 'Ja, ich habe sie schon gemacht.'),
    S('Ze heeft de hele dag gespeeld.', 'Sie hat den ganzen Tag gespielt.'),
    S('Wat heb je gekookt?', 'Was hast du gekocht?'),
    S('Ik heb soep gekookt.', 'Ich habe Suppe gekocht.'),
    S('Hebben jullie al betaald?', 'Habt ihr schon bezahlt?'),
    S('Ik heb een nieuwe fiets gekocht.', 'Ich habe ein neues Fahrrad gekauft.'),
    S('Hij heeft lang gewacht.', 'Er hat lange gewartet.'),
    S('Heb je ooit in Nederland gewoond?', 'Hast du schon einmal in den Niederlanden gewohnt?|Hast du jemals in den Niederlanden gewohnt?'),
    S('Ik heb mijn moeder gebeld.', 'Ich habe meine Mutter angerufen.'),
    S('We hebben de hele avond gedanst.', 'Wir haben den ganzen Abend getanzt.'),
    S('Het heeft vannacht geregend.', 'Es hat heute Nacht geregnet.|Es hat letzte Nacht geregnet.'),
    S('Ik heb Nederlands geleerd.', 'Ich habe Niederländisch gelernt.'),
    S('Wie heeft de tafel gereserveerd?', 'Wer hat den Tisch reserviert?'),
    S('Ik heb mijn kamer opgeruimd.', 'Ich habe mein Zimmer aufgeräumt.'),
    S('Ik heb hem nog niet gebeld.', 'Ich habe ihn noch nicht angerufen.'),
    S('Hij heeft net geantwoord.', 'Er hat gerade geantwortet.'),
    S('We hebben vorige week een huis gehuurd.', 'Wir haben letzte Woche ein Haus gemietet.'),
    S('Ze hebben in Duitsland geleefd.', 'Sie haben in Deutschland gelebt.'),
    S('Ik heb het hele weekend gefietst.', 'Ich bin das ganze Wochenende Rad gefahren.'),
    S('Wat heb je afgelopen weekend gedaan?', 'Was hast du letztes Wochenende gemacht?|Was hast du am letzten Wochenende gemacht?'),
    S('Wie heeft dit huis gebouwd?', 'Wer hat dieses Haus gebaut?'),
    S('Wij hebben alles geregeld.', 'Wir haben alles geregelt.|Wir haben alles organisiert.'),
    S('Dat is verleden tijd.', 'Das ist Vergangenheit.|Das ist vorbei.'),
    S('Ik heb het woordenboek gebruikt.', 'Ich habe das Wörterbuch benutzt.'),
  ],
  cloze: [
    C('Ik heb gisteren {gewerkt}.', 'gewerkt|!gewerkd|werkte', 'Ich habe gestern gearbeitet.'),
    C('Wij hebben in Amsterdam {gewoond}.', 'gewoond|!gewoont|woonden', 'Wir haben in Amsterdam gewohnt.'),
    C('Hij heeft lang {gewacht}.', 'gewacht|!gewachtt|!gewachd', 'Er hat lange gewartet.'),
    C('Hebben jullie al {betaald}?', 'betaald|!gebetaald|betaalt', 'Habt ihr schon bezahlt?'),
    C('Ik {heb} soep gekookt.', 'heb|ben|hebt', 'Ich habe Suppe gekocht.'),
    C('Ze hebben in Duitsland {geleefd}.', 'geleefd|!geleeft|!gelevd', 'Sie haben in Deutschland gelebt.'),
    C('Ik heb mijn kamer {opgeruimd}.', 'opgeruimd|!geopruimd|!opgeruimt', 'Ich habe mein Zimmer aufgeräumt.'),
  ],
  story: story('st31', 'Wat heb je gedaan?', 'Was hast du gemacht?', [
    ['Emma', 'Hoi Sem! Wat heb je gisteren gedaan?', 'Hi, Sem! Was hast du gestern gemacht?'],
    ['Sem', 'Ik heb de hele dag gewerkt. En jij?', 'Ich habe den ganzen Tag gearbeitet. Und du?'],
    ['Emma', 'Ik heb mijn kamer opgeruimd en ik heb gekookt.', 'Ich habe mein Zimmer aufgeräumt und gekocht.'],
    Q('Was hat Sem gestern gemacht?', ['Er hat gearbeitet', 'Er hat gekocht', 'Er hat getanzt'], 0),
    ['Sem', 'Wat heb je gekookt?', 'Was hast du gekocht?'],
    ['Emma', 'Soep met groente. Daarna heb ik met mijn moeder gebeld.', 'Suppe mit Gemüse. Danach habe ich mit meiner Mutter telefoniert.'],
    Q('Mit wem hat Emma telefoniert?', ['Mit ihrer Mutter', 'Mit Sem', 'Mit ihrer Schwester'], 0),
    ['Sem', 'Gezellig! Ik heb nog niet gegeten. Ik heb honger!', 'Schön! Ich habe noch nicht gegessen. Ich habe Hunger!'],
  ]),
});

const u32 = unit({
  id: 'u32',
  title: 'Unregelmäßige Partizipien',
  description: 'gegeten, gezien, geschreven, gedaan …',
  tips: [
    T(
      'Die wichtigsten unregelmäßigen Partizipien',
      `
      | Infinitiv | Partizip |
      |---|---|
      | eten | gegeten |
      | drinken | gedronken |
      | zien | gezien |
      | lezen | gelezen |
      | schrijven | geschreven |
      | spreken | gesproken |
      | doen | gedaan |
      | hebben | gehad |
      | nemen | genomen |
      | vinden | gevonden |
      | krijgen | gekregen |
      | geven | gegeven |
      | zeggen | gezegd |
      | kopen | gekocht |
      | denken | gedacht |
      | brengen | gebracht |
      `,
      [
        ['Heb je die film gezien?', 'Hast du den Film gesehen?'],
        ['Ik heb een cadeau gekregen.', 'Ich habe ein Geschenk bekommen.'],
      ],
    ),
    T(
      'Ähnlich wie im Deutschen – mit Ausnahmen',
      `
      Viele Partizipien sehen aus wie im Deutschen: *gegeten* (gegessen), *gedronken* (getrunken), *gezongen* (gesungen).

      Achtung: **lachen → gelachen** (nicht „gelacht“), **krijgen → gekregen** (bekommen).
      `,
      [['We hebben veel gelachen.', 'Wir haben viel gelacht.']],
    ),
    T(
      'Perfekt im Gespräch',
      `
      Im Gespräch erzählt man Vergangenes meistens im Perfekt: *Ik heb geen tijd gehad.* „Ich hatte keine Zeit.“

      *Wat is er gebeurd?* „Was ist passiert?“ – *gebeuren* bildet das Perfekt mit *zijn*. Mehr dazu im nächsten Kapitel.
      `,
    ),
  ],
  words: [
    V('krijgen', 'bekommen', 'krijg krijgt krijgen | kreeg kregen | gekregen h'),
    V('verliezen', 'verlieren', 'verlies verliest verliezen | verloor verloren | verloren h'),
    V('winnen', 'gewinnen', 'win wint winnen | won wonnen | gewonnen h'),
    V('lachen', 'lachen', 'lach lacht lachen | lachte lachten | gelachen h'),
    V('kiezen', 'wählen, aussuchen', 'kies kiest kiezen | koos kozen | gekozen h'),
    V('breken', 'brechen', 'breek breekt breken | brak braken | gebroken hz'),
    V('zetten', 'setzen, stellen; (Kaffee) kochen', 'zet zet zetten | zette zetten | gezet h'),
    V('uitlezen', 'zu Ende lesen', 'lees leest lezen | las lazen | uitgelezen h', { sep: 'uit' }),
    V('gebeuren', 'passieren, geschehen', 'gebeur gebeurt gebeuren | gebeurde gebeurden | gebeurd z'),
    N('het team', 'das Team', 'teams'),
    N('het woordenboek', 'das Wörterbuch', 'woordenboeken'),
    W('gisteravond', 'gestern Abend', 'adv'),
  ],
  sentences: [
    S('Ik heb een appel gegeten.', 'Ich habe einen Apfel gegessen.'),
    S('Wat heb je gedronken?', 'Was hast du getrunken?'),
    S('Heb je die film gezien?', 'Hast du den Film gesehen?|Hast du diesen Film gesehen?'),
    S('Ik heb het boek gelezen.', 'Ich habe das Buch gelesen.'),
    S('Ze heeft een brief geschreven.', 'Sie hat einen Brief geschrieben.'),
    S('We hebben Nederlands gesproken.', 'Wir haben Niederländisch gesprochen.'),
    S('Wat heb je gedaan?', 'Was hast du gemacht?|Was hast du getan?'),
    S('Ik heb geen tijd gehad.', 'Ich hatte keine Zeit.|Ich habe keine Zeit gehabt.'),
    S('Hij heeft de trein genomen.', 'Er hat den Zug genommen.'),
    S('Ik heb mijn sleutels gevonden!', 'Ich habe meine Schlüssel gefunden!'),
    S('Ik heb een cadeau gekregen.', 'Ich habe ein Geschenk bekommen.'),
    S('Wie heeft je dat gegeven?', 'Wer hat dir das gegeben?'),
    S('Ik heb slecht geslapen.', 'Ich habe schlecht geschlafen.'),
    S('Heb je het begrepen?', 'Hast du es verstanden?|Hast du das verstanden?'),
    S('Ik heb het vergeten.', 'Ich habe es vergessen.|Ich habe das vergessen.'),
    S('We hebben veel gelachen.', 'Wir haben viel gelacht.'),
    S('Wie heeft gewonnen?', 'Wer hat gewonnen?'),
    S('Ons team heeft verloren.', 'Unser Team hat verloren.'),
    S('Wat heeft hij gezegd?', 'Was hat er gesagt?'),
    S('Ik heb een nieuwe jas gekozen.', 'Ich habe eine neue Jacke ausgesucht.|Ich habe eine neue Jacke gewählt.'),
    S('Ze heeft me geholpen.', 'Sie hat mir geholfen.'),
    S('Ik heb aan je gedacht.', 'Ich habe an dich gedacht.'),
    S('Hij heeft zijn arm gebroken.', 'Er hat sich den Arm gebrochen.'),
    S('Heb je de deur gesloten?', 'Hast du die Tür geschlossen?'),
    S('We hebben een lied gezongen.', 'Wir haben ein Lied gesungen.'),
    S('Wat heb je gekocht?', 'Was hast du gekauft?'),
    S('Ik heb gisteravond koffie gezet.', 'Ich habe gestern Abend Kaffee gekocht.'),
  ],
  cloze: [
    C('Ik heb een appel {gegeten}.', 'gegeten|at|!geet', 'Ich habe einen Apfel gegessen.'),
    C('Heb je die film {gezien}?', 'gezien|zag|!gezient', 'Hast du den Film gesehen?'),
    C('Ze heeft een brief {geschreven}.', 'geschreven|!geschrijft|schreef', 'Sie hat einen Brief geschrieben.'),
    C('Ik heb een cadeau {gekregen}.', 'gekregen|!gekrijgd|kreeg', 'Ich habe ein Geschenk bekommen.'),
    C('We hebben veel {gelachen}.', 'gelachen|!gelacht|lachten', 'Wir haben viel gelacht.'),
    C('Wat heeft hij {gezegd}?', 'gezegd|!gezegt|zei', 'Was hat er gesagt?'),
    C('Ik heb geen tijd {gehad}.', 'gehad|had|!gehebt', 'Ich hatte keine Zeit.'),
  ],
  story: story('st32', 'Een slechte nacht', 'Eine schlechte Nacht', [
    ['Lotte', 'Goedemorgen! Heb je goed geslapen?', 'Guten Morgen! Hast du gut geschlafen?'],
    ['Bram', 'Nee, ik heb heel slecht geslapen.', 'Nein, ich habe sehr schlecht geschlafen.'],
    ['Lotte', 'Wat is er gebeurd?', 'Was ist passiert?'],
    ['Bram', 'Ik heb gisteravond een spannend boek gelezen. Tot drie uur!', 'Ich habe gestern Abend ein spannendes Buch gelesen. Bis drei Uhr!'],
    Q('Warum hat Bram schlecht geschlafen?', ['Er hat bis drei Uhr gelesen', 'Er war krank', 'Es war zu laut'], 0),
    ['Lotte', 'En heb je het uitgelezen?', 'Und hast du es zu Ende gelesen?'],
    ['Bram', 'Ja! Maar nu ben ik zo moe.', 'Ja! Aber jetzt bin ich so müde.'],
    ['Lotte', 'Ik heb koffie gezet. Wil je een kopje?', 'Ich habe Kaffee gekocht. Möchtest du eine Tasse?'],
    Q('Was bietet Lotte an?', ['Kaffee', 'Tee', 'Frühstück'], 0),
  ]),
});

const u33 = unit({
  id: 'u33',
  title: 'Perfekt mit zijn',
  description: 'Bewegung und Veränderung: gegaan, gekomen, geworden',
  tips: [
    T(
      'Perfekt mit zijn',
      `
      Wie im Deutschen bilden Verben der Bewegung und der Veränderung das Perfekt mit **zijn**:

      *gaan → is gegaan, komen → is gekomen, blijven → is gebleven, worden → is geworden, zijn → is geweest, vertrekken → is vertrokken, vallen → is gevallen, sterven → is gestorven, gebeuren → is gebeurd*
      `,
      [
        ['Ik ben naar Amsterdam gegaan.', 'Ich bin nach Amsterdam gefahren.'],
        ['Wat is er gebeurd?', 'Was ist passiert?'],
      ],
    ),
    T(
      'Anders als im Deutschen',
      `
      Einige Verben nehmen **zijn**, wo das Deutsche „haben“ nimmt:

      - *De film is begonnen.* „Der Film hat angefangen.“
      - *Ik ben gestopt met roken.* „Ich habe mit dem Rauchen aufgehört.“
      - *Je bent veranderd.* „Du hast dich verändert.“
      `,
      [['De film is om acht uur begonnen.', 'Der Film hat um acht Uhr angefangen.']],
    ),
    T(
      'fietsen, lopen, rijden: hebben oder zijn?',
      `
      Mit einem Ziel nimmt man **zijn**: *Ik ben naar huis gefietst.*

      Geht es nur um die Tätigkeit, meistens **hebben**: *Ik heb een uur gefietst.*
      `,
      [['Ik ben naar huis gefietst.', 'Ich bin nach Hause geradelt.']],
    ),
  ],
  words: [
    V('vallen', 'fallen, hinfallen', 'val valt vallen | viel vielen | gevallen z'),
    V('sterven', 'sterben', 'sterf sterft sterven | stierf stierven | gestorven z'),
    V('stoppen', 'aufhören, anhalten', 'stop stopt stoppen | stopte stopten | gestopt hz'),
    V('veranderen', 'verändern, sich ändern', 'verander verandert veranderen | veranderde veranderden | veranderd hz'),
    V('springen', 'springen', 'spring springt springen | sprong sprongen | gesprongen hz'),
    A('geboren', 'geboren', '- - -'),
    W('onderweg', 'unterwegs', 'adv'),
    A('geweldig', 'großartig, toll', 'geweldige geweldiger geweldigst'),
  ],
  sentences: [
    S('Ik ben naar Amsterdam gegaan.', 'Ich bin nach Amsterdam gefahren.|Ich bin nach Amsterdam gegangen.'),
    S('Hij is gisteren gekomen.', 'Er ist gestern gekommen.'),
    S('We zijn thuis gebleven.', 'Wir sind zu Hause geblieben.'),
    S('Ze is ziek geworden.', 'Sie ist krank geworden.'),
    S('Ben je ooit in België geweest?', 'Warst du schon einmal in Belgien?|Bist du schon einmal in Belgien gewesen?'),
    S('Ik ben nog nooit in Nederland geweest.', 'Ich war noch nie in den Niederlanden.|Ich bin noch nie in den Niederlanden gewesen.'),
    S('De trein is al vertrokken.', 'Der Zug ist schon abgefahren.'),
    S('Wanneer zijn jullie aangekomen?', 'Wann seid ihr angekommen?'),
    S('Het kind is gevallen.', 'Das Kind ist hingefallen.|Das Kind ist gefallen.'),
    S('Mijn opa is vorig jaar gestorven.', 'Mein Opa ist letztes Jahr gestorben.'),
    S('Ik ben in Keulen geboren.', 'Ich bin in Köln geboren.'),
    S('Waar ben je geboren?', 'Wo bist du geboren?'),
    S('De film is om acht uur begonnen.', 'Der Film hat um acht Uhr angefangen.|Der Film hat um acht Uhr begonnen.'),
    S('Wat is er gebeurd?', 'Was ist passiert?|Was ist geschehen?'),
    S('Ik ben gestopt met roken.|Ik ben met roken gestopt.', 'Ich habe mit dem Rauchen aufgehört.'),
    S('Ik ben naar huis gefietst.', 'Ich bin nach Hause geradelt.|Ich bin mit dem Rad nach Hause gefahren.'),
    S('Ik heb een uur gefietst.', 'Ich bin eine Stunde Rad gefahren.'),
    S('We zijn naar Utrecht verhuisd.', 'Wir sind nach Utrecht gezogen.|Wir sind nach Utrecht umgezogen.'),
    S('Hij is om zeven uur opgestaan.', 'Er ist um sieben Uhr aufgestanden.'),
    S('Je bent veranderd.', 'Du hast dich verändert.'),
    S('Ze zijn naar de zee gereden.', 'Sie sind ans Meer gefahren.'),
    S('Ik ben in het water gesprongen.', 'Ich bin ins Wasser gesprungen.'),
    S('Hoe lang ben je gebleven?', 'Wie lange bist du geblieben?'),
    S('Ben je met de bus gekomen?', 'Bist du mit dem Bus gekommen?'),
    S('De tijd is snel gegaan.', 'Die Zeit ist schnell vergangen.'),
    S('Wij zijn de hele dag in de stad geweest.', 'Wir waren den ganzen Tag in der Stadt.|Wir sind den ganzen Tag in der Stadt gewesen.'),
    S('Het was een geweldige dag.', 'Es war ein großartiger Tag.|Es war ein toller Tag.'),
  ],
  cloze: [
    C('Ik {ben} naar Amsterdam gegaan.', 'ben|heb|word', 'Ich bin nach Amsterdam gefahren.'),
    C('We {zijn} thuis gebleven.', 'zijn|hebben|worden', 'Wir sind zu Hause geblieben.'),
    C('De film {is} om acht uur begonnen.', 'is|heeft|wordt', 'Der Film hat um acht Uhr angefangen.'),
    C('Ze {is} ziek geworden.', 'is|heeft|wordt', 'Sie ist krank geworden.'),
    C('Hij is gisteren {gekomen}.', 'gekomen|!gekomt|kwam', 'Er ist gestern gekommen.'),
    C('Wat is er {gebeurd}?', 'gebeurd|gebeurt|gebeuren', 'Was ist passiert?'),
    C('Ik ben in Keulen {geboren}.', 'geboren|gebeurd|!geborn', 'Ich bin in Köln geboren.'),
  ],
  story: story('st33', 'Op reis geweest', 'Auf Reisen gewesen', [
    ['Fleur', 'Hoi Daan! Waar ben je geweest? Ik heb je lang niet gezien.', 'Hi, Daan! Wo warst du? Ich habe dich lange nicht gesehen.'],
    ['Daan', 'Ik ben twee weken in België geweest.', 'Ich war zwei Wochen in Belgien.'],
    ['Fleur', 'Leuk! Ben je met de trein gegaan?', 'Toll! Bist du mit dem Zug gefahren?'],
    ['Daan', 'Nee, ik ben met de fiets gegaan!', 'Nein, ich bin mit dem Fahrrad gefahren!'],
    Q('Wie ist Daan nach Belgien gefahren?', ['Mit dem Fahrrad', 'Mit dem Zug', 'Mit dem Auto'], 0),
    ['Fleur', 'Met de fiets? Wauw! Wat is er onderweg gebeurd?', 'Mit dem Fahrrad? Wow! Was ist unterwegs passiert?'],
    ['Daan', 'Het heeft veel geregend en ik ben een keer gevallen. Maar het was geweldig!', 'Es hat viel geregnet und ich bin einmal hingefallen. Aber es war großartig!'],
    Q('Was ist Daan passiert?', ['Er ist einmal hingefallen', 'Er ist krank geworden', 'Er hat sich verfahren'], 0),
  ]),
});

const u34 = unit({
  id: 'u34',
  title: 'Früher: Imperfekt',
  description: 'Regelmäßiges Imperfekt, früher, damals, vor drei Jahren',
  tips: [
    T(
      'Das regelmäßige Imperfekt',
      `
      Stamm + **te / ten** oder **de / den**, nach derselben Regel wie beim Partizip (*'t kofschip*):

      | | werken | wonen |
      |---|---|---|
      | ik / jij / hij | werkte | woonde |
      | wij / jullie / zij | werkten | woonden |
      `,
      [
        ['Vroeger woonde ik in een dorp.', 'Früher wohnte ich in einem Dorf.'],
        ['Ik werkte toen in een winkel.', 'Ich arbeitete damals in einem Laden.'],
      ],
    ),
    T(
      'Wann Imperfekt, wann Perfekt?',
      `
      Das **Imperfekt** erzählt und beschreibt: Geschichten, Gewohnheiten, Zustände in der Vergangenheit. *Vroeger speelden we elke dag buiten.*

      Das **Perfekt** meldet ein abgeschlossenes Ereignis: *Ik heb gisteren gewerkt.*

      Im Deutschen übersetzt man beides oft mit dem Perfekt.
      `,
    ),
    T(
      'früher, damals, vor …',
      `
      - *vroeger* – früher
      - *toen* – damals
      - *drie jaar geleden* – vor drei Jahren
      - *lang geleden* – vor langer Zeit
      `,
      [['Drie jaar geleden verhuisden we naar Utrecht.', 'Vor drei Jahren zogen wir nach Utrecht.']],
    ),
  ],
  words: [
    W('toen', 'damals; als (Vergangenheit)', 'adv'),
    W('geleden', 'vor (zeitlich: drie jaar geleden)', 'adv'),
    P('lang geleden', 'vor langer Zeit'),
    N('de jeugd', 'die Kindheit, die Jugend', '-'),
    N('het dorp', 'das Dorf', 'dorpen', '🏘️'),
    N('de boerderij', 'der Bauernhof', 'boerderijen', '🚜'),
    N('de koning', 'der König', 'koningen', '👑'),
    N('de radio', 'das Radio', "radio's", '📻'),
    N('het verhaal', 'die Geschichte, die Erzählung', 'verhalen'),
    V('klinken', 'klingen', 'klink klinkt klinken | klonk klonken | geklonken h'),
  ],
  sentences: [
    S('Vroeger woonde ik in een dorp.', 'Früher wohnte ich in einem Dorf.|Früher habe ich in einem Dorf gewohnt.'),
    S('Ik werkte toen in een winkel.', 'Ich arbeitete damals in einem Laden.|Ich habe damals in einem Laden gearbeitet.'),
    S('We speelden elke dag buiten.', 'Wir spielten jeden Tag draußen.|Wir haben jeden Tag draußen gespielt.'),
    S('Mijn moeder kookte altijd lekker.', 'Meine Mutter kochte immer lecker.|Meine Mutter hat immer lecker gekocht.'),
    S('Hij woonde op een boerderij.', 'Er wohnte auf einem Bauernhof.|Er hat auf einem Bauernhof gewohnt.'),
    S('Het regende de hele dag.', 'Es regnete den ganzen Tag.|Es hat den ganzen Tag geregnet.'),
    S('We fietsten naar school.', 'Wir fuhren mit dem Rad zur Schule.|Wir sind mit dem Rad zur Schule gefahren.'),
    S('Ik leerde Engels op school.', 'Ich lernte Englisch in der Schule.|Ich habe in der Schule Englisch gelernt.'),
    S('Drie jaar geleden verhuisden we naar Utrecht.', 'Vor drei Jahren zogen wir nach Utrecht.|Vor drei Jahren sind wir nach Utrecht gezogen.'),
    S('Ze dansten de hele nacht.', 'Sie tanzten die ganze Nacht.|Sie haben die ganze Nacht getanzt.'),
    S('Wie belde gisteren?', 'Wer hat gestern angerufen?|Wer rief gestern an?'),
    S('Mijn opa rookte vroeger.', 'Mein Opa rauchte früher.|Mein Opa hat früher geraucht.'),
    S('Wij wachtten op de bus.', 'Wir warteten auf den Bus.|Wir haben auf den Bus gewartet.'),
    S('Het kind lachte.', 'Das Kind lachte.|Das Kind hat gelacht.'),
    S('Ik maakte elke dag mijn huiswerk.', 'Ich machte jeden Tag meine Hausaufgaben.|Ich habe jeden Tag meine Hausaufgaben gemacht.'),
    S('Wat studeerde je?', 'Was hast du studiert?|Was studiertest du?'),
    S('Ik studeerde in Leiden.', 'Ich studierte in Leiden.|Ich habe in Leiden studiert.'),
    S('Mijn ouders werkten hard.', 'Meine Eltern arbeiteten hart.|Meine Eltern haben hart gearbeitet.'),
    S('Lang geleden leefde hier een koning.', 'Vor langer Zeit lebte hier ein König.'),
    S('De winkel opende om negen uur.', 'Der Laden öffnete um neun Uhr.|Der Laden hat um neun Uhr geöffnet.'),
    S('We hoopten op mooi weer.', 'Wir hofften auf schönes Wetter.|Wir haben auf schönes Wetter gehofft.'),
    S('In mijn jeugd woonden we in een klein dorp.', 'In meiner Kindheit wohnten wir in einem kleinen Dorf.|In meiner Jugend wohnten wir in einem kleinen Dorf.'),
    S('Wie betaalde de rekening?', 'Wer bezahlte die Rechnung?|Wer hat die Rechnung bezahlt?'),
    S('Ik luisterde naar de radio.', 'Ich hörte Radio.|Ich habe Radio gehört.'),
    S('Het duurde lang.', 'Es dauerte lange.|Es hat lange gedauert.'),
    S('Mijn vader parkeerde de auto voor het huis.', 'Mein Vater parkte das Auto vor dem Haus.|Mein Vater hat das Auto vor dem Haus geparkt.'),
    S('Dat klinkt goed.', 'Das klingt gut.'),
  ],
  cloze: [
    C('Vroeger {woonde} ik in een dorp.', 'woonde|!woonte|woonden', 'Früher wohnte ich in einem Dorf.'),
    C('Ik {werkte} toen in een winkel.', 'werkte|!werkde|werkten', 'Ich arbeitete damals in einem Laden.'),
    C('We {speelden} elke dag buiten.', 'speelde|speelden|!speelten', 'Wir spielten jeden Tag draußen.'),
    C('Het {regende} de hele dag.', 'regende|!regente|regenden', 'Es regnete den ganzen Tag.'),
    C('We {fietsten} naar school.', 'fietsten|!fietsden|fietste', 'Wir fuhren mit dem Rad zur Schule.'),
    C('Drie jaar {geleden} verhuisden we.', 'geleden|vroeger|toen', 'Vor drei Jahren zogen wir um.'),
  ],
  story: story('st34', 'Vroeger', 'Früher', [
    ['Oma', 'Toen ik jong was, woonden we op een boerderij.', 'Als ich jung war, wohnten wir auf einem Bauernhof.'],
    ['Mila', 'Had je dieren?', 'Hattest du Tiere?'],
    ['Oma', 'Ja, koeien, paarden en een hond. Ik speelde elke dag buiten.', 'Ja, Kühe, Pferde und einen Hund. Ich spielte jeden Tag draußen.'],
    Q('Wo wohnte Oma früher?', ['Auf einem Bauernhof', 'In Amsterdam', 'In einem Hotel'], 0),
    ['Mila', 'Had je ook een televisie?', 'Hattest du auch einen Fernseher?'],
    ['Oma', 'Nee! We luisterden naar de radio en mijn moeder vertelde verhalen.', 'Nein! Wir hörten Radio und meine Mutter erzählte Geschichten.'],
    Q('Was hat Omas Mutter gemacht?', ['Geschichten erzählt', 'Fernsehen geschaut', 'Klavier gespielt'], 0),
    ['Mila', 'Dat klinkt gezellig!', 'Das klingt gemütlich!'],
  ]),
});

const u35 = unit({
  id: 'u35',
  title: 'Es war einmal',
  description: 'Unregelmäßiges Imperfekt: was, had, ging, kwam, zag …',
  tips: [
    T(
      'Unregelmäßiges Imperfekt',
      `
      | Infinitiv | Singular | Plural |
      |---|---|---|
      | zijn | was | waren |
      | hebben | had | hadden |
      | gaan | ging | gingen |
      | komen | kwam | kwamen |
      | zien | zag | zagen |
      | eten | at | aten |
      | drinken | dronk | dronken |
      | doen | deed | deden |
      | kunnen | kon | konden |
      | willen | wilde / wou | wilden / wouden |
      | moeten | moest | moesten |
      | zeggen | zei | zeiden |
      | nemen | nam | namen |
      | geven | gaf | gaven |
      | vinden | vond | vonden |
      | weten | wist | wisten |
      `,
      [
        ['Gisteren was ik moe.', 'Gestern war ich müde.'],
        ['Ik kon niet slapen.', 'Ich konnte nicht schlafen.'],
      ],
    ),
    T(
      'Vertraut für Deutschsprachige',
      `
      Viele Formen ähneln dem Deutschen: *ging* (ging), *kwam* (kam), *zag* (sah), *at* (aß), *dronk* (trank), *gaf* (gab), *las* (las).

      Märchen beginnen mit *Er was eens …* „Es war einmal …“
      `,
      [['Er was eens een koning.', 'Es war einmal ein König.']],
    ),
  ],
  words: [
    P('er was eens', 'es war einmal'),
    N('het sprookje', 'das Märchen', 'sprookjes'),
    N('de prinses', 'die Prinzessin', 'prinsessen', '👸'),
    N('het kasteel', 'das Schloss, die Burg', 'kastelen', '🏰'),
    N('het bos', 'der Wald', 'bossen', '🌲'),
    N('de wolf', 'der Wolf', 'wolven', '🐺'),
    N('het feest', 'das Fest, die Party', 'feesten', '🎉'),
    N('de pannenkoek', 'der Pfannkuchen', 'pannenkoeken', '🥞'),
    A('bang', 'ängstlich (bang zijn = Angst haben)', 'bange banger bangst'),
    A('donker', 'dunkel', 'donkere donkerder donkerst'),
  ],
  sentences: [
    S('Gisteren was ik moe.', 'Gestern war ich müde.'),
    S('We waren in Amsterdam.', 'Wir waren in Amsterdam.'),
    S('Ik had geen tijd.', 'Ich hatte keine Zeit.'),
    S('Hij ging naar huis.', 'Er ging nach Hause.'),
    S('Ze kwamen te laat.', 'Sie kamen zu spät.'),
    S('Ik zag een vogel in de tuin.', 'Ich sah einen Vogel im Garten.'),
    S('We aten pannenkoeken.', 'Wir aßen Pfannkuchen.'),
    S('Hij dronk een glas water.', 'Er trank ein Glas Wasser.'),
    S('Wat deed je toen?', 'Was hast du dann gemacht?|Was machtest du damals?'),
    S('Ik kon niet slapen.', 'Ich konnte nicht schlafen.'),
    S('Ze wilde naar huis.', 'Sie wollte nach Hause.'),
    S('We moesten lang wachten.', 'Wir mussten lange warten.'),
    S('Hij zei niets.', 'Er sagte nichts.'),
    S('Ik nam de bus.', 'Ich nahm den Bus.'),
    S('Ze gaf me een boek.', 'Sie gab mir ein Buch.'),
    S('Hij las de krant.', 'Er las die Zeitung.'),
    S('Ze schreef een lange brief.', 'Sie schrieb einen langen Brief.'),
    S('Er was eens een koning.', 'Es war einmal ein König.'),
    S('De prinses woonde in een groot kasteel.', 'Die Prinzessin wohnte in einem großen Schloss.'),
    S('De wolf liep door het bos.', 'Der Wolf lief durch den Wald.'),
    S('Ik wist het niet.', 'Ich wusste es nicht.|Ich wusste das nicht.'),
    S('Ze bleven drie dagen.', 'Sie blieben drei Tage.'),
    S('Het werd koud.', 'Es wurde kalt.'),
    S('We kochten een nieuwe bank.', 'Wir kauften ein neues Sofa.'),
    S('Het kind was bang in het donker.', 'Das Kind hatte Angst im Dunkeln.') ,
    S('Het feest was erg gezellig.', 'Das Fest war sehr gemütlich.|Die Party war sehr schön.'),
    S('Mijn oma vertelde vaak sprookjes.', 'Meine Oma erzählte oft Märchen.'),
  ],
  cloze: [
    C('Gisteren {was} ik moe.', 'was|waren|ben', 'Gestern war ich müde.'),
    C('We {waren} in Amsterdam.', 'was|waren|zijn', 'Wir waren in Amsterdam.'),
    C('Ik {had} geen tijd.', 'had|hadden|heb', 'Ich hatte keine Zeit.'),
    C('Hij {ging} naar huis.', 'ging|gingen', 'Er ging nach Hause.'),
    C('Ik {kon} niet slapen.', 'kon|konden|kan', 'Ich konnte nicht schlafen.'),
    C('Ze {kwamen} te laat.', 'kwam|kwamen|!kwamden', 'Sie kamen zu spät.'),
    C('Hij {zei} niets.', 'zei|zeiden', 'Er sagte nichts.'),
  ],
  story: story('st35', 'Er was eens', 'Es war einmal', [
    ['Verteller', 'Er was eens een prinses. Ze woonde in een groot kasteel.', 'Es war einmal eine Prinzessin. Sie wohnte in einem großen Schloss.'],
    ['Verteller', 'Op een dag ging ze alleen naar het bos.', 'Eines Tages ging sie allein in den Wald.'],
    ['Verteller', 'In het bos zag ze een wolf. Ze was heel bang.', 'Im Wald sah sie einen Wolf. Sie hatte große Angst.'],
    Q('Was sah die Prinzessin im Wald?', ['Einen Wolf', 'Einen König', 'Ein Pferd'], 0),
    ['Verteller', 'Maar de wolf zei: "Wees niet bang. Ik ben je vriend."', 'Aber der Wolf sagte: „Hab keine Angst. Ich bin dein Freund.“'],
    ['Verteller', 'De wolf bracht haar terug naar het kasteel.', 'Der Wolf brachte sie zurück zum Schloss.'],
    Q('Was machte der Wolf?', ['Er brachte sie zurück zum Schloss', 'Er fraß sie', 'Er lief weg'], 0),
    ['Verteller', 'En de koning gaf voor de wolf een groot feest.', 'Und der König gab für den Wolf ein großes Fest.'],
  ]),
});

const u36 = unit({
  id: 'u36',
  title: 'Reisen und Urlaub',
  description: 'Urlaub planen, Hotel, Strand, Camping',
  tips: [
    T(
      'Urlaub',
      `
      - *op vakantie gaan* – in Urlaub fahren
      - *op vakantie zijn* – im Urlaub sein
      - **de vakantie** heißt „der Urlaub“ und „die Ferien“.
      `,
      [['In de zomer gaan we op vakantie.', 'Im Sommer fahren wir in Urlaub.']],
    ),
    T(
      'genieten van',
      `
      „Genießen“ heißt **genieten van**: *Ik geniet van de zon.* „Ich genieße die Sonne.“

      Zum Abschied wünscht man: *Geniet ervan!* „Genieß es!“ oder *Fijne vakantie!* „Schönen Urlaub!“
      `,
      [['Ik geniet van de zon.', 'Ich genieße die Sonne.']],
    ),
    T(
      'Im Hotel',
      `
      - *Heeft u nog een kamer vrij?* „Haben Sie noch ein Zimmer frei?“
      - *Voor hoeveel nachten?* „Für wie viele Nächte?“
      - *Ik heb een kamer geboekt.* „Ich habe ein Zimmer gebucht.“
      `,
    ),
  ],
  words: [
    N('de vakantie', 'der Urlaub, die Ferien', 'vakanties', '🏖️'),
    N('het strand', 'der Strand', 'stranden', '🏝️'),
    N('de koffer', 'der Koffer', 'koffers', '🧳'),
    N('het paspoort', 'der Reisepass', 'paspoorten', '🛂'),
    N('de camping', 'der Campingplatz', 'campings', '🏕️'),
    N('de tent', 'das Zelt', 'tenten', '⛺'),
    N('de toerist', 'der Tourist', 'toeristen'),
    N('het buitenland', 'das Ausland', '-'),
    N('de grens', 'die Grenze', 'grenzen'),
    N('de kaart', 'die Karte, der Stadtplan', 'kaarten', '🗺️'),
    N('het zwembad', 'das Schwimmbad', 'zwembaden', '🏊'),
    N('het uitzicht', 'die Aussicht', 'uitzichten'),
    N('de haring', 'der Hering', 'haringen'),
    V('boeken', 'buchen', 'boek boekt boeken | boekte boekten | geboekt h'),
    V('inpakken', 'packen, einpacken', 'pak pakt pakken | pakte pakten | ingepakt h', { sep: 'in' }),
    V('uitpakken', 'auspacken', 'pak pakt pakken | pakte pakten | uitgepakt h', { sep: 'uit' }),
    V('kamperen', 'zelten, campen', 'kampeer kampeert kamperen | kampeerde kampeerden | gekampeerd h'),
    V('genieten', 'genießen', 'geniet geniet genieten | genoot genoten | genoten h'),
    V('opzetten', 'aufbauen, aufstellen', 'zet zet zetten | zette zetten | opgezet h', { sep: 'op' }),
    A('prachtig', 'wunderschön', 'prachtige prachtiger prachtigst'),
    A('koel', 'kühl', 'koele koeler koelst'),
    A('fijn', 'schön, angenehm; fein', 'fijne fijner fijnst'),
    W('vlakbij', 'ganz in der Nähe', 'adv'),
    W('oeps', 'ups', 'interj'),
    W('Zeeland', 'Zeeland (Provinz)', 'name', { core: false }),
  ],
  sentences: [
    S('In de zomer gaan we op vakantie.', 'Im Sommer fahren wir in Urlaub.|Im Sommer fahren wir in den Urlaub.'),
    S('Waar ga je op vakantie?|Waar ga je naartoe op vakantie?', 'Wohin fährst du in den Urlaub?|Wo machst du Urlaub?'),
    S('We gaan naar Spanje.', 'Wir fahren nach Spanien.|Wir fliegen nach Spanien.'),
    S('Ik heb een hotel geboekt.', 'Ich habe ein Hotel gebucht.'),
    S('Heb je je koffer al ingepakt?', 'Hast du deinen Koffer schon gepackt?'),
    S('Vergeet je paspoort niet!', 'Vergiss deinen Reisepass nicht!|Vergiss deinen Pass nicht!'),
    S('We liggen de hele dag op het strand.', 'Wir liegen den ganzen Tag am Strand.'),
    S('Het water is lekker warm.', 'Das Wasser ist schön warm.'),
    S('Vorig jaar hebben we gekampeerd.', 'Letztes Jahr haben wir gezeltet.|Letztes Jahr waren wir campen.'),
    S('De tent staat op de camping.', 'Das Zelt steht auf dem Campingplatz.'),
    S('Ik geniet van de zon.', 'Ich genieße die Sonne.'),
    S('Het uitzicht is prachtig.', 'Die Aussicht ist wunderschön.'),
    S('In de bergen is het koeler.', 'In den Bergen ist es kühler.'),
    S("Ik heb veel foto's gemaakt.", 'Ich habe viele Fotos gemacht.'),
    S('Er zijn veel toeristen in Amsterdam.', 'Es gibt viele Touristen in Amsterdam.|In Amsterdam sind viele Touristen.'),
    S('Heeft u nog een kamer vrij?', 'Haben Sie noch ein Zimmer frei?'),
    S('Voor hoeveel nachten?', 'Für wie viele Nächte?'),
    S('Het hotel heeft een zwembad.', 'Das Hotel hat ein Schwimmbad.'),
    S('Ga je graag naar het buitenland?', 'Fährst du gern ins Ausland?|Reist du gern ins Ausland?'),
    S('De grens is niet ver.', 'Die Grenze ist nicht weit.'),
    S('Heb je een kaart van de stad?', 'Hast du einen Stadtplan?|Hast du eine Karte von der Stadt?'),
    S('Na de vakantie pak ik mijn koffer uit.', 'Nach dem Urlaub packe ich meinen Koffer aus.'),
    S('Hoe was je vakantie?', 'Wie war dein Urlaub?'),
    S('Het was geweldig!', 'Es war großartig!|Es war toll!'),
    S('We blijven een week in Zeeland.', 'Wir bleiben eine Woche in Zeeland.'),
    S('Fijne vakantie!', 'Schönen Urlaub!|Schöne Ferien!'),
  ],
  cloze: [
    C('In de zomer gaan we {op} vakantie.', 'op|in|met', 'Im Sommer fahren wir in Urlaub.'),
    C('Ik heb een hotel {geboekt}.', 'geboekt|!geboekd|boekte', 'Ich habe ein Hotel gebucht.'),
    C('Ik geniet {van} de zon.', 'van|met|aan', 'Ich genieße die Sonne.'),
    C('We liggen op het {strand}.', 'strand|zee|water', 'Wir liegen am Strand.'),
    C('Heeft u nog een kamer {vrij}?', 'vrij|vrije', 'Haben Sie noch ein Zimmer frei?'),
    C('Heb je je koffer al {ingepakt}?', 'ingepakt|!geinpakt|inpakt', 'Hast du deinen Koffer schon gepackt?'),
  ],
  story: story('st36', 'Op de camping', 'Auf dem Campingplatz', [
    ['Lisa', 'Wat een mooie camping! En het strand is vlakbij.', 'Was für ein schöner Campingplatz! Und der Strand ist ganz in der Nähe.'],
    ['Tom', 'Ja, maar eerst moeten we de tent opzetten.', 'Ja, aber zuerst müssen wir das Zelt aufbauen.'],
    ['Lisa', 'Waar zijn de haringen?', 'Wo sind die Heringe?'],
    ['Tom', 'Oeps… die liggen nog thuis.', 'Ups … die liegen noch zu Hause.'],
    Q('Was haben sie vergessen?', ['Die Heringe', 'Das Zelt', 'Die Koffer'], 0),
    ['Lisa', 'Tom! Dan gaan we vandaag naar de winkel en morgen naar het strand.', 'Tom! Dann gehen wir heute in den Laden und morgen an den Strand.'],
    ['Tom', 'Of we slapen in de auto en genieten van de zon!', 'Oder wir schlafen im Auto und genießen die Sonne!'],
    Q('Wo will Tom notfalls schlafen?', ['Im Auto', 'Am Strand', 'Im Hotel'], 0),
  ]),
});

const u37 = unit({
  id: 'u37',
  title: 'Gefühle',
  description: 'froh, traurig, böse, Angst haben, verliebt sein',
  tips: [
    T(
      'Gefühle mit Präposition',
      `
      | | |
      |---|---|
      | boos op | böse auf |
      | bang voor | Angst vor |
      | trots op | stolz auf |
      | jaloers op | eifersüchtig auf |
      | verliefd op | verliebt **in** |
      | zenuwachtig voor | nervös wegen |

      Achtung: *verliefd* **op** – „verliebt *in*“.
      `,
      [
        ['Ik ben bang voor honden.', 'Ich habe Angst vor Hunden.'],
        ['Op wie ben je verliefd?', 'In wen bist du verliebt?'],
      ],
    ),
    T(
      'Es tut mir leid',
      `
      - *Het spijt me.* „Es tut mir leid.“
      - *Wat jammer!* „Wie schade!“
      - *Veel geluk!* „Viel Glück!“
      `,
    ),
    T(
      'zin hebben in',
      `
      **zin hebben in** heißt „Lust haben auf“: *Ik heb zin in een ijsje.*

      *Ik heb geen zin.* „Ich habe keine Lust.“
      `,
      [['Ik heb zin in een ijsje.', 'Ich habe Lust auf ein Eis.']],
    ),
  ],
  words: [
    A('verdrietig', 'traurig', 'verdrietige verdrietiger verdrietigst'),
    A('boos', 'böse, wütend', 'boze bozer boost'),
    A('zenuwachtig', 'nervös', 'zenuwachtige zenuwachtiger zenuwachtigst'),
    A('verliefd', 'verliebt', 'verliefde - -'),
    A('trots', 'stolz', 'trotse trotser trotst'),
    A('verbaasd', 'überrascht, erstaunt', 'verbaasde - -'),
    A('jaloers', 'eifersüchtig', 'jaloerse - -'),
    A('eenzaam', 'einsam', 'eenzame eenzamer eenzaamst'),
    A('tevreden', 'zufrieden', '- - -'),
    A('gestrest', 'gestresst', 'gestreste - -'),
    A('jammer', 'schade', '- - -'),
    N('het gevoel', 'das Gefühl', 'gevoelens'),
    N('de angst', 'die Angst', 'angsten'),
    N('de liefde', 'die Liebe', '-', '❤️'),
    N('het geluk', 'das Glück', '-', '🍀'),
    V('huilen', 'weinen', 'huil huilt huilen | huilde huilden | gehuild h'),
    V('schrikken', 'erschrecken', 'schrik schrikt schrikken | schrok schrokken | geschrokken z'),
    V('balen', 'genervt sein', 'baal baalt balen | baalde baalden | gebaald h'),
    V('terugkomen', 'zurückkommen', 'kom komt komen | kwam kwamen | teruggekomen z', { sep: 'terug' }),
    P('het spijt me', 'es tut mir leid'),
    N('de zin', 'der Satz; die Lust (zin hebben in)', 'zinnen'),
    W('weg', 'weg', 'adv', { id: 'weg-adv' }),
  ],
  sentences: [
    S('Waarom ben je verdrietig?', 'Warum bist du traurig?'),
    S('Hij is boos op mij.', 'Er ist böse auf mich.|Er ist wütend auf mich.'),
    S('Ik ben bang voor honden.', 'Ich habe Angst vor Hunden.'),
    S('Ze is zenuwachtig voor het examen.', 'Sie ist nervös wegen der Prüfung.|Sie ist vor der Prüfung nervös.'),
    S('Ik ben verliefd!', 'Ich bin verliebt!'),
    S('Op wie ben je verliefd?', 'In wen bist du verliebt?'),
    S('We zijn trots op onze dochter.', 'Wir sind stolz auf unsere Tochter.'),
    S('Ik ben verbaasd.', 'Ich bin überrascht.|Ich bin erstaunt.'),
    S('Het spijt me.', 'Es tut mir leid.'),
    S('Wat jammer!', 'Wie schade!|Schade!'),
    S('Het kind huilt.', 'Das Kind weint.'),
    S('Ik heb zin in een ijsje.', 'Ich habe Lust auf ein Eis.'),
    S('Ik heb geen zin.', 'Ich habe keine Lust.'),
    S('Ik ben gelukkig.', 'Ich bin glücklich.'),
    S('Mijn oma is soms eenzaam.', 'Meine Oma ist manchmal einsam.'),
    S('Ben je tevreden?', 'Bist du zufrieden?'),
    S('Ik ben erg gestrest.', 'Ich bin sehr gestresst.'),
    S('Ik ben geschrokken.', 'Ich habe mich erschrocken.|Ich bin erschrocken.'),
    S('Liefde is belangrijk.', 'Liebe ist wichtig.'),
    S('Veel geluk!', 'Viel Glück!'),
    S('Ze is jaloers op haar zus.', 'Sie ist eifersüchtig auf ihre Schwester.|Sie ist neidisch auf ihre Schwester.'),
    S('Ik baal ervan.', 'Das nervt mich.|Ich ärgere mich darüber.'),
    S('Wees niet bang.', 'Hab keine Angst.|Keine Angst.'),
    S('Ik heb een goed gevoel.', 'Ich habe ein gutes Gefühl.'),
    S('Ik ben niet boos, maar ik ben verdrietig.', 'Ich bin nicht böse, aber ich bin traurig.'),
    S('Hij heeft angst voor de toekomst.', 'Er hat Angst vor der Zukunft.'),
    S('Mijn kat is weg.', 'Meine Katze ist weg.'),
  ],
  cloze: [
    C('Ik ben bang {voor} honden.', 'voor|aan|met', 'Ich habe Angst vor Hunden.'),
    C('Op wie ben je {verliefd}?', 'verliefd|!verlieft|verliefde', 'In wen bist du verliebt?'),
    C('We zijn trots {op} onze dochter.', 'op|aan|van', 'Wir sind stolz auf unsere Tochter.'),
    C('Het {spijt} me.', 'spijt|!spijd|!spijtt', 'Es tut mir leid.'),
    C('Ik heb {zin} in een ijsje.', 'zin|honger|tijd', 'Ich habe Lust auf ein Eis.'),
    C('Hij is boos {op} mij.', 'op|aan|met', 'Er ist böse auf mich.'),
  ],
  story: story('st37', 'Waar is de kat?', 'Wo ist die Katze?', [
    ['Emma', 'Hoi Lisa, waarom ben je zo verdrietig?', 'Hi, Lisa, warum bist du so traurig?'],
    ['Lisa', 'Mijn kat is weg. Ik zoek hem al de hele dag.', 'Meine Katze ist weg. Ich suche sie schon den ganzen Tag.'],
    ['Emma', 'Wat jammer! Zal ik je helpen?', 'Wie schade! Soll ich dir helfen?'],
    Q('Warum ist Lisa traurig?', ['Ihre Katze ist weg', 'Sie ist krank', 'Sie hat keine Zeit'], 0),
    ['Lisa', 'Ja, graag. Ik ben bang dat hij niet terugkomt.', 'Ja, gern. Ich habe Angst, dass sie nicht zurückkommt.'],
    ['Emma', 'Kijk! Daar zit hij, in de boom!', 'Schau! Da sitzt sie, im Baum!'],
    ['Lisa', 'Wat ben ik blij! Dank je wel, Emma!', 'Wie froh ich bin! Vielen Dank, Emma!'],
    Q('Wo war die Katze?', ['Im Baum', 'Im Haus', 'Im Auto'], 0),
  ]),
});

const u38 = unit({
  id: 'u38',
  title: 'Sich fühlen, sich waschen',
  description: 'Reflexive Verben und Reflexivpronomen',
  tips: [
    T(
      'Reflexivpronomen',
      `
      | | |
      |---|---|
      | ik | me |
      | jij / je | je |
      | u | u / zich |
      | hij / zij / het | zich |
      | wij / we | ons |
      | jullie | je |
      | zij / ze | zich |

      *Ik voel me goed. Hoe voel je je? Hij wast zich. We moeten ons haasten.*
      `,
      [
        ['Hoe voel je je?', 'Wie fühlst du dich?'],
        ['We moeten ons haasten!', 'Wir müssen uns beeilen!'],
      ],
    ),
    T(
      'Anders als im Deutschen',
      `
      - **zich herinneren** braucht keine Präposition: *Ik herinner me haar naam niet.* „Ich erinnere mich nicht an ihren Namen.“
      - **zich ergeren aan** – sich ärgern *über*
      - **zich vergissen** – sich irren
      - **zich haasten** – sich beeilen
      `,
      [['Ik herinner me haar naam niet.', 'Ich erinnere mich nicht an ihren Namen.']],
    ),
  ],
  words: [
    W('zich', 'sich', 'pron'),
    V('zich voelen', 'sich fühlen', 'voel voelt voelen | voelde voelden | gevoeld h'),
    V('zich wassen', 'sich waschen', 'was wast wassen | waste wasten | gewassen h'),
    V('zich aankleden', 'sich anziehen', 'kleed kleedt kleden | kleedde kleedden | aangekleed h', { sep: 'aan' }),
    V('zich omkleden', 'sich umziehen', 'kleed kleedt kleden | kleedde kleedden | omgekleed h', { sep: 'om' }),
    V('zich vervelen', 'sich langweilen', 'verveel verveelt vervelen | verveelde verveelden | verveeld h'),
    V('zich herinneren', 'sich erinnern', 'herinner herinnert herinneren | herinnerde herinnerden | herinnerd h'),
    V('zich haasten', 'sich beeilen', 'haast haast haasten | haastte haastten | gehaast h'),
    V('zich vergissen', 'sich irren', 'vergis vergist vergissen | vergiste vergisten | vergist h'),
    V('zich voorstellen', 'sich vorstellen', 'stel stelt stellen | stelde stelden | voorgesteld h', { sep: 'voor' }),
    V('zich ergeren', 'sich ärgern', 'erger ergert ergeren | ergerde ergerden | geërgerd h'),
    V('zich concentreren', 'sich konzentrieren', 'concentreer concentreert concentreren | concentreerde concentreerden | geconcentreerd h'),
    V('zich schamen', 'sich schämen', 'schaam schaamt schamen | schaamde schaamden | geschaamd h'),
    V('zich bewegen', 'sich bewegen', 'beweeg beweegt bewegen | bewoog bewogen | bewogen h'),
    V('zich interesseren', 'sich interessieren', 'interesseer interesseert interesseren | interesseerde interesseerden | geïnteresseerd h'),
    N('het lawaai', 'der Lärm', '-'),
    N('de toets', 'der Test, die Klassenarbeit', 'toetsen'),
  ],
  sentences: [
    S('Hoe voel je je?', 'Wie fühlst du dich?'),
    S('Ik voel me goed.', 'Ich fühle mich gut.'),
    S('Ik voel me niet lekker.', 'Ich fühle mich nicht wohl.|Mir geht es nicht gut.'),
    S('Hij wast zich elke ochtend.', 'Er wäscht sich jeden Morgen.'),
    S('Ik kleed me aan.', 'Ich ziehe mich an.'),
    S('De kinderen vervelen zich.', 'Die Kinder langweilen sich.'),
    S('Verveel je je?', 'Langweilst du dich?'),
    S('Herinner je je dat nog?', 'Erinnerst du dich noch daran?|Weißt du das noch?'),
    S('Ik herinner me haar naam niet.', 'Ich erinnere mich nicht an ihren Namen.'),
    S('We moeten ons haasten!', 'Wir müssen uns beeilen!'),
    S('Haast je!', 'Beeil dich!'),
    S('Sorry, ik vergis me.', 'Entschuldigung, ich irre mich.'),
    S('Mag ik me even voorstellen?', 'Darf ich mich kurz vorstellen?'),
    S('Ik stel me voor: ik ben Daan.', 'Ich stelle mich vor: Ich bin Daan.'),
    S('Hij ergert zich aan het lawaai.', 'Er ärgert sich über den Lärm.'),
    S('Ik kan me niet concentreren.', 'Ich kann mich nicht konzentrieren.'),
    S('Je hoeft je niet te schamen.', 'Du musst dich nicht schämen.|Du brauchst dich nicht zu schämen.'),
    S('Ze kleedt zich om.', 'Sie zieht sich um.'),
    S('Interesseer je je voor muziek?', 'Interessierst du dich für Musik?'),
    S('Wij voelen ons thuis in Nederland.', 'Wir fühlen uns in den Niederlanden zu Hause.'),
    S('Voelt u zich beter?', 'Fühlen Sie sich besser?'),
    S('Jullie moeten je haasten.', 'Ihr müsst euch beeilen.'),
    S('Ze vergissen zich.', 'Sie irren sich.'),
    S('Ik heb me verveeld.', 'Ich habe mich gelangweilt.'),
    S('Beweeg je meer!', 'Beweg dich mehr!'),
    S('Hij herinnert zich alles.', 'Er erinnert sich an alles.'),
    S('Morgen heb ik een toets.', 'Morgen habe ich einen Test.|Morgen schreibe ich einen Test.'),
  ],
  cloze: [
    C('Hoe voel je {je}?', 'je|jij|jouw', 'Wie fühlst du dich?'),
    C('Ik kleed {me} aan.', 'me|ik|mijn', 'Ich ziehe mich an.'),
    C('Hij wast {zich} elke ochtend.', 'zich|hij|zijn', 'Er wäscht sich jeden Morgen.'),
    C('We moeten {ons} haasten!', 'ons|onze|wij', 'Wir müssen uns beeilen!'),
    C('De kinderen vervelen {zich}.', 'zich|zij|hun', 'Die Kinder langweilen sich.'),
    C('Haast {je}!', 'je|jij|jouw', 'Beeil dich!'),
  ],
  story: story('st38', 'Te laat!', 'Zu spät!', [
    ['Mama', 'Sem, haast je! Het is al half acht.', 'Sem, beeil dich! Es ist schon halb acht.'],
    ['Sem', 'Ik voel me niet lekker, mama.', 'Ich fühle mich nicht wohl, Mama.'],
    ['Mama', 'Echt? Of verveel je je op school?', 'Wirklich? Oder langweilst du dich in der Schule?'],
    Q('Was sagt Sem?', ['Er fühlt sich nicht wohl', 'Er hat keine Zeit', 'Er hat Hunger'], 0),
    ['Sem', 'Nou… vandaag hebben we een toets.', 'Na ja … heute schreiben wir einen Test.'],
    ['Mama', 'Ah, nu herinner ik het me! Je bent zenuwachtig.', 'Ah, jetzt erinnere ich mich! Du bist nervös.'],
    ['Mama', 'Kleed je snel aan. Je kunt het!', 'Zieh dich schnell an. Du schaffst das!'],
    Q('Warum ist Sem nervös?', ['Er schreibt heute einen Test', 'Er ist krank', 'Er hat verschlafen'], 0),
  ]),
});

const u39 = unit({
  id: 'u39',
  title: 'Weil, dass, wenn',
  description: 'Nebensätze: omdat, dat, of, als, toen, terwijl …',
  tips: [
    T(
      'Das Verb am Ende',
      `
      Wie im Deutschen steht im Nebensatz das Verb am Ende:

      - *Ik blijf thuis, omdat ik ziek ben.*
      - *Hij zegt dat hij moe is.*

      Beginnt der Satz mit dem Nebensatz, folgt im Hauptsatz sofort das Verb: *Als het mooi weer is, gaan we naar het strand.*
      `,
      [
        ['Ik blijf thuis, omdat ik ziek ben.', 'Ich bleibe zu Hause, weil ich krank bin.'],
        ['Hij zegt dat hij moe is.', 'Er sagt, dass er müde ist.'],
      ],
    ),
    T(
      'Die wichtigsten Konjunktionen',
      `
      | | |
      |---|---|
      | omdat | weil |
      | dat | dass |
      | of | ob |
      | als | wenn, falls |
      | wanneer | wenn (zeitlich) |
      | toen | als (einmal, Vergangenheit) |
      | terwijl | während |
      | voordat | bevor |
      | nadat | nachdem |
      | totdat, tot | bis |
      | hoewel | obwohl |
      | sinds | seit |
      `,
    ),
    T(
      'als, wanneer oder toen?',
      `
      - **toen**: ein einzelnes Ereignis oder ein Zeitraum in der Vergangenheit: *Toen ik klein was, …*
      - **als / wanneer**: Gegenwart, Zukunft und Wiederholungen: *Als ik tijd heb, lees ik.*

      Mehrere Verben am Ende dürfen die Reihenfolge tauschen: *omdat ik in Utrecht wil wonen* oder *omdat ik in Utrecht wonen wil*.
      `,
      [['Toen ik klein was, woonde ik in Duitsland.', 'Als ich klein war, wohnte ich in Deutschland.']],
    ),
  ],
  words: [
    W('omdat', 'weil', 'conj'),
    W('dat', 'dass', 'conj', { id: 'dat-conj' }),
    W('of', 'ob', 'conj', { id: 'of-ob' }),
    W('als', 'wenn, falls', 'conj', { id: 'als-als' }),
    W('wanneer', 'wenn (zeitlich)', 'conj', { id: 'wanneer-conj' }),
    W('terwijl', 'während', 'conj'),
    W('voordat', 'bevor', 'conj'),
    W('nadat', 'nachdem', 'conj'),
    W('totdat', 'bis', 'conj'),
    W('hoewel', 'obwohl', 'conj'),
    W('sinds', 'seit', 'conj'),
    W('gelijk', 'gleich; recht (gelijk hebben)', 'adj'),
    A('volgend', 'nächst, folgend', 'volgende - -'),
  ],
  sentences: [
    S('Ik blijf thuis, omdat ik ziek ben.', 'Ich bleibe zu Hause, weil ich krank bin.'),
    S('Ik denk dat het gaat regenen.|Ik denk dat het regenen gaat.', 'Ich glaube, dass es regnen wird.|Ich denke, dass es regnen wird.'),
    S('Weet je of hij komt?', 'Weißt du, ob er kommt?'),
    S('Als het mooi weer is, gaan we naar het strand.', 'Wenn das Wetter schön ist, gehen wir an den Strand.|Wenn schönes Wetter ist, gehen wir an den Strand.'),
    S('Toen ik klein was, woonde ik in Duitsland.', 'Als ich klein war, wohnte ich in Deutschland.'),
    S('Ik lees een boek, terwijl ik op de trein wacht.', 'Ich lese ein Buch, während ich auf den Zug warte.'),
    S('Hij belt me, voordat hij komt.', 'Er ruft mich an, bevor er kommt.'),
    S('Nadat we gegeten hebben, wassen we af.|Nadat we hebben gegeten, wassen we af.', 'Nachdem wir gegessen haben, spülen wir ab.'),
    S('Ik weet niet waar hij woont.', 'Ich weiß nicht, wo er wohnt.'),
    S('Kun je me zeggen hoe laat het is?', 'Kannst du mir sagen, wie spät es ist?'),
    S(
      'Ik leer Nederlands, omdat ik in Utrecht wil wonen.|Ik leer Nederlands, omdat ik in Utrecht wonen wil.',
      'Ich lerne Niederländisch, weil ich in Utrecht wohnen will.|Ich lerne Niederländisch, weil ich in Utrecht wohnen möchte.',
    ),
    S('Hoewel het regent, gaan we wandelen.', 'Obwohl es regnet, gehen wir spazieren.'),
    S('Ik wacht tot je komt.|Ik wacht totdat je komt.', 'Ich warte, bis du kommst.'),
    S('Hij zegt dat hij moe is.', 'Er sagt, dass er müde ist.'),
    S('Ik hoop dat je snel beter wordt.', 'Ich hoffe, dass es dir bald besser geht.|Ich hoffe, dass du bald gesund wirst.'),
    S('Wanneer ik tijd heb, lees ik graag.', 'Wenn ich Zeit habe, lese ich gern.'),
    S('Sinds ik in Nederland woon, fiets ik elke dag.', 'Seit ich in den Niederlanden wohne, fahre ich jeden Tag Rad.'),
    S('Ze spreekt zo snel dat ik haar niet begrijp.', 'Sie spricht so schnell, dass ich sie nicht verstehe.'),
    S('Weet jij waarom de winkel dicht is?', 'Weißt du, warum der Laden geschlossen ist?'),
    S('Ik vind het leuk dat je er bent.', 'Ich finde es schön, dass du da bist.'),
    S('Als je wilt, kun je hier slapen.', 'Wenn du willst, kannst du hier schlafen.'),
    S('Ik weet dat je gelijk hebt.', 'Ich weiß, dass du recht hast.'),
    S('Hij kwam binnen toen ik kookte.', 'Er kam herein, als ich kochte.'),
    S('Bel me als je thuis bent.', 'Ruf mich an, wenn du zu Hause bist.'),
    S('Ik weet niet of ik kan komen.', 'Ich weiß nicht, ob ich kommen kann.'),
    S('Omdat het koud was, bleven we binnen.', 'Weil es kalt war, blieben wir drinnen.'),
    S('Volgende week heb ik vakantie.', 'Nächste Woche habe ich Urlaub.'),
  ],
  cloze: [
    C('Ik blijf thuis, omdat ik ziek {ben}.', 'ben|is|zijn', 'Ich bleibe zu Hause, weil ich krank bin.'),
    C('Hij zegt dat hij moe {is}.', 'is|ben|zijn', 'Er sagt, dass er müde ist.'),
    C('Weet je {of} hij komt?', 'of|als|wat', 'Weißt du, ob er kommt?'),
    C('{Toen} ik klein was, woonde ik in Duitsland.', 'Toen|Als|Wanneer', 'Als ich klein war, wohnte ich in Deutschland.'),
    C('Ik weet niet waar hij {woont}.', 'woont|woon|wonen', 'Ich weiß nicht, wo er wohnt.'),
    C('{Hoewel} het regent, gaan we wandelen.', 'Hoewel|Omdat|Nadat', 'Obwohl es regnet, gehen wir spazieren.'),
    C('Als het mooi weer is, {gaan we} naar het strand.', 'gaan we|we gaan', 'Wenn das Wetter schön ist, gehen wir an den Strand.'),
  ],
  story: story('st39', 'Waarom Nederlands?', 'Warum Niederländisch?', [
    ['Jan', 'Waarom leer je eigenlijk Nederlands?', 'Warum lernst du eigentlich Niederländisch?'],
    ['Anna', 'Omdat ik volgend jaar in Utrecht ga studeren.', 'Weil ich nächstes Jahr in Utrecht studieren werde.'],
    ['Jan', 'Leuk! Weet je al waar je gaat wonen?', 'Toll! Weißt du schon, wo du wohnen wirst?'],
    ['Anna', 'Nee, ik weet nog niet of ik een kamer kan vinden.', 'Nein, ich weiß noch nicht, ob ich ein Zimmer finden kann.'],
    Q('Warum lernt Anna Niederländisch?', ['Weil sie in Utrecht studieren wird', 'Weil ihr Freund Niederländer ist', 'Weil sie gern reist'], 0),
    ['Jan', 'Ik denk dat het moeilijk is, omdat er veel studenten zijn.', 'Ich glaube, dass es schwierig ist, weil es viele Studenten gibt.'],
    ['Anna', 'Als ik niets vind, woon ik eerst bij mijn tante in Gent.', 'Wenn ich nichts finde, wohne ich zuerst bei meiner Tante in Gent.'],
    Q('Wo wohnt Anna, wenn sie nichts findet?', ['Bei ihrer Tante in Gent', 'Bei Jan', 'In einem Hotel'], 0),
  ]),
});

const u40 = unit({
  id: 'u40',
  title: 'Pläne und Zukunft',
  description: 'gaan + Infinitiv, zullen, van plan zijn, over een week',
  tips: [
    T(
      'Zukunft mit gaan',
      `
      Am häufigsten drückt man die Zukunft mit **gaan** + Infinitiv aus, besonders bei Plänen:

      - *Ik ga morgen mijn oma bezoeken.*
      - *Het gaat regenen.* „Es wird regnen.“

      Oft reicht auch das Präsens mit einer Zeitangabe: *Morgen werk ik.*
      `,
      [['Ik ga mijn oma bezoeken.', 'Ich werde meine Oma besuchen.']],
    ),
    T(
      'zullen',
      `
      | | zullen |
      |---|---|
      | ik | zal |
      | jij | zult / zal |
      | hij / zij | zal |
      | wij / jullie / zij | zullen |

      **zullen** steht für Versprechen und Vermutungen: *Ik zal je helpen.*

      Und für Vorschläge: *Zal ik het raam opendoen?* „Soll ich …?“ *Zullen we gaan?* „Wollen wir gehen?“
      `,
      [
        ['Ik zal je helpen.', 'Ich werde dir helfen.'],
        ['Zullen we gaan?', 'Wollen wir gehen?'],
      ],
    ),
    T(
      'Zeitangaben für die Zukunft',
      `
      - *over een week* – **in** einer Woche (nicht *in een week*!)
      - *volgend jaar* – nächstes Jahr
      - *binnenkort* – bald, demnächst
      - *van plan zijn* – vorhaben: *Wat ben je van plan?*
      `,
      [['Over een week ben ik jarig.', 'In einer Woche habe ich Geburtstag.']],
    ),
  ],
  words: [
    V('zullen', 'werden (Zukunft); sollen (Vorschlag)', 'zal zult/zal zal zullen | zou zouden | -', { forms: 'zul' }),
    N('het plan', 'der Plan', 'plannen'),
    W('over', 'in (zeitlich: over een week)', 'prep', { id: 'over-duur' }),
    W('binnenkort', 'bald, demnächst', 'adv'),
    N('de toekomst', 'die Zukunft', '-'),
    N('de bruiloft', 'die Hochzeit', 'bruiloften', '💒'),
    N('de gast', 'der Gast', 'gasten'),
    N('de studie', 'das Studium', 'studies'),
    V('verwachten', 'erwarten', 'verwacht verwacht verwachten | verwachtte verwachtten | verwacht h'),
    V('trouwen', 'heiraten', 'trouw trouwt trouwen | trouwde trouwden | getrouwd hz'),
    V('beslissen', 'entscheiden', 'beslis beslist beslissen | besliste beslisten | beslist h'),
    V('organiseren', 'organisieren', 'organiseer organiseert organiseren | organiseerde organiseerden | georganiseerd h'),
    V('lukken', 'gelingen, klappen', 'luk lukt lukken | lukte lukten | gelukt z'),
    A('waarschijnlijk', 'wahrscheinlich', 'waarschijnlijke - -'),
    W('Italië', 'Italien', 'name'),
  ],
  sentences: [
    S('Morgen ga ik naar de markt.', 'Morgen gehe ich auf den Markt.'),
    S('Wat ga je dit weekend doen?', 'Was machst du dieses Wochenende?|Was wirst du dieses Wochenende machen?'),
    S('Ik ga mijn oma bezoeken.', 'Ich werde meine Oma besuchen.|Ich besuche meine Oma.'),
    S('Het gaat regenen.', 'Es wird regnen.|Es fängt an zu regnen.'),
    S('Ik zal je helpen.', 'Ich werde dir helfen.|Ich helfe dir.'),
    S('Zal ik het raam opendoen?', 'Soll ich das Fenster aufmachen?'),
    S('Zullen we gaan?', 'Wollen wir gehen?|Sollen wir gehen?|Gehen wir?'),
    S('We zullen zien.', 'Wir werden sehen.|Mal sehen.'),
    S('Volgend jaar ga ik in Nederland wonen.', 'Nächstes Jahr werde ich in den Niederlanden wohnen.|Nächstes Jahr ziehe ich in die Niederlande.'),
    S('Wat ben je van plan?', 'Was hast du vor?'),
    S('Over een week ben ik jarig.', 'In einer Woche habe ich Geburtstag.'),
    S('Ze gaan volgend jaar trouwen.', 'Sie heiraten nächstes Jahr.|Sie werden nächstes Jahr heiraten.'),
    S('De bruiloft is in juni.', 'Die Hochzeit ist im Juni.'),
    S('Binnenkort verhuizen we.', 'Bald ziehen wir um.|Demnächst ziehen wir um.'),
    S('Ik bel je later.', 'Ich rufe dich später an.'),
    S('Hij zal waarschijnlijk te laat komen.', 'Er wird wahrscheinlich zu spät kommen.|Er kommt wahrscheinlich zu spät.'),
    S('Morgen wordt het warm.', 'Morgen wird es warm.'),
    S('Ik verwacht veel gasten.', 'Ich erwarte viele Gäste.'),
    S('We gaan een feest organiseren.', 'Wir werden ein Fest organisieren.|Wir werden eine Party organisieren.|Wir organisieren eine Party.'),
    S('Heb je al beslist?', 'Hast du dich schon entschieden?'),
    S('In de toekomst wil ik in Gent wonen.', 'In Zukunft möchte ich in Gent wohnen.|In der Zukunft will ich in Gent wohnen.'),
    S('Wat gaan jullie vanavond eten?', 'Was esst ihr heute Abend?|Was werdet ihr heute Abend essen?'),
    S('Ik denk dat het zal lukken.', 'Ich glaube, dass es klappen wird.|Ich denke, dass es gelingen wird.'),
    S('Zullen we morgen samen koken?', 'Wollen wir morgen zusammen kochen?|Sollen wir morgen zusammen kochen?'),
    S('Ik ga nooit meer roken.', 'Ich werde nie wieder rauchen.'),
    S('Over twee jaar ben ik klaar met mijn studie.', 'In zwei Jahren bin ich mit meinem Studium fertig.'),
    S('Wat zijn je plannen?', 'Was sind deine Pläne?'),
  ],
  cloze: [
    C('Morgen {ga} ik naar de markt.', 'ga|gaat|gaan', 'Morgen gehe ich auf den Markt.'),
    C('Ik {zal} je helpen.', 'zal|zult|zullen', 'Ich werde dir helfen.'),
    C('{Zullen} we gaan?', 'Zullen|Zal|Zult', 'Wollen wir gehen?'),
    C('{Over} een week ben ik jarig.', 'Over|Om|Tot', 'In einer Woche habe ich Geburtstag.'),
    C('Het {gaat} regenen.', 'gaat|ga|gaan', 'Es wird regnen.'),
    C('Wat ben je van {plan}?', 'plan|plannen', 'Was hast du vor?'),
  ],
  story: story('st40', 'Plannen voor de zomer', 'Pläne für den Sommer', [
    ['Fleur', 'Wat ga je deze zomer doen?', 'Was machst du diesen Sommer?'],
    ['Pieter', 'Ik ga met mijn vriendin naar Italië. We gaan kamperen.', 'Ich fahre mit meiner Freundin nach Italien. Wir gehen zelten.'],
    ['Fleur', 'Wat leuk! Hoe lang blijven jullie?', 'Wie schön! Wie lange bleibt ihr?'],
    ['Pieter', 'Drie weken. En jij? Wat ben je van plan?', 'Drei Wochen. Und du? Was hast du vor?'],
    Q('Wohin fährt Pieter im Sommer?', ['Nach Italien', 'Nach Spanien', 'Nach Belgien'], 0),
    ['Fleur', 'Ik blijf thuis. Over twee maanden ga ik verhuizen.', 'Ich bleibe zu Hause. In zwei Monaten ziehe ich um.'],
    ['Pieter', 'Zal ik je helpen met verhuizen?', 'Soll ich dir beim Umzug helfen?'],
    ['Fleur', 'Graag! Dan organiseer ik daarna een groot feest.', 'Gern! Dann organisiere ich danach ein großes Fest.'],
    Q('Was macht Fleur in zwei Monaten?', ['Sie zieht um', 'Sie heiratet', 'Sie fährt in Urlaub'], 0),
  ]),
});

export default [u31, u32, u33, u34, u35, u36, u37, u38, u39, u40];
