import { Component, Input, OnInit, VERSION } from '@angular/core';
import { IOptions, IQuestionMetaInfo, IRule, MultiQuestionUtility } from './multiquestion-utility';

const yesNoOptions: Array<IOptions> = [
  { key: 'Y', value: 'Yes' },  // keys = ['Y', 'N], values = ['Yes', 'No'], entries = [['Y', 'Yes'], ['N', 'No']]
  { key: 'N', value: 'No' }
];

const yesNoDont_KnownOptions: Array<IOptions> = [
  { key: 'Y', value: 'Yes' },
  { key: 'N', value: 'No' },
  { key: 'U', value: "Don't Know" },
];

@Component({
  selector: 'multi-question',
  templateUrl: './multi-question.component.html',
  styleUrls: [ './multi-question.component.css' ]
})
export class MultiQuestionComponent implements OnInit  {
  public questions: MultiQuestionUtility;
  public questionChoices: any;

  public constructor() {
    const questions = {
      question1: {
        options: yesNoDont_KnownOptions,
        args: {
          labelText: "question 1"
        }
      }
    };

    const rules: Array<IRule> = [];

    this.questions = new MultiQuestionUtility(questions, rules);
    this.questionChoices = {};
  }

  public ngOnInit() {
    this.questionChoices = this.questions.evalRules(this.questionChoices);
  }

  public onChange(e: any) {
    this.questionChoices = this.questions.evalRules(this.questionChoices);
  }

  public get diagnostics() {
    return JSON.stringify(this.questionChoices);
  }
}

/* 

  public showQuestion(key: string): boolean {
    return true;
  }

  public getChoice(key: string): string {
    console.log('getChoice called')
    return "";
  }
  
  public getOptions(key: string): Array<IOptions> {
    return yesNoDont_KnownOptions;
  }

  public getStringValue(key: string): string {
    return "translated: " + key;
  }

  public evalRules(choiceValues: any): any {
    return choiceValues;
  }

  public dwellingType = '';
  public questions: Array<IQuestionInfo> = [
    {
      key: '1', choice: '', options: yesNoOptions, show: true,
      rules: {always: true}
    },
    {
      key: '2', choice: '', options: yesNoDont_KnownOptions, show: true,
      rules: {
        dependsOn: ['1'], // only show this question if the following are visible
        choiceRules: {
          '1': ['N'],  // only show if question '3' has a value of 'N'
        },
      }
    },
    {
      key: '3', choice: '', options: yesNoOptions, show: true,
      rules: {
        dependsOn: ['2'], // only show this question if the following are visible
        choiceRules: {
          '2': ['Y', 'U'],  // only show if question '3' has a value of 'N'
        },
      }
    },
    {
      key: '4',
      choice: '', 
      options: yesNoOptions,
      rules: {
        dependsOn: ['3'], // only show this question if the following are visible
        choiceRules: {
          '3': ['N'],  // only show if question '3' has a value of 'N'
        },
      },
      saveHiddenValue: true,
      show: true
    }
  ];
  public saveHiddenValues: boolean = false;
  
  constructor() {
  }

  ngOnInit() {
    this.evaluateRules(); 
  }

  onChange(){
    this.evaluateRules();

    // save to backend
  }

  //Helper function to lookup the question by the key
  private getQuestionInfoByKey(key: string): IQuestionInfo|null {
    for(let question of this.questions) {
      if(key === question.key) {
        return question;
      }
    }
    return null;
  } 
  

  //Function which evaluates wheather or not a question is shown
  private evaluateRules() {
    
    //Loop over each question
    this.questions.forEach((question: IQuestionInfo) => {
      if('rules' in question) {
        const rules = question.rules;
        //If 'always', evaluate first
        if('always' in rules) {
          question.show = rules.always;
          return;
        }

        let show: boolean = true;
        //Default to show questions is true, unless 'dependsOn' makes it false
        if ('dependsOn' in rules) {
          const dependsOn: Array<string> = rules.dependsOn;

          for(let key of dependsOn) {
            if(key == question.key) {
              // TODO - an obvious error add behaivor for depends on itself
              continue;  // for right now just ignore
            }
            const dependsOnQuestionInfo = this.getQuestionInfoByKey(key);
            if(dependsOnQuestionInfo) {
              if(dependsOnQuestionInfo.show == false) {
                show = false;
                break;
              }
            } else {
              // TODO - add behaivor for a rule with no match
            }
          }

          if(show && 'choiceRules' in rules) {
            const choiceRules: any = rules.choiceRules;
            for(let key of Object.keys(choiceRules)) {
              if(key == question.key) {
                // TODO - an obvious error add behaivor for depends on itself
                continue;  // for right now just ignore
              }
              const dependsOnQuestionInfo: IQuestionInfo|null = this.getQuestionInfoByKey(key);
              if(dependsOnQuestionInfo) {
                if(!choiceRules[key].includes(dependsOnQuestionInfo.choice)) {
                  show = false;
                  break;
                }
              } else {
                // TODO - add behaivor for a rule with no match
              }
            }
          }

          //Clear values of questions not shown
          question.show = show;
          const saveHidden = this.saveHiddenValues || question.saveHiddenValue;
          if(!saveHidden && show === false) {
            question.choice = '';
          }
        }
        }
    });

    // set the dwellingType here
    const  isHouse = false; // 
    this.dwellingType = (isHouse)?'house':'appartment';
  }
} 
*/