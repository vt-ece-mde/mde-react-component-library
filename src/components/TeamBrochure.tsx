import { SME, Sponsor, Team, TeamMember } from "@/interfaces";
import React from "react";


/**
 * Simple component to display a paragraph element with text that possible contains newlines ('\n').
 * Inspired by: https://stackoverflow.com/a/73056801
 */
export function MultilineParagraph(props: { text: string, className?: string }) {
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


export function TeamChallenge( props: { project_summary: string } ) {
    return (<>
        <div className='flex flex-col space-y-2'>
            <div className="text-[#008891] text-3xl font-normal font-sans">CHALLENGE</div>
            <div className="text-[#008891] text-2xl font-normal font-sans">{props.project_summary}</div>
        </div>
    </>);
}


export function TeamMemberInfo( props: TeamMember ) {
    return (<>
        <div className='flex flex-row space-x-3 items-end'>
            <span className="text-[#008891] text-4xl font-bold font-sans">{`${props.firstName} ${props.lastName}`}</span>
            <span className="text-[#939598] text-lg font-sans">{`${props.hometown}, ${props.StateOrCountry}`}</span>
        </div>
        <div className="my-2 w-full border-b-2 border-orange-500 rounded"></div>
        <div className="-mt-2 text-[#F57F28] text-lg font-bold font-sans">{props.degree}, {props.major}</div>
        <div className="pt-2 text-[#231F20] text-xl font-bold font-sans">
            Aspirations: <span className="text-[#231F20] text-lg font-sans font-normal">{props.aspiration}</span>
        </div>
        <div className="pt-2 text-[#231F20] text-xl font-bold font-sans">
            Class Comment: <span className="text-[#231F20] text-lg font-sans font-normal">{props.courseComment}</span>
        </div>
    </>);
}


export function TeamMembers( props: { team_members: TeamMember[] } ) {
    return (<>
        {props.team_members.map((tm, index) => {
            return (
                <div key={`tm-${index}`}>
                    <TeamMemberInfo {...tm} />
                </div>
            );
        })}
    </>);
}


export function TeamProjectSponsors( props: { sponsors: Sponsor[] } ) {
    const prefix: string = (props.sponsors.length === 0) ? 'PROJECT SPONSOR' : 'PROJECT SPONSORS';
    return (<>
        <div className="text-[#939598] text-left font-sans text-2xl">
            {prefix}: <span className="text-[#83003F]">{props.sponsors.map(sponsor => `${sponsor.title} ${sponsor.firstName} ${sponsor.lastName}`).join(', ')}</span>
        </div>
    </>);
}



function embedFileUrlPowerpoint(url: string): string {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${url}`;
}


export function EmbedFileUrl( props: { url: string, className?: string, children?: any} ) {

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


export function TeamBrochure( props: Team ) {

    console.log(`[${props.teamShortName}] poster URLs: ${JSON.stringify(props.posterUrl)}`)

    return (<>
        <div className="p-5 grid grid-cols-1 gap-4">

            {/* Project name */}
            <div className="mb-3 text-5xl text-[#83003F] text-left font-bold font-sans">{props.projectTitle}</div>

            {/* Project info */}
            <div className="flex flex-row gap-4 pb-5">
                <div className="min-w-[40rem]">
                    <TeamBrochurePhoto smes={props.smes} team_photo_names={props.teamPhotoNames} team_photo_url={props.teamPhotoUrl}/>
                </div>
                <div className="text-left">
                    <TeamChallenge project_summary={props.projectSummary} />
                </div>
            </div>

            {/* Team information */}
            <div className="grid grid-cols-3 gap-4">
                <TeamMembers team_members={props.teamMembers}/>
            </div>

            {/* Sponsor information */}
            <div className="pt-5">
                <TeamProjectSponsors sponsors={props.sponsors}/>
            </div>

            <div className='pt-5'>
                <div className='flex flex-row space-x-8'>
                    <div className='flex flex-col w-1/2 h-[600px] space-y-2'>
                        <div className='flex flex-row items-center justify-center'>
                            <div className='text-4xl font-bold text-center text-[#231F20]'>Poster</div>
                            {props.posterUrl
                                ? (
                                    <div className='pl-2'>
                                        <a className='flex flex-row group relative' href={props.posterUrl} target="_blank" rel="noopener noreferrer">
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
                        <EmbedFileUrl url={props.posterUrl}>
                            <div className='flex flex-col text-center justify-center bg-slate-100 w-[100%] h-[100%]'>
                                {props.posterUrl 
                                    ? (<>
                                        <p>We're sorry, but the file could not be displayed</p>
                                        <a href={props.posterUrl} target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>Open file in new window</a>
                                    </>) 
                                    : (<p>The file does not exist.</p>)
                                }
                            </div>
                        </EmbedFileUrl>
                    </div>
                    <div className='flex flex-col w-1/2 h-[600px] space-y-2'>
                        <div className='flex flex-row items-center justify-center'>
                            <div className='text-4xl font-bold text-center text-[#231F20]'>Presentation</div>
                            {props.presentationUrl
                                ? (
                                    <div className='pl-2'>
                                        <a className='flex flex-row group relative' href={props.presentationUrl} target="_blank" rel="noopener noreferrer">
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
                        <EmbedFileUrl url={props.presentationUrl}>
                            <div className='flex flex-col text-center justify-center bg-slate-100 w-[100%] h-[100%]'>
                                {props.presentationUrl 
                                ? (<>
                                    <p>We're sorry, but the file could not be displayed</p>
                                    <a href={props.presentationUrl} target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>Open file in new window</a>
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