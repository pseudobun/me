import { PERSONAL } from '@/constants/data';
import type { PageContent } from './blocks';

export const ABOUT_SL: PageContent = {
  title: 'O Urbanu Vidoviču',
  summary:
    'Software engineer iz Maribora, ki dela na decentralizirani identiteti, preverljivih poverilnicah in razvoju Web3 produktov.',
  blocks: [
    {
      kind: 'paragraph',
      text: `Sem Research & Development Engineer v [Blockchain Lab:UM](${PERSONAL.companyUrl}) ter COO in soustanovitelj [Lutra Labs](${PERSONAL.company2Url}). Obe vlogi sta praktični. Skupna nit vsega, kar gradim, je digitalna identiteta — kako dokazati, kdo nekdo je in do česa je upravičen, ne da bi moral razkriti več, kot je nujno.`,
    },
    {
      kind: 'paragraph',
      text: 'V praksi to pomeni standarde, pretvorjene v delujočo programsko opremo: OpenID for Verifiable Credential Issuance, ISO mDoc/mDL, W3C Verifiable Credentials in DID-e ter infrastrukturo denarnic in izdajateljev, ki vse to naredi uporabno. Poleg identitete delam na DeFi protokolih v jezikih Solidity in Sway, razvijalskih orodjih in infrastrukturi, ki vse skupaj drži na spletu.',
    },
    {
      kind: 'paragraph',
      text: 'Raje prevzamem funkcionalnost od protokola do vmesnika, kot da jo predam med tremi ekipami. Modeliranje groženj in upravljanje ključev sta vhodna podatka za načrt, ne pregled na koncu.',
    },
    { kind: 'heading', level: 2, text: 'Ozadje' },
    {
      kind: 'paragraph',
      text: `Magister inženir računalništva in informacijskih tehnologij; diplomiral in magistriral na [Fakulteti za elektrotehniko, računalništvo in informatiko Univerze v Mariboru](${PERSONAL.universityUrl}). V Blockchain Lab:UM od leta 2021, Lutra Labs soustanovil leta 2024. Delam v slovenščini in angleščini, berem tudi nemško.`,
    },
    {
      kind: 'paragraph',
      text: `Izbrano delo je na [strani s projekti](/sl/projects/), koda na [GitHubu](${PERSONAL.github}), celoten [življenjepis](/cv/) pa je na voljo kot stran in kot PDF. Za vse ostalo glej [kontakt](/sl/contact/).`,
    },
  ],
};

export const CONTACT_SL: PageContent = {
  title: 'Kontakt',
  summary:
    'E-pošta je zanesljiv kanal in pride neposredno do mene. Vsi spodnji računi so preverjeni — če se kdo predstavlja kot jaz kje drugje, bodite previdni.',
  blocks: [
    {
      kind: 'definitions',
      items: [
        {
          term: 'E-pošta',
          description: `[${PERSONAL.email}](mailto:${PERSONAL.email}) — najboljši način, da me dosežete.`,
        },
        {
          term: 'PGP',
          description: `Javni ključ na [Keybase](${PERSONAL.keybase}) s podpisanim dokazom, ki ga veže na to domeno. Uporabite ga za občutljive vsebine, vključno s prijavami ranljivosti.`,
        },
        { term: 'GitHub', description: `[github.com/pseudobun](${PERSONAL.github})` },
        { term: 'LinkedIn', description: `[linkedin.com/in/urbanvidovic](${PERSONAL.linkedin})` },
        { term: 'X', description: `[@pseudourban](${PERSONAL.twitter})` },
        { term: 'Telegram', description: `[t.me/pseudobun](${PERSONAL.telegram})` },
        { term: 'Farcaster', description: `[pseudobun.eth](${PERSONAL.farcaster})` },
      ],
    },
    { kind: 'heading', level: 2, text: 'O čem mi pišite' },
    {
      kind: 'list',
      items: [
        'Delo z decentralizirano identiteto in preverljivimi poverilnicami — izdaja, denarnice, preverjanje ali integracija mDoc/OID4VC, ki ne deluje.',
        'Uporabni raziskovalni projekti, ki potrebujejo delujočo referenčno implementacijo in ne poročila.',
        'Protokolarni ali smart-contract projekti, vključno s pregledom obstoječega načrta.',
        'Prijave varnostnih ranljivosti v čemer koli, kar vzdržujem. Uporabite PGP.',
      ],
    },
    {
      kind: 'paragraph',
      text: 'Ne zanimajo me nenaročena kadrovska sporočila, ponudbe za izdajo žetonov, plačana promocija ali SEO objave.',
    },
    {
      kind: 'paragraph',
      text: 'Maribor, Slovenija (srednjeevropski čas). Delam po evropskih časovnih pasovih, popoldne se običajno lahko prekrivam z ameriško vzhodno obalo.',
    },
  ],
};

