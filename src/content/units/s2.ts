// Section 2 – Alltag (A1)
import { A, C, N, NP, P, Q, S, T, V, W, story, unit } from '../dsl';

const u11 = unit({
  id: 'u11',
  title: 'Tage und Tageszeiten',
  description: 'Wochentage, heute und morgen, das Verb an zweiter Stelle',
  tips: [
    T(
      'Wochentage und Tageszeiten',
      `
      | | |
      |---|---|
      | maandag | Montag |
      | dinsdag | Dienstag |
      | woensdag | Mittwoch |
      | donderdag | Donnerstag |
      | vrijdag | Freitag |
      | zaterdag | Samstag |
      | zondag | Sonntag |

      Wochentage schreibt man klein. „Am Montag“ heißt *op maandag* oder einfach *maandag*.

      Tageszeiten: *'s morgens* (morgens), *'s middags* (mittags, nachmittags), *'s avonds* (abends), *'s nachts* (nachts). Am Satzanfang wird das Wort nach *'s* großgeschrieben: *'s Morgens …*

      „Heute Morgen“ heißt *vanochtend*, „heute Abend“ *vanavond*.
      `,
      [
        ["'s Morgens drink ik koffie.", 'Morgens trinke ich Kaffee.'],
        ['Wat doe je vanavond?', 'Was machst du heute Abend?'],
      ],
    ),
    T(
      'Das Verb an zweiter Stelle',
      `
      Wie im Deutschen steht das Verb im Hauptsatz an **zweiter Stelle**. Steht etwas anderes am Anfang, kommt das Subjekt hinter das Verb:

      - *Ik werk vandaag niet.*
      - *Vandaag werk ik niet.*

      Das ist genau wie „Heute arbeite ich nicht.“
      `,
      [['Elke dag leer ik Nederlands.', 'Jeden Tag lerne ich Niederländisch.']],
    ),
    T(
      'Gestern, heute, morgen',
      `
      | | |
      |---|---|
      | eergisteren | vorgestern |
      | gisteren | gestern |
      | vandaag | heute |
      | morgen | morgen |
      | overmorgen | übermorgen |

      **elke** steht vor de-Wörtern (*elke dag*), **elk** vor het-Wörtern (*elk jaar*).
      `,
    ),
  ],
  words: [
    N('de maandag', 'der Montag', 'maandagen'),
    N('de dinsdag', 'der Dienstag', 'dinsdagen'),
    N('de woensdag', 'der Mittwoch', 'woensdagen'),
    N('de donderdag', 'der Donnerstag', 'donderdagen'),
    N('de vrijdag', 'der Freitag', 'vrijdagen'),
    N('de zaterdag', 'der Samstag', 'zaterdagen'),
    N('de zondag', 'der Sonntag', 'zondagen'),
    W('vandaag', 'heute', 'adv'),
    W('morgen', 'morgen', 'adv'),
    W('gisteren', 'gestern', 'adv'),
    W('overmorgen', 'übermorgen', 'adv'),
    W('eergisteren', 'vorgestern', 'adv'),
    N('het weekend', 'das Wochenende', 'weekenden'),
    N('de ochtend', 'der Morgen, der Vormittag', 'ochtenden', '🌄'),
    N('de middag', 'der Mittag, der Nachmittag', 'middagen'),
    N('de avond', 'der Abend', 'avonden'),
    N('de nacht', 'die Nacht', 'nachten', '🌃'),
    P("'s morgens", 'morgens'),
    P("'s middags", 'mittags, nachmittags'),
    P("'s avonds", 'abends'),
    P("'s nachts", 'nachts'),
    W('vanochtend', 'heute Morgen', 'adv'),
    W('vanavond', 'heute Abend', 'adv'),
    W('elke', 'jeder, jede (vor de-Wörtern)', 'det'),
    W('elk', 'jedes (vor het-Wörtern)', 'det'),
    W('meestal', 'meistens', 'adv'),
    W('eerst', 'zuerst', 'adv'),
    W('dan', 'dann', 'adv'),
    A('vroeg', 'früh', 'vroege vroeger vroegst'),
    A('laat', 'spät', 'late later laatst'),
    A('vrij', 'frei', 'vrije vrijer vrijst'),
    A('druk', 'voll, beschäftigt', 'drukke drukker drukst'),
    A('dicht', 'geschlossen, zu; dicht', 'dichte dichter dichtst'),
    V('beginnen', 'beginnen, anfangen', 'begin begint beginnen | begon begonnen | begonnen z'),
    N('de les', 'die Unterrichtsstunde, die Lektion', 'lessen'),
  ],
  sentences: [
    S('Vandaag is het maandag.', 'Heute ist Montag.'),
    S('Morgen is het dinsdag.', 'Morgen ist Dienstag.'),
    S('Gisteren was het zondag.', 'Gestern war Sonntag.'),
    S('Vandaag werk ik niet.|Ik werk vandaag niet.', 'Heute arbeite ich nicht.|Ich arbeite heute nicht.'),
    S('Op zaterdag zwem ik.|Ik zwem op zaterdag.|Zaterdag zwem ik.|Ik zwem zaterdag.', 'Am Samstag schwimme ich.|Ich schwimme am Samstag.'),
    S("'s Morgens drink ik koffie.|Ik drink 's morgens koffie.", 'Morgens trinke ich Kaffee.|Ich trinke morgens Kaffee.'),
    S("'s Avonds lees ik een boek.|Ik lees 's avonds een boek.", 'Abends lese ich ein Buch.|Ich lese abends ein Buch.'),
    S('In het weekend slaap ik lang.|Ik slaap in het weekend lang.', 'Am Wochenende schlafe ich lange.|Ich schlafe am Wochenende lange.'),
    S('Wat doe je vanavond?', 'Was machst du heute Abend?'),
    S('Vanavond ben ik thuis.|Ik ben vanavond thuis.', 'Heute Abend bin ich zu Hause.|Ich bin heute Abend zu Hause.'),
    S('De les begint op maandag.', 'Der Unterricht beginnt am Montag.|Der Kurs beginnt am Montag.'),
    S('Ben je morgen vrij?', 'Hast du morgen frei?|Bist du morgen frei?'),
    S(
      'Ja, op woensdag en donderdag ben ik vrij.|Ja, ik ben op woensdag en donderdag vrij.',
      'Ja, am Mittwoch und Donnerstag habe ich frei.|Ja, am Mittwoch und am Donnerstag habe ich frei.|Ja, ich habe am Mittwoch und Donnerstag frei.',
    ),
    S('Elke dag leer ik Nederlands.|Ik leer elke dag Nederlands.', 'Jeden Tag lerne ich Niederländisch.|Ich lerne jeden Tag Niederländisch.'),
    S('Mijn vader werkt elke nacht.', 'Mein Vater arbeitet jede Nacht.'),
    S('Het is laat.', 'Es ist spät.'),
    S('Het is nog vroeg.', 'Es ist noch früh.'),
    S('Eerst eet ik, dan lees ik de krant.', 'Zuerst esse ich, dann lese ich die Zeitung.|Erst esse ich, dann lese ich die Zeitung.'),
    S('Meestal werk ik thuis.|Ik werk meestal thuis.', 'Meistens arbeite ich zu Hause.|Ich arbeite meistens zu Hause.'),
    S("'s Nachts slapen we.|We slapen 's nachts.", 'Nachts schlafen wir.|Wir schlafen nachts.'),
    S('Overmorgen is het vrijdag.', 'Übermorgen ist Freitag.'),
    S('Vanochtend was ik moe.|Ik was vanochtend moe.', 'Heute Morgen war ich müde.|Ich war heute Morgen müde.'),
    S('Tot zondag!', 'Bis Sonntag!'),
    S('Het weekend is kort.', 'Das Wochenende ist kurz.'),
    S('Eergisteren was het druk.', 'Vorgestern war viel los.'),
    S("'s Middags werk ik in de tuin.", 'Nachmittags arbeite ich im Garten.|Mittags arbeite ich im Garten.'),
    S('De ochtend is koud, maar de middag is warm.', 'Der Morgen ist kalt, aber der Nachmittag ist warm.|Der Vormittag ist kalt, aber der Nachmittag ist warm.'),
    S('Het is een mooie avond.', 'Es ist ein schöner Abend.'),
  ],
  cloze: [
    C('Vandaag {werk} ik niet.', 'werk|werkt|werken', 'Heute arbeite ich nicht.'),
    C('Morgen {ga} ik naar school.', 'ga|gaat|gaan', 'Morgen gehe ich zur Schule.'),
    C('Elke dag {leest} hij de krant.', 'lees|leest|lezen', 'Jeden Tag liest er die Zeitung.'),
    C("{'s Avonds} lees ik een boek.", "'s Avonds|'s Morgens|'s Nachts", 'Abends lese ich ein Buch.'),
    C('In het weekend {slapen} we lang.', 'slaap|slaapt|slapen', 'Am Wochenende schlafen wir lange.'),
    C('Gisteren {was} het zondag.', 'is|was|zijn', 'Gestern war Sonntag.'),
    C('{Elke} dag leer ik Nederlands.', 'Elke|Elk', 'Jeden Tag lerne ich Niederländisch.'),
    C('{Elk} weekend slaap ik lang.', 'Elke|Elk', 'Jedes Wochenende schlafe ich lange.'),
  ],
  story: story('st11', 'Een drukke week', 'Eine volle Woche', [
    ['Fleur', 'Hoi Daan! Heb je zaterdag tijd?', 'Hi, Daan! Hast du am Samstag Zeit?'],
    ['Daan', 'Nee, zaterdag werk ik. Ik heb een drukke week.', 'Nein, am Samstag arbeite ich. Ich habe eine volle Woche.'],
    ['Fleur', 'En zondag?', 'Und am Sonntag?'],
    ['Daan', 'Zondag ben ik vrij. Wat doen we?', 'Am Sonntag habe ich frei. Was machen wir?'],
    Q('Wann hat Daan frei?', ['Am Sonntag', 'Am Samstag', 'Am Freitag'], 0),
    ['Fleur', "We gaan zwemmen! 's Middags, om twee uur?", 'Wir gehen schwimmen! Nachmittags, um zwei Uhr?'],
    ['Daan', 'Prima! Tot zondag!', 'Prima! Bis Sonntag!'],
    Q('Was machen Fleur und Daan am Sonntag?', ['Sie gehen schwimmen', 'Sie arbeiten', 'Sie lesen'], 0),
  ]),
});

