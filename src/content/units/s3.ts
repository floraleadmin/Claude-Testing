// Section 3 – Grammatik im Alltag (A1–A2)
import { A, C, N, NP, P, Q, S, T, V, W, story, unit } from '../dsl';

const u21 = unit({
  id: 'u21',
  title: 'Können, wollen, müssen',
  description: 'Modalverben: kunnen, willen, moeten, mogen, hoeven',
  tips: [
    T(
      'Modalverben',
      `
      | | kunnen | willen | moeten | mogen |
      |---|---|---|---|---|
      | ik | kan | wil | moet | mag |
      | jij | kunt / kan | wilt / wil | moet | mag |
      | hij / zij | kan | wil | moet | mag |
      | wij / jullie / zij | kunnen | willen | moeten | mogen |

      Der Infinitiv steht am Ende, wie im Deutschen: *Ik kan zwemmen.*

      In der Frage heißt es *Kun je …?* oder *Kan je …?*, *Wil je …?*
      `,
      [
        ['Ik kan zwemmen.', 'Ich kann schwimmen.'],
        ['Wil je thee?', 'Möchtest du Tee?'],
      ],
    ),
    T(
      'mogen heißt dürfen',
      `
      Falscher Freund: **mogen** heißt „dürfen“, nicht „mögen“.

      - *Je mag hier niet roken.* „Du darfst hier nicht rauchen.“
      - „Ich mag Kaffee“ heißt *Ik hou van koffie* oder *Ik vind koffie lekker*.
      `,
      [['Mag ik hier parkeren?', 'Darf ich hier parken?']],
    ),
    T(
      'nicht müssen = niet hoeven te',
      `
      „Nicht müssen“ heißt **niet hoeven te**:

      - *Ik hoef niet te werken.* „Ich muss nicht arbeiten.“
      - *Je hoeft niet te komen.* „Du musst nicht kommen.“

      *Je moet niet roken* bedeutet dagegen „Du sollst nicht rauchen“.
      `,
      [['Je hoeft niet te komen.', 'Du musst nicht kommen.']],
    ),
    T(
      'Höflich bitten',
      `
      - *Ik wil graag …* „Ich möchte gern …“
      - *Kunt u …?* „Können Sie …?“
      - **even** macht eine Bitte freundlicher: *Ik moet even bellen.* „Ich muss mal kurz telefonieren.“
      `,
    ),
  ],
  words: [
    V('kunnen', 'können', 'kan kunt/kan kan kunnen | kon konden | gekund h', { forms: 'kun' }),
    V('willen', 'wollen, möchten', 'wil wilt/wil wil willen | wilde/wou wilden/wouden | gewild h'),
    V('moeten', 'müssen', 'moet moet moeten | moest moesten | -'),
    V('mogen', 'dürfen', 'mag mag mogen | mocht mochten | -'),
    V('hoeven', 'brauchen (niet hoeven te = nicht müssen)', 'hoef hoeft hoeven | hoefde hoefden | -'),
    V('blijven', 'bleiben', 'blijf blijft blijven | bleef bleven | gebleven z'),
    V('bellen', 'anrufen, telefonieren', 'bel belt bellen | belde belden | gebeld h'),
    V('parkeren', 'parken', 'parkeer parkeert parkeren | parkeerde parkeerden | geparkeerd h'),
    V('herhalen', 'wiederholen', 'herhaal herhaalt herhalen | herhaalde herhaalden | herhaald h'),
    N('het rijbewijs', 'der Führerschein', 'rijbewijzen', '🪪'),
    N('het huiswerk', 'die Hausaufgaben', '-', '📝'),
    N('de parkeerplaats', 'der Parkplatz', 'parkeerplaatsen', '🅿️'),
    W('even', 'mal, kurz', 'adv'),
    W('helaas', 'leider', 'adv'),
    W('mama', 'Mama', 'noun'),
    W('papa', 'Papa', 'noun'),
    W('oké', 'okay', 'interj'),
    P('dat mag niet', 'das ist nicht erlaubt'),
  ],
  sentences: [
    S('Ik kan zwemmen.', 'Ich kann schwimmen.'),
    S('Kun je me helpen?|Kun jij me helpen?|Kan je me helpen?', 'Kannst du mir helfen?'),
    S('Ik wil een kop koffie.', 'Ich möchte eine Tasse Kaffee.|Ich will eine Tasse Kaffee.'),
    S('Wil je thee?', 'Möchtest du Tee?|Willst du Tee?'),
    S('Ik moet werken.', 'Ich muss arbeiten.'),
    S('We moeten om acht uur op school zijn.', 'Wir müssen um acht Uhr in der Schule sein.'),
    S('Je mag hier niet roken.', 'Du darfst hier nicht rauchen.|Man darf hier nicht rauchen.'),
    S('Mag ik hier parkeren?', 'Darf ich hier parken?'),
    S('Nee, dat mag niet.', 'Nein, das ist nicht erlaubt.|Nein, das darf man nicht.|Nein, das geht nicht.'),
    S('Hij kan niet komen.', 'Er kann nicht kommen.'),
    S('Wij willen naar Amsterdam gaan.', 'Wir wollen nach Amsterdam fahren.|Wir möchten nach Amsterdam fahren.|Wir wollen nach Amsterdam gehen.'),
    S('Ik wil graag een kaartje kopen.', 'Ich möchte gern eine Fahrkarte kaufen.|Ich möchte eine Fahrkarte kaufen.|Ich würde gern eine Fahrkarte kaufen.'),
    S('Kunt u dat herhalen?', 'Können Sie das wiederholen?'),
    S('Kunt u langzaam spreken?', 'Können Sie langsam sprechen?'),
    S('Je hoeft niet te komen.', 'Du musst nicht kommen.|Du brauchst nicht zu kommen.'),
    S('Ik hoef niet te werken.', 'Ich muss nicht arbeiten.|Ich brauche nicht zu arbeiten.'),
    S('Moet je vandaag werken?', 'Musst du heute arbeiten?'),
    S('Ja, helaas.', 'Ja, leider.'),
    S('Kinderen mogen hier spelen.', 'Kinder dürfen hier spielen.'),
    S('Wil jij rijden?', 'Willst du fahren?|Möchtest du fahren?'),
    S('Ik heb geen rijbewijs.', 'Ich habe keinen Führerschein.'),
    S('Ik moet even bellen.', 'Ich muss kurz telefonieren.|Ich muss mal kurz anrufen.|Ich muss kurz anrufen.'),
    S('Hij wil thuis blijven.', 'Er will zu Hause bleiben.|Er möchte zu Hause bleiben.'),
    S('Ze moeten hun huiswerk maken.', 'Sie müssen ihre Hausaufgaben machen.'),
    S('Waar kan ik parkeren?', 'Wo kann ich parken?'),
    S('Er is geen parkeerplaats.', 'Es gibt keinen Parkplatz.'),
    S('Papa, mag ik een ijsje?', 'Papa, darf ich ein Eis?|Papa, darf ich ein Eis haben?'),
  ],
  cloze: [
    C('Ik {kan} zwemmen.', 'kan|kunt|kunnen', 'Ich kann schwimmen.'),
    C('{Kun} je me helpen?', 'Kun|Kunt|Kunnen', 'Kannst du mir helfen?'),
    C('Je {mag} hier niet roken.', 'mag|mogen', 'Du darfst hier nicht rauchen.'),
    C('Wij {willen} naar Amsterdam.', 'wil|wilt|willen', 'Wir wollen nach Amsterdam.'),
    C('Je hoeft niet {te} komen.', 'te|om|tot', 'Du musst nicht kommen.'),
    C('Hij {moet} werken.', 'moet|moeten', 'Er muss arbeiten.'),
    C('Ik moet om acht uur op school {zijn}.', 'zijn|ben|is', 'Ich muss um acht Uhr in der Schule sein.'),
  ],
  story: story('st21', 'Mag dat?', 'Darf ich das?', [
    ['Mila', 'Mama, mag ik naar het park?', 'Mama, darf ich in den Park?'],
    ['Mama', 'Nee, je moet eerst je huiswerk maken.', 'Nein, du musst zuerst deine Hausaufgaben machen.'],
    ['Mila', 'Maar ik wil met Sem spelen!', 'Aber ich will mit Sem spielen!'],
    Q('Was muss Mila zuerst machen?', ['Ihre Hausaufgaben', 'Ihr Zimmer aufräumen', 'Essen'], 0),
    ['Mama', 'Je kunt morgen met Sem spelen.', 'Du kannst morgen mit Sem spielen.'],
    ['Mila', 'Sem kan morgen niet. Hij moet naar zijn oma.', 'Sem kann morgen nicht. Er muss zu seiner Oma.'],
    ['Mama', 'Oké. Maak eerst je huiswerk, dan mag je gaan.', 'Okay. Mach zuerst deine Hausaufgaben, dann darfst du gehen.'],
    Q('Wann darf Mila in den Park?', ['Nach den Hausaufgaben', 'Sofort', 'Morgen'], 0),
  ]),
});

