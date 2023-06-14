export type Payment = {
  schedule_date: string;
  state: State;
  amount: number;
  project_id: number;
};

export enum State {
  Paid = 'paid',
  Pending = 'pending',
}