const u12 = unit({
  id: 'u12',
  title: 'Uhrzeit und Monate',
  description: 'Wie spät ist es? Monate, Jahreszeiten, Geburtstag',
  tips: [
    T(
      'Die Uhrzeit',
      `
      | | |
      |---|---|
      | 3:00 | drie uur |
      | 3:10 | tien over drie |
      | 3:15 | kwart over drie |
      | 3:20 | tien voor half vier |
      | 3:25 | vijf voor half vier |
      | 3:30 | half vier |
      | 3:35 | vijf over half vier |
      | 3:40 | tien over half vier |
      | 3:45 | kwart voor vier |

      **half vier** heißt wie „halb vier“: 3:30. Zwischen :20 und :40 rechnet man von der halben Stunde aus.

      **over** heißt hier „nach“, **voor** heißt „vor“.
      `,
      [
        ['Het is half vier.', 'Es ist halb vier.'],
        ['Het is kwart over twee.', 'Es ist Viertel nach zwei.'],
      ],
    ),
    T(
      'Wann? Um wie viel Uhr?',
      `
      - *Hoe laat is het?* „Wie spät ist es?“
      - *Hoe laat begint de les?* „Um wie viel Uhr beginnt der Unterricht?“
      - **om** heißt „um“: *om negen uur*.

      **uur** bleibt nach Zahlen im Singular: *drie uur*. Es heißt „Uhr“ und „Stunde“: *De reis duurt twee uur.*
      `,
    ),
    T(
      'Monate, Jahreszeiten, Geburtstag',
      `
      *januari, februari, maart, april, mei, juni, juli, augustus, september, oktober, november, december* – klein geschrieben.

      Jahreszeiten: *de lente* (Frühling), *de zomer*, *de herfst*, *de winter*.

      Beim Datum nimmt man die Grundzahl: *op twaalf maart* „am zwölften März“.

      **jarig zijn** heißt „Geburtstag haben“: *Ik ben morgen jarig.*
      `,
      [['Wanneer ben je jarig?', 'Wann hast du Geburtstag?']],
    ),
  ],
  words: [
    N('het uur', 'die Stunde; Uhr (Uhrzeit)', 'uren', '🕐'),
    N('de minuut', 'die Minute', 'minuten'),
    N('de seconde', 'die Sekunde', 'seconden'),
    N('het kwartier', 'die Viertelstunde', 'kwartieren'),
    N('de klok', 'die Uhr', 'klokken', '🕰️'),
    N('het horloge', 'die Armbanduhr', 'horloges', '⌚'),
    P('hoe laat', 'wie spät, um wie viel Uhr'),
    W('om', 'um', 'prep'),
    W('half', 'halb', 'adv'),
    W('kwart', 'Viertel', 'noun'),
    W('over', 'nach (Uhrzeit)', 'prep', { id: 'over-tijd' }),
    W('voor', 'vor; für', 'prep'),
    W('precies', 'genau', 'adv'),
    W('ongeveer', 'ungefähr', 'adv'),
    W('te', 'zu (zu spät, zu groß)', 'adv'),
    N('de maand', 'der Monat', 'maanden', '📅'),
    W('januari', 'Januar', 'noun'),
    W('februari', 'Februar', 'noun'),
    W('maart', 'März', 'noun'),
    W('april', 'April', 'noun'),
    W('mei', 'Mai', 'noun'),
    W('juni', 'Juni', 'noun'),
    W('juli', 'Juli', 'noun'),
    W('augustus', 'August', 'noun'),
    W('september', 'September', 'noun'),
    W('oktober', 'Oktober', 'noun'),
    W('november', 'November', 'noun'),
    W('december', 'Dezember', 'noun'),
    N('de lente', 'der Frühling', 'lentes', '🌷'),
    N('de zomer', 'der Sommer', 'zomers', '🏖️'),
    N('de herfst', 'der Herbst', '-', '🍂'),
    N('de winter', 'der Winter', 'winters', '⛄'),
    N('de verjaardag', 'der Geburtstag', 'verjaardagen', '🎂'),
    A('jarig', 'Geburtstag haben (jarig zijn)', '- - -'),
    A('rustig', 'ruhig', 'rustige rustiger rustigst'),
  ],
  sentences: [
    S('Hoe laat is het?', 'Wie spät ist es?|Wie viel Uhr ist es?'),
    S('Het is drie uur.', 'Es ist drei Uhr.'),
    S('Het is half vier.', 'Es ist halb vier.'),
    S('Het is kwart over twee.', 'Es ist Viertel nach zwei.'),
    S('Het is kwart voor acht.', 'Es ist Viertel vor acht.'),
    S('Het is tien over zes.', 'Es ist zehn nach sechs.'),
    S('Het is vijf voor half tien.', 'Es ist fünf vor halb zehn.'),
    S('De les begint om negen uur.', 'Der Unterricht beginnt um neun Uhr.|Der Kurs beginnt um neun Uhr.'),
    S(
      'Hoe laat begint de les?',
      'Wann beginnt der Unterricht?|Um wie viel Uhr beginnt der Unterricht?|Wann beginnt der Kurs?|Um wie viel Uhr beginnt der Kurs?',
    ),
    S('Ik werk tot vijf uur.', 'Ich arbeite bis fünf Uhr.'),
    S('Ik heb tien minuten tijd.', 'Ich habe zehn Minuten Zeit.'),
    S('Mijn horloge is kapot.', 'Meine Armbanduhr ist kaputt.|Meine Uhr ist kaputt.'),
    S('Wanneer ben je jarig?', 'Wann hast du Geburtstag?'),
    S('Ik ben in mei jarig.|Ik ben jarig in mei.', 'Ich habe im Mai Geburtstag.'),
    S('Mijn verjaardag is op twaalf maart.', 'Mein Geburtstag ist am zwölften März.'),
    S('In de zomer is het warm.', 'Im Sommer ist es warm.'),
    S('In de winter is het koud.', 'Im Winter ist es kalt.'),
    S('De herfst begint in september.', 'Der Herbst beginnt im September.'),
    S('In april is het lente.', 'Im April ist Frühling.|Im April ist es Frühling.'),
    S('Een jaar heeft twaalf maanden.', 'Ein Jahr hat zwölf Monate.'),
    S('Het is precies twaalf uur.', 'Es ist genau zwölf Uhr.'),
    S('Ik kom om ongeveer acht uur.|Ik kom ongeveer om acht uur.', 'Ich komme ungefähr um acht Uhr.|Ich komme gegen acht Uhr.'),
    S('Januari en februari zijn koude maanden.', 'Januar und Februar sind kalte Monate.'),
    S('De klok is oud.', 'Die Uhr ist alt.'),
    S('Mijn zus is in juni jarig.', 'Meine Schwester hat im Juni Geburtstag.'),
    S('In juli en augustus is het zomer.', 'Im Juli und August ist Sommer.|Im Juli und im August ist Sommer.'),
    S('In oktober en november regent het vaak.', 'Im Oktober und November regnet es oft.|Im Oktober und im November regnet es oft.'),
    S('In december is het winter.', 'Im Dezember ist Winter.|Im Dezember ist es Winter.'),
    S('Je hebt nog een kwartier.', 'Du hast noch eine Viertelstunde.'),
    S('Ik ben te laat!', 'Ich bin zu spät!|Ich komme zu spät!'),
    S('Een minuut heeft zestig seconden.', 'Eine Minute hat sechzig Sekunden.'),
  ],
  cloze: [
    C('Het is drie {uur}.', 'uur|uren', 'Es ist drei Uhr.'),
    C('De les begint {om} negen uur.', 'om|op|aan', 'Der Unterricht beginnt um neun Uhr.'),
    C('Het is kwart {over} twee.', 'over|voor|om', 'Es ist Viertel nach zwei.'),
    C('Het is {half} vier.', 'half|kwart|precies', 'Es ist halb vier.'),
    C('In de {zomer} is het warm.', 'zomer|winter|herfst', 'Im Sommer ist es warm.'),
    C('Ik ben in mei {jarig}.', 'jarig|verjaardag|jaar', 'Ich habe im Mai Geburtstag.'),
    C('Een jaar heeft twaalf {maanden}.', 'maand|maanden', 'Ein Jahr hat zwölf Monate.'),
  ],
  story: story('st12', 'Hoe laat is het?', 'Wie spät ist es?', [
    ['Lisa', 'Tom, hoe laat is het?', 'Tom, wie spät ist es?'],
    ['Tom', 'Het is kwart voor negen.', 'Es ist Viertel vor neun.'],
    ['Lisa', 'Wat? De les begint om negen uur!', 'Was? Der Unterricht beginnt um neun Uhr!'],
    Q('Wie spät ist es?', ['Viertel vor neun', 'Viertel nach neun', 'Halb neun'], 0),
    ['Tom', 'Rustig maar, je hebt nog een kwartier.', 'Ganz ruhig, du hast noch eine Viertelstunde.'],
    ['Lisa', 'Nee, met de fiets is het twintig minuten!', 'Nein, mit dem Fahrrad sind es zwanzig Minuten!'],
    ['Tom', 'Dan ben je om vijf over negen op school.', 'Dann bist du um fünf nach neun in der Schule.'],
    Q('Wie lange braucht Lisa mit dem Fahrrad?', ['Zwanzig Minuten', 'Eine Viertelstunde', 'Eine Stunde'], 0),
    ['Lisa', 'Ik ben altijd te laat!', 'Ich bin immer zu spät!'],
    Q('Was sagt Lisa über sich?', ['Sie ist immer zu spät', 'Sie ist immer früh', 'Sie hat immer Zeit'], 0),
  ]),
});

