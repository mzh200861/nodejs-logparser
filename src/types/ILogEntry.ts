export interface ILogEntry {
    timestamp: number;
    loglevel: string;
    transactionId: string;
    err?: string;
}
