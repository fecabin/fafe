import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { CaseSummaryRepository } from "./caseSummary.repository";
import { StaticDataSource } from "./static.datasource";

@NgModule({
    providers: [ProductRepository, CaseSummaryRepository,StaticDataSource]
})
export class ModelModule { }
