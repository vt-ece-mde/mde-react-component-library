import { Person, SME, Sponsor, Team, TeamMember } from "@/interfaces";
import React from "react";


/**
 * Simple component to display a paragraph element with text that possible contains newlines ('\n').
 * Inspired by: https://stackoverflow.com/a/73056801
 */
export type MultilineParagraphProps = {
    text: string;
    className?: string;
}
export function MultilineParagraph(props: MultilineParagraphProps) {
    return (<>
    <div>{props.text.split(/\n|\r\n/).map((segment: string, index: number) => (
        <>
            {index > 0 && <br />}
            <div key={index} className={props.className}>{segment}</div>
        </>
    ))}</div>
    </>);
}

export type TeamBrochurePhotoProps = {
    smes: SME[];
    team_photo_names: string | string[] | string[][];
    team_photo_url: string;
}
export function TeamBrochurePhoto( props: TeamBrochurePhotoProps ) {
    var names: string = '';
    if (typeof props.team_photo_names === 'string') {
        names = props.team_photo_names;
    }
    else {
        names = (props.team_photo_names as string[]).reduce(
            (prev: string, cur: any) => `${prev}${(typeof cur === 'string') ? (cur) : (cur.join(', '))}\n`, 
            '',
        )
    }

    // const url = 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492__340.jpg'
    // const url = 'https://preview.redd.it/wiw2se1paa631.jpg?auto=webp&s=5d3728b211f1ed4cde06091e7c2a34e2f4b13a0b'
    const url = props.team_photo_url

    return (
        <div>
            <figure>
                <img src={url} alt="Team Photo" className='w-full max-h-[30rem] object-contain object-top'/>
                <figcaption className="text-[#76777A] text-lg font-normal font-sans">
                    <div>
                        <MultilineParagraph text={names}/>
                        <p>{`SME: ${props.smes.map(sme => `${sme.title} ${sme.firstName} ${sme.lastName}`).join(', ')}`}</p>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}


export type TeamChallengeProps = {
    project_summary: string;
}
export function TeamChallenge( props: TeamChallengeProps ) {
    return (<>
        <div className='flex flex-col space-y-2'>
            <div className="text-[#008891] text-3xl font-normal font-sans">CHALLENGE</div>
            <div className="text-[#008891] text-2xl font-normal font-sans">{props.project_summary}</div>
        </div>
    </>);
}

export type TeamMemberInfoProps = {
    teamMember: TeamMember;
}
export function TeamMemberInfo( props: TeamMemberInfoProps ) {
    return (<>
        <div className='flex flex-row space-x-3 items-end'>
            <span className="text-[#008891] text-4xl font-bold font-sans">{`${props.teamMember.firstName} ${props.teamMember.lastName}`}</span>
            <span className="text-[#939598] text-lg font-sans">{`${props.teamMember.hometown}, ${props.teamMember.StateOrCountry}`}</span>
        </div>
        <div className="my-2 w-full border-b-2 border-orange-500 rounded"></div>
        <div className="-mt-2 text-[#F57F28] text-lg font-bold font-sans">{props.teamMember.degree}, {props.teamMember.major}</div>
        <div className="pt-2 text-[#231F20] text-xl font-bold font-sans">
            Aspirations: <span className="text-[#231F20] text-lg font-sans font-normal">{props.teamMember.aspiration}</span>
        </div>
        <div className="pt-2 text-[#231F20] text-xl font-bold font-sans">
            Class Comment: <span className="text-[#231F20] text-lg font-sans font-normal">{props.teamMember.courseComment}</span>
        </div>
    </>);
}

export type TeamMembersProps = {
    teamMembers: TeamMember[];
}
export function TeamMembers( props: TeamMembersProps ) {
    return (<>
        {props.teamMembers.map((tm, index) => {
            return (
                <div key={`tm-${index}`}>
                    <TeamMemberInfo teamMember={tm} />
                </div>
            );
        })}
    </>);
}

export type TeamProjectSponsorPeopleProps = {
    sponsors: Sponsor[];
}
export function TeamProjectSponsorPeople( props: TeamProjectSponsorPeopleProps ) {
    // Build list of people with their associated sponsor name.
    const company_person: { company: string, person: Person }[] = props.sponsors.map(sponsor => sponsor.people.map(person => ({
        company: sponsor.name,
        person,
    }))).flat().sort((a, b) => a.company.localeCompare(b.company) || a.person.firstName.localeCompare(b.person.firstName) || a.person.lastName.localeCompare(b.person.lastName));
    // const people = props.sponsors.map(({ people }) => people).flat().sort((a, b) => a.firstName.localeCompare(b.firstName)); // Get flattened list of people, sorted in alphabetic order by first name.
    const prefix: string = (props.sponsors.length === 0) ? 'PROJECT SPONSOR' : 'PROJECT SPONSORS';
    return (<>
        <div className="text-[#939598] text-left font-sans text-2xl">
            {prefix}: <span className="text-[#83003F]">{company_person.map(cp => `${cp.person.title} ${cp.person.firstName} ${cp.person.lastName} (${cp.company})`).join(', ')}</span>
        </div>
    </>);
}



function embedFileUrlPowerpoint(url: string): string {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${url}`;
}

export type EmbedFileUrlProps = {
    url: string;
    className?: string;
    children?: any;
}
export function EmbedFileUrl( props: EmbedFileUrlProps ) {

    // Embed PowerPoint file using Microsoft online embedding URL.
    if (props.url.endsWith('.ppt') || props.url.endsWith('.pptx')) {
        return (<>
            <iframe src={embedFileUrlPowerpoint(props.url)} width="100%" height="100%" className={props.className !== undefined ? props.className : ''}>
                {props.children}
            </iframe>
        </>);
    } 
    // Embed PDF using custom view query parameters.
    else if (props.url.endsWith('.pdf')) {
        return (<>
            <object data={`${props.url}#view=FitV&toolbar=1&navpanes=1`} type="application/pdf" width="100%" height="100%" className={props.className !== undefined ? props.className : ''}>
                {props.children}
            </object>
        </>);
    }
    // Embed everything else as an `object` tag with no special property type.
    else {
        return (<>
            <object data={props.url} width="100%" height="100%" className={props.className !== undefined ? props.className : ''}>
                {props.children}
            </object>
        </>);
    }
}



