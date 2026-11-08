/**
 * Tiny generated blur placeholders, in the site palette.
 * A 20×20 SVG costs a few hundred bytes and prevents a hard flash while
 * next/image loads the real file. Generated, not traced from the photo.
 */
function svgBlur(background: string, shapes: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="${background}"/>${shapes}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const imageBlur = {
  founder: svgBlur(
    "#EFE7D6",
    '<rect x="3" y="6" width="14" height="14" rx="7" fill="#0F3D2E"/><circle cx="15" cy="5" r="4" fill="none" stroke="#C8962E" stroke-width=".6"/>',
  ),
  balme: svgBlur(
    "#D8DEE3",
    '<rect y="13" width="20" height="7" fill="#EFE7D6"/><rect x="7" y="7" width="6" height="7" fill="#C9C3B8"/><rect x="9" y="3" width="2" height="6" fill="#B9B2A3"/><rect x="2" y="11" width="16" height="3" fill="#D8D2C4"/>',
  ),
  knust: svgBlur(
    "#C9C1B2",
    '<rect y="12" width="20" height="8" fill="#8E8678"/><rect x="4" y="4" width="16" height="8" fill="#B7AF9E"/><rect x="4" y="9" width="16" height="2" fill="#6F685C"/>',
  ),
  learning: svgBlur(
    "#FAF7F0",
    '<rect x="2" y="3" width="8" height="12" fill="#0F3D2E"/><rect x="7" y="6" width="7" height="11" fill="#EFE7D6"/><rect x="12" y="2" width="6" height="12" fill="#0F3D2E" opacity=".15"/>',
  ),
  students: svgBlur(
    "#CBBFA9",
    '<circle cx="7" cy="6" r="2.6" fill="#3B2F26"/><circle cx="12" cy="5.4" r="2.6" fill="#4A3A2E"/><circle cx="16" cy="6.2" r="2.4" fill="#3B2F26"/><rect x="3" y="9" width="14" height="11" rx="3" fill="#E8DFCB"/><rect x="6" y="9" width="3" height="8" fill="#2B4B6E"/>',
  ),
  classroom: svgBlur(
    "#B7C6CE",
    '<rect y="0" width="20" height="9" fill="#DCE4E8"/><rect x="1" y="9" width="18" height="11" fill="#8FA3AE"/><circle cx="9" cy="8" r="2.2" fill="#2E3A40"/><rect x="4" y="11" width="12" height="2" fill="#E9EEF0"/>',
  ),
  courtyard: svgBlur(
    "#C4A578",
    '<rect y="0" width="20" height="8" fill="#BFD4D8"/><rect x="0" y="8" width="20" height="12" fill="#C09B6B"/><circle cx="14" cy="8" r="5" fill="#5F7B4C"/><rect x="0" y="7" width="7" height="5" fill="#E3D3B4"/>',
  ),
  planting: svgBlur(
    "#6F8B5B",
    '<rect width="20" height="20" fill="#6F8B5B"/><circle cx="7" cy="8" r="3.6" fill="#3A2B22"/><circle cx="14" cy="9" r="3.6" fill="#4A3428"/><rect x="8" y="14" width="4" height="5" fill="#8B5A3C"/>',
  ),
  // Program photographs: three bands of each picture's own average colour.
  programAcademic: svgBlur(
    "#8B8081",
    '<rect y="7" width="20" height="7" fill="#6B5C78"/><rect y="14" width="20" height="6" fill="#494C7C"/>',
  ),
  programMentorship: svgBlur(
    "#8F7A88",
    '<rect y="7" width="20" height="7" fill="#987488"/><rect y="14" width="20" height="6" fill="#B68C9B"/>',
  ),
  programAid: svgBlur(
    "#C1C8B1",
    '<rect y="7" width="20" height="7" fill="#938BAF"/><rect y="14" width="20" height="6" fill="#6263A9"/>',
  ),
  programSkills: svgBlur(
    "#CAD6E2",
    '<rect y="7" width="20" height="7" fill="#9EABBA"/><rect y="14" width="20" height="6" fill="#768995"/>',
  ),
  programCommunity: svgBlur(
    "#898078",
    '<rect y="7" width="20" height="7" fill="#767C74"/><rect y="14" width="20" height="6" fill="#8C8A83"/>',
  ),
  // SEF's own photographs, same three-band treatment.
  sefGroupHero: svgBlur(
    "#B6A8A2",
    '<rect y="7" width="20" height="7" fill="#A9968A"/><rect y="14" width="20" height="6" fill="#767F87"/>',
  ),
  sefGroupDonors: svgBlur(
    "#B3A8A1",
    '<rect y="7" width="20" height="7" fill="#93918F"/><rect y="14" width="20" height="6" fill="#637C91"/>',
  ),
  sefGroupServe: svgBlur(
    "#B9ABA4",
    '<rect y="7" width="20" height="7" fill="#AB9A8F"/><rect y="14" width="20" height="6" fill="#818990"/>',
  ),
  sefClassroom: svgBlur(
    "#ACA7A1",
    '<rect y="7" width="20" height="7" fill="#89837B"/><rect y="14" width="20" height="6" fill="#797974"/>',
  ),
  sefCohortPrograms: svgBlur(
    "#999EA0",
    '<rect y="7" width="20" height="7" fill="#686A6C"/><rect y="14" width="20" height="6" fill="#868780"/>',
  ),
  sefCohortPartners: svgBlur(
    "#989DA0",
    '<rect y="7" width="20" height="7" fill="#686A6C"/><rect y="14" width="20" height="6" fill="#888A82"/>',
  ),
  sefCohortGap: svgBlur(
    "#999DA0",
    '<rect y="7" width="20" height="7" fill="#656769"/><rect y="14" width="20" height="6" fill="#8C8D85"/>',
  ),
  sefStudentApply: svgBlur(
    "#C4C4C7",
    '<rect y="7" width="20" height="7" fill="#7C8D9F"/><rect y="14" width="20" height="6" fill="#738496"/>',
  ),
  sefStudentNext: svgBlur(
    "#D6D5D7",
    '<rect y="7" width="20" height="7" fill="#D9CFC3"/><rect y="14" width="20" height="6" fill="#CBBCA9"/>',
  ),
  // Replacement stock photographs (Wikimedia Commons), sharper and larger.
  programMentorshipEditathon: svgBlur(
    "#8C92B8",
    '<rect y="7" width="20" height="7" fill="#1B1F3B"/><rect y="14" width="20" height="6" fill="#412720"/>',
  ),
  programGraduates: svgBlur(
    "#B1A1AA",
    '<rect y="7" width="20" height="7" fill="#8D3843"/><rect y="14" width="20" height="6" fill="#442024"/>',
  ),
  programSkillsLecture: svgBlur(
    "#938971",
    '<rect y="7" width="20" height="7" fill="#8C856D"/><rect y="14" width="20" height="6" fill="#483D34"/>',
  ),
  programTreePlanting: svgBlur(
    "#C5C1C5",
    '<rect y="7" width="20" height="7" fill="#A5A4AD"/><rect y="14" width="20" height="6" fill="#695853"/>',
  ),
  visionGathering: svgBlur(
    "#7D92B7",
    '<rect y="7" width="20" height="7" fill="#585F56"/><rect y="14" width="20" height="6" fill="#387978"/>',
  ),
  visionPartners: svgBlur(
    "#BEB29F",
    '<rect y="7" width="20" height="7" fill="#B7A58A"/><rect y="14" width="20" height="6" fill="#494843"/>',
  ),
  programMentorshipWorkshop: svgBlur(
    "#EDF0F5",
    '<rect y="7" width="20" height="7" fill="#969EAB"/><rect y="14" width="20" height="6" fill="#706D7B"/>',
  ),
} as const;