const u13 = unit({
  id: 'u13',
  title: 'Zu Hause',
  description: 'Zimmer und Möbel, es gibt, liegen, stehen, sitzen',
  tips: [
    T(
      'er is, er zijn – es gibt',
      `
      „Es gibt“ heißt **er is** (Singular) oder **er zijn** (Plural):

      - *Er is een tuin.* „Es gibt einen Garten.“
      - *Er zijn drie slaapkamers.* „Es gibt drei Schlafzimmer.“

      Oft steht statt *zijn* ein Positionsverb: *Er staat een stoel in de kamer.*
      `,
      [['Er zijn drie slaapkamers.', 'Es gibt drei Schlafzimmer.']],
    ),
    T(
      'liggen, staan, zitten, hangen',
      `
      Das Niederländische sagt genauer als das Deutsche, wie etwas irgendwo ist:

      - flach: **liggen** – *Het boek ligt op de tafel.*
      - aufrecht: **staan** – *De lamp staat op de tafel.*
      - in etwas drin: **zitten** – *De sleutels zitten in mijn tas.* („stecken“)
      - hängend: **hangen** – *De lamp hangt boven de tafel.*

      **zitten** heißt außerdem „sitzen“: *Ik zit op de bank.*
      `,
      [['De sleutels zitten in mijn tas.', 'Die Schlüssel sind in meiner Tasche.']],
    ),
    T(
      'Präpositionen des Ortes',
      `
      | | |
      |---|---|
      | op | auf |
      | in | in |
      | onder | unter |
      | boven | über, oben |
      | naast | neben |
      | achter | hinter |
      | voor | vor |
      | tussen | zwischen |
      | bij | bei |
      | aan | an |

      Gute Nachricht: Es gibt keine Fälle. *op de tafel* heißt „auf dem Tisch“ und „auf den Tisch“.
      `,
    ),
  ],
  words: [
    N('de keuken', 'die Küche', 'keukens'),
    N('de badkamer', 'das Badezimmer', 'badkamers', '🛁'),
    N('de slaapkamer', 'das Schlafzimmer', 'slaapkamers'),
    N('de woonkamer', 'das Wohnzimmer', 'woonkamers'),
    N('de tuin', 'der Garten', 'tuinen', '🏡'),
    N('de muur', 'die Wand, die Mauer', 'muren', '🧱'),
    N('de vloer', 'der Fußboden', 'vloeren'),
    N('de bank', 'das Sofa', 'banken', '🛋️'),
    N('de lamp', 'die Lampe', 'lampen', '💡'),
    N('de kast', 'der Schrank', 'kasten'),
    N('het dak', 'das Dach', 'daken'),
    N('de trap', 'die Treppe', 'trappen'),
    N('de wc', 'die Toilette', "wc's", '🚽'),
    N('het appartement', 'die Wohnung', 'appartementen'),
    N('de koelkast', 'der Kühlschrank', 'koelkasten'),
    N('de spiegel', 'der Spiegel', 'spiegels', '🪞'),
    N('de televisie', 'der Fernseher', 'televisies', '📺'),
    W('er', 'es (er is = es gibt); da', 'adv'),
    V('liggen', 'liegen', 'lig ligt liggen | lag lagen | gelegen h'),
    V('staan', 'stehen', 'sta staat staan | stond stonden | gestaan h'),
    V('zitten', 'sitzen; stecken', 'zit zit zitten | zat zaten | gezeten h'),
    V('hangen', 'hängen', 'hang hangt hangen | hing hingen | gehangen h'),
    W('onder', 'unter', 'prep'),
    W('naast', 'neben', 'prep'),
    W('achter', 'hinter', 'prep'),
    W('tussen', 'zwischen', 'prep'),
    W('boven', 'über; oben', 'prep'),
    W('beneden', 'unten', 'adv'),
    W('bij', 'bei', 'prep'),
    W('aan', 'an', 'prep'),
    W('binnen', 'drinnen, herein', 'adv'),
    W('buiten', 'draußen', 'adv'),
    W('welkom', 'willkommen', 'interj'),
    W('natuurlijk', 'natürlich', 'adv'),
  ],
  sentences: [
    S('Er is een tuin achter het huis.|Achter het huis is een tuin.', 'Es gibt einen Garten hinter dem Haus.|Hinter dem Haus ist ein Garten.'),
    S('Er zijn drie slaapkamers.', 'Es gibt drei Schlafzimmer.'),
    S('Het huis heeft een grote keuken.', 'Das Haus hat eine große Küche.'),
    S('De bank staat in de woonkamer.', 'Das Sofa steht im Wohnzimmer.'),
    S('Het boek ligt op de tafel.', 'Das Buch liegt auf dem Tisch.'),
    S('De kat ligt onder het bed.', 'Die Katze liegt unter dem Bett.'),
    S('De sleutels zitten in mijn tas.', 'Die Schlüssel sind in meiner Tasche.|Die Schlüssel stecken in meiner Tasche.'),
    S('De lamp hangt boven de tafel.', 'Die Lampe hängt über dem Tisch.'),
    S('De badkamer is naast de slaapkamer.', 'Das Badezimmer ist neben dem Schlafzimmer.'),
    S('Waar is de wc?', 'Wo ist die Toilette?|Wo ist das Klo?'),
    S('De wc is boven.', 'Die Toilette ist oben.'),
    S('De keuken is beneden.', 'Die Küche ist unten.'),
    S('De koelkast staat in de keuken.', 'Der Kühlschrank steht in der Küche.'),
    S(
      'Er staat een stoel tussen de tafel en de kast.|Tussen de tafel en de kast staat een stoel.',
      'Zwischen dem Tisch und dem Schrank steht ein Stuhl.|Ein Stuhl steht zwischen dem Tisch und dem Schrank.|Es steht ein Stuhl zwischen dem Tisch und dem Schrank.',
    ),
    S('Ik zit op de bank.', 'Ich sitze auf dem Sofa.'),
    S('De kinderen zijn buiten.', 'Die Kinder sind draußen.'),
    S('Kom binnen!', 'Komm herein!|Komm rein!'),
    S('Het appartement is klein maar mooi.', 'Die Wohnung ist klein, aber schön.'),
    S('De spiegel hangt aan de muur.', 'Der Spiegel hängt an der Wand.'),
    S('De televisie staat naast de bank.', 'Der Fernseher steht neben dem Sofa.'),
    S(
      'Er ligt een sleutel op de vloer.|Op de vloer ligt een sleutel.',
      'Auf dem Boden liegt ein Schlüssel.|Ein Schlüssel liegt auf dem Boden.|Es liegt ein Schlüssel auf dem Boden.',
    ),
    S('De fiets staat bij de deur.', 'Das Fahrrad steht bei der Tür.|Das Fahrrad steht an der Tür.'),
    S('Is er een trap?', 'Gibt es eine Treppe?'),
    S('Het dak is rood.', 'Das Dach ist rot.'),
    S('Welkom in ons huis!', 'Willkommen in unserem Haus!'),
    S('De kat zit natuurlijk op de bank.', 'Die Katze sitzt natürlich auf dem Sofa.'),
  ],
  cloze: [
    C('Het boek {ligt} op de tafel.', 'ligt|liggen|lig', 'Das Buch liegt auf dem Tisch.'),
    C('De lamp {staat} op de tafel.', 'staat|staan|sta', 'Die Lampe steht auf dem Tisch.'),
    C('Ik {zit} op de bank.', 'zit|zitten|zat', 'Ich sitze auf dem Sofa.'),
    C('{Er} zijn drie slaapkamers.', 'Er|Wat|Hoe', 'Es gibt drei Schlafzimmer.'),
    C('De kat ligt {onder} het bed.', 'onder|naast|achter', 'Die Katze liegt unter dem Bett.'),
    C('De spiegel hangt {aan} de muur.', 'aan|op|in', 'Der Spiegel hängt an der Wand.'),
    C('Er staat een stoel {tussen} de tafel en de kast.', 'tussen|naast|onder', 'Zwischen dem Tisch und dem Schrank steht ein Stuhl.'),
  ],
  story: story('st13', 'Mijn nieuwe huis', 'Mein neues Haus', [
    ['Sophie', 'Welkom in mijn nieuwe huis!', 'Willkommen in meinem neuen Haus!'],
    ['Lucas', 'Wauw, het is groot!', 'Wow, es ist groß!'],
    ['Sophie', 'Beneden zijn de keuken en de woonkamer.', 'Unten sind die Küche und das Wohnzimmer.'],
    ['Sophie', 'Boven zijn er twee slaapkamers en een badkamer.', 'Oben gibt es zwei Schlafzimmer und ein Badezimmer.'],
    Q('Wie viele Schlafzimmer hat das Haus?', ['Zwei', 'Drei', 'Eins'], 0),
    ['Lucas', 'En is er een tuin?', 'Und gibt es einen Garten?'],
    ['Sophie', 'Ja, achter het huis. Daar staan twee grote bomen.', 'Ja, hinter dem Haus. Dort stehen zwei große Bäume.'],
    ['Lucas', 'Waar is de kat?', 'Wo ist die Katze?'],
    ['Sophie', 'Die ligt natuurlijk op de bank!', 'Die liegt natürlich auf dem Sofa!'],
    Q('Wo liegt die Katze?', ['Auf dem Sofa', 'Unter dem Bett', 'Im Garten'], 0),
  ]),
});

const u14 = unit({
  id: 'u14',
  title: 'Kleidung',
  description: 'Kleidungsstücke, tragen, anziehen, Größe',
  tips: [
    T(
      'dragen, passen, vinden',
      `
      - **dragen** = tragen: *Ik draag een jas.*
      - **passen** = passen und anprobieren: *Deze broek past niet.*
      - **vinden** = finden, auch als Meinung: *Ik vind de jurk mooi.* „Ich finde das Kleid schön.“

      In der Frage fällt das t weg: *Vind je deze hoed leuk?*
      `,
      [['Ik vind de jurk mooi.', 'Ich finde das Kleid schön.']],
    ),
    T(
      'Anziehen und ausziehen',
      `
      **aantrekken** (anziehen) und **uittrekken** (ausziehen) sind trennbare Verben. Wie im Deutschen wandert die Vorsilbe ans Satzende:

      - *Ik trek mijn jas aan.* „Ich ziehe meine Jacke an.“
      - *Ik trek mijn schoenen uit.* „Ich ziehe meine Schuhe aus.“

      Mehr dazu in Kapitel 22.
      `,
      [['Trek je jas aan!', 'Zieh deine Jacke an!']],
    ),
    T(
      'te = zu',
      `
      *te groot* (zu groß), *te klein*, *te duur*, *te kort*.

      Achtung bei **de jas**: Im Deutschen „die Jacke“, deshalb sagt man über die Jacke *hij*: *Hij past goed.* „Sie passt gut.“
      `,
    ),
  ],
  words: [
    N('de broek', 'die Hose', 'broeken', '👖'),
    N('het overhemd', 'das Hemd', 'overhemden', '👔'),
    N('de trui', 'der Pullover', 'truien'),
    N('het T-shirt', 'das T-Shirt', 'T-shirts', '👕'),
    N('de jurk', 'das Kleid', 'jurken', '👗'),
    N('de rok', 'der Rock', 'rokken'),
    N('de schoen', 'der Schuh', 'schoenen', '👞'),
    N('de sok', 'die Socke', 'sokken', '🧦'),
    N('de hoed', 'der Hut', 'hoeden', '🎩'),
    N('de muts', 'die Mütze', 'mutsen'),
    N('de sjaal', 'der Schal', 'sjaals', '🧣'),
    N('de handschoen', 'der Handschuh', 'handschoenen', '🧤'),
    N('de bril', 'die Brille', 'brillen', '👓'),
    N('de laars', 'der Stiefel', 'laarzen', '👢'),
    N('de riem', 'der Gürtel', 'riemen'),
    N('de maat', 'die Größe (Kleidung)', 'maten'),
    NP('de kleren', 'die Kleider, die Kleidung'),
    V('dragen', 'tragen', 'draag draagt dragen | droeg droegen | gedragen h'),
    V('aantrekken', 'anziehen', 'trek trekt trekken | trok trokken | aangetrokken h', { sep: 'aan' }),
    V('uittrekken', 'ausziehen', 'trek trekt trekken | trok trokken | uitgetrokken h', { sep: 'uit' }),
    V('passen', 'passen; anprobieren', 'pas past passen | paste pasten | gepast h'),
    V('zoeken', 'suchen', 'zoek zoekt zoeken | zocht zochten | gezocht h'),
    V('vinden', 'finden', 'vind vindt vinden | vond vonden | gevonden h'),
    V('helpen', 'helfen', 'help helpt helpen | hielp hielpen | geholpen h'),
    A('strak', 'eng', 'strakke strakker strakst'),
    A('wijd', 'weit', 'wijde wijder wijdst'),
    A('modern', 'modern', 'moderne moderner modernst'),
    A('ouderwets', 'altmodisch', 'ouderwetse - -'),
  ],
  sentences: [
    S('Ik draag een blauwe broek.', 'Ich trage eine blaue Hose.'),
    S('Zij draagt een rode jurk.', 'Sie trägt ein rotes Kleid.'),
    S('Hij draagt een wit overhemd.', 'Er trägt ein weißes Hemd.'),
    S('Mijn schoenen zijn nieuw.', 'Meine Schuhe sind neu.'),
    S('Ik zoek een warme trui.', 'Ich suche einen warmen Pullover.'),
    S('Welke maat heeft u?|Welke maat hebt u?', 'Welche Größe haben Sie?'),
    S('Deze broek past niet.', 'Diese Hose passt nicht.'),
    S('De jas is te groot.', 'Die Jacke ist zu groß.|Der Mantel ist zu groß.'),
    S('Ik vind de jurk mooi.', 'Ich finde das Kleid schön.'),
    S('Vind je deze hoed leuk?', 'Findest du diesen Hut schön?|Gefällt dir dieser Hut?'),
    S('Trek je jas aan!', 'Zieh deine Jacke an!|Zieh deinen Mantel an!'),
    S('Het is koud, ik trek een muts en een sjaal aan.', 'Es ist kalt, ich ziehe eine Mütze und einen Schal an.'),
    S('Ik trek mijn schoenen uit.', 'Ich ziehe meine Schuhe aus.'),
    S('Waar zijn mijn sokken?', 'Wo sind meine Socken?'),
    S('Ik vind mijn bril niet.', 'Ich finde meine Brille nicht.'),
    S('Hij draagt altijd een bril.', 'Er trägt immer eine Brille.'),
    S('De rok is te kort.', 'Der Rock ist zu kurz.'),
    S('In de winter draag ik laarzen en handschoenen.', 'Im Winter trage ich Stiefel und Handschuhe.'),
    S('Dat T-shirt is lelijk.', 'Das T-Shirt da ist hässlich.|Dieses T-Shirt ist hässlich.|Jenes T-Shirt ist hässlich.'),
    S('De broek is te strak.', 'Die Hose ist zu eng.'),
    S('Ik heb nieuwe kleren.', 'Ich habe neue Kleider.|Ich habe neue Kleidung.'),
    S('Mijn opa draagt ouderwetse kleren.', 'Mein Opa trägt altmodische Kleidung.|Mein Opa trägt altmodische Kleider.'),
    S('Deze riem is modern.', 'Dieser Gürtel ist modern.'),
    S('Ik zoek mijn sleutels, maar ik vind ze niet.', 'Ich suche meine Schlüssel, aber ich finde sie nicht.'),
    S('De trui is te wijd.', 'Der Pullover ist zu weit.'),
    S('Kunt u mij helpen?', 'Können Sie mir helfen?'),
  ],
  cloze: [
    C('Hij draagt een {wit} overhemd.', 'wit|witte', 'Er trägt ein weißes Hemd.'),
    C('Zij draagt een {rode} jurk.', 'rood|rode', 'Sie trägt ein rotes Kleid.'),
    C('{Vind} je deze hoed leuk?', 'Vind|Vindt|Vinden', 'Findest du diesen Hut schön?'),
    C('Trek je jas {aan}!', 'aan|uit|op', 'Zieh deine Jacke an!'),
    C('Deze broek {past} niet.', 'pas|past|passen', 'Diese Hose passt nicht.'),
    C('{Deze} riem is modern.', 'Deze|Dit', 'Dieser Gürtel ist modern.'),
    C('{Dat} T-shirt is lelijk.', 'Die|Dat', 'Das T-Shirt da ist hässlich.'),
    C('De jas is {te} groot.', 'te|tot', 'Die Jacke ist zu groß.'),
  ],
  story: story('st14', 'De nieuwe jas', 'Die neue Jacke', [
    ['Verkoper', 'Goedemiddag! Kan ik u helpen?', 'Guten Tag! Kann ich Ihnen helfen?'],
    ['Emma', 'Ja, ik zoek een warme jas.', 'Ja, ich suche eine warme Jacke.'],
    ['Verkoper', 'Welke maat heeft u?', 'Welche Größe haben Sie?'],
    ['Emma', 'Maat achtendertig.', 'Größe achtunddreißig.'],
    Q('Was sucht Emma?', ['Eine warme Jacke', 'Einen Pullover', 'Schuhe'], 0),
    ['Verkoper', 'Deze zwarte jas is mooi. Wilt u hem passen?', 'Diese schwarze Jacke ist schön. Möchten Sie sie anprobieren?'],
    ['Emma', 'Hij past goed, maar hij is te duur.', 'Sie passt gut, aber sie ist zu teuer.'],
    Q('Warum nimmt Emma die schwarze Jacke nicht?', ['Sie ist zu teuer', 'Sie ist zu klein', 'Sie ist hässlich'], 0),
    ['Verkoper', 'Deze blauwe jas is goedkoper.', 'Diese blaue Jacke ist billiger.'],
    ['Emma', 'Die is ook mooi. Die neem ik!', 'Die ist auch schön. Die nehme ich!'],
    Q('Welche Jacke nimmt Emma?', ['Die blaue', 'Die schwarze', 'Keine'], 0),
  ]),
});

