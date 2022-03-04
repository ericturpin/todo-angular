export class DataTransferMock {
  data = new Map<string, string>();
  files?: FileList;

  setData(format: string, data: string) {
    this.data.set(format, data);
  }

  getData(format: string) {
    return this.data.get(format);
  }
}

export class DragEventMock {
  target: HTMLElement | undefined;
  dataTransfer: DataTransferMock | undefined;

  stopPropagation() { }
  preventDefault() { }
}