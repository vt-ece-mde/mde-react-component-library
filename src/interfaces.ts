export interface Person {
    title: string    // Mr. Mrs. Dr. etc.
    lastName: string
    firstName: string
    email: string
}

export interface TeamMember extends Person {
    degree: string
    major: string
    hometown: string
    StateOrCountry: string
    aspiration: string
    courseComment: string
}

export interface SME extends Person {
    company: string; // The name of the SME's affiliation (e.g., "Virginia Tech").
}

export interface Sponsor {
    name: string; // Name of company or organization.
    people: Person[]; // List of people who are affiliated with this sponsor that helped with the project.
}

export interface Team
{
    teamMembers: TeamMember[];
    sponsors: Sponsor[];
    smes: SME[];
    projectSummary: string;
    teamPhotoNames: string | string[] | string[][]; // Supports string, array for multi-line strings, and 2D array as CSV input.
    teamPhotoUrl: string; // Supports alternate URLs as fallbacks.
    videoUrl: string | string[]; // Supports alternate URLs as fallbacks.
    presentationUrl: string; // Supports alternate URLs as fallbacks.
    posterUrl: string; // Supports alternate URLs as fallbacks.
    projectTitle: string;
    teamShortName: string; // This is a short-hand name used for the team (should not contain spaces or special characters).
}