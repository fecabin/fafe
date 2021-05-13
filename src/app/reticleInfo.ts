export class ReticleInfo {

    constructor(
        maskId:String,
        ebNumber:String,
        product:String,
        layer:String,
        techNo:String,
        die:String,
        pellicleType:String,) {
        this.maskId = maskId;
        this.ebNumber = ebNumber;
        this.product=product;
        this.layer=layer;
        this.techNo = techNo;
        this.die = die;
        this.pellicleType = pellicleType;
    }

    maskId: String;
    ebNumber:String;
    product:String;
    layer:String;
    techNo:String;
    die:String;
    pellicleType:String;
}
