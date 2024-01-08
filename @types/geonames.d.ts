type alternateName = {
    name: string;
    lang: string;
    from?: string;
    to?: string;
    isHistoric?: string;
    isPreferredName?: string;
}

export interface GeoNamesCityData {
	timezone: {
		gmtOffset: number,
		timeZoneId: string,
		dstOffset: number
	},
	bbox: {
		east: number,
		south: number,
		north: number,
		west: number,
		accuracyLevel: number
	},
	asciiName: string,
	astergdem: number,
	countryId: string,
	fcl: string,
	srtm3: number,
	adminId2: string,
	adminId3: string,
	countryCode: string,
	adminId4: string,
	adminCodes2: {
		ISO3166_2: string
	},
	adminCodes1: {
		ISO3166_2: string
	},
	adminId1: string,
	lat: string,
	fcode: string,
	continentCode: string,
	adminCode2: string,
	adminCode3: string,
	adminCode1: string,
	lng: string,
	geonameId: number,
	toponymName: string,
	adminCode4: string,
	population: number,
	wikipediaURL: string,
	adminName5: string,
	adminName4: string,
	adminName3: string,
	alternateNames: alternateName[],
	adminName2: string,
	name: string,
	fclName: string,
	countryName: string,
	fcodeName: string,
	adminName1: string
}