const u22 = unit({
  id: 'u22',
  title: 'Tagesablauf',
  description: 'Trennbare Verben: opstaan, opbellen, opruimen',
  tips: [
    T(
      'Trennbare Verben',
      `
      Wie im Deutschen steht die Vorsilbe im Hauptsatz am Ende:

      - *opstaan* → *Ik sta om zeven uur op.*
      - *opbellen* → *Ik bel je morgen op.*

      Im Infinitiv bleibt das Verb zusammen: *Ik wil vroeg opstaan.*

      Im Partizip steht **ge** in der Mitte: *opgestaan, opgebeld, opgeruimd*.
      `,
      [
        ['Ik sta om zeven uur op.', 'Ich stehe um sieben Uhr auf.'],
        ['Ik wil vroeg opstaan.', 'Ich will früh aufstehen.'],
      ],
    ),
    T(
      'Untrennbare Vorsilben',
      `
      Vorsilben wie **be-, ge-, her-, ont-, ver-** bleiben immer am Verb:

      - *ontbijten*: *Ik ontbijt om acht uur.*
      - *betalen, herhalen, vertrekken*

      Ihr Partizip hat kein zusätzliches *ge-*: *ontbeten, betaald, herhaald*.
      `,
      [['Om half acht ontbijt ik.', 'Um halb acht frühstücke ich.']],
    ),
    T(
      'Mein Tag',
      `
      - *wakker worden* – aufwachen
      - *opstaan* – aufstehen
      - *douchen* – duschen
      - *tanden poetsen* – Zähne putzen
      - *ontbijten* – frühstücken
      - *thuiskomen* – nach Hause kommen
      - *afwassen* – abwaschen, spülen
      - *naar bed gaan* – ins Bett gehen
      `,
    ),
  ],
  words: [
    V('opstaan', 'aufstehen', 'sta staat staan | stond stonden | opgestaan z', { sep: 'op' }),
    A('wakker', 'wach (wakker worden = aufwachen)', '- - -'),
    V('opbellen', 'anrufen', 'bel belt bellen | belde belden | opgebeld h', { sep: 'op' }),
    V('opruimen', 'aufräumen', 'ruim ruimt ruimen | ruimde ruimden | opgeruimd h', { sep: 'op' }),
    V('afwassen', 'abwaschen, spülen', 'was wast wassen | waste wasten | afgewassen h', { sep: 'af' }),
    V('schoonmaken', 'putzen, sauber machen', 'maak maakt maken | maakte maakten | schoongemaakt h', { sep: 'schoon' }),
    V('uitgaan', 'ausgehen', 'ga gaat gaan | ging gingen | uitgegaan z', { sep: 'uit' }),
    V('thuiskomen', 'nach Hause kommen', 'kom komt komen | kwam kwamen | thuisgekomen z', { sep: 'thuis' }),
    V('aanzetten', 'einschalten', 'zet zet zetten | zette zetten | aangezet h', { sep: 'aan' }),
    V('uitzetten', 'ausschalten', 'zet zet zetten | zette zetten | uitgezet h', { sep: 'uit' }),
    V('opendoen', 'aufmachen', 'doe doet doen | deed deden | opengedaan h', { sep: 'open' }),
    V('dichtdoen', 'zumachen', 'doe doet doen | deed deden | dichtgedaan h', { sep: 'dicht' }),
    V('ontbijten', 'frühstücken', 'ontbijt ontbijt ontbijten | ontbeet ontbeten | ontbeten h'),
    V('douchen', 'duschen', 'douche doucht douchen | douchte douchten | gedoucht h'),
    V('poetsen', 'putzen (Zähne)', 'poets poetst poetsen | poetste poetsten | gepoetst h'),
    N('het ontbijt', 'das Frühstück', 'ontbijten', '🍳'),
    N('de lunch', 'das Mittagessen', 'lunches'),
    N('het avondeten', 'das Abendessen', '-'),
    N('de douche', 'die Dusche', 'douches', '🚿'),
    N('de tand', 'der Zahn', 'tanden', '🦷'),
    N('het licht', 'das Licht', 'lichten'),
    A('klaar', 'fertig', '- - -'),
    A('gewoon', 'normal, gewöhnlich', 'gewone gewoner gewoonst'),
    W('na', 'nach (zeitlich)', 'prep'),
    W('af', 'ab (Verbteil: afwassen)', 'adv'),
    A('schoon', 'sauber', 'schone schoner schoonst'),
  ],
  sentences: [
    S('Ik sta om zeven uur op.', 'Ich stehe um sieben Uhr auf.'),
    S('Hoe laat sta je op?', 'Um wie viel Uhr stehst du auf?|Wann stehst du auf?'),
    S('Eerst douche ik, dan ontbijt ik.', 'Zuerst dusche ich, dann frühstücke ich.|Erst dusche ich, dann frühstücke ich.'),
    S('Ik poets mijn tanden.', 'Ich putze mir die Zähne.|Ich putze meine Zähne.'),
    S('Hij belt zijn moeder op.', 'Er ruft seine Mutter an.'),
    S('Ik bel je morgen op.', 'Ich rufe dich morgen an.'),
    S('Ruim je kamer op!', 'Räum dein Zimmer auf!'),
    S('Wie wast vandaag af?', 'Wer spült heute ab?|Wer wäscht heute ab?'),
    S('We maken samen het huis schoon.', 'Wir putzen zusammen das Haus.|Wir machen zusammen das Haus sauber.'),
    S('Vanavond gaan we uit.', 'Heute Abend gehen wir aus.'),
    S('Hoe laat kom je thuis?', 'Um wie viel Uhr kommst du nach Hause?|Wann kommst du nach Hause?'),
    S('Ik kom om zes uur thuis.', 'Ich komme um sechs Uhr nach Hause.'),
    S('Zet de televisie uit!', 'Schalte den Fernseher aus!|Mach den Fernseher aus!'),
    S('Zet het licht aan.', 'Mach das Licht an.|Schalte das Licht ein.'),
    S('Neem je je paraplu mee?', 'Nimmst du deinen Regenschirm mit?'),
    S('Ik wil vroeg opstaan.', 'Ich will früh aufstehen.|Ich möchte früh aufstehen.'),
    S('Ik moet mijn moeder opbellen.', 'Ich muss meine Mutter anrufen.'),
    S('Om half acht ontbijt ik.|Ik ontbijt om half acht.', 'Um halb acht frühstücke ich.|Ich frühstücke um halb acht.'),
    S('Het ontbijt is klaar.', 'Das Frühstück ist fertig.'),
    S('Om tien uur ga ik naar bed.|Ik ga om tien uur naar bed.', 'Um zehn Uhr gehe ich ins Bett.|Ich gehe um zehn Uhr ins Bett.'),
    S('Ik word om zes uur wakker.', 'Ich wache um sechs Uhr auf.|Ich werde um sechs Uhr wach.'),
    S('De lunch is om twaalf uur.', 'Das Mittagessen ist um zwölf Uhr.'),
    S('Na het avondeten wast mijn vader af.', 'Nach dem Abendessen spült mein Vater ab.|Nach dem Abendessen wäscht mein Vater ab.'),
    S('In het weekend sta ik laat op.|Ik sta in het weekend laat op.', 'Am Wochenende stehe ich spät auf.|Ich stehe am Wochenende spät auf.'),
    S('Doe de deur dicht.', 'Mach die Tür zu.'),
    S('Kun je het raam opendoen?', 'Kannst du das Fenster aufmachen?|Kannst du das Fenster öffnen?'),
    S('De douche is kapot.', 'Die Dusche ist kaputt.'),
    S('Het is een gewone dag.', 'Es ist ein normaler Tag.|Es ist ein gewöhnlicher Tag.'),
  ],
  cloze: [
    C('Ik sta om zeven uur {op}.', 'op|aan|uit', 'Ich stehe um sieben Uhr auf.'),
    C('Ik wil vroeg {opstaan}.', 'opstaan|sta op|opsta', 'Ich will früh aufstehen.'),
    C('Hij {belt} zijn moeder op.', 'bel|belt|bellen', 'Er ruft seine Mutter an.'),
    C('Zet de televisie {uit}!', 'uit|aan|op', 'Mach den Fernseher aus!'),
    C('{Ruim} je kamer op!', 'Ruim|Ruimt|Ruimen', 'Räum dein Zimmer auf!'),
    C('Om half acht {ontbijt} ik.', 'ontbijt|ontbijten', 'Um halb acht frühstücke ich.'),
    C('Ik kom om zes uur {thuis}.', 'thuis|huis', 'Ich komme um sechs Uhr nach Hause.'),
  ],
  story: story('st22', 'Een gewone dag', 'Ein ganz normaler Tag', [
    ['Bram', 'Ik sta elke dag om zeven uur op.', 'Ich stehe jeden Tag um sieben Uhr auf.'],
    ['Bram', 'Eerst douche ik en dan ontbijt ik met brood en koffie.', 'Zuerst dusche ich und dann frühstücke ich mit Brot und Kaffee.'],
    Q('Was macht Bram nach dem Duschen?', ['Er frühstückt', 'Er geht ins Bett', 'Er ruft seine Mutter an'], 0),
    ['Bram', 'Om half negen fiets ik naar mijn werk.', 'Um halb neun fahre ich mit dem Fahrrad zur Arbeit.'],
    ['Bram', 'Om vijf uur kom ik thuis. Dan kook ik.', 'Um fünf Uhr komme ich nach Hause. Dann koche ich.'],
    ['Bram', "'s Avonds bel ik mijn vriendin op.", 'Abends rufe ich meine Freundin an.'],
    Q('Wann ruft Bram seine Freundin an?', ['Abends', 'Morgens', 'Mittags'], 0),
    ['Bram', 'Om elf uur zet ik de televisie uit en ga ik naar bed.', 'Um elf Uhr mache ich den Fernseher aus und gehe ins Bett.'],
    Q('Wann geht Bram ins Bett?', ['Um elf Uhr', 'Um zehn Uhr', 'Um Mitternacht'], 0),
  ]),
});