const u15 = unit({
  id: 'u15',
  title: 'Einkaufen',
  description: 'Im Laden und auf dem Markt: kosten, bezahlen, brauchen',
  tips: [
    T(
      'Im Laden',
      `
      - *Hoeveel kost dat?* „Wie viel kostet das?“
      - *Mag ik een kilo appels?* „Kann ich ein Kilo Äpfel haben?“
      - *Anders nog iets?* oder *Verder nog iets?* „Sonst noch etwas?“
      - *Dat is alles.* „Das ist alles.“
      - *Kan ik pinnen?* „Kann ich mit Karte zahlen?“

      **pinnen** heißt „mit der Bankkarte bezahlen“. In den Niederlanden zahlt man fast überall mit Karte.
      `,
      [['Anders nog iets?', 'Sonst noch etwas?']],
    ),
    T(
      'nodig hebben = brauchen',
      `
      „Brauchen“ heißt **nodig hebben**. *nodig* steht am Ende:

      - *Ik heb melk nodig.* „Ich brauche Milch.“
      - *Wat heb je nodig?* „Was brauchst du?“
      `,
      [['Ik heb melk en eieren nodig.', 'Ich brauche Milch und Eier.']],
    ),
    T(
      'kosten und betalen',
      `
      | | kosten | betalen |
      |---|---|---|
      | ik | kost | betaal |
      | jij / hij | kost | betaalt |
      | wij / zij | kosten | betalen |

      Bei *kosten* endet der Stamm auf t, deshalb *het kost* ohne zweites t.

      **graag** heißt „gern“: *Ja, graag.* „Ja, gern.“
      `,
    ),
  ],
  words: [
    N('de winkel', 'der Laden, das Geschäft', 'winkels', '🏪'),
    N('de supermarkt', 'der Supermarkt', 'supermarkten', '🛒'),
    N('de markt', 'der Markt', 'markten'),
    N('de bakker', 'der Bäcker', 'bakkers', '🥖'),
    N('de slager', 'der Metzger', 'slagers'),
    N('de kassa', 'die Kasse', "kassa's"),
    N('de prijs', 'der Preis', 'prijzen', '🏷️'),
    N('de zak', 'die Tüte, der Beutel', 'zakken', '🛍️'),
    N('de cent', 'der Cent', 'centen'),
    N('het kilo', 'das Kilo', "kilo's"),
    N('de liter', 'der Liter', 'liters'),
    N('het stuk', 'das Stück', 'stukken'),
    N('de bon', 'der Kassenbon', 'bonnen', '🧾'),
    NP('de boodschappen', 'die Einkäufe'),
    P('boodschappen doen', 'einkaufen'),
    V('kopen', 'kaufen', 'koop koopt kopen | kocht kochten | gekocht h'),
    V('verkopen', 'verkaufen', 'verkoop verkoopt verkopen | verkocht verkochten | verkocht h'),
    V('betalen', 'bezahlen', 'betaal betaalt betalen | betaalde betaalden | betaald h'),
    V('kosten', 'kosten', 'kost kost kosten | kostte kostten | gekost h'),
    V('pinnen', 'mit Karte zahlen', 'pin pint pinnen | pinde pinden | gepind h'),
    V('nemen', 'nehmen', 'neem neemt nemen | nam namen | genomen h'),
    W('graag', 'gern', 'adv'),
    W('per', 'pro', 'prep'),
    W('contant', 'bar', 'adv'),
    A('gratis', 'gratis, kostenlos', '- - -'),
    A('vers', 'frisch', 'verse verser verst'),
    W('alleen', 'nur; allein', 'adv'),
    W('samen', 'zusammen', 'adv'),
    W('nodig', 'nötig (nodig hebben = brauchen)', 'adv'),
    W('anders', 'sonst; anders', 'adv'),
    W('verder', 'weiter, sonst', 'adv'),
    P('mag ik', 'darf ich, kann ich bitte haben'),
  ],
  sentences: [
    S('Ik koop brood bij de bakker.', 'Ich kaufe Brot beim Bäcker.'),
    S('Hoeveel kost dat?', 'Wie viel kostet das?|Was kostet das?'),
    S('Dat kost drie euro.', 'Das kostet drei Euro.'),
    S('De appels kosten twee euro per kilo.', 'Die Äpfel kosten zwei Euro pro Kilo.'),
    S('Mag ik een kilo aardappels?|Mag ik een kilo aardappelen?', 'Kann ich ein Kilo Kartoffeln haben?|Darf ich ein Kilo Kartoffeln haben?|Ich hätte gern ein Kilo Kartoffeln.'),
    S('Anders nog iets?|Verder nog iets?', 'Sonst noch etwas?|Noch etwas?'),
    S('Nee, dat is alles.', 'Nein, das ist alles.|Nein, das war alles.'),
    S('Kan ik pinnen?', 'Kann ich mit Karte zahlen?|Kann ich mit Karte bezahlen?'),
    S('Ik betaal contant.', 'Ich zahle bar.|Ich bezahle bar.'),
    S('Wilt u een zak?', 'Möchten Sie eine Tüte?|Wollen Sie eine Tüte?'),
    S('Ja, graag.', 'Ja, gern.|Ja, gerne.'),
    S('De supermarkt is open tot acht uur.', 'Der Supermarkt hat bis acht Uhr geöffnet.|Der Supermarkt ist bis acht Uhr geöffnet.|Der Supermarkt hat bis acht Uhr offen.'),
    S('Ik heb melk en eieren nodig.', 'Ich brauche Milch und Eier.'),
    S('Wat heb je nodig?', 'Was brauchst du?'),
    S('Op de markt is het fruit vers.', 'Auf dem Markt ist das Obst frisch.'),
    S('Ik neem twee stukken kaas.', 'Ich nehme zwei Stück Käse.'),
    S('Dit is te duur, ik neem het niet.', 'Das ist zu teuer, ich nehme es nicht.'),
    S('De tassen zijn gratis.', 'Die Taschen sind gratis.|Die Taschen sind kostenlos.'),
    S('Mag ik de bon?', 'Kann ich den Kassenbon haben?|Darf ich den Kassenbon haben?|Kann ich den Bon haben?'),
    S('De prijs is goed.', 'Der Preis ist gut.'),
    S('We doen samen boodschappen.', 'Wir kaufen zusammen ein.|Wir gehen zusammen einkaufen.'),
    S('Ik ga alleen naar de markt.', 'Ich gehe allein auf den Markt.|Ich gehe alleine auf den Markt.|Ich gehe allein zum Markt.'),
    S('De slager verkoopt vlees.', 'Der Metzger verkauft Fleisch.'),
    S('Een liter melk kost één euro.', 'Ein Liter Milch kostet einen Euro.'),
    S('Waar is de kassa?', 'Wo ist die Kasse?'),
    S('Het brood kost tachtig cent.', 'Das Brot kostet achtzig Cent.'),
    S('De winkel is op zondag dicht.', 'Der Laden ist am Sonntag geschlossen.|Das Geschäft ist am Sonntag geschlossen.|Der Laden hat am Sonntag zu.'),
    S('Ik ga boodschappen doen.', 'Ich gehe einkaufen.'),
  ],
  cloze: [
    C('Hoeveel {kost} dat?', 'kost|kosten', 'Wie viel kostet das?'),
    C('Ik heb melk {nodig}.', 'nodig|graag|alleen', 'Ich brauche Milch.'),
    C('Ik {betaal} contant.', 'betaal|betaalt|betalen', 'Ich zahle bar.'),
    C('De appels {kosten} twee euro.', 'kost|kosten', 'Die Äpfel kosten zwei Euro.'),
    C('Ik koop brood {bij} de bakker.', 'bij|naar|op', 'Ich kaufe Brot beim Bäcker.'),
    C('Ja, {graag}.', 'graag|nodig|samen', 'Ja, gern.'),
    C('{Neem} je een zak?', 'Neem|Neemt|Nemen', 'Nimmst du eine Tüte?'),
  ],
  story: story('st15', 'Op de markt', 'Auf dem Markt', [
    ['Marktkoopman', 'Goedemorgen! Wat mag het zijn?', 'Guten Morgen! Was darf es sein?'],
    ['Anna', 'Een kilo appels, alstublieft.', 'Ein Kilo Äpfel, bitte.'],
    ['Marktkoopman', 'Alstublieft. Anders nog iets?', 'Bitte schön. Sonst noch etwas?'],
    ['Anna', 'Ja, ik heb ook bananen nodig. Hoeveel kosten die?', 'Ja, ich brauche auch Bananen. Wie viel kosten die?'],
    Q('Was braucht Anna außer Äpfeln?', ['Bananen', 'Kartoffeln', 'Käse'], 0),
    ['Marktkoopman', 'Twee euro per kilo.', 'Zwei Euro pro Kilo.'],
    ['Anna', 'Dan neem ik een kilo. Kan ik pinnen?', 'Dann nehme ich ein Kilo. Kann ich mit Karte zahlen?'],
    ['Marktkoopman', 'Nee, sorry, alleen contant.', 'Nein, tut mir leid, nur bar.'],
    Q('Wie muss Anna bezahlen?', ['Bar', 'Mit Karte', 'Gar nicht'], 0),
  ]),
});

