import { CustomDate } from "../CustomDate";

export class RequestDataDTO {
    companyName!: string;
    from!: CustomDate;
    to!: CustomDate;
    contentY!: string;
    contentX?: string;

    constructor(companyName: string, dateFrom: CustomDate, dateTo: CustomDate, contentY: string, contentX?: string) {
        this.companyName = companyName
        this.from = dateFrom
        this.to = dateTo
        this.contentY = contentY
        if (contentX != undefined)
            this.contentX = contentX
        else
            this.contentX = ''
    }

}