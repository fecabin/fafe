import { DefectInfo } from "./defectInfo";
import { ReticleInfo } from "./reticleInfo";

export class CaseDetail {

    constructor(
        caseId:String,
        caseType:String,
        caseName:String,
        inspDt:String,
        reticleInfo:ReticleInfo,
        defectList:DefectInfo[]
        ) {
        this.caseId = caseId;
        this.caseType = caseType;
        this.caseName = caseName;
        this.inspDt = inspDt;
        this.reticleInfo=reticleInfo;
        this.defectList=defectList;
    }

    caseId: String;
    caseType: String;
    caseName: String;
    inspDt:String;
    reticleInfo: ReticleInfo;
    defectList:DefectInfo[];
}
