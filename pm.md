# Time Tracker

Post mortem

Adam Bergman

2019-06-03

## Abstrakt

Den här rapporten avhandlar framtagandet av applikationen **Time Tracker**, ett projekt som ingår i kursen Individuellt mjukvaruutvecklingsprojekt hos Linnéuniversitetet. Applikationen erbjuder ett smidigt sätt för frilansare att översiktligt spåra tid för diverse uppgifter tillhörande olika projekt. Arbetet har pågått på halvfart under en tioveckorsperiod med ett tidsspann om 200 timmar.

Rapporten förklarar **Time Tracker** genom att beskriva dess syfte, arbetssätt, de tekniker som använts och positiva samt negativa erfarenheter. Rapporten avslutas sedan med en sammanfattning innehållandes en personlig reflektion.


## Inledning och bakgrund

**TimeTracker** är ett program till MacOS där användaren kan:

* Skapa, redigera och ta bort projekt
* Skapa, redigera och ta bort Todos
* Starta och stoppa en tidsräknare till varje enskild Todo
* Se rapporter med datumsortering som visar hur mycket som kan faktureras per projekt
* Ange vilken valuta användaren arbetar utifrån
* Få notis med tidstämpel om användaren varit inaktiv i över 10 minuter

### Syfte och mål

Syftet har varit att leverera en färdigställd, egenutvecklad produkt som inkluderat tidsplanering och testning för ökad erfarenhet och förberedelse inför arbetslivet som utvecklare.

Målet har varit att utveckla en applikation som erbjuder möjligheten att spåra hur mycket tid som läggs på olika uppgifter.

### Arbetssätt

Projektet har genomförts individuellt under en tioveckorsperiod på halvfart som ska motsvara ungefär 200 timmar. Arbetssättet har bestått av följande:

* Projektvision
* Kravspecifikation
* Risklista
* Testspecifikation
* Testrapport
* Sprint backlogs för att planera uppgifter vecka för vecka. Ny sprint backlog har utformats efter varje gången vecka. Varje "sprint" inkluderar tidsestimat till varje uppgift, faktiskt tid samt en personlig reflektion av veckan som gått.
* Tidrapportering
* Gruppmöten med kursens handledare en gång i veckan för feedback
* Versionshantering av kod

### Genomförande/teknik

Följande tekniker har använts under projektets gång:

* [Visual Studio Code (kodredigerare)](https://code.visualstudio.com/)
* [JavaScript](https://developer.mozilla.org/sv-SE/docs/Web/JavaScript)
* [HTML och CSS](https://www.w3schools.com/html/html_css.asp)
* [React (ramverk för JavaScript)](https://reactjs.org/)
* [Node.js (för exekvering av JavaScript)](https://nodejs.org/en/)
* [Electron (för att utveckla desktop-applikationer)](https://electronjs.org/)
* [Moduler från NPM (pakethanterare)](https://www.npmjs.com/)
* [Jest och Enzyme (för testning)](https://airbnb.io/enzyme/docs/guides/jest.html)
* [Clockify (tidrapportering)](https://clockify.me/)
* [Sketch och Figma (för prototyper)](https://www.figma.com/figma-vs-sketch/)
* [Adobe Photoshop (för logotyp)](https://www.adobe.com/se/products/photoshop.html)

## Positiva erfarenheter

Att arbeta iterativt genom att planera vad som skall göras vecka för vecka har underlättat processen i sin helhet. Det har hjälpt mig att enklare hålla mig inom ramen för projektets tidsspann genom att inte planera för mycket eller för lite under iterationerna. Jag tror att detta är en otroligt viktig del när man arbetar som utvecklare och att jag kommer att få en mer strukturerad arbetsprocess för framtida projekt.

Jag tycker att min tidrapportering har gått extra bra tack vare att jag har erfarenhet av uppgiften sedan tidigare, nu har jag dessutom fått öva ytterligare på att vara noggrann och även på att dela upp vad jag arbetar med så att jag inte råkar rapportera tid på en uppgift som egentligen skulle ha tillhört en annan uppgift. En annan positiv erfarenhet jag tar med mig är att jag nu känner mig trygg i att använda React-ramverket för att bygga webbapplikationer, vilket kommer hjälpa mig i framtida projekt samt förhoppningsvis leda till att jag blir mer attraktiv för potentiella uppdragsgivare.

Att jag från början arbetade fram en prototyp av produkten har hjälpt mig att veta hur applikationen ska se ut samt vilken funktionalitet som är viktig att ägna tid åt. Tack vare prototypen kunde jag väldigt fort utforma applikationen utifrån den utan att senare behöva ägna tid åt att förbättra utseendet, utan snarare mindre förbättringar. Att jag har goda CSS-kunskaper har bidragit till att just design-biten gått väldigt bra. Nu blev inte utfallet så lik ursprungsprototypen som jag hade räknat med, men det är till det bättre. För framtida projekt så tänker jag däremot inte låta prototypen endast vara en utgångspunkt utan snarare ett bestämt utseende som inte går att tumma på, särskilt viktigt om det inte är jag själv som får bestämma utseendet.

## Negativa erfarenheter

Det var ganska långt in i projektet som jag insåg att möjligheten för användaren att kunna subtrahera inaktiv tid med gången tid är en väldigt bra funktionalitet i kombination med den implementerade notifikationen som berättar vid vilken tidpunkt användaren blev inaktiv. Tyvärr räckte inte tiden till för att få subtraheringen att fungera optimalt, samtidigt som jag känner att övrig, redan implementerad funktionalitet, är viktigare. Lärdomen blir att noggrannare tänka igenom vad som bör finnas med i en applikation som är tänkt att förbättra motsvarande alternativ.

Jag inser att automatiserad testning är väldigt värdefullt och att jag borde ha implementerat det tidigare, vilket hade hjälpt mig att upptäcka buggar i tidigare skeden. Exempel på detta är att jag inte upptäckte att tidsräknaren slutade räkna om användaren stängde ner applikationsfönstret förrän den tredje sista iterationsveckan, en bugg som jag åtgärdat men som jag önskat borde ha dykt upp i ett tidigare stadie. Jag har lärt mig hur man bäst testar funktionalitet i React, vilket innebär att jag kommer att ha lättare för att utöva TDD (testdriven utveckling) för framtida projekt.

## Sammanfattning

Jag känner mig stolt och nöjd över slutprodukten. Det har inte varit förrän nu som jag insett hur mycket jag faktiskt lärt mig på ett års universitetsstudier. Att jag har fått möjligheten att använda mig av React är jag väldigt tacksam över och något som jag vet kommer att gynna mig i framtiden eftersom det är en attraktiv kompetens och något som öppnar dörrar för att enklare lära mig liknande ramverk. Jag tar med mig att jag är bra på att tidrapportera, att det är behjälpligt att arbeta iterativt och att prototyper är en viktig del för att komma framåt. Jag tar också med mig att arbeta mer med testning så att det istället kan hjälpa mig i processen istället för att i slutspurten verifiera att allt fungerar som det är tänkt.

Om tid ges i framtiden till att vidareutveckla mitt projekt så kommer jag att implementera bättre notisfunktionalitet så att användaren kan subtrahera inaktiv tid med aktiv tid samt integrera rapporteringen med någon faktureringstjänst, exempelvis Billogram. Ett annat alternativ vore att kunna exportera importerbara filer som kan importeras till fakturerings- och bokföringsprogram. Jag kommer också att se till att applikationen fungerar lika bra på Windows. Vidare så vore det roligt att släppa en webbapplikation och implementera inloggning så att användarna kan komma åt sina projekt var de än är.
