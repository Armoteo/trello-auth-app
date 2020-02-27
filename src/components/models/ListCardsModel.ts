export interface ListProps{
id?:string;
name?:string;
closed?:boolean;
idBoard?:string;
pos?:number;
subscribed?:boolean;
softLimit?:number | null;
}

export interface ListCardProps{
    id?:string;
    badges?:object;
    checkItemStates?:Array<any>;
    closed?:boolean;
    dateLastActivity?:string;
    desc?:string;
    descData?:object;
    due?:string;
    dueComplete?:boolean;
    idAttachmentCover?:string;
    idBoard?:string;
    idChecklists?:Array <string>;
    idLabels?:Array <string>;
    idList?:string;
    idMembers?:Array <string>;
    idMembersVoted?:Array <string>;
    idShort?:number;
    labels?:Array <any>
    manualCoverAttachment?:boolean;
    name?:string;
    pos?:number;
    shortLink?:string;
    shortUrl?:string;
    subscribed?:boolean;
    url?:string;
    address?:string;
    locationName?:string;
    coordinates?:object;
}

export interface ListBoardProps{
id?:string;
name?:string;
desc?:string;
descData?:string|null;
closed?:boolean;
idOrganization?:string;
pinned?:boolean;
url?:string;
shortUrl?:string;
prefs?:object;
labelNames?:object;
starred?:boolean;
limits?:object;
memberships?:Array<any>;
enterpriseOwned?:boolean

}

