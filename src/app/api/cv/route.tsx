import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  renderToBuffer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import {
  CV_EDUCATION,
  CV_EXPERIENCE,
  CV_LANGUAGES,
  CV_LOCATION,
  CV_PGP_URL,
  CV_PROJECTS,
  CV_SKILLS,
  CV_SUMMARY,
  CV_TITLE,
  periodDuration,
} from '@/constants/cv';
import { PERSONAL } from '@/constants/data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PUBLIC = path.join(process.cwd(), 'public');

Font.register({
  family: 'IBM Plex Mono',
  fonts: [
    { src: path.join(PUBLIC, 'fonts/IBMPlexMono-PDF-Regular.ttf'), fontWeight: 400 },
    { src: path.join(PUBLIC, 'fonts/IBMPlexMono-PDF-Bold.ttf'), fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

const BLUE = '#1a3acc';
const BLACK = '#000000';

const styles = StyleSheet.create({
  page: {
    paddingVertical: 40,
    paddingHorizontal: 44,
    fontFamily: 'IBM Plex Mono',
    fontSize: 9,
    color: BLACK,
    lineHeight: 1.4,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerText: { flex: 1, paddingRight: 16 },
  name: {
    fontSize: 22,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    lineHeight: 1.2,
    marginBottom: 8,
  },
  title: { fontSize: 10, marginTop: 0 },
  contact: { fontSize: 8.5, marginTop: 6 },
  link: { color: BLUE, textDecoration: 'underline' },
  photo: { width: 70, height: 70, objectFit: 'cover' },
  summary: { marginTop: 12, fontSize: 9 },
  section: { marginTop: 16, borderTop: `2pt solid ${BLACK}`, paddingTop: 6 },
  sectionTitle: { fontSize: 10, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 },
  item: { marginTop: 8 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  bold: { fontWeight: 700 },
  bullet: { flexDirection: 'row', marginTop: 2 },
  bulletDot: { width: 10 },
  bulletText: { flex: 1 },
  inline: { marginTop: 3 },
});

export async function GET() {
  const photo = readFileSync(path.join(PUBLIC, 'urban-vidovic.jpg'));

  const doc = (
    <Document title="Urban Vidovič | CV" author={PERSONAL.fullName} subject={CV_TITLE}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.name}>{PERSONAL.fullName}</Text>
            <Text style={styles.title}>
              {CV_TITLE} · {CV_LOCATION}
            </Text>
            <Text style={styles.contact}>
              <Link style={styles.link} src={`mailto:${PERSONAL.email}`}>
                {PERSONAL.email}
              </Link>
              {'   ·   '}
              <Link style={styles.link} src={CV_PGP_URL}>
                PGP key
              </Link>
              {'   ·   '}
              <Link style={styles.link} src={PERSONAL.github}>
                GitHub
              </Link>
              {'   ·   '}
              <Link style={styles.link} src={PERSONAL.linkedin}>
                LinkedIn
              </Link>
            </Text>
          </View>
          <Image style={styles.photo} src={photo} />
        </View>

        <Text style={styles.summary}>{CV_SUMMARY}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {CV_EXPERIENCE.map((exp) => {
            const dur = periodDuration(exp.period);
            return (
              <View key={`${exp.role}-${exp.org}`} style={styles.item} wrap={false}>
                <View style={styles.itemHeader}>
                  <Text>
                    <Text style={styles.bold}>{exp.role}</Text>
                    <Text> · {exp.org}</Text>
                  </Text>
                  <Text>{dur ? `${exp.period} · ${dur}` : exp.period}</Text>
                </View>
                {exp.points.map((p) => (
                  <View key={p} style={styles.bullet}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{p}</Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected projects</Text>
          {CV_PROJECTS.map((p) => (
            <View key={p.id} style={styles.inline}>
              <Text>
                {p.url ? (
                  <Link style={[styles.bold, styles.link]} src={p.url}>
                    {p.title}
                  </Link>
                ) : (
                  <Text style={styles.bold}>{p.title}</Text>
                )}
                <Text> — {p.org}. </Text>
                <Text>{p.description}</Text>
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {CV_EDUCATION.map((ed) => (
            <View key={ed.degree} style={styles.itemHeader} wrap={false}>
              <Text style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.bold}>{ed.degree}</Text>
                <Text> · {ed.school}</Text>
              </Text>
              <Text>{ed.period}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {CV_SKILLS.map((group) => (
            <Text key={group.label} style={styles.inline}>
              <Text style={styles.bold}>{group.label}: </Text>
              <Text>{group.items.join(', ')}</Text>
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text style={styles.inline}>
            {CV_LANGUAGES.map((l) => `${l.name} (${l.level})`).join('   ·   ')}
          </Text>
        </View>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(doc);
  const body = new Uint8Array(buffer);

  return new Response(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="urban-vidovic-cv.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