const u16 = unit({
  id: 'u16',
  title: 'Zahlen bis 1000',
  description: 'Zehner, Hunderter, Ordnungszahlen, Adresse und Telefon',
  tips: [
    T(
      'Die Zehner',
      `
      | | | | |
      |---|---|---|---|
      | 20 twintig | 30 dertig | 40 veertig | 50 vijftig |
      | 60 zestig | 70 zeventig | 80 tachtig | 90 negentig |
      | 100 honderd | 200 tweehonderd | 1000 duizend | 2000 tweeduizend |

      Achtung: **tachtig** (80) beginnt mit *t*, **veertig** (40) mit *veer-*.
      `,
    ),
    T(
      'Zusammengesetzte Zahlen',
      `
      Wie im Deutschen: Einer + **en** + Zehner, alles in einem Wort: *eenentwintig* (21), *vijfendertig* (35).

      Nach *twee* und *drie* schreibt man **ën**, damit man die Vokale getrennt liest: *tweeëntwintig*, *drieënveertig*.

      Große Zahlen schreibt man auch zusammen: *honderdvijftig*, *tweehonderd*.
      `,
      [['Een jaar heeft tweeënvijftig weken.', 'Ein Jahr hat zweiundfünfzig Wochen.']],
    ),
    T(
      'Ordnungszahlen',
      `
      | | |
      |---|---|
      | eerste | erste |
      | tweede | zweite |
      | derde | dritte |
      | vierde | vierte |
      | vijfde | fünfte |
      | achtste | achte |
      | twintigste | zwanzigste |
      | laatste | letzte |

      Meistens: Zahl + **de**; nach *-acht* und ab 20: Zahl + **ste**.
      `,
      [['Ik woon op de derde verdieping.', 'Ich wohne im dritten Stock.']],
    ),
  ],
  words: [
    W('dertig', 'dreißig', 'num'),
    W('veertig', 'vierzig', 'num'),
    W('vijftig', 'fünfzig', 'num'),
    W('zestig', 'sechzig', 'num'),
    W('zeventig', 'siebzig', 'num'),
    W('tachtig', 'achtzig', 'num'),
    W('negentig', 'neunzig', 'num'),
    W('honderd', 'hundert', 'num', { emoji: '💯' }),
    W('duizend', 'tausend', 'num'),
    W('eerste', 'erste', 'num'),
    W('tweede', 'zweite', 'num'),
    W('derde', 'dritte', 'num'),
    W('vierde', 'vierte', 'num'),
    W('vijfde', 'fünfte', 'num'),
    N('het telefoonnummer', 'die Telefonnummer', 'telefoonnummers', '📞'),
    N('het adres', 'die Adresse', 'adressen'),
    N('de straat', 'die Straße', 'straten'),
    N('het huisnummer', 'die Hausnummer', 'huisnummers'),
    N('de postcode', 'die Postleitzahl', 'postcodes'),
    N('het getal', 'die Zahl', 'getallen', '🔢'),
    N('de verdieping', 'das Stockwerk', 'verdiepingen'),
    N('de inwoner', 'der Einwohner', 'inwoners'),
  ],
  sentences: [
    S('Mijn oma is tachtig jaar oud.', 'Meine Oma ist achtzig Jahre alt.'),
    S('Ik ben vijfendertig.', 'Ich bin fünfunddreißig.'),
    S('Mijn vader is achtenveertig jaar oud.', 'Mein Vater ist achtundvierzig Jahre alt.'),
    S('Het kost negenenzestig euro.', 'Es kostet neunundsechzig Euro.'),
    S('De jas kost honderd euro.', 'Die Jacke kostet hundert Euro.|Der Mantel kostet hundert Euro.'),
    S('Een kilo kaas kost tweeëntwintig euro.', 'Ein Kilo Käse kostet zweiundzwanzig Euro.'),
    S('Wat is je telefoonnummer?', 'Wie ist deine Telefonnummer?|Was ist deine Telefonnummer?'),
    S('Wat is uw adres?', 'Wie ist Ihre Adresse?|Was ist Ihre Adresse?'),
    S('Ik woon op nummer vierentwintig.', 'Ich wohne in Nummer vierundzwanzig.|Ich wohne in der Nummer vierundzwanzig.'),
    S('Mijn huisnummer is drieënnegentig.', 'Meine Hausnummer ist dreiundneunzig.'),
    S('De stad heeft duizend inwoners.', 'Die Stadt hat tausend Einwohner.'),
    S('Het is de eerste dag van de week.', 'Es ist der erste Tag der Woche.'),
    S('Ik woon op de derde verdieping.', 'Ich wohne im dritten Stock.|Ich wohne in der dritten Etage.'),
    S('Dit is mijn vierde les.', 'Das ist meine vierte Unterrichtsstunde.|Das ist meine vierte Stunde.|Das ist meine vierte Lektion.'),
    S('Honderd min dertig is zeventig.', 'Hundert minus dreißig ist siebzig.|Hundert minus dreißig sind siebzig.'),
    S('Vijftig plus vijftig is honderd.', 'Fünfzig plus fünfzig ist hundert.|Fünfzig plus fünfzig sind hundert.'),
    S('In welke straat woon je?', 'In welcher Straße wohnst du?'),
    S('Het boek kost zesentwintig euro.', 'Das Buch kostet sechsundzwanzig Euro.'),
    S('Een jaar heeft tweeënvijftig weken.', 'Ein Jahr hat zweiundfünfzig Wochen.'),
    S('Ik heb negentig euro nodig.', 'Ich brauche neunzig Euro.'),
    S('Dat is de laatste vraag.', 'Das ist die letzte Frage.'),
    S('Ik ben de eerste!', 'Ich bin der Erste!|Ich bin die Erste!'),
    S('Duizend euro is veel geld.', 'Tausend Euro sind viel Geld.|Tausend Euro ist viel Geld.'),
    S('Wat is je postcode?', 'Wie ist deine Postleitzahl?|Was ist deine Postleitzahl?'),
    S('Mijn zus woont op de vijfde verdieping.', 'Meine Schwester wohnt im fünften Stock.'),
    S('Het getal zeventig is groot.', 'Die Zahl siebzig ist groß.'),
    S('Veertig plus twintig is zestig.', 'Vierzig plus zwanzig ist sechzig.|Vierzig plus zwanzig sind sechzig.'),
  ],
  cloze: [
    C('Mijn oma is {tachtig} jaar oud.', 'tachtig|!achttig|!achtig', 'Meine Oma ist achtzig Jahre alt.'),
    C('Ik woon op de {derde} verdieping.', 'derde|drie|dertig', 'Ich wohne im dritten Stock.'),
    C('Een jaar heeft {tweeënvijftig} weken.', 'tweeënvijftig|!tweeenvijftig|!tweevijftig', 'Ein Jahr hat zweiundfünfzig Wochen.'),
    C('Het is de {eerste} dag van de week.', 'eerste|!eenste|een', 'Es ist der erste Tag der Woche.'),
    C('Het kost {negenenzestig} euro.', 'negenenzestig|!negenzestig|!zestignegen', 'Es kostet neunundsechzig Euro.'),
    C('Ik ben {vijfendertig}.', 'vijfendertig|!dertigvijf|!vijfdertig', 'Ich bin fünfunddreißig.'),
  ],
  story: story('st16', 'Een telefoonnummer', 'Eine Telefonnummer', [
    ['Bram', 'Mag ik je telefoonnummer?', 'Kann ich deine Telefonnummer haben?'],
    ['Lotte', 'Ja, natuurlijk. Het is nul zes, twaalf, vierendertig, zesenvijftig.', 'Ja, natürlich. Sie ist null sechs, zwölf, vierunddreißig, sechsundfünfzig.'],
    ['Bram', 'Nul zes, twaalf, vierendertig, zesenvijftig?', 'Null sechs, zwölf, vierunddreißig, sechsundfünfzig?'],
    Q('Wie endet Lottes Nummer?', ['Sechsundfünfzig', 'Fünfundsechzig', 'Vierunddreißig'], 0),
    ['Lotte', 'Precies! En wat is jouw adres?', 'Genau! Und was ist deine Adresse?'],
    ['Bram', 'Ik woon in de Lindestraat, nummer achtentachtig, op de tweede verdieping.', 'Ich wohne in der Lindestraat, Nummer achtundachtzig, im zweiten Stock.'],
    Q('In welchem Stock wohnt Bram?', ['Im zweiten', 'Im dritten', 'Im achten'], 0),
  ]),
});

