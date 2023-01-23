import { CustomDate } from "../CustomDate";

export class RequestDataDTO {
    companyName!: string;
    from!: CustomDate;
    to!: CustomDate;
    content!: string;
    contentX?: string;

    constructor(companyName: string, dateFrom: CustomDate, dateTo: CustomDate, content: string, contentX?: string) {
        this.companyName = companyName
        this.from = dateFrom
        this.to = dateTo
        this.content = content
        this.contentX = contentX
    }
}