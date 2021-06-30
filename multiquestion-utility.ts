export interface IOptions {
    key: string;
    value: string;
  } 
  
export interface IQuestionMetaInfo {
    options: Array<IOptions>;
    args?: any;
    rules?: any;
    preserveHiddenValue?: boolean;
  }
  
export interface IRule {
    type: string;
    args: any;
  }

export class MultiQuestionUtility {
    private questionDefinitions: Map<string, IQuestionMetaInfo>;

    constructor(questionDefinitions: any, rules?: Array<IRule>) {
        this.questionDefinitions = questionDefinitions;
    }

    public showQuestion(key: string): boolean {
      return true;
    }
  
    public getChoice(key: string): string {
        console.log('getChoice called')
        return "";
    }
    
    public getOptions(key: string): Array<IOptions> {
        // Optional chaining ?. only evaluates if the preceding object is not null
      const options =  this.questionDefinitions.get(key)?.options;

      return options || [];  // if options is not null will rreturn options, otherwise and empty array
    }
  
    public getStringValue(key: string): string {
      return "translated: " + key;
    }
  
    public evalRules(choiceValues: any): any {
      return choiceValues;
    }

}