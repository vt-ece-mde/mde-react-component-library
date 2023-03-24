export interface TeamMember
{
    title: string    // Mr. Mrs. Dr. etc.
    lastName: string
    firstName: string
    email: string
    degree: string
    major: string
    hometown: string
    StateOrCountry: string
    aspiration: string
    courseComment: string
}

export interface Sponsor {
    title: string; // Mr. Mrs. Dr. etc.
    lastName: string;
    firstName: string;
    email: string;
    company: string;
}

export interface SME {
    title: string; // Mr. Mrs. Dr. etc.
    lastName: string;
    firstName: string;
    email: string;
    company: string;
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