export type TeamBrochureProps = {
    team: Team;
}
export function TeamBrochure( props: TeamBrochureProps ) {
    return (<>
        <div className="p-5 grid grid-cols-1 gap-4">

            {/* Project name */}
            <div className="mb-3 text-5xl text-[#83003F] text-left font-bold font-sans">{props.team.projectTitle}</div>

            {/* Project info */}
            <div className="flex flex-row gap-4 pb-5">
                <div className="min-w-[40rem]">
                    <TeamBrochurePhoto smes={props.team.smes} team_photo_names={props.team.teamPhotoNames} team_photo_url={props.team.teamPhotoUrl}/>
                </div>
                <div className="text-left">
                    <TeamChallenge project_summary={props.team.projectSummary} />
                </div>
            </div>

            {/* Team information */}
            <div className="grid grid-cols-3 gap-4">
                <TeamMembers teamMembers={props.team.teamMembers}/>
            </div>

            {/* Sponsor information */}
            <div className="pt-5">
                <TeamProjectSponsorPeople sponsors={props.team.sponsors}/>
            </div>

            <div className='pt-5'>
                <div className='flex flex-row space-x-8'>
                    <div className='flex flex-col w-1/2 h-[600px] space-y-2'>
                        <div className='flex flex-row items-center justify-center'>
                            <div className='text-4xl font-bold text-center text-[#231F20]'>Poster</div>
                            {props.team.posterUrl
                                ? (
                                    <div className='pl-2'>
                                        <a className='flex flex-row group relative' href={props.team.posterUrl} target="_blank" rel="noopener noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                            <span className="items-center justify-center absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-36 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/4 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700 hover:invisible">
                                                Download File
                                            </span>
                                        </a>
                                    </div>
                                )
                                : (null)
                            }
                        </div>
                        <EmbedFileUrl url={props.team.posterUrl}>
                            <div className='flex flex-col text-center justify-center bg-slate-100 w-[100%] h-[100%]'>
                                {props.team.posterUrl 
                                    ? (<>
                                        <p>We're sorry, but the file could not be displayed</p>
                                        <a href={props.team.posterUrl} target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>Open file in new window</a>
                                    </>) 
                                    : (<p>The file does not exist.</p>)
                                }
                            </div>
                        </EmbedFileUrl>
                    </div>
                    <div className='flex flex-col w-1/2 h-[600px] space-y-2'>
                        <div className='flex flex-row items-center justify-center'>
                            <div className='text-4xl font-bold text-center text-[#231F20]'>Presentation</div>
                            {props.team.presentationUrl
                                ? (
                                    <div className='pl-2'>
                                        <a className='flex flex-row group relative' href={props.team.presentationUrl} target="_blank" rel="noopener noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                            <span className="items-center justify-center absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-36 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/4 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700 hover:invisible">
                                                Download File
                                            </span>
                                        </a>
                                    </div>
                                )
                                : (null)
                            }
                        </div>
                        <EmbedFileUrl url={props.team.presentationUrl}>
                            <div className='flex flex-col text-center justify-center bg-slate-100 w-[100%] h-[100%]'>
                                {props.team.presentationUrl 
                                ? (<>
                                    <p>We're sorry, but the file could not be displayed</p>
                                    <a href={props.team.presentationUrl} target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>Open file in new window</a>
                                </>) 
                                : (<p>The file does not exist.</p>)
                                }
                            </div>
                        </EmbedFileUrl>
                    </div>
                </div>
            </div>
        </div>
    </>);
}