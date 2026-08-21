import { PERSONAL } from '@/constants/data';
import type { PageContent } from './blocks';

export const ABOUT_SL: PageContent = {
  title: 'O Urbanu Vidoviču',
  summary:
    'Software engineer iz Maribora, ki dela na decentralizirani identiteti, preverljivih poverilnicah in razvoju Web3 produktov — od pametnih pogodb in zalednih sistemov do vmesnikov, ki jih ljudje dejansko uporabljajo.',
  blocks: [
    { kind: 'heading', level: 2, text: 'Kaj delam' },
    {
      kind: 'paragraph',
      text: `Sem Research & Development Engineer v [Blockchain Lab:UM](${PERSONAL.companyUrl}) ter COO in soustanovitelj [Lutra Labs](${PERSONAL.company2Url}). Obe vlogi sta praktični: večino časa načrtujem in gradim sisteme, ne vodim od daleč. Skupna nit vsega, kar gradim, je digitalna identiteta — kako dokazati, kdo nekdo je in do česa je upravičen, ne da bi moral razkriti več, kot je nujno.`,
    },
    {
      kind: 'paragraph',
      text: 'V praksi to pomeni standarde, pretvorjene v delujočo programsko opremo: OpenID for Verifiable Credential Issuance, ISO mDoc/mDL, W3C Verifiable Credentials in DID-e ter infrastrukturo denarnic in izdajateljev, ki vse to naredi uporabno. Poleg identitete delam na DeFi protokolih, razvijalskih orodjih in operativni infrastrukturi, ki vse skupaj drži na spletu.',
    },
    { kind: 'heading', level: 2, text: 'Področja dela' },
    { kind: 'heading', level: 3, text: 'Decentralizirana identiteta in preverljive poverilnice' },
    {
      kind: 'paragraph',
      text: 'Implementacije izdajateljev, denarnic in preveriteljev, zgrajene po družini specifikacij OID4VC in standardih ISO 18013-5/-7. Sem sodijo formati poverilnic in selektivno razkrivanje, registri zaupanja ter nehvaležno delo interoperabilnosti, pri katerem mora denarnica enega ponudnika sprejeti poverilnico drugega.',
    },
    { kind: 'heading', level: 3, text: 'Web3 in protokolarni inženiring' },
    {
      kind: 'paragraph',
      text: 'Pametne pogodbe in načrtovanje protokolov v jezikih Solidity in Sway, vključno s posojilnimi trgi in sistemi ugleda, ter indekserji, zaledni sistemi in nadzorne plošče okoli njih. Skrbijo me deli, ki jih je težko dodati naknadno: poti nadgradnje, invariante in obnašanje sistema ob napadu.',
    },
    { kind: 'heading', level: 3, text: 'Uporabne raziskave in produkt' },
    {
      kind: 'paragraph',
      text: 'Pretvarjanje raziskovalnih rezultatov v produkte, ki jih je mogoče dejansko zagnati. Velik del mojega dela v Blockchain Lab:UM poteka v evropsko financiranih projektih, kjer je rezultat delujoča referenčna implementacija, zanimiv problem pa je razdalja med specifikacijo in sistemom, ki preživi stik z resničnimi uporabniki.',
    },
    { kind: 'heading', level: 2, text: 'Kako delam' },
    {
      kind: 'list',
      items: [
        'Od začetka do konca. Raje prevzamem funkcionalnost od pogodbe ali protokola do vmesnika, kot da jo predajam med tremi ekipami.',
        'Varnost kot privzeta drža. Modeliranje groženj in upravljanje ključev sta vhodna podatka za načrt, ne pregled na koncu.',
        'Najprej standardi, nato pragmatizem. Interoperabilnost je vredna truda; čistost sama zase ni.',
        'Zapisano. Arhitekturne odločitve, kompromisi in razlogi zanje sodijo v repozitorij, ne v spomin posameznika.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Ozadje' },
    {
      kind: 'paragraph',
      text: `Sem magister inženir računalništva in informacijskih tehnologij, diplomiral in magistriral pa sem na [Fakulteti za elektrotehniko, računalništvo in informatiko Univerze v Mariboru](${PERSONAL.universityUrl}). V Blockchain Lab:UM sem od leta 2021, Lutra Labs sem soustanovil leta 2024. Delam v slovenščini in angleščini, berem tudi nemško.`,
    },
    { kind: 'heading', level: 2, text: 'Drugje' },
    {
      kind: 'paragraph',
      text: `Koda je na [GitHubu](${PERSONAL.github}). Izbrano delo je opisano na [strani s projekti](/sl/projects/), celoten [življenjepis](/cv/) pa je na voljo kot stran in kot PDF. Za vse ostalo glej [kontakt](/sl/contact/).`,
    },
  ],
};

export const CONTACT_SL: PageContent = {
  title: 'Kontakt',
  summary:
    'E-pošta je zanesljiv kanal in pride neposredno do mene. Vsi spodnji računi so preverjeni — če se kdo predstavlja kot jaz kje drugje, bodite previdni.',
  blocks: [
    { kind: 'heading', level: 2, text: 'Neposredno' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'E-pošta',
          description: `[${PERSONAL.email}](mailto:${PERSONAL.email}) — najboljši način, da me dosežete. Preberem vse in odgovorim na vse, kar je očitno naslovljeno name in ni avtomatizirano trženje.`,
        },
        {
          term: 'PGP',
          description: `Moj javni ključ je objavljen na [Keybase](${PERSONAL.keybase}), kjer je tudi podpisan dokaz, ki ta ključ veže na to domeno. Uporabite ga za občutljive vsebine, vključno s prijavami ranljivosti.`,
        },
      ],
    },
    { kind: 'heading', level: 2, text: 'Profili' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'GitHub',
          description: `[github.com/pseudobun](${PERSONAL.github}) — koda, prijave napak in pull requesti.`,
        },
        {
          term: 'LinkedIn',
          description: `[linkedin.com/in/urbanvidovic](${PERSONAL.linkedin}) — poklicno ozadje in delovne izkušnje.`,
        },
        {
          term: 'X',
          description: `[@pseudourban](${PERSONAL.twitter}) — občasne objave o identiteti in Web3.`,
        },
        {
          term: 'Telegram',
          description: `[t.me/pseudobun](${PERSONAL.telegram}) — za ljudi, s katerimi že sodelujem.`,
        },
        {
          term: 'Farcaster',
          description: `[pseudobun.eth](${PERSONAL.farcaster}) — družbeno omrežje na verigi.`,
        },
      ],
    },
    { kind: 'heading', level: 2, text: 'O čem mi pišite' },
    {
      kind: 'list',
      items: [
        'Delo z decentralizirano identiteto in preverljivimi poverilnicami — izdaja, denarnice, preverjanje, interoperabilnost ali integracija mDoc/OID4VC, ki ne deluje.',
        'Sodelovanje pri evropsko financiranih ali uporabnih raziskovalnih projektih, ki potrebujejo delujočo referenčno implementacijo in ne poročila.',
        'Protokolarni ali smart-contract projekti s področja DeFi in ugleda, vključno s pregledom obstoječega načrta.',
        'Prijave varnostnih ranljivosti v čemer koli, kar vzdržujem. Uporabite PGP in pričakujte potrditev pred popravkom.',
        'Predavanja, poučevanje ali mentorstvo o standardih identitete in inženiringu Web3.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Prosim, ne' },
    {
      kind: 'list',
      items: [
        'Nenaročena kadrovska ali agencijska sporočila, ki očitno niso prebrala te strani.',
        'Ponudbe za izdajo žetonov, likvidnostne sheme ali plačano promocijo. Teh ne sprejemam.',
        'Prošnje za povratne povezave, gostujoče objave ali SEO objave na tej strani.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Kje sem' },
    {
      kind: 'paragraph',
      text: 'Maribor, Slovenija (srednjeevropski čas). Delam po evropskih časovnih pasovih, popoldne se običajno lahko prekrivam z ameriško vzhodno obalo.',
    },
  ],
};

