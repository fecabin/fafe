export class TodoItem {

    constructor(taskVal: string, 
        completeVal: boolean = false,
        criticalDftCnt:Number,
        procStatus:String,
        onoDftCnt:Number ,
        pellicleDftCnt:Number ,
        rbiDftCnt:Number ,
        wiaCnt:Number ,) {
        this.task = taskVal;
        this.complete = completeVal;
        this.criticalDftCnt=criticalDftCnt;
        this.onoDftCnt=onoDftCnt;
        this.procStatus = procStatus;
        this.pellicleDftCnt = pellicleDftCnt;
        this.rbiDftCnt = rbiDftCnt;
        this.wiaCnt = wiaCnt;
    }

    task: string;
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
}
