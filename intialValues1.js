export const Question = {
    questionId: null,
    question: "",
    questionType: null,
    radio:{
       "Option A": "",
       "Option B": "",
       "Option C": "",
       "Option D": "",
    },
    check:{
       "Option A": "",
       "Option B": "",
       "Option C": "",
       "Option D": "",
    },
    short: "",
    answer: null,
    solution: "",
    remark:"",
  }
export const Que = {
  question_details: [Question],
  SheetID: null
}


export const Options = {
  MCQ: 1,
  SCQ: 2,
  Short: 3,
  NoChoice: 4
}

export const Choice = ['Option A', 'Option B', 'Option C', 'Option D'];

