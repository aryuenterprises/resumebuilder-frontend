import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#333",
  },

  /* HEADER */
  header: {
    textAlign: "center",
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  jobTitle: {
    fontSize: 14,
    marginTop: 2,
  },
  address: {
    fontSize: 11,
    marginTop: 4,
    color: "#555",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 6,
  },

  /* SECTION TITLE (PIXEL PERFECT) */
  sectionTitle: {
    backgroundColor: "#f0f0f0",
    height: 26,
    marginTop: 14,
    marginBottom: 8,

    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  /* ITEMS */
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 12,
    color: "#555",
  },
  itemDate: {
    fontSize: 11,
    color: "#666",
  },
  itemText: {
    marginTop: 4,
    lineHeight: 1.5,
  },

  /* SKILLS */
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    width: "50%",
    marginBottom: 8,
  },
  skillName: {
    marginBottom: 2,
  },
  skillBar: {
    height: 3,
    backgroundColor: "#e0e0e0",
  },
  skillLevel: {
    height: 3,
    backgroundColor: "#222",
  },
});

const SectionTitle = ({ title }) => (
  <View style={styles.sectionTitle}>
    <Text style={styles.sectionTitleText}>{title}</Text>
  </View>
);

const ResumePDF = ({ data }) => {

    console.log("data",data)

  const {
    contact = {},
    experiences = [],
    educations = [],
    skills = [],
    summary = "",
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {contact.firstName} {contact.lastName}
          </Text>
          <Text style={styles.jobTitle}>{contact.jobTitle?.name}</Text>
          <Text style={styles.address}>
            {[contact.address, contact.city, contact.country]
              .filter(Boolean)
              .join(", ")}
          </Text>

          <View style={styles.contactRow}>
            {contact.email && <Text>{contact.email}</Text>}
            {contact.phone && <Text>{contact.phone}</Text>}
          </View>
        </View>

        {/* SUMMARY */}
        {summary && (
          <>
            <SectionTitle title="Summary" />
            <Text style={styles.itemText}>{summary.replace(/<[^>]*>/g, "")}</Text>
          </>
        )}

        {/* EXPERIENCE */}
        {experiences.length > 0 && (
          <>
            <SectionTitle title="Experience" />
            {experiences.map((exp, i) => (
              <View key={i} style={styles.item} wrap={false}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.itemSubtitle}>
                      {exp.employer} {exp.location && `— ${exp.location}`}
                    </Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.endDate || "Present"}
                  </Text>
                </View>
                {exp.text && (
                  <Text style={styles.itemText}>
                    {exp.text.replace(/<[^>]*>/g, "")}
                  </Text>
                )}
              </View>
            ))}
          </>
        )}

        {/* EDUCATION */}
        {educations.length > 0 && (
          <>
            <SectionTitle title="Education" />
            {educations.map((edu, i) => (
              <View key={i} style={styles.item} wrap={false}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{edu.schoolname}</Text>
                    <Text style={styles.itemSubtitle}>
                      {edu.degree} {edu.location && `— ${edu.location}`}
                    </Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* SKILLS */}
        {skills.length > 0 && (
          <>
            <SectionTitle title="Skills" />
            <View style={styles.skillsGrid}>
              {skills.map((skill, i) => (
                <View key={i} style={styles.skillItem}>
                  <Text style={styles.skillName}>{skill.skill}</Text>
                  <View style={styles.skillBar}>
                    <View
                      style={[
                        styles.skillLevel,
                        { width: `${(Number(skill.level) / 4) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
