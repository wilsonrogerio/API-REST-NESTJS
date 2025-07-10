export class ResponseTaskDto {
  id: number;
  name: string;
  description: string;
  enable: boolean;
  createAt: Date | null;
  userId: number | null;

  constructor(id, name, description, enable, createAt, userId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.enable = enable;
    this.createAt = createAt;
    this.userId = userId;

  }
}