const u17 = unit({
  id: 'u17',
  title: 'In der Stadt',
  description: 'Orte in der Stadt, nach dem Weg fragen, links und rechts',
  tips: [
    T(
      'Nach dem Weg fragen',
      `
      - *Pardon, waar is het station?* „Entschuldigung, wo ist der Bahnhof?“
      - *Is het ver?* – *Nee, het is dichtbij.*
      - *Ga rechtdoor.* „Geh geradeaus.“
      - *Neem de eerste straat links.*
      - *Het is om de hoek.* „Es ist um die Ecke.“
      `,
      [['Pardon, waar is het station?', 'Entschuldigung, wo ist der Bahnhof?']],
    ),
    T(
      'Der Imperativ',
      `
      Die Befehlsform ist einfach der **Stamm**: *Ga!* (geh), *Neem!* (nimm), *Loop!* (lauf), *Kom!* (komm).

      Höflich sagt man mit **u**: *Neemt u de eerste straat links.*
      `,
      [['Neem de eerste straat links.', 'Nimm die erste Straße links.']],
    ),
    T(
      'lopen ist nicht laufen',
      `
      **lopen** heißt meistens „zu Fuß gehen“. „Rennen“ heißt **rennen**. **gaan** ist allgemein „gehen“ oder „fahren“.

      **het station** ist der Bahnhof, **de gracht** ein Kanal in der Stadt.
      `,
    ),
  ],
  words: [
    N('het station', 'der Bahnhof', 'stations', '🚉'),
    N('de kerk', 'die Kirche', 'kerken', '⛪'),
    N('het museum', 'das Museum', 'musea/museums', '🏛️'),
    N('het park', 'der Park', 'parken', '🏞️'),
    N('de brug', 'die Brücke', 'bruggen', '🌉'),
    N('de gracht', 'die Gracht, der Kanal', 'grachten'),
    N('het plein', 'der Platz', 'pleinen'),
    N('het centrum', 'das Zentrum', 'centra/centrums'),
    N('de bibliotheek', 'die Bibliothek', 'bibliotheken', '📚'),
    N('het ziekenhuis', 'das Krankenhaus', 'ziekenhuizen', '🏥'),
    N('het postkantoor', 'das Postamt', 'postkantoren', '📮'),
    N('het hotel', 'das Hotel', 'hotels', '🏨'),
    N('het restaurant', 'das Restaurant', 'restaurants'),
    N('het café', 'das Café, die Kneipe', 'cafés'),
    N('de hoek', 'die Ecke', 'hoeken'),
    N('de weg', 'der Weg', 'wegen'),
    N('het kruispunt', 'die Kreuzung', 'kruispunten'),
    N('het stoplicht', 'die Ampel', 'stoplichten', '🚦'),
    N('de buurt', 'die Gegend, das Viertel', 'buurten'),
    N('de hulp', 'die Hilfe', '-'),
    N('de bank', 'die Bank (Geldinstitut)', 'banken', '🏦', { id: 'bank-geld' }),
    W('links', 'links', 'adv'),
    W('rechts', 'rechts', 'adv'),
    W('rechtdoor', 'geradeaus', 'adv'),
    A('ver', 'weit', 'verre verder verst'),
    W('dichtbij', 'in der Nähe, nah', 'adv'),
    P('in de buurt', 'in der Nähe'),
    P('om de hoek', 'um die Ecke'),
    W('tegenover', 'gegenüber', 'prep'),
    W('langs', 'entlang, vorbei an', 'prep'),
    W('door', 'durch', 'prep'),
    W('daarna', 'danach', 'adv'),
    W('pardon', 'Entschuldigung, Verzeihung', 'interj'),
    V('vragen', 'fragen', 'vraag vraagt vragen | vroeg vroegen | gevraagd h'),
    V('lopen', 'zu Fuß gehen, laufen', 'loop loopt lopen | liep liepen | gelopen hz'),
    V('oversteken', 'überqueren', 'steek steekt steken | stak staken | overgestoken h', { sep: 'over' }),
  ],
  sentences: [
    S('Pardon, waar is het station?', 'Entschuldigung, wo ist der Bahnhof?'),
    S('Het station is rechtdoor.', 'Der Bahnhof ist geradeaus.'),
    S('Ga hier links en dan rechts.', 'Geh hier links und dann rechts.|Gehen Sie hier links und dann rechts.'),
    S('Is het ver?', 'Ist es weit?'),
    S('Nee, het is dichtbij.', 'Nein, es ist in der Nähe.|Nein, es ist nah.'),
    S('Het museum is om de hoek.', 'Das Museum ist um die Ecke.'),
    S('De kerk staat op het plein.', 'Die Kirche steht auf dem Platz.'),
    S('Het park is tegenover het ziekenhuis.', 'Der Park ist gegenüber dem Krankenhaus.|Der Park liegt gegenüber dem Krankenhaus.'),
    S('Steek de straat over bij het stoplicht.', 'Überquere die Straße an der Ampel.|Geh an der Ampel über die Straße.'),
    S('Loop langs de gracht.', 'Geh an der Gracht entlang.|Lauf an der Gracht entlang.'),
    S('Neem de eerste straat links.', 'Nimm die erste Straße links.|Nehmen Sie die erste Straße links.'),
    S('Neem de tweede straat rechts.', 'Nimm die zweite Straße rechts.|Nehmen Sie die zweite Straße rechts.'),
    S('Daarna loop je over de brug.|Daarna ga je over de brug.', 'Danach gehst du über die Brücke.'),
    S('Het hotel is in het centrum.', 'Das Hotel ist im Zentrum.|Das Hotel ist in der Innenstadt.'),
    S('Is er een bank in de buurt?', 'Gibt es eine Bank in der Nähe?'),
    S('Ik zoek de bibliotheek.', 'Ich suche die Bibliothek.'),
    S('Mag ik u iets vragen?', 'Darf ich Sie etwas fragen?'),
    S('Ik loop naar het centrum.', 'Ich gehe zu Fuß ins Zentrum.|Ich laufe ins Zentrum.|Ich gehe ins Zentrum.'),
    S('Het restaurant is naast het café.', 'Das Restaurant ist neben dem Café.'),
    S('Ga door het park.', 'Geh durch den Park.|Gehen Sie durch den Park.'),
    S('Bij het kruispunt ga je links.|Je gaat bij het kruispunt links.', 'An der Kreuzung gehst du links.|An der Kreuzung gehst du nach links.'),
    S('Amsterdam heeft veel grachten en bruggen.', 'Amsterdam hat viele Grachten und Brücken.'),
    S('Het postkantoor is niet ver van het station.', 'Das Postamt ist nicht weit vom Bahnhof.|Die Post ist nicht weit vom Bahnhof.'),
    S('Dank u wel voor de hulp!', 'Vielen Dank für die Hilfe!'),
    S('Het museum is verder dan de kerk.', 'Das Museum ist weiter als die Kirche.|Das Museum ist weiter weg als die Kirche.'),
  ],
  cloze: [
    C('Het station is {rechtdoor}.', 'rechtdoor|rechts|links', 'Der Bahnhof ist geradeaus.'),
    C('Het museum is om de {hoek}.', 'hoek|weg|straat', 'Das Museum ist um die Ecke.'),
    C('{Steek} de straat over.', 'Steek|Steekt|Steken', 'Überquere die Straße.'),
    C('Neem de {eerste} straat links.', 'eerste|!eenste|een', 'Nimm die erste Straße links.'),
    C('Het park is {tegenover} het ziekenhuis.', 'tegenover|tussen|door', 'Der Park ist gegenüber dem Krankenhaus.'),
    C('Ga {door} het park.', 'door|langs|tussen', 'Geh durch den Park.'),
    C('Is er een bank in de {buurt}?', 'buurt|hoek|weg', 'Gibt es eine Bank in der Nähe?'),
  ],
  story: story('st17', 'Waar is het museum?', 'Wo ist das Museum?', [
    ['Toerist', 'Pardon, mag ik u iets vragen?', 'Entschuldigung, darf ich Sie etwas fragen?'],
    ['Jan', 'Natuurlijk.', 'Natürlich.'],
    ['Toerist', 'Ik zoek het museum. Is het ver?', 'Ich suche das Museum. Ist es weit?'],
    ['Jan', 'Nee, het is dichtbij. Loop hier rechtdoor tot de brug.', 'Nein, es ist in der Nähe. Gehen Sie hier geradeaus bis zur Brücke.'],
    ['Jan', 'Steek de brug over en neem de eerste straat links.', 'Gehen Sie über die Brücke und nehmen Sie die erste Straße links.'],
    Q('Was soll der Tourist nach der Brücke machen?', ['Die erste Straße links nehmen', 'Nach rechts gehen', 'Den Bus nehmen'], 0),
    ['Jan', 'Het museum is tegenover de kerk.', 'Das Museum ist gegenüber der Kirche.'],
    ['Toerist', 'Dank u wel voor de hulp!', 'Vielen Dank für die Hilfe!'],
    Q('Wo ist das Museum?', ['Gegenüber der Kirche', 'Neben dem Bahnhof', 'Im Park'], 0),
  ]),
});

