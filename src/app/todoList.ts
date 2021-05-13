import { TodoItem } from "./todoItem";

export class TodoList {
    
    constructor(public user: string, private todoItems: TodoItem[] = []) {
        // no statements required
    }

    get items(): readonly TodoItem[]  { 
        return this.todoItems;
    }

    // addItem(task: string,completeVal:boolean,criticalDftCnt:Number,procStatus:String,onoDftCnt:Number {
    //     //this.todoItems.push(new TodoItem(task,completeVal,criticalDftCnt,procStatus,onoDftCnt));
    // }
}
