export interface ListProps{

}

export interface ListCardProps{
    
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

