class ITask {
  name: string;
  description: string;
  enable: boolean;
  id: number;
  createAt: Date | null;
  userId: number | null;

  constructor(name: string, description: string, enable: boolean, id: number, createAt: Date | null, userId: number | null) {
    this.name = name;
    this.description = description;
    this.enable = enable;
    this.id = id;
    this.createAt = createAt;
    this.userId = userId;
  }
}


export class ResponseUserDto {
  name: string;
  id: number;
  email: string;
  imageUser: string | null;
  Task: ITask[];

  constructor(name: string, id: number, email: string, imageUser: string | null, Task: ITask[]) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.imageUser = imageUser;
    this.Task = Task;
  }

}
export class ResponseCreateUserDto {
  id: number;
  name: string;
  email: string;
  Task: ITask[];

  constructor(id: number, name: string, email: string, imageUser: string | null, Task: ITask[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.Task = Task;
  }
}

export class ResponseUpdateUserDto {
  id: number;
  name: string;
  email: string;
  // imageUser: string | null;

  constructor(id: number, name: string, email: string, imageUser: string | null) {
    this.id = id;
    this.name = name;
    this.email = email;
    // this.imageUser = imageUser;
  }
}

export class ResponseImageUploadUserDto {
  name: string;
  email: string;
  id: number;
  imageUser: string | null;

  constructor(id: number, name: string, email: string, imageUser: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.imageUser = imageUser;
  }
}