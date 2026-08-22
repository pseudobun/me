import { PERSONAL } from '@/constants/data';
import type { PageContent } from './blocks';

export const DEVELOPERS_SL: PageContent = {
  title: 'Za razvijalce — pseudobun.dev',
  summary:
    'Vse na pseudobun.dev, kar je namenjeno strojnemu branju: dve javni končni točki samo za branje, specifikacija OpenAPI, predstavitve vseh strani v obliki Markdown in odprtokodni projekti, na katerih temelji tu opisano delo.',
  blocks: [
    { kind: 'heading', level: 2, text: 'Kaj to je in kaj ni' },
    {
      kind: 'paragraph',
      text: 'To je osebna spletna stran Urbana Vidoviča, ne produkt. Ni produktnega API-ja, sistema računov, API ključev, OAuth-a, webhookov ali peskovnika — če iščete kaj od tega, ste na napačni domeni. Kar obstaja, je tu dokumentirano pošteno in v celoti.',
    },
    {
      kind: 'paragraph',
      text: 'Vse spodnje je javno, brez avtentikacije in samo za branje. Ni se treba registrirati, prositi za dostop ali pošiljati žetona. Prosim, bodite razumni z obsegom zahtevkov: gostitelj samodejno blaži botovski promet, vztrajen avtomatiziran promet pa lahko to sproži in začasno postavi izziv vsem obiskovalcem strani.',
    },
    { kind: 'heading', level: 2, text: 'Javne končne točke' },
    {
      kind: 'definitions',
      items: [
        {
          term: 'GET /api/cv/',
          description:
            'Izriše trenutni življenjepis v PDF in ga vrne kot priponko (`application/pdf`, ime datoteke `urban-vidovic-cv.pdf`). Ustvari se ob vsakem zahtevku iz istih izvornih podatkov kot HTML različica, zato se ne moreta razhajati. Ne sprejema parametrov.',
        },
        {
          term: 'GET /api/og/',
          description:
            'Vrne predogledno sliko za družbena omrežja v velikosti 1200x630 (PNG), vključno z dnevnim posnetkom agregiranih javnih statistik prispevkov na GitHubu. Ne sprejema parametrov.',
        },
      ],
    },
    {
      kind: 'code',
      language: 'bash',
      code: `curl -sSL -o cv.pdf https://pseudobun.dev/api/cv/
curl -sSL -o preview.png https://pseudobun.dev/api/og/`,
    },
    { kind: 'heading', level: 2, text: 'Specifikacija OpenAPI' },
    {
      kind: 'paragraph',
      text: 'Celoten strojno berljiv opis je na [/openapi.json](/openapi.json). Gre za OpenAPI 3.1.0 z enoličnim `operationId` in opisom pri vsaki operaciji, tipiziranimi shemami odgovorov ter izrecno praznim varnostnim mehanizmom — po tem odjemalec loči, da poverilnice niso pričakovane, in ne le, da manjkajo.',
    },
    {
      kind: 'code',
      language: 'bash',
      code: "curl -sS https://pseudobun.dev/openapi.json | jq '.paths | keys'",
    },
    { kind: 'heading', level: 2, text: 'Napake' },
    {
      kind: 'paragraph',
      text: 'Vsaka napaka pod `/api` vrne `application/problem+json` in ne HTML strani z napako, zato odjemalcu nikoli ni treba luščiti sledi klicev. Telo vedno vsebuje stabilno kodo `code`, berljivo sporočilo `message`, namig `hint` z naslednjim korakom, `status` in `documentation_url`, ki kaže nazaj sem.',
    },
    {
      kind: 'code',
      language: 'json',
      code: `{
  "error": {
    "code": "not_found",
    "message": "No such endpoint.",
    "hint": "The published endpoints are GET /api/cv/ and GET /api/og/. See /openapi.json for the full specification.",
    "status": 404,
    "documentation_url": "https://pseudobun.dev/en/developers/"
  }
}`,
    },
    {
      kind: 'paragraph',
      text: 'Opredeljene kode so `not_found` (404), `method_not_allowed` (405, z glavo `Allow`), `internal_error` (500) in `upstream_unavailable` (503).',
    },
    { kind: 'heading', level: 2, text: 'Markdown za agente' },
    {
      kind: 'paragraph',
      text: 'Vsaka stran na tej strani ima predstavitev v obliki Markdown na istem URL-ju. Pošljite `Accept: text/markdown` in namesto HTML dobite Markdown, skladno z [acceptmarkdown.com](https://acceptmarkdown.com); ti odgovori nastavijo `Vary: Accept`. Zahtevek, ki ne sprejema ne `text/html` ne `text/markdown`, dobi `406`. Vrednosti kakovosti se upoštevajo, zato `text/markdown;q=0.9, text/html;q=0.8` vrne Markdown.',
    },
    {
      kind: 'code',
      language: 'bash',
      code: 'curl -sS -H "Accept: text/markdown" https://pseudobun.dev/sl/about/',
    },
    { kind: 'heading', level: 2, text: 'Strojno berljive datoteke' },
    {
      kind: 'definitions',
      items: [
        {
          term: '/llms.txt',
          description:
            'Kazalo strani v obliki [llmstxt.org](https://llmstxt.org), vključno z izrecnim razdelkom o tem, kdaj stran uporabiti. Začnite tukaj.',
        },
        {
          term: '/agent.txt',
          description: 'Ista navodila in opombe o protokolih, za orodja, ki preverjajo to pot.',
        },
        {
          term: '/openapi.json',
          description: 'Opis zgornjih končnih točk v obliki OpenAPI 3.1.0.',
        },
        { term: '/sitemap.xml', description: 'Vsi kanonični URL-ji s hreflang alternativami.' },
        { term: '/robots.txt', description: 'Pravila za pajke.' },
        {
          term: '/.well-known/keybase.txt',
          description: 'Podpisan dokaz, ki to domeno veže na identiteto na Keybase.',
        },
      ],
    },
    { kind: 'heading', level: 2, text: 'Odprtokodni projekti' },
    {
      kind: 'paragraph',
      text: `Delo, opisano na tej strani, je večinoma javno. Izvorna koda spodnjih projektov je na [GitHubu](${PERSONAL.github}); vsak ima svojo dokumentacijo in postopek izdaje v lastnem repozitoriju, nič od tega pa ni postreženo s te domene.`,
    },
    {
      kind: 'definitions',
      items: [
        {
          term: 'Masca',
          description:
            'MetaMask Snap za decentralizirano identiteto — upravljanje DID-ov in preverljivih poverilnic v denarnici MetaMask. [masca.io](https://masca.io)',
        },
        {
          term: 'LutraID',
          description:
            'Platforma za izdajo in preverjanje digitalnih dokumentov po standardih (OID4VCI, ISO mDoc). [id.lutralabs.io](https://id.lutralabs.io)',
        },
        {
          term: 'Swaylend',
          description:
            'Posojilni protokol na omrežju Fuel, napisan v jeziku Sway. [swaylend.com](https://swaylend.com)',
        },
        {
          term: 'EduCTX',
          description:
            'Izobraževalne preverljive poverilnice, skladne s standardi W3C za decentralizirano identiteto. [platform2.eductx.org](https://platform2.eductx.org)',
        },
      ],
    },
    { kind: 'heading', level: 2, text: 'Stik' },
    {
      kind: 'paragraph',
      text: `Vprašanja o integraciji, prijave napak v čemer koli zgoraj in prijave varnostnih ranljivosti pošljite na [${PERSONAL.email}](mailto:${PERSONAL.email}) — za občutljive vsebine uporabite PGP ključ na [Keybase](${PERSONAL.keybase}). Podrobnosti so na [strani s kontaktom](/sl/contact/).`,
    },
  ],
};
