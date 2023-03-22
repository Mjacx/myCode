const url: string = 'https://api.thecatapi.com/v1/images/search';
const button: HTMLButtonElement | null = document.querySelector('button');
const tableBody: HTMLTableElement | null = document.querySelector('#table-body');

console.log(url);

interface catType{
    id:string;
    url:string;
    width:number;
    height:number;
}

class Cat implements catType{

    id:string;
    url:string;
    width:number;
    height:number;

    constructor(id:string, url:string, width:number, height:number){
        this.id = id;
        this.url = url;
        this.width = width;
        this.height = height;
    }
}

class webDisplay{
   public static addDAta(data: catType): void {
        const cat: Cat = new Cat(data.id,data.url,data.width,data.height);
        const tableRow: HTMLTableRowElement = document.createElement('tr');
        tableRow.innerHTML = `
                            <td>${cat.id}</td>
                            <td><img src="${cat.url}" /></td>
                            <td>${cat.width.toString()}</td>
                            <td>${cat.height.toString()}</td>
                            <td>${cat.url}</td>
                            <td><a href="#">X</a></td>
                            `;
        tableBody?.append(tableRow);                            
    }

    public static deleteData(deleteButton: HTMLAnchorElement): void {
        const td = deleteButton.parentElement as HTMLTableCellElement;
        const tr = td.parentElement as HTMLTableRowElement;
        tr.remove();
    }

}
async function getJson<T>(url: string): Promise<T>{
    const response: Response = await fetch(url);
    const json: Promise<T> = await response.json();
    console.log(response);
    console.log(json);
    return json;
}

async function getData(): Promise<void> {
    try{
        const json:catType[] = await getJson<catType[]>(url);
        const data:catType = json[0];
        webDisplay.addDAta(data);

    }catch(error: Error | unknown){
        let message: string;
        if(error instanceof Error){
            message = error.message;
        }else{
            message = String(error);
        }
        console.log(error);

    }
}

button?.addEventListener<'click'>('click', getData);
tableBody?.addEventListener<'click'>('click', (ev: MouseEvent) => {
    webDisplay.deleteData(<HTMLAnchorElement>ev.target);
});