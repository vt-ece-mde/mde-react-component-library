import { LoremIpsum } from 'lorem-ipsum';
import { TeamBrochure, TeamMembers } from 'mde-react-component-library'; // Components
import type { Team, TeamMember, Sponsor, SME } from 'mde-react-component-library'; // Types

const lorem = new LoremIpsum({})

const team: Team = {
  teamMembers: [...Array(3)].map((_,i) => ({
    title: lorem.generateWords(1),
    lastName: lorem.generateWords(1),
    firstName: lorem.generateWords(1),
    email: lorem.generateWords(1),
    degree: lorem.generateWords(1),
    major: lorem.generateWords(1),
    hometown: lorem.generateWords(1),
    StateOrCountry: lorem.generateWords(1),
    aspiration: lorem.generateWords(1),
    courseComment: lorem.generateWords(1),
  } as TeamMember)),
  sponsors: [...Array(3)].map((_,i) => ({
    name: lorem.generateWords(5),
    people: [...Array(3)].map((_,j) => ({
      title: lorem.generateWords(1),
      lastName: lorem.generateWords(1),
      firstName: lorem.generateWords(1),
      email: lorem.generateWords(1),
      company: lorem.generateWords(1),
    }))
  } as Sponsor)),
  smes: [...Array(3)].map((_,i) => ({
    title: lorem.generateWords(1),
    lastName: lorem.generateWords(1),
    firstName: lorem.generateWords(1),
    email: lorem.generateWords(1),
    company: lorem.generateWords(1),
  } as SME)),
  projectSummary: lorem.generateWords(5),
  teamPhotoNames: lorem.generateWords(5),
  teamPhotoUrl: "https://cataas.com/cat",
  videoUrl: ["https://cataas.com/cat"],
  presentationUrl: "https://isotropic.org/papers/chicken.pdf",
  posterUrl: "https://isotropic.org/papers/chicken.pdf",
  projectTitle: lorem.generateWords(5),
  teamShortName: lorem.generateWords(1),
}

export default function Page() {
  return (
    <div className="text-3xl">
      <TeamBrochure team={team} />
    </div>
  )
}