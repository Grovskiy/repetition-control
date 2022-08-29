export interface goalsInterface {
  id: number;
  text: string;
  days: dayOfGoal[];
}

export enum StatusDay { Empty, Hammock, Done }

export interface dayOfGoal {
  day: number;
  status: StatusDay;
  dateWillDo: string;
}

// For example
// const goal = {
//   id: 1,
//   text: 'Fitness 10-20min',
//   days: [
//     { day: 1, status: 'empty', dateWillDo: 'Date'},
//     { day: 2, status: 'hammock', dateWillDo: 'Date'},
//     { day: 3, status: 'done', dateWillDo: 'Date'},
//   ]
// }
