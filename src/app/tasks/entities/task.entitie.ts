export class TaskModel {
  id: number;
  name: string;
  description: string;
  enable: boolean;
  createAt?: Date;

  constructor(id, name, description, enable, createAt) {
    this.id = id
    this.name = name
    this.description = description
    this.enable = enable
    this.createAt = createAt
  }
}