const u23 = unit({
  id: 'u23',
  title: 'Körper und Gesundheit',
  description: 'Körperteile, Schmerzen, beim Arzt, Apotheke',
  tips: [
    T(
      'Es tut weh',
      `
      - *Mijn hoofd doet pijn.* „Mein Kopf tut weh.“
      - *Ik heb hoofdpijn / buikpijn / keelpijn.* „Ich habe Kopf-/Bauch-/Halsschmerzen.“
      - *Ik heb pijn in mijn arm.* „Mir tut der Arm weh.“
      - *Waar doet het pijn?* „Wo tut es weh?“
      `,
      [['Mijn hoofd doet pijn.', 'Mein Kopf tut weh.']],
    ),
    T(
      'Beim Arzt',
      `
      In den Niederlanden geht man zuerst zur **huisarts** (Hausarzt). Für einen Besuch braucht man eine **afspraak** (Termin).

      - *Ik wil een afspraak maken.*
      - *Ik ben verkouden.* „Ich bin erkältet.“
      - *Ik heb koorts.* „Ich habe Fieber.“
      - Medikamente gibt es in der **apotheek**.
      - *Beterschap!* „Gute Besserung!“
      `,
      [['Beterschap!', 'Gute Besserung!']],
    ),
    T(
      'Plural von Körperteilen',
      `
      *het oog → de ogen*, *het been → de benen*, *het oor → de oren*, *de hand → de handen*, *de voet → de voeten*.

      **het haar** steht meist im Singular: *Ze heeft lang haar.* „Sie hat lange Haare.“

      **weer** heißt auch „wieder“: *Ik ben weer gezond.*
      `,
    ),
  ],
  words: [
    N('het hoofd', 'der Kopf', 'hoofden'),
    N('de arm', 'der Arm', 'armen', '💪'),
    N('het been', 'das Bein', 'benen', '🦵'),
    N('de hand', 'die Hand', 'handen', '✋'),
    N('de voet', 'der Fuß', 'voeten', '🦶'),
    N('het oog', 'das Auge', 'ogen', '👁️'),
    N('het oor', 'das Ohr', 'oren', '👂'),
    N('de neus', 'die Nase', 'neuzen', '👃'),
    N('de mond', 'der Mund', 'monden', '👄'),
    N('de buik', 'der Bauch', 'buiken'),
    N('de rug', 'der Rücken', 'ruggen'),
    N('de keel', 'der Hals (innen)', 'kelen'),
    N('het haar', 'das Haar', 'haren', undefined, { id: 'haar-noun' }),
    N('de vinger', 'der Finger', 'vingers'),
    N('de pijn', 'der Schmerz', 'pijnen'),
    N('de hoofdpijn', 'die Kopfschmerzen', '-'),
    N('de buikpijn', 'die Bauchschmerzen', '-'),
    N('de keelpijn', 'die Halsschmerzen', '-'),
    N('de koorts', 'das Fieber', '-', '🤒'),
    N('de dokter', 'der Arzt, die Ärztin', 'dokters', '🩺'),
    N('de huisarts', 'der Hausarzt, die Hausärztin', 'huisartsen'),
    N('de apotheek', 'die Apotheke', 'apotheken', '💊'),
    N('het medicijn', 'das Medikament', 'medicijnen'),
    N('de pil', 'die Tablette', 'pillen'),
    N('de afspraak', 'der Termin, die Verabredung', 'afspraken'),
    N('de keer', 'das Mal', 'keren'),
    A('gezond', 'gesund', 'gezonde gezonder gezondst'),
    A('verkouden', 'erkältet', '- - -'),
    W('beterschap', 'gute Besserung', 'interj'),
    W('weer', 'wieder', 'adv', { id: 'weer-adv' }),
    V('voelen', 'fühlen', 'voel voelt voelen | voelde voelden | gevoeld h'),
    V('rusten', 'sich ausruhen', 'rust rust rusten | rustte rustten | gerust h'),
    V('innemen', 'einnehmen', 'neem neemt nemen | nam namen | ingenomen h', { sep: 'in' }),
    V('hoesten', 'husten', 'hoest hoest hoesten | hoestte hoestten | gehoest h'),
    V('wassen', 'waschen', 'was wast wassen | waste wasten | gewassen h'),
  ],
  sentences: [
    S('Ik heb hoofdpijn.', 'Ich habe Kopfschmerzen.'),
    S('Mijn hoofd doet pijn.', 'Mein Kopf tut weh.'),
    S('Mijn buik doet pijn.', 'Mein Bauch tut weh.|Ich habe Bauchschmerzen.'),
    S('Hij heeft koorts.', 'Er hat Fieber.'),
    S('Ik ben verkouden.', 'Ich bin erkältet.'),
    S('Ze hoest de hele nacht.', 'Sie hustet die ganze Nacht.'),
    S('Ik moet naar de dokter.', 'Ich muss zum Arzt.|Ich muss zur Ärztin.'),
    S('Ik wil een afspraak maken.', 'Ich möchte einen Termin machen.|Ich möchte einen Termin vereinbaren.'),
    S('Waar doet het pijn?', 'Wo tut es weh?'),
    S('Mijn rug doet pijn.', 'Mein Rücken tut weh.|Ich habe Rückenschmerzen.'),
    S('Neem deze pillen drie keer per dag in.', 'Nimm diese Tabletten dreimal am Tag ein.|Nehmen Sie diese Tabletten dreimal täglich ein.|Nimm diese Tabletten dreimal täglich ein.'),
    S('Je moet goed rusten.', 'Du musst dich gut ausruhen.'),
    S('Beterschap!', 'Gute Besserung!'),
    S('De apotheek is om de hoek.', 'Die Apotheke ist um die Ecke.'),
    S('Het kind heeft keelpijn.', 'Das Kind hat Halsschmerzen.'),
    S('Ik heb blauwe ogen.', 'Ich habe blaue Augen.'),
    S('Zij heeft lang haar.', 'Sie hat lange Haare.|Sie hat langes Haar.'),
    S('Was je handen!', 'Wasch deine Hände!|Wasch dir die Hände!'),
    S('Mijn voeten zijn koud.', 'Meine Füße sind kalt.'),
    S('Fruit is gezond.', 'Obst ist gesund.'),
    S('Ik ben weer gezond.', 'Ich bin wieder gesund.'),
    S('De huisarts is erg aardig.', 'Der Hausarzt ist sehr nett.|Die Hausärztin ist sehr nett.'),
    S('Mijn oor doet pijn.', 'Mein Ohr tut weh.|Ich habe Ohrenschmerzen.'),
    S('Ik heb pijn in mijn arm.', 'Ich habe Schmerzen im Arm.|Mir tut der Arm weh.|Ich habe Schmerzen in meinem Arm.'),
    S('Een hand heeft vijf vingers.', 'Eine Hand hat fünf Finger.'),
    S('Het medicijn helpt.', 'Das Medikament hilft.'),
    S('Ik voel pijn in mijn been.', 'Ich spüre Schmerzen im Bein.|Ich fühle Schmerzen in meinem Bein.'),
    S('Hij heeft een grote neus en een kleine mond.', 'Er hat eine große Nase und einen kleinen Mund.'),
    S('Mijn keel doet pijn.', 'Mein Hals tut weh.|Ich habe Halsschmerzen.'),
    S('Het kind heeft buikpijn.', 'Das Kind hat Bauchschmerzen.'),
  ],
  cloze: [
    C('Mijn hoofd {doet} pijn.', 'doet|doen|heeft', 'Mein Kopf tut weh.'),
    C('Ik {heb} hoofdpijn.', 'heb|ben|doe', 'Ich habe Kopfschmerzen.'),
    C('Ik ben {verkouden}.', 'verkouden|koorts|pijn', 'Ich bin erkältet.'),
    C('Zij heeft {lang} haar.', 'lang|lange', 'Sie hat lange Haare.'),
    C('Ik heb blauwe {ogen}.', 'oog|ogen', 'Ich habe blaue Augen.'),
    C('Neem de pillen drie {keer} per dag in.', 'keer|keren', 'Nimm die Tabletten dreimal am Tag ein.'),
    C('Ik ben {weer} gezond.', 'weer|terug', 'Ich bin wieder gesund.'),
  ],
  story: story('st23', 'Bij de huisarts', 'Beim Hausarzt', [
    ['Dokter', 'Goedemorgen. Wat is het probleem?', 'Guten Morgen. Was ist das Problem?'],
    ['Daan', 'Ik heb al drie dagen hoofdpijn en ik hoest veel.', 'Ich habe schon seit drei Tagen Kopfschmerzen und ich huste viel.'],
    ['Dokter', 'Heeft u ook koorts?', 'Haben Sie auch Fieber?'],
    ['Daan', 'Ja, een beetje.', 'Ja, ein bisschen.'],
    Q('Seit wann hat Daan Kopfschmerzen?', ['Seit drei Tagen', 'Seit gestern', 'Seit einer Woche'], 0),
    ['Dokter', 'U bent erg verkouden. U moet goed rusten en veel water drinken.', 'Sie sind stark erkältet. Sie müssen sich gut ausruhen und viel Wasser trinken.'],
    ['Dokter', 'Neem deze pillen twee keer per dag in.', 'Nehmen Sie diese Tabletten zweimal am Tag ein.'],
    Q('Wie oft soll Daan die Tabletten nehmen?', ['Zweimal am Tag', 'Dreimal am Tag', 'Einmal am Tag'], 0),
    ['Daan', 'Dank u wel.', 'Vielen Dank.'],
    ['Dokter', 'Beterschap!', 'Gute Besserung!'],
  ]),
});

const u24 = unit({
  id: 'u24',
  title: 'Mich, dich, ihn',
  description: 'Objektpronomen: mij, jou, hem, haar, ons, hen, hun',
  tips: [
    T(
      'Objektpronomen',
      `
      | Subjekt | Objekt |
      |---|---|
      | ik | mij / me |
      | jij / je | jou / je |
      | u | u |
      | hij | hem |
      | zij / ze | haar |
      | het | het |
      | wij / we | ons |
      | jullie | jullie |
      | zij / ze | hen / hun / ze |

      Es gibt keinen Unterschied zwischen „mich“ und „mir“: *Help mij!* und *Hij geeft mij een boek.*

      Die kurzen Formen *me, je, ze* sind unbetont und im Alltag sehr häufig.
      `,
      [
        ['Ik geef hem een boek.', 'Ich gebe ihm ein Buch.'],
        ['Ken je hem?', 'Kennst du ihn?'],
      ],
    ),
    T(
      'hen, hun oder ze?',
      `
      Im Gespräch sagt man für „sie/ihnen“ (Plural) meistens **ze**.

      In der Schriftsprache:
      - **hen** als direktes Objekt und nach Präpositionen: *Ik ken hen. Ik wacht op hen.*
      - **hun** als indirektes Objekt: *Ik geef hun een cadeau.*

      *Hun hebben …* als Subjekt hört man oft, es ist aber falsch. Richtig: *Zij hebben …*
      `,
      [['Ik geef hun een cadeau.', 'Ich gebe ihnen ein Geschenk.']],
    ),
    T(
      'Dinge: hem oder het',
      `
      Für **de**-Wörter sagt man *hem*, für **het**-Wörter *het*:

      - *Ik zoek mijn sleutel, maar ik zie hem niet.* (*de sleutel*)
      - *Ik lees het boek; ik lees het elke avond.* (*het boek*)
      `,
    ),
  ],
  words: [
    W('mij', 'mich, mir', 'pron'),
    W('me', 'mich, mir (unbetont)', 'pron'),
    W('jou', 'dich, dir', 'pron'),
    W('je', 'dich, dir (unbetont)', 'pron', { id: 'je-obj' }),
    W('hem', 'ihn, ihm', 'pron'),
    W('haar', 'sie, ihr (Objekt)', 'pron', { id: 'haar-obj' }),
    W('ons', 'uns', 'pron', { id: 'ons-obj' }),
    W('hen', 'sie (Plural, Objekt)', 'pron'),
    W('hun', 'ihnen', 'pron', { id: 'hun-obj' }),
    W('iedereen', 'jeder, alle', 'pron'),
    V('geven', 'geben; schenken', 'geef geeft geven | gaf gaven | gegeven h'),
    V('sturen', 'schicken', 'stuur stuurt sturen | stuurde stuurden | gestuurd h'),
    V('vertellen', 'erzählen', 'vertel vertelt vertellen | vertelde vertelden | verteld h'),
    V('laten', 'lassen', 'laat laat laten | liet lieten | gelaten h'),
    P('laten zien', 'zeigen'),
    V('bezoeken', 'besuchen', 'bezoek bezoekt bezoeken | bezocht bezochten | bezocht h'),
    V('missen', 'vermissen; verpassen', 'mis mist missen | miste misten | gemist h'),
    V('bedanken', 'sich bedanken, danken', 'bedank bedankt bedanken | bedankte bedankten | bedankt h'),
    V('ontmoeten', 'treffen, kennenlernen', 'ontmoet ontmoet ontmoeten | ontmoette ontmoetten | ontmoet h'),
    V('geloven', 'glauben', 'geloof gelooft geloven | geloofde geloofden | geloofd h'),
    V('beloven', 'versprechen', 'beloof belooft beloven | beloofde beloofden | beloofd h'),
    V('brengen', 'bringen', 'breng brengt brengen | bracht brachten | gebracht h'),
    N('het cadeau', 'das Geschenk', 'cadeaus', '🎁'),
    N('het bericht', 'die Nachricht', 'berichten', '💬'),
    N('het idee', 'die Idee', 'ideeën'),
  ],
  sentences: [
    S('Ik zie je morgen.', 'Ich sehe dich morgen.'),
    S('Hij helpt ons altijd.', 'Er hilft uns immer.'),
    S('Ik geef hem een boek.', 'Ich gebe ihm ein Buch.'),
    S('Hij geeft haar een cadeau.', 'Er gibt ihr ein Geschenk.|Er schenkt ihr etwas.'),
    S('Ken je hem?', 'Kennst du ihn?'),
    S('Ja, ik ken hem goed.', 'Ja, ich kenne ihn gut.'),
    S('Ik mis je.|Ik mis jou.', 'Ich vermisse dich.'),
    S('Bel me morgen!|Bel mij morgen!', 'Ruf mich morgen an!'),
    S('We bezoeken haar elke week.', 'Wir besuchen sie jede Woche.'),
    S('Ik stuur je een bericht.', 'Ich schicke dir eine Nachricht.'),
    S('Vertel het ons!', 'Erzähl es uns!|Sag es uns!'),
    S('Kun je het me laten zien?', 'Kannst du es mir zeigen?'),
    S('Ik geloof je niet.', 'Ich glaube dir nicht.'),
    S('Ik beloof het je.', 'Ich verspreche es dir.'),
    S('Wacht op mij!|Wacht op me!', 'Warte auf mich!'),
    S('Dit cadeau is voor jou.', 'Dieses Geschenk ist für dich.'),
    S('Is dat voor ons?', 'Ist das für uns?'),
    S('Ik bedank hem.', 'Ich danke ihm.|Ich bedanke mich bei ihm.'),
    S('Ik ontmoet haar in het café.', 'Ich treffe sie im Café.'),
    S('Ik ken hen niet.|Ik ken ze niet.', 'Ich kenne sie nicht.'),
    S('Ik geef hun een cadeau.|Ik geef ze een cadeau.', 'Ich gebe ihnen ein Geschenk.'),
    S('Ik zoek mijn sleutel, maar ik zie hem niet.', 'Ich suche meinen Schlüssel, aber ich sehe ihn nicht.'),
    S('Ik vind het boek mooi, ik lees het elke avond.', 'Ich finde das Buch schön, ich lese es jeden Abend.'),
    S('Kom je met ons mee?', 'Kommst du mit uns?|Kommst du mit?'),
    S('Ik breng de kinderen naar school.', 'Ich bringe die Kinder zur Schule.'),
    S('Ik breng ze om acht uur.', 'Ich bringe sie um acht Uhr.'),
    S('Iedereen kent hem.', 'Jeder kennt ihn.|Alle kennen ihn.'),
    S('Dat is een goed idee!', 'Das ist eine gute Idee!'),
  ],
  cloze: [
    C('Ik geef {hem} een boek.', 'hem|hij|zijn', 'Ich gebe ihm ein Buch.'),
    C('Hij geeft {haar} een cadeau.', 'haar|zij|hij', 'Er gibt ihr ein Geschenk.'),
    C('Wacht op {mij}!', 'mij|ik|mijn', 'Warte auf mich!'),
    C('Dit cadeau is voor {jou}.', 'jou|jij|jouw', 'Dieses Geschenk ist für dich.'),
    C('Is dat voor {ons}?', 'ons|wij|onze', 'Ist das für uns?'),
    C('Ik zoek mijn sleutel, maar ik zie {hem} niet.', 'hem|hij|zijn', 'Ich suche meinen Schlüssel, aber ich sehe ihn nicht.'),
    C('Ken je {hem}?', 'hem|hij|zijn', 'Kennst du ihn?'),
  ],
  story: story('st24', 'Het cadeau', 'Das Geschenk', [
    ['Lisa', 'Morgen is mijn moeder jarig. Wat geef ik haar?', 'Morgen hat meine Mutter Geburtstag. Was schenke ich ihr?'],
    ['Tom', 'Geef haar een boek. Ze leest graag.', 'Schenk ihr ein Buch. Sie liest gern.'],
    ['Lisa', 'Nee, ze heeft al veel boeken.', 'Nein, sie hat schon viele Bücher.'],
    Q('Für wen sucht Lisa ein Geschenk?', ['Für ihre Mutter', 'Für Tom', 'Für ihre Schwester'], 0),
    ['Tom', 'En bloemen? Iedereen houdt van bloemen.', 'Und Blumen? Alle mögen Blumen.'],
    ['Lisa', 'Goed idee! Kom je met me mee naar de markt?', 'Gute Idee! Kommst du mit mir auf den Markt?'],
    ['Tom', 'Ja, ik help je.', 'Ja, ich helfe dir.'],
    Q('Was schenkt Lisa ihrer Mutter?', ['Blumen', 'Ein Buch', 'Nichts'], 0),
  ]),
});

