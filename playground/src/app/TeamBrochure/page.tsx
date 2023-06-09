import { LoremIpsum } from 'lorem-ipsum';
import { TeamBrochure } from 'mde-react-component-library'; // Components
import { SME, Sponsor, Team, TeamMember } from 'mde-typescript-library';
// import type { Team, TeamMember, Sponsor, SME } from 'mde-react-component-library'; // Types

const lorem = new LoremIpsum({})

const team: Team = {
  teamMembers: [...Array(6)].map((_,i) => ({
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
  projectSummary: lorem.generateWords(100),
  teamPhotoNames: lorem.generateWords(5),
  teamPhotoUrl: "https://cataas.com/cat",
  presentationVideoUrl: "https://www.youtube.com/watch?v=oznr-1-poSU&ab_channel=DiviExtended",
  // presentationVideoUrl: "https://vimeo.com/87110435",
  // presentationVideoUrl: "https://2050today.org/wp-content/uploads/2020/07/Video-Placeholder.mp4",
  // presentationVideoUrl: "",
  presentationSlideshowUrl: "https://isotropic.org/papers/chicken.pdf",
  // presentationSlideshowUrl: "",
  posterUrl: "https://isotropic.org/papers/chicken.pdf",
  projectTitle: lorem.generateWords(5),
  year: lorem.generateWords(1),
  term: lorem.generateWords(1),
  extraContentUrls: [
    "https://cataas.com/cat",
    "https://www.youtube.com/watch?v=oznr-1-poSU&ab_channel=DiviExtended",
    "https://vimeo.com/87110435",
    "https://2050today.org/wp-content/uploads/2020/07/Video-Placeholder.mp4",
    "https://2050today.org/wp-content/uploads/2020/07/Video-Placeholder.mp4",
    "https://2050today.org/wp-content/uploads/2020/07/Video-Placeholder.mp4",
    "https://2050today.org/wp-content/uploads/2020/07/Video-Placeholder.mp4",
    "https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg",
    "https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg",
  ],
}

export default function Page() {
  return (
    <div className="text-3xl">
      <TeamBrochure team={team} correctRelativeUrlBase={'http://localhost'} />
    </div>
  )
}