const u18 = unit({
  id: 'u18',
  title: 'Unterwegs',
  description: 'Zug, Bus, Rad: fahren, abfahren, umsteigen, warten',
  tips: [
    T(
      'Verkehrsmittel',
      `
      **met de** + Verkehrsmittel = „mit dem …“: *met de trein, met de bus, met de fiets, met de auto*.

      - **rijden** = fahren (Auto, Zug, Bus): *ik rijd, jij rijdt, wij rijden*
      - **fietsen** = Rad fahren
      - **gaan met** = fahren mit: *Ik ga met de trein naar Amsterdam.*
      `,
      [['Ik ga met de trein naar Amsterdam.', 'Ich fahre mit dem Zug nach Amsterdam.']],
    ),
    T(
      'Ein-, aus- und umsteigen',
      `
      **instappen** (einsteigen), **uitstappen** (aussteigen), **overstappen** (umsteigen) und **aankomen** (ankommen) sind trennbar:

      - *Ik stap hier uit.*
      - *In Utrecht stap ik over.*
      - *Wanneer komt de trein aan?*
      `,
      [['Ik stap hier uit.', 'Ich steige hier aus.']],
    ),
    T(
      'Am Bahnhof',
      `
      - *Een kaartje naar Utrecht, alstublieft.*
      - *Enkele reis of retour?* „Einfach oder hin und zurück?“
      - *De trein heeft vertraging.* „Der Zug hat Verspätung.“
      - *op tijd* = pünktlich, *te laat* = zu spät
      - *het spoor* = das Gleis, *het perron* = der Bahnsteig
      `,
    ),
  ],
  words: [
    N('de trein', 'der Zug', 'treinen', '🚆'),
    N('de bus', 'der Bus', 'bussen', '🚌'),
    N('de tram', 'die Straßenbahn', 'trams', '🚋'),
    N('de metro', 'die U-Bahn', "metro's", '🚇'),
    N('de boot', 'das Boot', 'boten', '⛵'),
    N('het vliegtuig', 'das Flugzeug', 'vliegtuigen', '✈️'),
    N('de taxi', 'das Taxi', "taxi's", '🚕'),
    N('het kaartje', 'die Fahrkarte', 'kaartjes', '🎫'),
    N('de halte', 'die Haltestelle', 'haltes'),
    N('het perron', 'der Bahnsteig', 'perrons'),
    N('het spoor', 'das Gleis', 'sporen'),
    N('de vertraging', 'die Verspätung', 'vertragingen'),
    N('de reis', 'die Reise', 'reizen'),
    N('het vliegveld', 'der Flughafen', 'vliegvelden'),
    N('de kop', 'die Tasse; der Kopf', 'koppen'),
    V('rijden', 'fahren', 'rijd rijdt rijden | reed reden | gereden hz'),
    V('fietsen', 'Rad fahren', 'fiets fietst fietsen | fietste fietsten | gefietst hz'),
    V('vliegen', 'fliegen', 'vlieg vliegt vliegen | vloog vlogen | gevlogen hz'),
    V('vertrekken', 'abfahren, abreisen', 'vertrek vertrekt vertrekken | vertrok vertrokken | vertrokken z'),
    V('aankomen', 'ankommen', 'kom komt komen | kwam kwamen | aangekomen z', { sep: 'aan' }),
    V('instappen', 'einsteigen', 'stap stapt stappen | stapte stapten | ingestapt z', { sep: 'in' }),
    V('uitstappen', 'aussteigen', 'stap stapt stappen | stapte stapten | uitgestapt z', { sep: 'uit' }),
    V('overstappen', 'umsteigen', 'stap stapt stappen | stapte stapten | overgestapt z', { sep: 'over' }),
    V('wachten', 'warten', 'wacht wacht wachten | wachtte wachtten | gewacht h'),
    V('duren', 'dauern', 'duur duurt duren | duurde duurden | geduurd h'),
    P('op tijd', 'pünktlich'),
    P('enkele reis', 'einfache Fahrt'),
    W('retour', 'hin und zurück', 'noun'),
    A('gelukkig', 'glücklich; zum Glück', 'gelukkige gelukkiger gelukkigst'),
    W('Spanje', 'Spanien', 'name'),
  ],
  sentences: [
    S('Ik ga met de trein naar Amsterdam.', 'Ich fahre mit dem Zug nach Amsterdam.'),
    S('Hij gaat met de fiets naar zijn werk.', 'Er fährt mit dem Fahrrad zur Arbeit.'),
    S('Wij fietsen naar school.', 'Wir fahren mit dem Rad zur Schule.|Wir fahren mit dem Fahrrad zur Schule.|Wir radeln zur Schule.'),
    S('De trein vertrekt om tien uur.', 'Der Zug fährt um zehn Uhr ab.'),
    S('De trein heeft vertraging.', 'Der Zug hat Verspätung.'),
    S('Waar is de halte van bus acht?', 'Wo ist die Haltestelle von Bus acht?|Wo ist die Haltestelle für Bus acht?'),
    S('Een kaartje naar Utrecht, alstublieft.', 'Eine Fahrkarte nach Utrecht, bitte.'),
    S('Enkele reis of retour?', 'Einfach oder hin und zurück?'),
    S('Retour, alstublieft.', 'Hin und zurück, bitte.'),
    S('Van welk spoor vertrekt de trein?', 'Von welchem Gleis fährt der Zug ab?|Auf welchem Gleis fährt der Zug ab?'),
    S('In Utrecht stap ik over.|Ik stap in Utrecht over.', 'In Utrecht steige ich um.|Ich steige in Utrecht um.'),
    S('Ik stap hier uit.', 'Ich steige hier aus.'),
    S('Wanneer komt de trein aan?', 'Wann kommt der Zug an?'),
    S('Ik wacht op de bus.', 'Ich warte auf den Bus.'),
    S('Gelukkig is de tram op tijd.', 'Zum Glück ist die Straßenbahn pünktlich.'),
    S('We vliegen naar Spanje.', 'Wir fliegen nach Spanien.'),
    S('Ik rijd niet graag auto.', 'Ich fahre nicht gern Auto.|Ich fahre nicht gerne Auto.'),
    S('Rijd jij of rijd ik?', 'Fährst du oder fahre ich?'),
    S('De taxi wacht voor de deur.', 'Das Taxi wartet vor der Tür.'),
    S('De reis duurt twee uur.', 'Die Reise dauert zwei Stunden.'),
    S('Hoe lang duurt de reis?', 'Wie lange dauert die Reise?'),
    S('Stap snel in!', 'Steig schnell ein!'),
    S('De metro rijdt elke vijf minuten.', 'Die U-Bahn fährt alle fünf Minuten.'),
    S('Het vliegtuig is groot.', 'Das Flugzeug ist groß.'),
    S('Het vliegveld is ver van de stad.', 'Der Flughafen ist weit von der Stadt entfernt.|Der Flughafen ist weit weg von der Stadt.'),
    S('De boot vertrekt van het perron.', 'Das Boot fährt vom Bahnsteig ab.'),
  ],
  cloze: [
    C('Ik ga {met} de trein.', 'met|naar|van', 'Ich fahre mit dem Zug.'),
    C('De trein {vertrekt} om tien uur.', 'vertrek|vertrekt|vertrekken', 'Der Zug fährt um zehn Uhr ab.'),
    C('Ik stap hier {uit}.', 'uit|in|over', 'Ich steige hier aus.'),
    C('Ik wacht {op} de bus.', 'op|aan|voor', 'Ich warte auf den Bus.'),
    C('{Rijd} jij of rijd ik?', 'Rijd|Rijdt|Rijden', 'Fährst du oder fahre ich?'),
    C('Hoe lang {duurt} de reis?', 'duur|duurt|duren', 'Wie lange dauert die Reise?'),
    C('De trein heeft {vertraging}.', 'vertraging|vertrek|reis', 'Der Zug hat Verspätung.'),
  ],
  story: story('st18', 'In de trein', 'Im Zug', [
    ['Conducteur', 'Goedemorgen, mag ik uw kaartje zien?', 'Guten Morgen, darf ich Ihre Fahrkarte sehen?'],
    ['Pieter', 'Ja, natuurlijk. Alstublieft.', 'Ja, natürlich. Bitte schön.'],
    ['Conducteur', 'Dank u. U moet in Utrecht overstappen.', 'Danke. Sie müssen in Utrecht umsteigen.'],
    ['Pieter', 'Van welk spoor vertrekt de trein naar Zwolle?', 'Von welchem Gleis fährt der Zug nach Zwolle ab?'],
    ['Conducteur', 'Van spoor vijf. Maar hij heeft tien minuten vertraging.', 'Von Gleis fünf. Aber er hat zehn Minuten Verspätung.'],
    Q('Wo muss Pieter umsteigen?', ['In Utrecht', 'In Zwolle', 'In Amsterdam'], 0),
    ['Pieter', 'Gelukkig! Dan heb ik tijd voor een kop koffie.', 'Zum Glück! Dann habe ich Zeit für eine Tasse Kaffee.'],
    Q('Wie viel Verspätung hat der Zug nach Zwolle?', ['Zehn Minuten', 'Fünf Minuten', 'Keine'], 0),
  ]),
});

const u19 = unit({
  id: 'u19',
  title: 'Freizeit und Hobbys',
  description: 'gern, lieber, am liebsten; Musik, Sport, Filme',
  tips: [
    T(
      'graag, liever, het liefst',
      `
      **graag** heißt „gern“ und steht hinter dem Verb, wie im Deutschen:

      - *Ik zwem graag.* „Ich schwimme gern.“
      - *Ik wandel liever.* „Ich gehe lieber spazieren.“
      - *Ik zing het liefst.* „Am liebsten singe ich.“
      `,
      [['Ik speel het liefst piano.', 'Am liebsten spiele ich Klavier.']],
    ),
    T(
      'houden van',
      `
      **houden van** heißt „lieben“ oder „sehr mögen“: *Ik hou van muziek.*

      | | houden |
      |---|---|
      | ik | hou / houd |
      | jij | houdt (hou je?) |
      | hij / zij | houdt |
      | wij / zij | houden |
      `,
      [['Hou je van sport?', 'Magst du Sport?']],
    ),
    T(
      'kijken naar, luisteren naar',
      `
      Beide Verben brauchen **naar**:

      - *Ik luister naar muziek.* „Ich höre Musik.“
      - *We kijken naar een film.* „Wir schauen einen Film.“
      `,
    ),
  ],
  words: [
    P('houden van', 'lieben, mögen'),
    V('houden', 'halten; mögen (houden van)', 'houd/hou houdt houden | hield hielden | gehouden h'),
    V('spelen', 'spielen', 'speel speelt spelen | speelde speelden | gespeeld h'),
    V('luisteren', 'zuhören', 'luister luistert luisteren | luisterde luisterden | geluisterd h'),
    V('dansen', 'tanzen', 'dans danst dansen | danste dansten | gedanst h'),
    V('zingen', 'singen', 'zing zingt zingen | zong zongen | gezongen h'),
    V('koken', 'kochen', 'kook kookt koken | kookte kookten | gekookt h'),
    V('wandelen', 'spazieren gehen, wandern', 'wandel wandelt wandelen | wandelde wandelden | gewandeld hz'),
    V('tekenen', 'zeichnen', 'teken tekent tekenen | tekende tekenden | getekend h'),
    N('de sport', 'der Sport', 'sporten'),
    N('het voetbal', 'der Fußball (Sport)', '-', '⚽'),
    N('de muziek', 'die Musik', '-', '🎵'),
    N('de film', 'der Film', 'films', '🎬'),
    N('de bioscoop', 'das Kino', 'bioscopen'),
    N('het spel', 'das Spiel', 'spellen', '🎲'),
    N('de gitaar', 'die Gitarre', 'gitaren', '🎸'),
    N('de piano', 'das Klavier', "piano's", '🎹'),
    N('het instrument', 'das Instrument', 'instrumenten'),
    N('de hobby', 'das Hobby', "hobby's"),
    N('het lied', 'das Lied', 'liederen', '🎶'),
    N('het concert', 'das Konzert', 'concerten'),
    P('vrije tijd', 'Freizeit'),
    W('liever', 'lieber', 'adv'),
    P('het liefst', 'am liebsten'),
    A('saai', 'langweilig', 'saaie saaier saaist'),
    A('spannend', 'spannend', 'spannende spannender spannendst'),
    A('interessant', 'interessant', 'interessante interessanter interessantst'),
    A('grappig', 'lustig, witzig', 'grappige grappiger grappigst'),
  ],
  sentences: [
    S('Ik zwem graag.', 'Ich schwimme gern.|Ich schwimme gerne.'),
    S('Wat doe je graag?', 'Was machst du gern?|Was machst du gerne?'),
    S('Ik lees graag boeken.', 'Ich lese gern Bücher.|Ich lese gerne Bücher.'),
    S('Hij speelt voetbal.', 'Er spielt Fußball.'),
    S('Zij speelt gitaar.', 'Sie spielt Gitarre.'),
    S('Ik luister naar muziek.', 'Ich höre Musik.'),
    S('We kijken naar een film.', 'Wir schauen einen Film.|Wir sehen einen Film.|Wir gucken einen Film.'),
    S('Ik hou van muziek.|Ik houd van muziek.', 'Ich liebe Musik.|Ich mag Musik.'),
    S('Hou je van sport?|Houd je van sport?', 'Magst du Sport?|Liebst du Sport?'),
    S('Mijn moeder kookt graag.', 'Meine Mutter kocht gern.|Meine Mutter kocht gerne.'),
    S('Ik dans niet graag.', 'Ich tanze nicht gern.|Ich tanze nicht gerne.'),
    S('Ik wandel liever in het park.', 'Ich gehe lieber im Park spazieren.'),
    S('Ik speel het liefst piano.', 'Am liebsten spiele ich Klavier.|Ich spiele am liebsten Klavier.'),
    S('Gaan we naar de bioscoop?', 'Gehen wir ins Kino?'),
    S('De film is spannend.', 'Der Film ist spannend.'),
    S('Het boek is saai.', 'Das Buch ist langweilig.'),
    S('Wat is je hobby?', 'Was ist dein Hobby?'),
    S('In mijn vrije tijd teken ik.|Ik teken in mijn vrije tijd.', 'In meiner Freizeit zeichne ich.|Ich zeichne in meiner Freizeit.'),
    S('De kinderen spelen een spel.', 'Die Kinder spielen ein Spiel.'),
    S('Zij zingt een mooi lied.', 'Sie singt ein schönes Lied.'),
    S('Het concert is morgen.', 'Das Konzert ist morgen.'),
    S('Die film is erg grappig.', 'Dieser Film ist sehr lustig.|Der Film da ist sehr lustig.|Dieser Film ist sehr witzig.'),
    S('Ik vind het interessant.', 'Ich finde es interessant.|Ich finde das interessant.'),
    S('Speel je een instrument?', 'Spielst du ein Instrument?'),
    S('Ik heb veel hobby\'s.', 'Ich habe viele Hobbys.'),
  ],
  cloze: [
    C('Ik zwem {graag}.', 'graag|liefst|nodig', 'Ich schwimme gern.'),
    C('Ik luister {naar} muziek.', 'naar|op|aan', 'Ich höre Musik.'),
    C('Ik {hou} van sport.', 'hou|houdt|houden', 'Ich liebe Sport.'),
    C('{Hou} je van muziek?', 'Hou|Houdt|Houden', 'Magst du Musik?'),
    C('Ik speel het {liefst} piano.', 'liefst|liever|graag', 'Am liebsten spiele ich Klavier.'),
    C('Zij zingt een {mooi} lied.', 'mooi|mooie', 'Sie singt ein schönes Lied.'),
    C('Wij {kijken} naar een film.', 'kijk|kijkt|kijken', 'Wir schauen einen Film.'),
  ],
  story: story('st19', 'Wat doe je graag?', 'Was machst du gern?', [
    ['Mila', 'Sem, wat doe jij graag in je vrije tijd?', 'Sem, was machst du gern in deiner Freizeit?'],
    ['Sem', 'Ik speel graag voetbal. En ik luister naar muziek.', 'Ich spiele gern Fußball. Und ich höre Musik.'],
    ['Mila', 'Ik hou niet van voetbal. Ik dans liever.', 'Ich mag Fußball nicht. Ich tanze lieber.'],
    Q('Was macht Mila lieber als Fußball spielen?', ['Tanzen', 'Schwimmen', 'Lesen'], 0),
    ['Sem', 'Speel je ook een instrument?', 'Spielst du auch ein Instrument?'],
    ['Mila', 'Ja, piano. Maar het liefst zing ik!', 'Ja, Klavier. Aber am liebsten singe ich!'],
    Q('Was macht Mila am liebsten?', ['Singen', 'Klavier spielen', 'Tanzen'], 0),
    ['Sem', 'Zaterdag is er een concert in het park. Gaan we samen?', 'Am Samstag gibt es ein Konzert im Park. Gehen wir zusammen hin?'],
    ['Mila', 'Leuk! Ja, graag!', 'Toll! Ja, gern!'],
    Q('Wo ist das Konzert?', ['Im Park', 'Im Kino', 'In der Schule'], 0),
  ]),
});

