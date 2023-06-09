// import { Person, SME, Sponsor, Team, TeamMember } from "../interfaces";
import { Person, SME, Sponsor, Team, TeamMember } from 'mde-typescript-library';
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
    url?: string;
    className?: string;
    children?: any;
    width?: string;
    height?: string;
    type?: "image"|"pdf"|"ppt"|"video"|"youtube"|"vimeo";
}
export function EmbedFileUrl( props: EmbedFileUrlProps ) {
    // Default to empty string if none provided.
    const url = props.url || '';
    const width = props.width || "100%";
    const height = props.height || "100%";

    // Construct default classname.
    const className = props.className !== undefined ? props.className : '';

    // Gleaned from: https://stackoverflow.com/a/28735961
    const matchYoutubeUrl = (url: string): string|false => {
        var r = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        const match = url.match(r);
        return match ? match[1] : false;
    }

    // Gleaned from: https://stackoverflow.com/a/67153064
    const matchVimeoUrl = (url: string): string|false => {
        var r = /^(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)$/;
        const match = url.match(r);
        return match ? match[1] : false;
    }

    // Image file.
    if (props.type === "image" || url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')) {
        const ext = url.split('.').slice(-1);
        console.log(`[image] ${ext}`)
        return (<>
            <img src={url} alt="image" className={className} width={width} height={height} />
        </>);
    }

    // Embed PowerPoint file using Microsoft online embedding URL.
    if (props.type === "ppt" || url.endsWith('.ppt') || url.endsWith('.pptx')) {
        const ext = url.split('.').slice(-1);
        console.log(`[powerpoint] ${ext}`)
        return (<>
            <iframe src={embedFileUrlPowerpoint(url)} width={width} height={height} className={className}>
                {props.children}
            </iframe>
        </>);
    } 

    // Embed PDF using custom view query parameters.
    if (props.type === "pdf" ||url.endsWith('.pdf')) {
        const ext = url.split('.').slice(-1);
        console.log(`[pdf] ${ext}`)
        return (<>
            <object data={`${url}#view=FitV&toolbar=1&navpanes=1`} type="application/pdf" width={width} height={height} className={className}>
                {props.children}
            </object>
        </>);
    }

    // Video file.
    if (props.type === "video" ||url.endsWith('.mp4') || url.endsWith('.webm')) {
        const ext = url.split('.').slice(-1);
        console.log(`[video] ${ext}`)
        return (<>
            <video controls width={width} height={height} className={className}>
                <source src={url} type={`video/${ext}`} />
                {props.children}
            </video>
        </>);
    }

    // Video is from Youtube.
    const matchYouTube = matchYoutubeUrl(url);
    if (props.type === "youtube" || matchYouTube) {
        console.log('[video] Youtube')
        // width="560" height="315"
        return (<>
            <iframe width={width} height={height} src={`https://www.youtube.com/embed/${matchYouTube}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className={className}>
                {props.children}
            </iframe>
        </>);
    }

    // Video is from Vimeo.
    const matchVimeo = matchVimeoUrl(url);
    if (props.type === "vimeo" ||matchVimeo) {
        console.log('[video] Vimeo')
        return (<>
            <iframe width={width} height={height} src={`https://player.vimeo.com/video/${matchVimeo}`} title="Vimeo video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className={className}>
                {props.children}
            </iframe>
        </>);
    }

    // Embed everything else as an `object` tag with no special property type.
    return (<>
        <iframe src={url} width={width} height={height} className={className}>
            {props.children}
        </iframe>
        {/* <object data={url} width={width} height={height} className={className}>
            {props.children}
        </object> */}
    </>);
}


export type FileDisplayProps = {
    title: string;
    url?: string;
    className?: string;
    width?: string;
    height?: string;
}
export function FileDisplay(props: FileDisplayProps) {
    // Construct default classname.
    const className = props.className !== undefined ? props.className : '';

    return (<>
    <div className="flex flex-col h-full items-center justify-center">
        <div className='flex flex-row items-center justify-center'>
            <div className='text-4xl font-bold text-center text-[#231F20]'>{props.title}</div>
            {!!props.url
                ? (
                    <div className='pl-2'>
                        <a className='flex flex-row group relative' href={props.url} target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        <span className="items-center justify-center absolute hidden group-hover:flex -left-5 -top-2 -translate-y-full w-36 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/4 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700 hover:invisible">
                            Open in new tab
                        </span>
                        </a>
                    </div>
                )
                : (null)
            }
        </div>
        <div className={`flex-1 ${className}`}>
            <EmbedFileUrl url={props.url} width={props.width} height={props.height}>
                <div className='flex flex-col text-center justify-center bg-slate-100 w-[100%] h-[100%]'>
                    {!!props.url 
                        ? (<>
                            <p>We're sorry, but the file could not be displayed</p>
                            <a href={props.url} target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>Open file in new tab</a>
                        </>) 
                        : (<p>The file does not exist.</p>)
                    }
                </div>
            </EmbedFileUrl>
        </div>
    </div>
    </>);
}

/**
 * Checks if a given URL string is a valid URL.
 */
export const validateUrl = (url: string): boolean => {
    try {
        new URL(url); // If this passes then string is a valid URL.
        return true;
    }
    catch (error: any) {
        return false;
    }
}

/**
 * Treats any URLs that are "invalid" as relative and prepends a base string to them.
 */
export const applyRelativeUrlCorrection = (url: string, base: string, validateCallback?: (url: string) => boolean): string => {
    const vcb = validateCallback || validateUrl;
    return vcb(url) ? url : (new URL(url, base.replace(/\/$|$/, '/') /* Ensure base has trailing slash */)).toString();
}


export type TeamBrochureProps = {
    team: Team;
    correctRelativeUrlBase?: string; // Treats all URLs that do not start with "http://" as a relative URL and prepends this string as "base/relative_url" to correct for relative URLs.
    correctRelativeUrlApplyCallback?: (url: string, base: string, validateCallback?: (url: string) => boolean) => string,
    correctRelativeUrlValidateCallback?: (url: string) => boolean,
}
export function TeamBrochure( props: TeamBrochureProps ) {
    // Reference to team object.
    let team: Team = props.team;

    // Callback functions.
    const correctRelativeUrlApplyCallback = props.correctRelativeUrlApplyCallback || applyRelativeUrlCorrection;
    const correctRelativeUrlValidateCallback = props.correctRelativeUrlValidateCallback || validateUrl;

    // Apply relative URL correction if desired.
    if (!!props.correctRelativeUrlBase) {
        if (!validateUrl(props.correctRelativeUrlBase)) {
            throw Error('Team brochure relative URL base is not a valid URL stub')
        }
        team.teamPhotoUrl = correctRelativeUrlApplyCallback(team.teamPhotoUrl, props.correctRelativeUrlBase, correctRelativeUrlValidateCallback);
        team.teamPhotoUrl = correctRelativeUrlApplyCallback(team.teamPhotoUrl, props.correctRelativeUrlBase, correctRelativeUrlValidateCallback);
        team.presentationVideoUrl = correctRelativeUrlApplyCallback(team.presentationVideoUrl, props.correctRelativeUrlBase, correctRelativeUrlValidateCallback);
        team.presentationSlideshowUrl = correctRelativeUrlApplyCallback(team.presentationSlideshowUrl, props.correctRelativeUrlBase, correctRelativeUrlValidateCallback);
        team.posterUrl = correctRelativeUrlApplyCallback(team.posterUrl, props.correctRelativeUrlBase, correctRelativeUrlValidateCallback);
        team.extraContentUrls = team.extraContentUrls.map(url => correctRelativeUrlApplyCallback(url, props.correctRelativeUrlBase!, correctRelativeUrlValidateCallback));
    }

    return (<>
        <div className="p-5 grid grid-cols-1 gap-4">

            {/* Project name */}
            <div className="mb-3 text-5xl text-[#83003F] text-left font-bold font-sans">{team.projectTitle}</div>

            {/* Project info */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="min-w-[40rem]">
                    <TeamBrochurePhoto smes={team.smes} team_photo_names={team.teamPhotoNames} team_photo_url={team.teamPhotoUrl}/>
                </div>
                <div className="text-left">
                    <TeamChallenge project_summary={team.projectSummary} />
                </div>
            </div>

            {/* Team information */}
            <div className="pt-5 grid grid-cols-1 lg:grid-cols-3 grid-flow-row gap-4">
                <TeamMembers teamMembers={team.teamMembers}/>
            </div>

            {/* Sponsor information */}
            <div className="pt-5">
                <TeamProjectSponsorPeople sponsors={team.sponsors}/>
            </div>

            {/* Expo file grid */}
            <div className='pt-5 grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-6 p-8'>

                {/* Poster */}
                <div className={"col-span-1 h-[500px] lg:h-[800px] row-span-1 " + ((!!team.presentationSlideshowUrl || !!team.presentationVideoUrl) ? "lg:col-span-1" : "lg:col-span-2") + " " + ((!!team.presentationSlideshowUrl && !!team.presentationVideoUrl) ? "row-span-2": "row-span-1")}>
                    <FileDisplay title="Poster" url={team.posterUrl} className="w-full h-full" />
                </div>

                {/* Presentation Slideshow */}
                {(!!team.presentationSlideshowUrl) ? (<>
                <div className="col-span-1 h-[500px] lg:h-auto"> 
                    <FileDisplay title="Presentation Slideshow" url={team.presentationSlideshowUrl} className="w-full h-full"/>
                </div>
                </>) : null}

                {/* Presentation Video Recording */}
                {(!!team.presentationVideoUrl) ? (<>
                <div className="col-span-1 h-[500px] lg:h-auto">
                    <FileDisplay title="Presentation Video" url={team.presentationVideoUrl} className="w-full h-full" />
                </div>
                </>) : null}
            </div>

            {/* Extra files */}
            {(team.extraContentUrls !== undefined && team.extraContentUrls.length > 0) ? (<>
            <div className="pt-5 p-8">
                {/* Header */}
                <div className="flex flex-row gap-4">
                    <hr className="h-px my-6 w-full border-gray-500 border-[0.1rem] rounded"></hr>
                    <div className='text-4xl font-bold text-center text-[#231F20] whitespace-nowrap'>Extra Team Content</div>
                    <hr className="h-px my-6 w-full border-gray-500 border-[0.1rem] rounded"></hr>
                </div>
                <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 grid-flow-row gap-6">
                    {team.extraContentUrls.map((url, i) => <>
                    <div className="lg:col-span-1 min-h-[300px] max-h-[500px]">
                        <EmbedFileUrl url={url} className="w-full h-full items-center justify-center">
                            <div className='flex flex-col text-center justify-center bg-slate-100 w-[100%] h-[100%]'>
                                {url 
                                    ? (<>
                                        <p>We're sorry, but the file could not be displayed</p>
                                        <a href={url} target="_blank" rel="noopener noreferrer" className='text-blue-600 underline'>Open file in new tab</a>
                                    </>) 
                                    : (<p>The file does not exist.</p>)
                                }
                            </div>
                        </EmbedFileUrl>
                    </div>
                    </>)}
                </div>
            </div>
            </>) : null}
        </div>
    </>);
}