export class PractitionerSchema {
    licId: string;
    expDate: string;
    orgDate: string;
    licenseNum: string;
    statusDate: Date;
    boardAction: string;
    licenseStatusDesc: string;
    lastName: string;
    firstName: string;
    middleName: string;
    nameSuffix: string;
    businessName: string;
    licenseActiveStatus: string;
    county: string;
    countyDesc: string;

    mailingLine1: string;
    mailingLine2: string;
    mailingCity: string;
    mailingState: string;
    mailingZIP: string;

    practiceLine1: string;
    practiceLine2: string;
    practiceCity: string;
    practiceState: string;
    practiceZIP: string;

    phoneNum: string;
    phoneExt: string;
    area: string;

    email: string;
    modCodes: string;
    prescriptionIndicator: string;
    dispensingIndicator: string;

    constructor(raw: any) {
        if (raw) {
            this.licId = raw[0];
            this.expDate = raw[1];
            this.orgDate = raw[2];
            this.licenseNum = raw[3];
            this.statusDate = raw[4];
            this.boardAction = raw[5];
            this.licenseStatusDesc = raw[6];
            this.lastName = raw[7];
            this.firstName = raw[8];
            this.middleName = raw[9];
            this.nameSuffix = raw[10];
            this.businessName = raw[11];
            this.licenseActiveStatus = raw[12];
            this.county = raw[13];
            this.countyDesc = raw[14];
            this.mailingLine1 = raw[15];
            this.mailingLine2 = raw[16];
            this.mailingCity = raw[17];
            this.mailingState = raw[18];
            this.mailingZIP = raw[19];
            this.area = raw[20];
            this.phoneNum = raw[21];
            this.phoneExt = raw[22];
            this.practiceLine1 = raw[23];
            this.practiceLine2 = raw[24];
            this.practiceCity = raw[25];
            this.practiceState = raw[26];
            this.practiceZIP = raw[27];
            this.email = raw[28];
            this.modCodes = raw[29];
            this.prescriptionIndicator = raw[30];
            this.dispensingIndicator = raw[31];
        }
    }
}
