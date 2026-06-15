import { Document, Link, Page, renderToBuffer, StyleSheet, Text, View } from '@react-pdf/renderer';
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
} from '@/constants/cv';
import { PERSONAL } from '@/constants/data.mjs';
import { getProjectGithubStats } from '@/lib/github-project-stats';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BLUE = '#1a3acc';
const MUTED = '#555555';

const styles = StyleSheet.create({
  page: {
    paddingVertical: 40,
    paddingHorizontal: 48,
    fontSize: 9.5,
    color: '#111111',
    lineHeight: 1.45,
  },
  name: { fontSize: 20, fontFamily: 'Helvetica-Bold' },
  title: { fontSize: 11, color: MUTED, marginTop: 2 },
  contact: { fontSize: 8.5, color: MUTED, marginTop: 6 },
  link: { color: BLUE, textDecoration: 'none' },
  stats: { fontSize: 9, color: MUTED, marginTop: 8 },
  section: { marginTop: 16 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '0.5pt solid #cccccc',
    paddingBottom: 3,
    marginBottom: 6,
  },
  summary: { marginTop: 10, fontSize: 9.5 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  role: { fontFamily: 'Helvetica-Bold' },
  org: { color: MUTED },
  period: { color: MUTED, fontSize: 8.5 },
  bullet: { flexDirection: 'row', marginTop: 2 },
  bulletDot: { width: 10 },
  bulletText: { flex: 1 },
  inline: { marginTop: 3 },
});

function Stat({ value, color }: { value: string; color?: string }) {
  return (
    <Text
      style={color ? { color, fontFamily: 'Helvetica-Bold' } : { fontFamily: 'Helvetica-Bold' }}
    >
      {value}
    </Text>
  );
}

export async function GET() {
  const stats = await getProjectGithubStats();
  const nf = new Intl.NumberFormat('en-US');
  const projects = CV_PROJECTS;

  const doc = (
    <Document title="Urban Vidovič — CV" author={PERSONAL.fullName} subject={CV_TITLE}>
      <Page size="A4" style={styles.page}>
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
            github.com/pseudobun
          </Link>
          {'   ·   '}
          <Link style={styles.link} src={PERSONAL.linkedin}>
            linkedin.com/in/urbanvidovic
          </Link>
        </Text>

        {stats ? (
          <Text style={styles.stats}>
            <Stat value={nf.format(Math.max(0, stats.commits))} /> commits with{' '}
            <Stat value={`+${nf.format(Math.max(0, stats.additions))}`} color="#0a7d3c" /> lines
            added and <Stat value={`-${nf.format(Math.max(0, stats.deletions))}`} color="#c0392b" />{' '}
            lines removed across <Stat value={nf.format(Math.max(0, stats.repos))} /> repos.
          </Text>
        ) : null}

        <Text style={styles.summary}>{CV_SUMMARY}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {CV_EXPERIENCE.map((exp) => (
            <View key={`${exp.role}-${exp.org}`} wrap={false}>
              <View style={styles.itemHeader}>
                <Text>
                  <Text style={styles.role}>{exp.role}</Text>
                  <Text style={styles.org}> · {exp.org}</Text>
                </Text>
                <Text style={styles.period}>{exp.period}</Text>
              </View>
              {exp.points.map((p) => (
                <View key={p} style={styles.bullet}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{p}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected projects</Text>
          {projects.map((p) => (
            <View key={p.id} style={styles.inline}>
              <Text>
                {p.url ? (
                  <Link style={[styles.role, styles.link]} src={p.url}>
                    {p.title}
                  </Link>
                ) : (
                  <Text style={styles.role}>{p.title}</Text>
                )}
                <Text style={styles.org}> — {p.org}</Text>
              </Text>
              <Text style={{ color: MUTED }}>{p.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {CV_EDUCATION.map((ed) => (
            <View key={ed.degree} style={styles.itemHeader}>
              <Text style={{ flex: 1, paddingRight: 8 }}>
                <Text style={styles.role}>{ed.degree}</Text>
                <Text style={styles.org}> · {ed.school}</Text>
              </Text>
              <Text style={styles.period}>{ed.period}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {CV_SKILLS.map((group) => (
            <Text key={group.label} style={styles.inline}>
              <Text style={styles.role}>{group.label}: </Text>
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