const u20 = unit({
  id: 'u20',
  title: 'Das Wetter',
  description: 'Regen, Wind, Sonne; worden; Wetterausdrücke',
  tips: [
    T(
      'Wetterverben',
      `
      Wie im Deutschen ist **het** („es“) das Subjekt:

      - *Het regent.* „Es regnet.“
      - *Het sneeuwt.* „Es schneit.“
      - *Het waait.* „Es ist windig.“ (wörtlich: es weht)
      - *De zon schijnt.* „Die Sonne scheint.“
      `,
      [['Het waait hard.', 'Es ist sehr windig.']],
    ),
    T(
      'worden – werden',
      `
      | | worden |
      |---|---|
      | ik | word |
      | jij | wordt (word je?) |
      | hij / zij / het | wordt |
      | wij / jullie / zij | worden |

      Vergangenheit: *werd, werden*; Perfekt: *is geworden*.
      `,
      [['Morgen wordt het zonnig.', 'Morgen wird es sonnig.']],
    ),
    T(
      'Ausdrücke',
      `
      - *mooi weer, lekker weer* = schönes Wetter (ohne -e, weil *het weer*)
      - *Wat voor weer is het?* „Wie ist das Wetter?“
      - *Het regent pijpenstelen.* „Es regnet in Strömen.“
      - *Het is twintig graden.* Hier steht *graden* im Plural.
      `,
    ),
  ],
  words: [
    N('het weer', 'das Wetter', '-', '🌦️'),
    N('de zon', 'die Sonne', 'zonnen', '☀️'),
    N('de regen', 'der Regen', '-', '🌧️'),
    N('de wind', 'der Wind', 'winden', '💨'),
    N('de sneeuw', 'der Schnee', '-', '❄️'),
    N('de wolk', 'die Wolke', 'wolken', '☁️'),
    N('de lucht', 'der Himmel; die Luft', 'luchten'),
    N('de storm', 'der Sturm', 'stormen', '🌪️'),
    N('de graad', 'der Grad', 'graden', '🌡️'),
    N('de paraplu', 'der Regenschirm', "paraplu's", '☂️'),
    N('het onweer', 'das Gewitter', '-', '⛈️'),
    N('de temperatuur', 'die Temperatur', 'temperaturen'),
    N('de weersvoorspelling', 'die Wettervorhersage', 'weersvoorspellingen'),
    V('regenen', 'regnen', 'regen regent regenen | regende regenden | geregend h'),
    V('waaien', 'wehen (windig sein)', 'waai waait waaien | waaide waaiden | gewaaid h'),
    V('sneeuwen', 'schneien', 'sneeuw sneeuwt sneeuwen | sneeuwde sneeuwden | gesneeuwd h'),
    V('schijnen', 'scheinen', 'schijn schijnt schijnen | scheen schenen | geschenen h'),
    V('worden', 'werden', 'word wordt worden | werd werden | geworden z'),
    V('meenemen', 'mitnehmen', 'neem neemt nemen | nam namen | meegenomen h', { sep: 'mee' }),
    W('mee', 'mit (Verbteil: meenemen)', 'adv'),
    A('nat', 'nass', 'natte natter natst'),
    A('droog', 'trocken', 'droge droger droogst'),
    A('zonnig', 'sonnig', 'zonnige zonniger zonnigst'),
    A('bewolkt', 'bewölkt', 'bewolkte - -'),
    A('heet', 'heiß', 'hete heter heetst'),
    A('fris', 'frisch, kühl', 'frisse frisser frist'),
    A('hard', 'hart; stark; schnell', 'harde harder hardst'),
    A('heel', 'ganz', 'hele - -', { id: 'heel-adj' }),
    W('misschien', 'vielleicht', 'adv'),
    W('volgens', 'laut, nach', 'prep'),
    W('echt', 'echt, wirklich', 'adv'),
    W('zo', 'so', 'adv'),
    P('wat voor', 'was für'),
    P('het regent pijpenstelen', 'es regnet in Strömen'),
  ],
  sentences: [
    S('Het regent.', 'Es regnet.'),
    S('Het waait hard.', 'Es ist sehr windig.|Der Wind weht stark.|Es weht ein starker Wind.'),
    S('Het sneeuwt.', 'Es schneit.'),
    S('De zon schijnt.', 'Die Sonne scheint.'),
    S('Wat voor weer is het?|Hoe is het weer?', 'Wie ist das Wetter?'),
    S('Het is mooi weer.', 'Es ist schönes Wetter.|Das Wetter ist schön.'),
    S('Vandaag is het slecht weer.|Het is vandaag slecht weer.', 'Heute ist schlechtes Wetter.|Das Wetter ist heute schlecht.|Es ist heute schlechtes Wetter.'),
    S('Het is twintig graden.', 'Es ist zwanzig Grad.|Es sind zwanzig Grad.'),
    S('Het is koud buiten.|Buiten is het koud.', 'Draußen ist es kalt.|Es ist kalt draußen.'),
    S('Neem een paraplu mee!', 'Nimm einen Regenschirm mit!'),
    S('Er zijn veel wolken.', 'Es gibt viele Wolken.|Es sind viele Wolken am Himmel.'),
    S('Het is bewolkt.', 'Es ist bewölkt.'),
    S('Morgen wordt het zonnig.', 'Morgen wird es sonnig.'),
    S('In de zomer is het soms heet.', 'Im Sommer ist es manchmal heiß.'),
    S('Mijn jas is nat.', 'Meine Jacke ist nass.|Mein Mantel ist nass.'),
    S('Gelukkig is het droog.', 'Zum Glück ist es trocken.'),
    S('Misschien regent het morgen.', 'Vielleicht regnet es morgen.'),
    S('Het regent pijpenstelen!', 'Es regnet in Strömen!|Es gießt in Strömen!'),
    S('Er is onweer.', 'Es gibt ein Gewitter.|Es gewittert.'),
    S('De lucht is blauw.', 'Der Himmel ist blau.'),
    S('Vanochtend is het fris.|Het is fris vanochtend.', 'Heute Morgen ist es frisch.|Heute Morgen ist es kühl.|Es ist frisch heute Morgen.'),
    S('Wat is de temperatuur?', 'Wie ist die Temperatur?|Wie hoch ist die Temperatur?'),
    S('Volgens de weersvoorspelling wordt het warm.', 'Laut Wettervorhersage wird es warm.|Laut der Wettervorhersage wird es warm.'),
    S('Het regent al de hele dag.', 'Es regnet schon den ganzen Tag.'),
    S('Er komt een storm.', 'Ein Sturm kommt.|Es kommt ein Sturm.'),
    S('Er is veel wind.', 'Es ist viel Wind.|Es gibt viel Wind.'),
    S('Er ligt sneeuw in de tuin.', 'Im Garten liegt Schnee.|Es liegt Schnee im Garten.'),
    S('Is het echt zo koud?', 'Ist es wirklich so kalt?') ,
  ],
  cloze: [
    C('Het {regent}.', 'regen|regent|regenen', 'Es regnet.'),
    C('Het {waait} hard.', 'waai|waait|waaien', 'Es ist sehr windig.'),
    C('De zon {schijnt}.', 'schijn|schijnt|schijnen', 'Die Sonne scheint.'),
    C('Het is twintig {graden}.', 'graad|graden', 'Es ist zwanzig Grad.'),
    C('Het is {mooi} weer.', 'mooi|mooie', 'Es ist schönes Wetter.'),
    C('Morgen {wordt} het zonnig.', 'word|wordt|worden', 'Morgen wird es sonnig.'),
    C('Neem een paraplu {mee}!', 'mee|met|bij', 'Nimm einen Regenschirm mit!'),
  ],
  story: story('st20', 'Wat een weer!', 'Was für ein Wetter!', [
    ['Lisa', 'Wat een weer! Het regent al de hele dag.', 'Was für ein Wetter! Es regnet schon den ganzen Tag.'],
    ['Tom', 'Ja, en het waait hard. Mijn paraplu is kapot.', 'Ja, und es ist sehr windig. Mein Regenschirm ist kaputt.'],
    Q('Was ist mit Toms Regenschirm?', ['Er ist kaputt', 'Er ist nass', 'Er ist neu'], 0),
    ['Lisa', 'Volgens de weersvoorspelling wordt het morgen beter.', 'Laut Wettervorhersage wird es morgen besser.'],
    ['Tom', 'Echt? Hoe warm wordt het?', 'Wirklich? Wie warm wird es?'],
    ['Lisa', 'Twintig graden en zonnig!', 'Zwanzig Grad und sonnig!'],
    Q('Wie wird das Wetter morgen?', ['Sonnig, zwanzig Grad', 'Regnerisch', 'Kalt und windig'], 0),
    ['Tom', 'Dan gaan we morgen naar het strand!', 'Dann gehen wir morgen an den Strand!'],
    Q('Was wollen die beiden morgen machen?', ['An den Strand gehen', 'Ins Kino gehen', 'Zu Hause bleiben'], 0),
  ]),
});

export default [u11, u12, u13, u14, u15, u16, u17, u18, u19, u20];
