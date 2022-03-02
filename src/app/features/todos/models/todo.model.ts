export interface CheckListItem {
  title: string;
  checked: boolean;
}

export interface CheckList {
  title: string;
  items: CheckListItem[];
}

export default interface Todo {
  _id: string;
  section: string;
  title: string;
  description: string;
  index: number;
  tags?: string[];
  checklists?: CheckList[];
  attachment?: [];
  deadline?: number;
  cover?: string;
}