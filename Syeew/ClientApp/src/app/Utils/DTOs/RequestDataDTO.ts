import { CustomDate } from "../CustomDate";

export class RequestDataDTO {
    companyName!: string;
    from!: CustomDate;
    to!: CustomDate;
    contentX!: string;
    contentY!: string;

    constructor(companyName: string, dateFrom: CustomDate, dateTo: CustomDate, contentX: string, contentY: string) {
        this.companyName = companyName
        this.from = dateFrom
        this.to = dateTo
        this.contentX = contentX
        this.contentY = contentY
    }
}