import { Service, signal } from '@angular/core';

@Service()
export class ReportExport {
    protected readonly _lastExport = signal<string | null>(null);
    readonly lastExport = this._lastExport.asReadonly();

    async exportData(data: unknown): Promise<string> {
        await new Promise(resolve => setTimeout(resolve, 500));
        const summary = `Exported ${JSON.stringify(data).length} 
            bytes at ${new Date().toLocaleTimeString()}`;
        this._lastExport.set(summary);
        return summary;
    }
}