const u25 = unit({
  id: 'u25',
  title: 'Klein und gemütlich',
  description: 'Verkleinerungsformen auf -je und das Wort gezellig',
  tips: [
    T(
      'Verkleinerungen',
      `
      Die Verkleinerung ist sehr häufig. Die Endung hängt vom Wortende ab:

      | Endung | wann | Beispiel |
      |---|---|---|
      | -je | meistens | *huis → huisje* |
      | -tje | nach Vokal, und nach l, n, r, w bei langem Vokal | *stoel → stoeltje*, *kamer → kamertje* |
      | -pje | nach m bei langem Vokal | *boom → boompje* |
      | -etje | nach kurzem Vokal + l, m, n, r, ng | *man → mannetje* |

      Alle Verkleinerungen haben **het**: *het huisje, het katje*. Plural mit **-s**: *huisjes*.
      `,
      [
        ['Het huisje is klein maar gezellig.', 'Das Häuschen ist klein, aber gemütlich.'],
        ['Wat een lief katje!', 'Was für ein süßes Kätzchen!'],
      ],
    ),
    T(
      'Nicht nur klein',
      `
      Verkleinerungen klingen freundlich und locker: *een kopje koffie* (eine Tasse Kaffee), *een biertje* (ein Bier), *een broodje* (ein Brötchen), *een ijsje* (ein Eis).

      Manche Wörter gibt es fast nur so: *het meisje, het koekje, het snoepje*.
      `,
    ),
    T(
      'gezellig',
      `
      **gezellig** ist typisch niederländisch und schwer zu übersetzen: gemütlich, gesellig, nett zusammen. Ein Abend mit Freunden, ein Café, ein Wohnzimmer – alles kann *gezellig* sein.
      `,
      [['Het is hier erg gezellig.', 'Es ist hier sehr gemütlich.']],
    ),
  ],
  words: [
    N('het huisje', 'das Häuschen', 'huisjes'),
    N('het kopje', 'die Tasse', 'kopjes'),
    N('het biertje', 'das Bier (Glas)', 'biertjes'),
    N('het broodje', 'das Brötchen', 'broodjes', '🥯'),
    N('het boekje', 'das Heft, das Büchlein', 'boekjes'),
    N('het katje', 'das Kätzchen', 'katjes'),
    N('het hondje', 'das Hündchen', 'hondjes'),
    N('het bloemetje', 'das Blümchen, ein paar Blumen', 'bloemetjes'),
    N('het mannetje', 'das Männchen', 'mannetjes'),
    N('het kindje', 'das Kindchen', 'kindjes'),
    N('het treintje', 'der kleine Zug', 'treintjes'),
    N('het boompje', 'das Bäumchen', 'boompjes'),
    N('het kamertje', 'das kleine Zimmer', 'kamertjes'),
    N('het pakje', 'das Päckchen', 'pakjes', '📦'),
    N('het snoepje', 'das Bonbon', 'snoepjes', '🍬'),
    N('het koekje', 'der Keks', 'koekjes', '🍪'),
    N('het stukje', 'das Stückchen', 'stukjes'),
    N('het tasje', 'das Täschchen', 'tasjes'),
    N('het lepeltje', 'das Löffelchen', 'lepeltjes'),
    N('de suiker', 'der Zucker', '-'),
    A('gezellig', 'gemütlich, gesellig', 'gezellige gezelliger gezelligst'),
  ],
  sentences: [
    S('Wil je een kopje koffie?', 'Möchtest du eine Tasse Kaffee?|Willst du eine Tasse Kaffee?'),
    S('Ik neem een broodje kaas.', 'Ich nehme ein Käsebrötchen.|Ich nehme ein Brötchen mit Käse.'),
    S('Het huisje is klein maar gezellig.', 'Das Häuschen ist klein, aber gemütlich.'),
    S('Wat een lief katje!', 'Was für ein süßes Kätzchen!|Was für ein liebes Kätzchen!'),
    S('Het kindje slaapt.', 'Das Kind schläft.|Das Kindchen schläft.'),
    S('Mag ik een koekje?', 'Darf ich einen Keks?|Darf ich einen Keks haben?|Kann ich einen Keks haben?'),
    S('Ik drink een biertje.', 'Ich trinke ein Bier.|Ich trinke ein Bierchen.'),
    S('Ik heb een pakje voor je.', 'Ich habe ein Päckchen für dich.'),
    S('Ik geef mijn oma een bloemetje.', 'Ich schenke meiner Oma ein paar Blumen.|Ich schenke meiner Oma Blumen.|Ich gebe meiner Oma ein Blümchen.'),
    S('Het is hier erg gezellig.', 'Es ist hier sehr gemütlich.|Hier ist es sehr gemütlich.'),
    S('Een stukje kaas, alsjeblieft.', 'Ein Stückchen Käse, bitte.|Ein Stück Käse, bitte.'),
    S('Het hondje speelt in de tuin.', 'Das Hündchen spielt im Garten.'),
    S('De kinderen eten snoepjes.', 'Die Kinder essen Bonbons.|Die Kinder essen Süßigkeiten.'),
    S('Ik schrijf het in mijn boekje.', 'Ich schreibe es in mein Heft.|Ich schreibe es in mein Büchlein.'),
    S('Ik heb een kamertje boven.', 'Ich habe oben ein kleines Zimmer.|Ich habe ein kleines Zimmer oben.'),
    S('Het treintje rijdt door het park.', 'Der kleine Zug fährt durch den Park.'),
    S('Wil je een snoepje?', 'Möchtest du ein Bonbon?|Willst du ein Bonbon?'),
    S('Dat is een gezellig café.', 'Das ist ein gemütliches Café.'),
    S('We drinken een kopje thee.', 'Wir trinken eine Tasse Tee.'),
    S('Er staat een boompje in de tuin.', 'Im Garten steht ein Bäumchen.|Im Garten steht ein kleiner Baum.|Ein kleiner Baum steht im Garten.'),
    S('Het tasje is van mijn zus.', 'Die kleine Tasche gehört meiner Schwester.|Das Täschchen gehört meiner Schwester.'),
    S('Een lepeltje suiker, alsjeblieft.', 'Ein Löffelchen Zucker, bitte.|Einen kleinen Löffel Zucker, bitte.'),
    S('Het mannetje is grappig.', 'Das Männchen ist lustig.|Der kleine Mann ist lustig.'),
    S('Wat een gezellige avond!', 'Was für ein gemütlicher Abend!|Was für ein schöner Abend!'),
  ],
  cloze: [
    C('{Het} huisje is klein.', 'De|Het', 'Das Häuschen ist klein.'),
    C('{Het} katje is lief.', 'De|Het', 'Das Kätzchen ist lieb.'),
    C('Wil je een {kopje} koffie?', 'kopje|!koppje|!kopetje', 'Möchtest du eine Tasse Kaffee?'),
    C('Het {mannetje} is grappig.', 'mannetje|!mannje|!mantje', 'Das Männchen ist lustig.'),
    C('Er staat een {boompje} in de tuin.', 'boompje|!boomje|!boomtje', 'Im Garten steht ein Bäumchen.'),
    C('Dat is een {gezellig} café.', 'gezellig|gezellige', 'Das ist ein gemütliches Café.'),
    C('De kinderen eten {snoepjes}.', 'snoepjes|!snoepjen|!snoepjeen', 'Die Kinder essen Bonbons.'),
  ],
  story: story('st25', 'In het café', 'Im Café', [
    ['Ober', 'Goedemiddag! Wat willen jullie drinken?', 'Guten Tag! Was möchtet ihr trinken?'],
    ['Fleur', 'Voor mij een kopje thee, alstublieft.', 'Für mich eine Tasse Tee, bitte.'],
    ['Jan', 'En voor mij een biertje.', 'Und für mich ein Bier.'],
    Q('Was trinkt Jan?', ['Ein Bier', 'Tee', 'Kaffee'], 0),
    ['Ober', 'Willen jullie er iets bij? Een koekje of een broodje?', 'Möchtet ihr etwas dazu? Einen Keks oder ein Brötchen?'],
    ['Fleur', 'Een koekje, graag.', 'Einen Keks, gern.'],
    ['Jan', 'Het is hier echt gezellig!', 'Es ist hier wirklich gemütlich!'],
    Q('Wie findet Jan das Café?', ['Gemütlich', 'Teuer', 'Langweilig'], 0),
  ]),
});