export const PRIVACY_SL: PageContent = {
  title: 'Zasebnost',
  summary:
    'To je osebna spletna stran. Brez računov, prijave, komentarjev, obrazcev, oglasov in piškotkov. Edini zbrani podatki so agregirane meritve obiska brez piškotkov.',
  blocks: [
    { kind: 'heading', level: 2, text: 'Kaj se zbira' },
    {
      kind: 'paragraph',
      text: 'Stran uporablja [Vercel Web Analytics](https://vercel.com/docs/analytics/privacy-policy) in [Vercel Speed Insights](https://vercel.com/docs/speed-insights/privacy-policy). Oba delujeta brez piškotkov in agregirano beležita oglede strani ter meritve zmogljivosti. Na vašo napravo ne shranjujeta identifikatorja in vas ne sledita med obiski ali po drugih straneh.',
    },
    {
      kind: 'paragraph',
      text: 'Kot pri vsaki spletni strani gostovanje in CDN obdelujeta metapodatke zahtevka, kot so naslov IP, uporabniški agent in zahtevani URL, da lahko stran postrežeta in preprečujeta zlorabe. Ta obdelava je operativna in kratkotrajna; teh dnevnikov ne prejmem in ne hranim kot zbirko, iz katere bi bilo mogoče koga prepoznati.',
    },
    { kind: 'heading', level: 2, text: 'Kaj se ne zbira' },
    {
      kind: 'list',
      items: [
        'Brez piškotkov, zato ni pasice o piškotkih.',
        'Brez računov, registracij, e-novic ali kontaktnih obrazcev — osebnih podatkov ni kam oddati.',
        'Brez oglasov, oglaševalskih omrežij, sledilnih pikslov in družbenih vtičnikov.',
        'Nič se ne prodaja ali deli s posredniki podatkov. Podatkov za prodajo ni.',
      ],
    },
    { kind: 'heading', level: 2, text: 'Tretje osebe' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'Vercel',
          description: 'Gostovanje, strežniške funkcije in zgoraj opisana analitika.',
        },
        { term: 'Cloudflare', description: 'DNS in CDN, vključno z varnostjo prenosa.' },
        {
          term: 'Supabase',
          description:
            'Hrani periodični posnetek mojih agregiranih javnih statistik z GitHuba. Brez kakršnih koli podatkov o obiskovalcih.',
        },
      ],
    },
    {
      kind: 'paragraph',
      text: 'Pisave gostujejo na tej domeni, predogledna slika in PDF življenjepisa pa nastaneta na njej, zato noben zunanji ponudnik ne vidi vašega zahtevka zanje. Povezave navzven so navadne povezave — ko jim sledite, velja politika tiste storitve.',
    },
    { kind: 'heading', level: 2, text: 'Vaše pravice' },
    {
      kind: 'paragraph',
      text: `Po GDPR imate pravico do dostopa, popravka, izbrisa, omejitve obdelave, prenosljivosti in ugovora. Ker stran ne hrani osebnih podatkov, ki bi jih bilo mogoče povezati z vami, v praksi ni ničesar, kar bi lahko poiskal, izvozil ali izbrisal. Če menite drugače, pišite na [${PERSONAL.email}](mailto:${PERSONAL.email}) in zadevo bom preveril.`,
    },
  ],
};
