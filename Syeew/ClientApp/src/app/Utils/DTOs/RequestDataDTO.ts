import { CustomDate } from "../CustomDate";

export class RequestDataDTO {
    companyName!: string;
    dateFrom!: CustomDate;
    dateTo!: CustomDate;
    content!: string;

    constructor(companyName: string, dateFrom: CustomDate, dateTo: CustomDate, content: string) {
        this.companyName = companyName
        this.dateFrom = dateFrom
        this.dateTo = dateTo
        this.content = content
    }
}