const u26 = unit({
  id: 'u26',
  title: 'Bitten und Aufforderungen',
  description: 'Imperativ, maar, even, eens und nützliche Sätze',
  tips: [
    T(
      'Der Imperativ',
      `
      Die Befehlsform ist der Stamm: *Kom! Ga zitten! Wacht! Luister!*

      Verneint: *Vergeet het niet!*

      Von *zijn* lautet sie **wees**: *Wees stil!* „Sei still!“

      Sehr höflich mit **u** (Stamm + t): *Komt u binnen. Zegt u het maar.*
      `,
      [
        ['Ga zitten.', 'Setz dich.'],
        ['Wees stil, de baby slaapt.', 'Sei still, das Baby schläft.'],
      ],
    ),
    T(
      'maar, even, eens',
      `
      Diese kleinen Wörter machen Aufforderungen freundlich:

      - **maar**: *Kom maar binnen.* „Komm ruhig rein.“
      - **even**: *Wacht even.* „Warte mal kurz.“
      - **eens**: *Kijk eens!* „Schau mal!“
      `,
      [['Kom maar binnen!', 'Komm ruhig herein!']],
    ),
    T(
      'Nützliche Sätze',
      `
      - *Pas op! / Let op!* „Vorsicht! / Pass auf!“
      - *Een moment, alstublieft.* „Einen Moment, bitte.“
      - *Geen idee.* „Keine Ahnung.“
      - *Rustig aan!* „Immer mit der Ruhe!“
      - *Zegt u het maar.* „Was darf es sein?“
      `,
    ),
  ],
  words: [
    W('maar', 'ruhig, nur (in Aufforderungen)', 'adv', { id: 'maar-part' }),
    W('eens', 'mal', 'adv'),
    W('wees', 'sei (Imperativ von zijn)', 'verb'),
    W('toch', 'doch, trotzdem', 'adv'),
    W('nou', 'na, nun', 'interj'),
    W('zeker', 'sicher, bestimmt', 'adv'),
    W('wat', 'etwas (wat langzamer)', 'adv', { id: 'wat-iets' }),
    V('zeggen', 'sagen', 'zeg zegt zeggen | zei zeiden | gezegd h'),
    V('opletten', 'aufpassen', 'let let letten | lette letten | opgelet h', { sep: 'op' }),
    V('oppassen', 'aufpassen; babysitten', 'pas past passen | paste pasten | opgepast h', { sep: 'op' }),
    V('praten', 'reden, sprechen', 'praat praat praten | praatte praatten | gepraat h'),
    V('openen', 'öffnen', 'open opent openen | opende openden | geopend h'),
    V('sluiten', 'schließen', 'sluit sluit sluiten | sloot sloten | gesloten h'),
    V('proberen', 'versuchen, probieren', 'probeer probeert proberen | probeerde probeerden | geprobeerd h'),
    V('vergeten', 'vergessen', 'vergeet vergeet vergeten | vergat vergaten | vergeten hz'),
    V('pakken', 'nehmen, greifen', 'pak pakt pakken | pakte pakten | gepakt h'),
    A('stil', 'still, leise', 'stille stiller stilst'),
    N('het moment', 'der Moment', 'momenten'),
    N('de klas', 'die Klasse', 'klassen'),
    N('de juf', 'die Lehrerin (Grundschule)', 'juffen'),
    N('de bladzijde', 'die Seite (Buch)', 'bladzijden'),
    W('allemaal', 'alle, alles', 'pron'),
    P('pas op', 'Vorsicht, pass auf'),
    P('geen idee', 'keine Ahnung'),
    P('rustig aan', 'immer mit der Ruhe'),
  ],
  sentences: [
    S('Kom maar binnen!', 'Komm ruhig herein!|Komm doch herein!|Komm rein!'),
    S('Ga zitten.', 'Setz dich.|Setzen Sie sich.'),
    S('Wacht even!', 'Warte mal!|Warte kurz!'),
    S('Let op!', 'Pass auf!|Achtung!'),
    S('Pas op, de vloer is nat!', 'Vorsicht, der Boden ist nass!|Pass auf, der Boden ist nass!'),
    S('Wees stil, de baby slaapt.', 'Sei still, das Baby schläft.|Sei leise, das Baby schläft.'),
    S('Vergeet je sleutels niet!', 'Vergiss deine Schlüssel nicht!'),
    S('Zegt u het maar.', 'Was darf es sein?|Bitte schön, was darf es sein?'),
    S('Probeer het nog een keer.|Probeer het nog eens.', 'Versuch es noch einmal.|Versuch es nochmal.'),
    S('Kunt u de deur sluiten?', 'Können Sie die Tür schließen?'),
    S('Open het raam even, alsjeblieft.|Doe het raam even open, alsjeblieft.', 'Mach bitte mal das Fenster auf.|Öffne bitte mal das Fenster.'),
    S('Luister eens!', 'Hör mal!'),
    S('Kijk eens!', 'Schau mal!|Guck mal!'),
    S('Een moment, alstublieft.', 'Einen Moment, bitte.'),
    S('Spreek wat langzamer, alsjeblieft.', 'Sprich bitte etwas langsamer.'),
    S('Praat niet zo hard!', 'Sprich nicht so laut!|Rede nicht so laut!'),
    S('Rustig aan!', 'Immer mit der Ruhe!|Langsam!'),
    S('Geen idee.', 'Keine Ahnung.'),
    S('Nou, dat weet ik niet.', 'Na ja, das weiß ich nicht.|Nun, das weiß ich nicht.'),
    S('Kom toch mee!', 'Komm doch mit!'),
    S('Zeker!', 'Sicher!|Klar!|Natürlich!'),
    S('Ga maar naar huis.', 'Geh ruhig nach Hause.|Geh nur nach Hause.'),
    S('Vergeet het maar.', 'Vergiss es.|Vergiss es einfach.'),
    S('Mag ik even iets zeggen?', 'Darf ich kurz etwas sagen?'),
    S('Pak je boek en open het op bladzijde tien.', 'Nimm dein Buch und schlag es auf Seite zehn auf.|Nimm dein Buch und öffne es auf Seite zehn.'),
    S('Kun jij vanavond oppassen?', 'Kannst du heute Abend babysitten?|Kannst du heute Abend auf die Kinder aufpassen?'),
  ],
  cloze: [
    C('{Kom} maar binnen!', 'Kom|Komt|Komen', 'Komm ruhig herein!'),
    C('Vergeet je sleutels {niet}!', 'niet|geen', 'Vergiss deine Schlüssel nicht!'),
    C('{Wees} stil!', 'Wees|Ben|Bent', 'Sei still!'),
    C('Luister {eens}!', 'eens|een|één', 'Hör mal!'),
    C('{Ga} zitten.', 'Ga|Gaat|Gaan', 'Setz dich.'),
    C('Wacht {even}!', 'even|eens|maar', 'Warte mal kurz!'),
    C('Kunt u de deur {sluiten}?', 'sluiten|sluit|!sluitt', 'Können Sie die Tür schließen?'),
  ],
  story: story('st26', 'In de klas', 'In der Klasse', [
    ['Juf Anna', 'Goedemorgen allemaal! Ga zitten, alsjeblieft.', 'Guten Morgen, alle zusammen! Setzt euch bitte.'],
    ['Juf Anna', 'Pak je boek en open het op bladzijde tien.', 'Nehmt euer Buch und schlagt es auf Seite zehn auf.'],
    ['Sem', 'Sorry juf, mijn boek ligt thuis.', 'Entschuldigung, mein Buch liegt zu Hause.'],
    ['Juf Anna', 'Geen probleem. Kijk maar mee met Lotte.', 'Kein Problem. Schau einfach bei Lotte mit.'],
    Q('Wo ist Sems Buch?', ['Zu Hause', 'In der Tasche', 'Bei Lotte'], 0),
    ['Juf Anna', 'Luister goed en let op!', 'Hört gut zu und passt auf!'],
    ['Lotte', 'Juf, kunt u dat herhalen?', 'Können Sie das wiederholen?'],
    Q('Mit wem schaut Sem ins Buch?', ['Mit Lotte', 'Mit der Lehrerin', 'Allein'], 0),
  ]),
});

