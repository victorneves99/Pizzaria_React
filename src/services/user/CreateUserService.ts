import prismaClient from "../../prisma";
interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    //verificar se enviou um email
    if (!email) {
      throw new Error("Email incorreto");
    }

    //verificar se esse email ja esta cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email: email },
    });

    if (userAlreadyExists) {
      throw new Error("Usuario ja existe");
    }

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return user;
  }
}

export { CreateUserService };
