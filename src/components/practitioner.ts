
export default class Practitioner {
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
    /**
     * Format 'phone number Ext - extension'
     */
    private phoneNum: string;
    private phoneExt: string;
    get phoneNumber(): string {
        return `${this.phoneNum}${this.phoneExt ? " Ext - " + this.phoneExt : ''}`;
    }

    private mailingAddressLine1: string;
    private mailingAddressLine2: string;
    private mailingAddressCity: string;
    private mailingAddressState: string;
    private mailingAddressZIP: string;
    private mailingAddressArea: string;
    get mailingAddress(): string {
        return `Line 1: ${this.mailingAddressLine1}, ${this.mailingAddressCity} ${this.mailingAddressState}, ${this.mailingAddressZIP} ${this.mailingAddressArea}.
        ${this.mailingAddressLine2 ? " Line 2: " + this.mailingAddressLine2 : ""}`;
    }


    private practiceAddressLine1: string;
    private practiceAddressLine2: string;
    private practiceAddressCity: string;
    private practiceAddressState: string;
    private practiceAddressZIP: string;
    get practiceAddress(): string {
        return `Line 1: ${this.practiceAddressLine1}, ${this.practiceAddressCity} ${this.practiceAddressState}, ${this.practiceAddressZIP}.
        ${this.practiceAddressLine2 ? " Line 2: " + this.practiceAddressLine2 : ""}`;
    }

    email: string;
    modCodes: string;
    prescriptionIndicator: string;
    dispensingIndicator: string;

    public static LABEL_INFO = {
        licId: { heading: "Lic. ID", width: 80, queryString: "lic_id" },
        expDate: { heading: "Expiry Date", width: 120, queryString: "Expire-Date" },
        orgDate: { heading: "Original Date", width: 120, queryString: "Original-Date" },
        licenseNum: { heading: "Lic. #", width: 80, queryString: "License-Number" },
        statusDate: { heading: "Effective Date", width: 120, queryString: "Status-Effective-Date" },
        boardAction: { heading: "Board Action?", width: 150, queryString: "Board-Action-Indicator" },
        licenseStatusDesc: { heading: "License Status", width: 140, queryString: "License-Status-Description" },
        lastName: { heading: "Last", width: 140, queryString: "Last-Name" },
        firstName: { heading: "First", width: 140, queryString: "First-Nam" },
        middleName: { heading: "Middle", width: 80, queryString: "Middle-Name" },
        nameSuffix: { heading: "Suffix", width: 60, queryString: "Name-Suffix" },
        businessName: { heading: "Business", width: 80, queryString: "Business-Name" },
        licenseActiveStatus: { heading: "Active?", width: 80, queryString: "License-Active-Status-Description" },
        country: { heading: "County Num", width: 40, queryString: "County" },
        countryDesc: { heading: "County Name", width: 140, queryString: "County-Description" },
        phoneNumber: { heading: "Phone Num", width: 300, queryString: "" },
        mailingAddress: { heading: "Mailing Address", width: 900, queryString: "" },
        practiceAddress: { heading: "Practice Address", width: 740, queryString: "" },
        email: { heading: "Email", width: 240, queryString: "Email" },
        modCodes: { heading: "Mod Codes", width: 200, queryString: "Mod-Cdes" },
        prescriptionIndicator: { heading: "Prescribe?", width: 110, queryString: "Prescribe-Ind" },
        dispensingIndicator: { heading: "Dispensing?", width: 120, queryString: "Dispensing-Ind" }
    };

    constructor(raw: any) {
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
        this.mailingAddressLine1 = raw[15];
        this.mailingAddressLine2 = raw[16];
        this.mailingAddressCity = raw[17];
        this.mailingAddressState = raw[18];
        this.mailingAddressZIP = raw[19];
        this.mailingAddressArea = raw[20];
        this.phoneNum = raw[21];
        this.phoneExt = raw[22];
        this.practiceAddressLine1 = raw[23];
        this.practiceAddressLine2 = raw[24];
        this.practiceAddressCity = raw[25];
        this.practiceAddressState = raw[26];
        this.practiceAddressZIP = raw[27];
        this.email = raw[28];
        this.modCodes = raw[29];
        this.prescriptionIndicator = raw[30];
        this.dispensingIndicator = raw[31];
    }

    public static getTotalWidth(): number {
        return Object.keys(Practitioner.LABEL_INFO).reduce(
            (total, key) => total + Practitioner.LABEL_INFO[key].width,
            0
        );
    }
}
