export class DataRecord {
    q: string;
    a: string;

    get question(): string {
        return this.q;
    }
}

export class DataLoaderResponse {
    data: DataRecord[];
}

export default class DataLoader {

    async load(): Promise<DataLoaderResponse> {
        return fetch("/data/data.json").then(r => r.json());
    }
}