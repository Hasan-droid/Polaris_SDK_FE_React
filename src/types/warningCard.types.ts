import { TaskCode } from "../utils/enums";

export interface IWarningsCardProps {
  itemClicked: boolean;
  handleClick: () => void;
  taskCode: TaskCode;
  description: string;
  warningsNumber: number;
}