export const PRIVACY_SL: PageContent = {
  title: 'Zasebnost',
  summary:
    'To je osebna spletna stran. Nima uporabniških računov, prijave, komentarjev, obrazcev ali oglasov. Ne nastavlja piškotkov. Edini zbrani podatki so agregirane meritve obiska brez piškotkov.',
  blocks: [
    { kind: 'heading', level: 2, text: 'Kaj se zbira' },
    {
      kind: 'paragraph',
      text: 'Stran uporablja [Vercel Web Analytics](https://vercel.com/docs/analytics/privacy-policy) in [Vercel Speed Insights](https://vercel.com/docs/speed-insights/privacy-policy). Oba delujeta brez piškotkov in agregirano beležita oglede strani ter meritve zmogljivosti. Ne gradita profila o vas med spletnimi stranmi, na vašo napravo ne shranjujeta identifikatorja in vas ne sledita med obiski ali po drugih straneh.',
    },
    {
      kind: 'paragraph',
      text: 'Kot pri vsaki spletni strani gostovanje in CDN (Vercel in Cloudflare) obdelujeta metapodatke zahtevka, kot so naslov IP, uporabniški agent in zahtevani URL, da lahko stran sploh postrežeta in preprečujeta zlorabe. Ta obdelava je operativna in kratkotrajna; teh dnevnikov ne prejmem in ne hranim kot zbirko, iz katere bi bilo mogoče koga prepoznati.',
    },
    { kind: 'heading', level: 2, text: 'Kaj se ne zbira' },
    {
      kind: 'list',
      items: [
        'Stran ne nastavlja piškotkov, zato ni pasice o piškotkih, ki bi jo bilo treba zapreti.',
        'Ni uporabniških računov, registracij, e-novic ali kontaktnih obrazcev — osebnih podatkov sploh ni kam oddati.',
        'Ni oglasov, oglaševalskih omrežij, sledilnih pikslov ali družbenih vtičnikov.',
        'Nič se ne prodaja, oddaja ali deli s posredniki podatkov. Podatkov za prodajo ni.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Tretje osebe' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'Vercel',
          description:
            'Gostovanje, strežniške funkcije in zgoraj opisana analitika. Nastopa kot obdelovalec pri streženju zahtevkov.',
        },
        {
          term: 'Cloudflare',
          description:
            'DNS in CDN pred stranjo, vključno z varnostjo prenosa in preprečevanjem zlorab.',
        },
        {
          term: 'Supabase',
          description:
            'Hrani periodični posnetek mojih agregiranih javnih statistik prispevkov na GitHubu, ki jih prikazuje stran s projekti. Ne vsebuje nobenih podatkov o obiskovalcih.',
        },
        {
          term: 'GitHub',
          description:
            'Redno povprašan za te javne statistike prispevkov. To se dogaja na strežniku in ni povezano z vašim obiskom.',
        },
      ],
    },
    {
      kind: 'paragraph',
      text: 'Povezave na GitHub, LinkedIn, X, Telegram, Keybase in podobne storitve so navadne povezave. Ko jim sledite, velja politika zasebnosti tiste storitve, ta pa ne več.',
    },
    { kind: 'heading', level: 2, text: 'Vgrajena in generirana vsebina' },
    {
      kind: 'paragraph',
      text: 'Pisave gostujejo na tej domeni, zato noben CDN s pisavami ne vidi vašega zahtevka. Predogledne slike za družbena omrežja in PDF življenjepisa nastanejo na tej domeni in ne pri zunanji storitvi. Zaslonske slike projektov so postrežene s te domene ali iz shrambe Supabase.',
    },
    { kind: 'heading', level: 2, text: 'Vaše pravice' },
    {
      kind: 'paragraph',
      text: `Po GDPR imate pravico do dostopa, popravka, izbrisa, omejitve obdelave, prenosljivosti in ugovora. Ker stran ne hrani osebnih podatkov, ki bi jih bilo mogoče povezati z vami, v praksi ni ničesar, kar bi lahko poiskal, izvozil ali izbrisal. Če menite drugače, pišite na [${PERSONAL.email}](mailto:${PERSONAL.email}) in zadevo bom preveril ter odgovoril.`,
    },
    { kind: 'heading', level: 2, text: 'Spremembe' },
    {
      kind: 'paragraph',
      text: 'Če se ta politika bistveno spremeni, bo sprememba vidna v zgodovini te strani v javnem repozitoriju, iz katerega se stran gradi. Obveščanja po e-pošti ni, ker ni seznama prejemnikov.',
    },
  ],
};