const u27 = unit({
  id: 'u27',
  title: 'Vergleiche',
  description: 'größer als, so groß wie, am größten',
  tips: [
    T(
      'Komparativ und Superlativ',
      `
      Wie im Deutschen: **-er** und **-st**.

      - *groot – groter – grootst*
      - *snel – sneller – snelst*
      - Endet das Wort auf **r**, kommt **-der**: *duur – duurder*, *zwaar – zwaarder*, *ver – verder*

      Vor dem Nomen bekommt der Superlativ ein **-e**: *de grootste stad*.
      `,
      [
        ['Mijn broer is groter dan ik.', 'Mein Bruder ist größer als ich.'],
        ['Dit is de beste koffie van de stad.', 'Das ist der beste Kaffee der Stadt.'],
      ],
    ),
    T(
      'Unregelmäßig',
      `
      | | | |
      |---|---|---|
      | goed | beter | best |
      | veel | meer | meest |
      | weinig | minder | minst |
      | graag | liever | liefst |
      `,
    ),
    T(
      'dan und als',
      `
      - „größer **als**“ = *groter* **dan**
      - „so groß **wie**“ = *even groot* **als** oder *net zo groot als*

      Nach dem Komparativ steht im Standardniederländischen **dan**. *Groter als* hört man oft, es gilt aber als falsch.

      „Am größten“ heißt *het grootst* oder *het grootste*: *Welke berg is het hoogst?*
      `,
      [['Ik ben even oud als jij.', 'Ich bin genauso alt wie du.']],
    ),
  ],
  words: [
    W('dan', 'als (nach Komparativ)', 'conj', { id: 'dan-vgl' }),
    W('als', 'wie (so … wie); als', 'conj'),
    W('even', 'genauso (even groot als)', 'adv', { id: 'even-vgl' }),
    P('net zo', 'genauso'),
    W('minder', 'weniger', 'adv'),
    W('meest', 'am meisten', 'adv'),
    W('steeds', 'immer (mehr), ständig', 'adv'),
    A('weinig', 'wenig', 'weinige minder minst'),
    A('hoog', 'hoch', 'hoge hoger hoogst'),
    A('laag', 'niedrig', 'lage lager laagst'),
    A('dik', 'dick', 'dikke dikker dikst'),
    A('dun', 'dünn', 'dunne dunner dunst'),
    A('zwaar', 'schwer', 'zware zwaarder zwaarst'),
    A('licht', 'leicht; hell', 'lichte lichter lichtst', { id: 'licht-adj' }),
    A('makkelijk', 'leicht, einfach', 'makkelijke makkelijker makkelijkst'),
    A('moeilijk', 'schwierig', 'moeilijke moeilijker moeilijkst'),
    A('sterk', 'stark', 'sterke sterker sterkst'),
    A('zwak', 'schwach', 'zwakke zwakker zwakst'),
    A('rijk', 'reich', 'rijke rijker rijkst'),
    A('arm', 'arm', 'arme armer armst', { id: 'arm-adj' }),
    A('slim', 'klug', 'slimme slimmer slimst'),
    A('dom', 'dumm', 'domme dommer domst'),
    A('belangrijk', 'wichtig', 'belangrijke belangrijker belangrijkst'),
    N('de berg', 'der Berg', 'bergen', '⛰️'),
    N('de toren', 'der Turm', 'torens', '🗼'),
    N('de rivier', 'der Fluss', 'rivieren'),
    N('de zee', 'das Meer, die See', 'zeeën', '🌊'),
    N('het land', 'das Land', 'landen'),
    N('de oefening', 'die Übung', 'oefeningen'),
    N('de griep', 'die Grippe', '-', '🤧'),
    N('de kilometer', 'der Kilometer', 'kilometers'),
    W('Rijn', 'Rhein', 'name'),
  ],
  sentences: [
    S('Mijn broer is groter dan ik.', 'Mein Bruder ist größer als ich.'),
    S('De auto is sneller dan de fiets.', 'Das Auto ist schneller als das Fahrrad.'),
    S('Amsterdam is groter dan Utrecht.', 'Amsterdam ist größer als Utrecht.'),
    S('Deze jas is duurder.', 'Diese Jacke ist teurer.|Dieser Mantel ist teurer.'),
    S('Voor Duitsers is Nederlands niet moeilijk.', 'Für Deutsche ist Niederländisch nicht schwer.|Für Deutsche ist Niederländisch nicht schwierig.'),
    S('Ik ben even oud als jij.', 'Ich bin genauso alt wie du.|Ich bin so alt wie du.'),
    S('Hij is net zo groot als zijn vader.', 'Er ist genauso groß wie sein Vater.|Er ist so groß wie sein Vater.'),
    S('Dit is de beste koffie van de stad.', 'Das ist der beste Kaffee der Stadt.'),
    S('Anna is de jongste.', 'Anna ist die Jüngste.'),
    S('Welke berg is het hoogst?|Welke berg is het hoogste?', 'Welcher Berg ist am höchsten?|Welcher Berg ist der höchste?'),
    S('Ik heb meer tijd dan jij.', 'Ich habe mehr Zeit als du.'),
    S('Ik drink minder koffie dan vroeger.', 'Ich trinke weniger Kaffee als früher.'),
    S('Dit is het mooiste huis van de straat.', 'Das ist das schönste Haus der Straße.|Das ist das schönste Haus in der Straße.'),
    S('Het is beter zo.', 'Es ist besser so.|So ist es besser.'),
    S('De Rijn is een lange rivier.', 'Der Rhein ist ein langer Fluss.'),
    S('Nederland is een klein land.', 'Die Niederlande sind ein kleines Land.'),
    S('De zee is vandaag rustig.', 'Das Meer ist heute ruhig.|Die See ist heute ruhig.'),
    S('Die tas is te zwaar.', 'Die Tasche da ist zu schwer.|Diese Tasche ist zu schwer.'),
    S('Deze tas is lichter.', 'Diese Tasche ist leichter.'),
    S('De toren is hoger dan de kerk.', 'Der Turm ist höher als die Kirche.'),
    S('Wie is het slimst?|Wie is het slimste?', 'Wer ist am klügsten?|Wer ist der Klügste?'),
    S('Deze oefening is moeilijker.', 'Diese Übung ist schwieriger.|Diese Übung ist schwerer.'),
    S('Het wordt steeds beter.', 'Es wird immer besser.'),
    S('Hij is sterker dan ik.', 'Er ist stärker als ich.'),
    S('Zij is rijker dan haar broer.', 'Sie ist reicher als ihr Bruder.'),
    S('Het boek is dik, maar het is makkelijk.', 'Das Buch ist dick, aber es ist leicht.|Das Buch ist dick, aber es ist einfach.'),
    S('Dat is een domme vraag.', 'Das ist eine dumme Frage.'),
    S('De stoel is te laag.', 'Der Stuhl ist zu niedrig.'),
    S('Het boek is dun en licht.', 'Das Buch ist dünn und leicht.'),
    S('Na de griep is hij nog zwak.', 'Nach der Grippe ist er noch schwach.'),
  ],
  cloze: [
    C('Mijn broer is {groter} dan ik.', 'groter|groot|grootst', 'Mein Bruder ist größer als ich.'),
    C('De auto is sneller {dan} de fiets.', 'dan|als|dat', 'Das Auto ist schneller als das Fahrrad.'),
    C('Ik ben even oud {als} jij.', 'als|dan|wie', 'Ich bin genauso alt wie du.'),
    C('Deze jas is {duurder}.', 'duurder|!duurer|!duurrer', 'Diese Jacke ist teurer.'),
    C('Dit is de {beste} koffie van de stad.', 'beste|best|goede', 'Das ist der beste Kaffee der Stadt.'),
    C('Het wordt {steeds} beter.', 'steeds|nooit', 'Es wird immer besser.'),
    C('Ik heb {meer} tijd dan jij.', 'meer|veel|meest', 'Ich habe mehr Zeit als du.'),
  ],
  story: story('st27', 'Welke fiets?', 'Welches Fahrrad?', [
    ['Lucas', 'Welke fiets is beter, de rode of de zwarte?', 'Welches Fahrrad ist besser, das rote oder das schwarze?'],
    ['Verkoper', 'De zwarte is lichter en sneller.', 'Das schwarze ist leichter und schneller.'],
    ['Lucas', 'Maar hij is ook duurder.', 'Aber es ist auch teurer.'],
    Q('Welches Fahrrad ist schneller?', ['Das schwarze', 'Das rote', 'Beide gleich'], 0),
    ['Verkoper', 'Ja, de rode is goedkoper, maar zwaarder.', 'Ja, das rote ist billiger, aber schwerer.'],
    ['Lucas', 'Ik fiets elke dag twintig kilometer. Snel is belangrijk.', 'Ich fahre jeden Tag zwanzig Kilometer Rad. Schnell ist wichtig.'],
    ['Lucas', 'Ik neem de zwarte. De beste fiets is niet altijd de goedkoopste!', 'Ich nehme das schwarze. Das beste Fahrrad ist nicht immer das billigste!'],
    Q('Welches Fahrrad kauft Lucas?', ['Das schwarze', 'Das rote', 'Keins'], 0),
  ]),
});

