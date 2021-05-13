import { Injectable } from "@angular/core";
import { CaseSummary } from "./caseSummary.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class CaseSummaryRepository {
    private caseSummaries: CaseSummary[] = [];
    private categories: String[] = [];

    constructor(private dataSource: StaticDataSource) {
        dataSource.getCaseSummaries().subscribe(data => {
            this.caseSummaries = data;
            this.categories = data.map(p => p.caseCategory)
                .filter((c, index, array) => array.indexOf(c) == index).sort();
        });
    }

    getCaseSummariesByCaseCategory(category: string = null): CaseSummary[] {
        return this.caseSummaries
            .filter(p => category == null || category == p.caseCategory);
    }
    getCaseSummaries() :CaseSummary[] {
        return this.caseSummaries;
           
    }
  
    getCategories(): String[] {
        return this.categories;
    }
}
