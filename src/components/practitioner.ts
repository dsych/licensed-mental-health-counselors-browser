import { PractitionerSchema } from "../../server/lib/practitioner-schema";

export class Practitioner extends PractitionerSchema {
    phone: Phone;
    mailingAddress: Address;
    practiceAddress: Address;

    public static LABEL_INFO = {
        licId: { heading: "Lic. ID", width: 80 },
        expDate: { heading: "Expiry Date", width: 120 },
        orgDate: { heading: "Original Date", width: 120 },
        licenseNum: { heading: "Lic. #", width: 80 },
        statusDate: { heading: "Effective Date", width: 120 },
        boardAction: { heading: "Board Action?", width: 150 },
        licenseStatusDesc: { heading: "License Status", width: 140 },
        lastName: { heading: "Last", width: 140 },
        firstName: { heading: "First", width: 140 },
        middleName: { heading: "Middle", width: 80 },
        nameSuffix: { heading: "Suffix", width: 60 },
        businessName: { heading: "Business", width: 80 },
        licenseActiveStatus: { heading: "Active?", width: 80 },
        county: { heading: "County Num", width: 40 },
        countyDesc: { heading: "County Name", width: 140 },
        phone: { heading: "Phone Num", width: 300 },
        mailingAddress: { heading: "Mailing Address", width: 500 },
        practiceAddress: { heading: "Practice Address", width: 500 },
        email: { heading: "Email", width: 240 },
        modCodes: { heading: "Mod Codes", width: 200 },
        prescriptionIndicator: { heading: "Prescribe?", width: 110 },
        dispensingIndicator: { heading: "Dispensing?", width: 120 }
    };

    constructor(src: PractitionerSchema) {
        super(null);

        Object.keys(src).forEach(key => this[key] = src[key]);

        this.mailingAddress = {
            discriminator: "isAddress",
            line1: this.mailingLine1,
            line2: this.mailingLine2,
            city: this.mailingCity,
            state: this.mailingState,
            ZIP: this.mailingZIP
        };
        this.phone = {
            discriminator: "isPhone",
            area: this.area,
            phoneNum: this.phoneNum,
            phoneExt: this.phoneExt
        };
        this.practiceAddress = {
            discriminator: "isAddress",
            line1: this.practiceLine1,
            line2: this.practiceLine2,
            city: this.practiceCity,
            state: this.practiceState,
            ZIP: this.practiceZIP
        };
    }

    public static getTotalWidth(): number {
        return Object.keys(Practitioner.LABEL_INFO).reduce(
            (total, key) => total + Practitioner.LABEL_INFO[key].width,
            0
        );
    }
}

export interface Address {
    discriminator: "isAddress";
    line1: string;
    line2: string;
    city: string;
    state: string;
    ZIP: string;
}

export const instanceOfAddress = (object: any): object is Address => {
    return object.discriminator === "isAddress";
}


export interface Phone {
    discriminator: "isPhone";
    phoneNum: string;
    phoneExt: string;
    area: string;
}

export const instanceOfPhone = (object: any): object is Phone => {
    return object.discriminator === "isPhone";
}