const u28 = unit({
  id: 'u28',
  title: 'Im Restaurant',
  description: 'Reservieren, bestellen, bezahlen, typische Gerichte',
  tips: [
    T(
      'Im Restaurant',
      `
      - *Ik wil graag een tafel reserveren.* „Ich möchte einen Tisch reservieren.“
      - *Wat kunt u aanraden?* „Was können Sie empfehlen?“
      - *Ik neem …* „Ich nehme …“
      - *Het smaakt heerlijk!* „Es schmeckt köstlich!“
      - *Mag ik de rekening?* „Kann ich die Rechnung haben?“
      - *Kunnen we apart betalen?* „Können wir getrennt bezahlen?“
      `,
      [['Mag ik de rekening, alstublieft?', 'Kann ich die Rechnung haben?']],
    ),
    T(
      'Typisch niederländisch',
      `
      - **bitterballen**: frittierte Ragoutkugeln, oft zum Bier
      - **stroopwafel**: dünne Waffel mit Sirup
      - **patat** oder **friet**: Pommes (*patat* eher im Norden, *friet* im Süden und in Belgien)
      - zum Anstoßen: *Proost!*
      `,
      [['Bitterballen zijn typisch Nederlands.', 'Bitterballen sind typisch niederländisch.']],
    ),
    T(
      'Hunger und Durst',
      `
      Wie im Deutschen: *Ik heb honger.* „Ich habe Hunger.“ *Heb je dorst?* „Hast du Durst?“

      **zout** ist das Salz und auch „salzig“: *De soep is te zout.*
      `,
    ),
  ],
  words: [
    N('de ober', 'der Kellner', 'obers'),
    N('de serveerster', 'die Kellnerin', 'serveersters'),
    N('de menukaart', 'die Speisekarte', 'menukaarten'),
    N('de rekening', 'die Rechnung', 'rekeningen', '🧾'),
    N('de fooi', 'das Trinkgeld', 'fooien'),
    N('het voorgerecht', 'die Vorspeise', 'voorgerechten'),
    N('het hoofdgerecht', 'das Hauptgericht', 'hoofdgerechten'),
    N('het nagerecht', 'der Nachtisch', 'nagerechten'),
    N('het toetje', 'der Nachtisch (Dessert)', 'toetjes', '🍮'),
    N('het gerecht', 'das Gericht', 'gerechten'),
    N('de persoon', 'die Person', 'personen'),
    N('de patat', 'die Pommes', '-', '🍟'),
    N('de saus', 'die Soße', 'sauzen'),
    N('de salade', 'der Salat', 'salades', '🥗'),
    N('de kip', 'das Hähnchen, das Huhn', 'kippen', '🍗'),
    N('het ijs', 'das Eis', '-', '🍦', { forms: 'ijsje ijsjes' }),
    N('de taart', 'die Torte, der Kuchen', 'taarten', '🍰'),
    N('de bitterbal', 'die Bitterbal (Ragoutkugel)', 'bitterballen'),
    N('de stroopwafel', 'die Sirupwaffel', 'stroopwafels', '🧇'),
    N('het mes', 'das Messer', 'messen', '🔪'),
    N('de vork', 'die Gabel', 'vorken', '🍴'),
    N('de lepel', 'der Löffel', 'lepels', '🥄'),
    N('het bord', 'der Teller; das Schild', 'borden', '🍽️'),
    N('het zout', 'das Salz', '-', '🧂', { id: 'zout-noun' }),
    N('de peper', 'der Pfeffer', '-'),
    N('de honger', 'der Hunger', '-'),
    N('de dorst', 'der Durst', '-'),
    A('hongerig', 'hungrig', 'hongerige - -'),
    V('bestellen', 'bestellen', 'bestel bestelt bestellen | bestelde bestelden | besteld h'),
    V('reserveren', 'reservieren', 'reserveer reserveert reserveren | reserveerde reserveerden | gereserveerd h'),
    V('aanraden', 'empfehlen', 'raad raadt raden | raadde/ried raadden/rieden | aangeraden h', { sep: 'aan' }),
    V('smaken', 'schmecken', 'smaak smaakt smaken | smaakte smaakten | gesmaakt h'),
    A('vegetarisch', 'vegetarisch', 'vegetarische - -'),
    A('scherp', 'scharf', 'scherpe scherper scherpst'),
    A('zoet', 'süß', 'zoete zoeter zoetst'),
    A('zout', 'salzig', 'zoute zouter zoutst'),
    A('heerlijk', 'köstlich, herrlich', 'heerlijke heerlijker heerlijkst'),
    A('vriendelijk', 'freundlich', 'vriendelijke vriendelijker vriendelijkst'),
    A('typisch', 'typisch', 'typische - -'),
    A('Nederlands', 'niederländisch', 'Nederlandse - -', { id: 'nederlands-adj' }),
    W('apart', 'getrennt', 'adv'),
    W('proost', 'prost', 'interj'),
  ],
  sentences: [
    S('Ik wil graag een tafel reserveren.', 'Ich möchte gern einen Tisch reservieren.|Ich möchte einen Tisch reservieren.'),
    S('Voor hoeveel personen?', 'Für wie viele Personen?'),
    S('Voor vier personen, om zeven uur.', 'Für vier Personen, um sieben Uhr.'),
    S('Mag ik de menukaart?', 'Kann ich die Speisekarte haben?|Darf ich die Speisekarte haben?'),
    S('Wat kunt u aanraden?', 'Was können Sie empfehlen?'),
    S('Ik neem de vis met patat.', 'Ich nehme den Fisch mit Pommes.'),
    S('Is dit gerecht vegetarisch?', 'Ist dieses Gericht vegetarisch?'),
    S('Ik heb honger.', 'Ich habe Hunger.'),
    S('Heb je dorst?', 'Hast du Durst?'),
    S('Als voorgerecht neem ik soep.', 'Als Vorspeise nehme ich Suppe.'),
    S('Wat wilt u drinken?', 'Was möchten Sie trinken?|Was wollen Sie trinken?'),
    S('Een glas rode wijn, alstublieft.', 'Ein Glas Rotwein, bitte.'),
    S('Het smaakt heerlijk!', 'Es schmeckt köstlich!|Es schmeckt herrlich!|Es schmeckt sehr gut!'),
    S('Proost!', 'Prost!|Zum Wohl!'),
    S('Mag ik nog wat brood?', 'Kann ich noch etwas Brot haben?|Darf ich noch etwas Brot haben?'),
    S('De soep is te zout.', 'Die Suppe ist zu salzig.'),
    S('Wilt u een toetje?', 'Möchten Sie einen Nachtisch?'),
    S('Ja, een ijsje graag.', 'Ja, ein Eis bitte.|Ja, gern ein Eis.'),
    S('Mag ik de rekening, alstublieft?', 'Kann ich die Rechnung haben?|Die Rechnung, bitte.|Kann ich bitte zahlen?'),
    S('Kunnen we apart betalen?', 'Können wir getrennt bezahlen?|Können wir getrennt zahlen?'),
    S('Ik geef een fooi.', 'Ich gebe Trinkgeld.|Ich gebe ein Trinkgeld.'),
    S('Ik heb geen vork.', 'Ich habe keine Gabel.'),
    S('Het mes ligt naast het bord.', 'Das Messer liegt neben dem Teller.'),
    S('Bitterballen zijn typisch Nederlands.', 'Bitterballen sind typisch niederländisch.'),
    S('De kip is erg lekker.', 'Das Hähnchen ist sehr lecker.'),
    S('Bij de koffie eet ik een stroopwafel.', 'Zum Kaffee esse ich eine Stroopwafel.|Zum Kaffee esse ich eine Sirupwaffel.'),
    S('Ik bestel een salade met kip.', 'Ich bestelle einen Salat mit Hähnchen.'),
    S('De saus is scherp.', 'Die Soße ist scharf.'),
    S('De ober brengt de menukaart.', 'Der Kellner bringt die Speisekarte.'),
    S('De serveerster is erg vriendelijk.', 'Die Kellnerin ist sehr freundlich.'),
    S('Als hoofdgerecht neem ik kip.', 'Als Hauptgericht nehme ich Hähnchen.'),
    S('Als nagerecht eten we taart.', 'Als Nachtisch essen wir Kuchen.|Als Nachtisch essen wir Torte.'),
    S('Mag ik een lepel?', 'Kann ich einen Löffel haben?|Darf ich einen Löffel haben?'),
    S('Wil je peper en zout?', 'Möchtest du Pfeffer und Salz?|Willst du Pfeffer und Salz?'),
    S('Het toetje is erg zoet.', 'Der Nachtisch ist sehr süß.'),
  ],
  cloze: [
    C('Het {smaakt} heerlijk!', 'smaak|smaakt|smaken', 'Es schmeckt köstlich!'),
    C('Ik wil graag een tafel {reserveren}.', 'reserveren|reserveer|reserveert', 'Ich möchte einen Tisch reservieren.'),
    C('Mag ik de {rekening}?', 'rekening|vork|soep', 'Kann ich die Rechnung haben?'),
    C('Ik heb {honger}.', 'honger|hongerig', 'Ich habe Hunger.'),
    C('Een glas {rode} wijn.', 'rood|rode', 'Ein Glas Rotwein.'),
    C('Kunnen we {apart} betalen?', 'apart|samen|alleen', 'Können wir getrennt bezahlen?'),
    C('Ik {bestel} een salade.', 'bestel|bestelt|bestellen', 'Ich bestelle einen Salat.'),
  ],
  story: story('st28', 'In het restaurant', 'Im Restaurant', [
    ['Ober', 'Goedenavond! Heeft u gereserveerd?', 'Guten Abend! Haben Sie reserviert?'],
    ['Anna', 'Ja, op naam van De Vries. Voor twee personen.', 'Ja, auf den Namen De Vries. Für zwei Personen.'],
    ['Ober', 'Komt u maar mee. Hier is de menukaart.', 'Kommen Sie bitte mit. Hier ist die Speisekarte.'],
    Q('Für wie viele Personen ist der Tisch?', ['Zwei', 'Vier', 'Drei'], 0),
    ['Anna', 'Wat kunt u aanraden?', 'Was können Sie empfehlen?'],
    ['Ober', 'De vis is vandaag heel vers.', 'Der Fisch ist heute sehr frisch.'],
    ['Anna', 'Dan neem ik de vis. En een glas witte wijn, graag.', 'Dann nehme ich den Fisch. Und ein Glas Weißwein, bitte.'],
    Q('Was bestellt Anna?', ['Fisch und Weißwein', 'Hähnchen und Bier', 'Suppe und Wasser'], 0),
    ['Anna', 'Het smaakt heerlijk! Mag ik de rekening?', 'Es schmeckt köstlich! Kann ich die Rechnung haben?'],
    Q('Wie schmeckt Anna das Essen?', ['Köstlich', 'Zu salzig', 'Nicht gut'], 0),
  ]),
});

const u29 = unit({
  id: 'u29',
  title: 'Arbeit und Beruf',
  description: 'Berufe, Büro, Kollegen, verdienen, sich bewerben',
  tips: [
    T(
      'Beruf ohne Artikel',
      `
      Wie im Deutschen steht bei Berufen kein Artikel:

      - *Ik ben leraar.* „Ich bin Lehrer.“
      - *Hij werkt als kok.* „Er arbeitet als Koch.“
      - Beim Arbeitgeber steht **bij**: *Ik werk bij een bank.*
      `,
      [['Hij werkt als kok in een restaurant.', 'Er arbeitet als Koch in einem Restaurant.']],
    ),
    T(
      'Männlich und weiblich',
      `
      Manche Berufe haben eine weibliche Form: *leraar – lerares*, *verkoper – verkoopster*.

      Viele sind für alle gleich: *de arts, de verpleegkundige, de collega, de dokter*.
      `,
    ),
    T(
      'Fragen zur Arbeit',
      `
      - *Wat doe je voor werk?* „Was machst du beruflich?“
      - *Wat is je beroep?* „Was ist dein Beruf?“
      - *Waar werk je?* „Wo arbeitest du?“
      - *Ik werk parttime / fulltime.* „Ich arbeite Teilzeit / Vollzeit.“
      `,
    ),
  ],
  words: [
    N('het werk', 'die Arbeit', '-'),
    N('de baan', 'die Stelle, der Job', 'banen'),
    N('het beroep', 'der Beruf', 'beroepen'),
    N('het kantoor', 'das Büro', 'kantoren', '🏢'),
    N('de collega', 'der Kollege, die Kollegin', "collega's"),
    N('de baas', 'der Chef, die Chefin', 'bazen'),
    N('de leraar', 'der Lehrer', 'leraren/leraars', '🧑‍🏫'),
    N('de lerares', 'die Lehrerin', 'leraressen'),
    N('de arts', 'der Arzt, die Ärztin', 'artsen', '🧑‍⚕️'),
    N('de verpleegkundige', 'die Pflegekraft', 'verpleegkundigen'),
    N('de kok', 'der Koch', 'koks', '🧑‍🍳'),
    N('de student', 'der Student', 'studenten', '🧑‍🎓'),
    N('de politieagent', 'der Polizist', 'politieagenten', '👮'),
    N('de boer', 'der Bauer', 'boeren', '🧑‍🌾'),
    N('de ingenieur', 'der Ingenieur', 'ingenieurs'),
    N('de vergadering', 'die Besprechung', 'vergaderingen'),
    N('het salaris', 'das Gehalt', 'salarissen'),
    N('de basisschool', 'die Grundschule', 'basisscholen'),
    N('het nieuws', 'die Nachrichten, die Neuigkeiten', '-'),
    V('verdienen', 'verdienen', 'verdien verdient verdienen | verdiende verdienden | verdiend h'),
    V('studeren', 'studieren', 'studeer studeert studeren | studeerde studeerden | gestudeerd h'),
    V('solliciteren', 'sich bewerben', 'solliciteer solliciteert solliciteren | solliciteerde solliciteerden | gesolliciteerd h'),
    V('vergaderen', 'eine Besprechung haben', 'vergader vergadert vergaderen | vergaderde vergaderden | vergaderd h'),
    A('werkloos', 'arbeitslos', 'werkloze - -'),
    A('parttime', 'Teilzeit', '- - -'),
    A('fulltime', 'Vollzeit', '- - -'),
    A('streng', 'streng', 'strenge strenger strengst'),
    W('gefeliciteerd', 'herzlichen Glückwunsch', 'interj'),
    W('Leiden', 'Leiden', 'name', { core: false }),
  ],
  sentences: [
    S('Wat doe je voor werk?|Wat voor werk doe je?', 'Was machst du beruflich?|Was arbeitest du?'),
    S('Ik ben leraar.', 'Ich bin Lehrer.'),
    S('Mijn moeder is arts.', 'Meine Mutter ist Ärztin.'),
    S('Hij werkt als kok in een restaurant.', 'Er arbeitet als Koch in einem Restaurant.'),
    S('Ik werk bij een bank.', 'Ich arbeite bei einer Bank.'),
    S('Mijn zus studeert in Leiden.', 'Meine Schwester studiert in Leiden.'),
    S('Ik ben student.', 'Ich bin Student.|Ich bin Studentin.'),
    S('Mijn kantoor is in het centrum.', 'Mein Büro ist im Zentrum.'),
    S("Mijn collega's zijn erg aardig.", 'Meine Kollegen sind sehr nett.|Meine Kolleginnen sind sehr nett.'),
    S('De baas is streng.', 'Der Chef ist streng.|Die Chefin ist streng.'),
    S('Ik heb om tien uur een vergadering.', 'Ich habe um zehn Uhr eine Besprechung.'),
    S('Hij verdient veel geld.', 'Er verdient viel Geld.'),
    S('Ik zoek een nieuwe baan.', 'Ich suche eine neue Stelle.|Ich suche einen neuen Job.'),
    S('Ze solliciteert bij een school.', 'Sie bewirbt sich bei einer Schule.'),
    S('Mijn vader is werkloos.', 'Mein Vater ist arbeitslos.'),
    S('Ik werk parttime.', 'Ich arbeite Teilzeit.|Ich arbeite in Teilzeit.'),
    S('De verpleegkundige werkt in het ziekenhuis.', 'Die Pflegekraft arbeitet im Krankenhaus.|Der Krankenpfleger arbeitet im Krankenhaus.|Die Krankenpflegerin arbeitet im Krankenhaus.'),
    S('De boer heeft veel koeien.', 'Der Bauer hat viele Kühe.'),
    S('Wat is je beroep?', 'Was ist dein Beruf?'),
    S('Ik ga met de fiets naar kantoor.', 'Ich fahre mit dem Fahrrad ins Büro.'),
    S('De lerares geeft les.', 'Die Lehrerin unterrichtet.|Die Lehrerin gibt Unterricht.'),
    S('Mijn buurman is politieagent.', 'Mein Nachbar ist Polizist.'),
    S('Ik werk van negen tot vijf.', 'Ich arbeite von neun bis fünf.'),
    S('Is het salaris goed?', 'Ist das Gehalt gut?'),
    S('Mijn broer wil ingenieur worden.', 'Mein Bruder will Ingenieur werden.|Mein Bruder möchte Ingenieur werden.'),
    S('Vandaag vergaderen we de hele dag.', 'Heute haben wir den ganzen Tag Besprechungen.|Heute haben wir den ganzen Tag eine Besprechung.'),
    S('Gefeliciteerd met je nieuwe baan!', 'Herzlichen Glückwunsch zu deiner neuen Stelle!|Glückwunsch zu deinem neuen Job!'),
  ],
  cloze: [
    C('Mijn moeder {is} arts.', 'is|zijn|ben', 'Meine Mutter ist Ärztin.'),
    C('Hij werkt {als} kok.', 'als|dan|zo', 'Er arbeitet als Koch.'),
    C('Ik werk {bij} een bank.', 'bij|aan|om', 'Ich arbeite bei einer Bank.'),
    C('Hij {verdient} veel geld.', 'verdien|verdient|verdienen', 'Er verdient viel Geld.'),
    C('Ik zoek een {nieuwe} baan.', 'nieuw|nieuwe', 'Ich suche eine neue Stelle.'),
    C("Mijn {collega's} zijn aardig.", "collega's|!collegas|!collegaas", 'Meine Kollegen sind nett.'),
    C('Ze {solliciteert} bij een school.', 'solliciteer|solliciteert|solliciteren', 'Sie bewirbt sich bei einer Schule.'),
  ],
  story: story('st29', 'Een nieuwe baan', 'Eine neue Stelle', [
    ['Sophie', 'Ik heb goed nieuws: ik heb een nieuwe baan!', 'Ich habe gute Neuigkeiten: Ich habe eine neue Stelle!'],
    ['Lucas', 'Gefeliciteerd! Wat ga je doen?', 'Herzlichen Glückwunsch! Was wirst du machen?'],
    ['Sophie', 'Ik word lerares op een basisschool.', 'Ich werde Lehrerin an einer Grundschule.'],
    Q('Was wird Sophie von Beruf?', ['Lehrerin', 'Ärztin', 'Köchin'], 0),
    ['Lucas', 'Leuk! Werk je fulltime?', 'Toll! Arbeitest du Vollzeit?'],
    ['Sophie', 'Nee, parttime. Vier dagen per week.', 'Nein, Teilzeit. Vier Tage pro Woche.'],
    Q('Wie viele Tage arbeitet Sophie?', ['Vier Tage pro Woche', 'Fünf Tage pro Woche', 'Zwei Tage pro Woche'], 0),
    ['Lucas', "En de collega's? Zijn ze aardig?", 'Und die Kollegen? Sind sie nett?'],
    ['Sophie', 'Ja, heel aardig. En mijn baas is ook leuk.', 'Ja, sehr nett. Und mein Chef ist auch nett.'],
  ]),
});

