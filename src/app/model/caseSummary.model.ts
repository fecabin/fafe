export class CaseSummary {

    constructor(
        caseCategory:String,
        taskVal: String, 
        completeVal: boolean = false,
        criticalDftCnt:Number,
        procStatus:String,
        onoDftCnt:Number ,
        pellicleDftCnt:Number ,
        rbiDftCnt:Number ,
        
        wiaNtoCnt:Number,
        wiaRrCnt:Number ,
        wiaRequalCnt:Number ,
        rbiCenterCnt:Number ,
        rbiEdgeCnt:Number ,
        rbiBx100Cnt:Number ,
        maskOutOfCnt:Number ,
        pellicleRuptureCnt:Number 
        ) {
        this.caseCategory=caseCategory;
        this.task = taskVal;
        this.complete = completeVal;
        this.criticalDftCnt=criticalDftCnt;
        this.onoDftCnt=onoDftCnt;
        this.procStatus = procStatus;
        this.pellicleDftCnt = pellicleDftCnt;
        this.rbiDftCnt = rbiDftCnt;
        this.wiaNtoCnt = wiaNtoCnt;
        this.wiaRrCnt = wiaRrCnt;
        this.wiaRequalCnt = wiaRequalCnt;
        this.rbiCenterCnt = rbiCenterCnt;
        this.rbiEdgeCnt = rbiEdgeCnt;
        this.rbiBx100Cnt = rbiBx100Cnt;
       
        this.maskOutOfCnt = maskOutOfCnt;

        this.pellicleRuptureCnt = pellicleRuptureCnt;
    }

    task: String;
    reticleId:String;
    jobId:String;
    inspDt:String;
    inspEqpId:String;
    criticalDftCnt:Number;
    onoDftCnt:Number;
    procStatus:String;
    complete: boolean;
    pellicleDftCnt:Number;
    rbiDftCnt:Number;
    wiaCnt:Number;
    caseCategory:String;
    wiaNtoCnt:Number;
        wiaRrCnt:Number ;
        wiaRequalCnt:Number ;
        rbiCenterCnt:Number ;
        rbiEdgeCnt:Number ;
        rbiBx100Cnt:Number ;
        maskOutOfCnt:Number ;
        pellicleRuptureCnt:Number ;
}
