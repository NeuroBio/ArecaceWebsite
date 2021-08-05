export class LinkListElement {
    ListName: string;
    Route?: string;
    Href?: string;
    Item?: any;

    constructor(name: string, route?: string, href?: string, item?: any) {
        this.ListName = name;
        if (route) {
            this.Route = route;
        }
        if (href) {
            this.Href = href;
        }
        if (item) {
            this.Item = item;
        }
    }
}

export class LinkList {
    Name: string;
    Data: LinkListElement[];

    constructor(name: string, data: LinkListElement[]) {
        this.Name = name;
        this.Data = data;
    }
}