const u30 = unit({
  id: 'u30',
  title: 'Das kleine Wort er',
  description: 'er in allen Bedeutungen, Satzbau Zeit – Art – Ort',
  tips: [
    T(
      'Die Bedeutungen von er',
      `
      | Bedeutung | Beispiel |
      |---|---|
      | es gibt | *Er is een probleem.* |
      | dort, da | *Ik woon er al tien jaar.* |
      | davon (bei Mengen) | *Ik heb er drie.* |
      | da- + Präposition | *Ik denk er vaak aan.* |

      Bei Mengen ist **er** Pflicht: *Hoeveel broers heb je? Ik heb er twee.* Im Deutschen fällt das „davon“ meistens weg.
      `,
      [['Heb je broers? Ja, ik heb er twee.', 'Hast du Brüder? Ja, ich habe zwei.']],
    ),
    T(
      'er + Präposition',
      `
      „Daran, darüber, damit …“ heißt *eraan, erover, ermee …* Oft stehen die beiden Teile getrennt:

      - *Ik denk er vaak aan.* „Ich denke oft daran.“
      - *Wat doe je ermee?* „Was machst du damit?“

      Fragen bildet man mit **waar**: *Waar denk je aan?* „Woran denkst du?“ *Waar praten jullie over?* „Worüber redet ihr?“
      `,
      [['Waar denk je aan?', 'Woran denkst du?']],
    ),
    T(
      'Satzbau: Zeit – Art – Ort',
      `
      Wie im Deutschen kommt zuerst die Zeit, dann die Art, dann der Ort:

      *Ik ga **morgen** **met de trein** **naar Amsterdam**.*
      `,
      [['Ik ga morgen met de trein naar Amsterdam.', 'Ich fahre morgen mit dem Zug nach Amsterdam.']],
    ),
  ],
  words: [
    W('erop', 'darauf', 'adv'),
    W('erin', 'darin, hinein', 'adv'),
    W('ermee', 'damit', 'adv'),
    W('ervan', 'davon', 'adv'),
    W('erover', 'darüber', 'adv'),
    W('eraan', 'daran', 'adv'),
    W('erbij', 'dabei, dazu', 'adv'),
    W('daarom', 'deshalb', 'adv'),
    W('nu', 'jetzt', 'adv'),
    W('straks', 'gleich, nachher', 'adv'),
    W('eigenlijk', 'eigentlich', 'adv'),
    W('helemaal', 'ganz, völlig', 'adv'),
    W('bijna', 'fast', 'adv'),
    W('genoeg', 'genug', 'adv'),
    W('zelfs', 'sogar', 'adv'),
    V('denken', 'denken', 'denk denkt denken | dacht dachten | gedacht h'),
    V('leggen', 'legen', 'leg legt leggen | legde legden | gelegd h'),
    N('het examen', 'die Prüfung', 'examens'),
    N('het schepje', 'der Löffel voll', 'schepjes'),
  ],
  sentences: [
    S('Heb je broers? Ja, ik heb er twee.', 'Hast du Brüder? Ja, ich habe zwei.'),
    S('Ik denk er vaak aan.', 'Ich denke oft daran.'),
    S('Waar denk je aan?', 'Woran denkst du?'),
    S('Ik denk aan mijn familie.', 'Ich denke an meine Familie.'),
    S('Waar praten jullie over?', 'Worüber redet ihr?|Worüber sprecht ihr?'),
    S('We praten over het weekend.', 'Wir reden über das Wochenende.|Wir sprechen über das Wochenende.'),
    S('Ik weet er niets van.', 'Ich weiß nichts davon.'),
    S('Wat vind je ervan?', 'Was hältst du davon?|Wie findest du das?'),
    S('Er staat een fiets voor de deur.', 'Vor der Tür steht ein Fahrrad.|Ein Fahrrad steht vor der Tür.|Es steht ein Fahrrad vor der Tür.'),
    S('Ik woon er al tien jaar.', 'Ich wohne schon seit zehn Jahren dort.|Ich wohne dort schon seit zehn Jahren.'),
    S('Ik ga morgen met de trein naar Amsterdam.', 'Ich fahre morgen mit dem Zug nach Amsterdam.'),
    S('Morgen ga ik met de trein naar Amsterdam.', 'Morgen fahre ich mit dem Zug nach Amsterdam.'),
    S('Daarom leer ik Nederlands.', 'Deshalb lerne ich Niederländisch.'),
    S('Eigenlijk heb ik geen tijd.', 'Eigentlich habe ich keine Zeit.'),
    S('Ik ben bijna klaar.', 'Ich bin fast fertig.'),
    S('Het is helemaal goed.', 'Es ist völlig in Ordnung.|Das ist völlig in Ordnung.|Das ist ganz okay.'),
    S('Ik heb genoeg geld.', 'Ich habe genug Geld.'),
    S('Zelfs mijn opa leert Nederlands.', 'Sogar mein Opa lernt Niederländisch.'),
    S('Ik kom straks.', 'Ich komme gleich.|Ich komme nachher.'),
    S('Nu heb ik tijd.', 'Jetzt habe ich Zeit.'),
    S('Leg het boek erop.', 'Leg das Buch darauf.'),
    S('Doe er wat suiker in.', 'Tu etwas Zucker hinein.|Gib etwas Zucker hinein.'),
    S('Wat doe je ermee?', 'Was machst du damit?'),
    S('Ik ben er klaar mee.', 'Ich bin fertig damit.|Ich bin damit fertig.'),
    S('Er zijn nog twee broodjes.', 'Es gibt noch zwei Brötchen.|Es sind noch zwei Brötchen da.'),
    S('Ik heb morgen een examen.', 'Ich habe morgen eine Prüfung.'),
    S('We praten er later over.', 'Wir reden später darüber.|Wir sprechen später darüber.'),
    S('Ik moet eraan denken.', 'Ich muss daran denken.'),
    S('Wil je er melk bij?', 'Möchtest du Milch dazu?|Willst du Milch dazu?'),
    S('Wat weet je erover?', 'Was weißt du darüber?'),
    S('Ik wil erbij zijn.', 'Ich will dabei sein.|Ich möchte dabei sein.'),
  ],
  cloze: [
    C('Ik heb {er} drie.', 'er|het|ze', 'Ich habe drei (davon).'),
    C('Ik denk er vaak {aan}.', 'aan|op|over', 'Ich denke oft daran.'),
    C('Waar praten jullie {over}?', 'over|aan|van', 'Worüber redet ihr?'),
    C('Ik weet er niets {van}.', 'van|aan|mee', 'Ich weiß nichts davon.'),
    C('Wat doe je {ermee}?', 'ermee|erin|erop', 'Was machst du damit?'),
    C('Ik ga morgen met de trein {naar} Amsterdam.', 'naar|in|op', 'Ich fahre morgen mit dem Zug nach Amsterdam.'),
    C('Ik ben {bijna} klaar.', 'bijna|genoeg|zelfs', 'Ich bin fast fertig.'),
  ],
  story: story('st30', 'Een kopje thee bij oma', 'Eine Tasse Tee bei Oma', [
    ['Oma', 'Wil je een kopje thee?', 'Möchtest du eine Tasse Tee?'],
    ['Daan', 'Ja, graag. Met suiker, alsjeblieft.', 'Ja, gern. Mit Zucker, bitte.'],
    ['Oma', 'Hoeveel suiker: één schepje of twee?', 'Wie viel Zucker: einen Löffel oder zwei?'],
    ['Daan', 'Doe er maar twee in.', 'Tu ruhig zwei hinein.'],
    Q('Wie viele Löffel Zucker möchte Daan?', ['Zwei', 'Einen', 'Keinen'], 0),
    ['Oma', 'Waar denk je aan? Je bent zo stil.', 'Woran denkst du? Du bist so still.'],
    ['Daan', 'Ik denk aan mijn examens. Ik heb er morgen twee.', 'Ich denke an meine Prüfungen. Ich habe morgen zwei.'],
    Q('Woran denkt Daan?', ['An seine Prüfungen', 'An seine Familie', 'An das Wochenende'], 0),
    ['Oma', 'Je kunt het! Ik denk aan je.', 'Du schaffst das! Ich denke an dich.'],
  ]),
});

export default [u21, u22, u23, u24, u25, u26, u27, u28, u29, u30];
