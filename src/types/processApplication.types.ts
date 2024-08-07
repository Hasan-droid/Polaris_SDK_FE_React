import { TaskCode } from "../utils/enums";

export interface ITaskCode {
  warningCode: TaskCode | null;
}

export interface IEventSourceError extends Event {
  error: {
    message: string;
    stack: string;
  };
}
