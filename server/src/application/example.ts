import { User, userBuilderFactory } from "@/domain/src/user";
import { UserPostgreSQLRepository } from "@/infrastructure/database/postgresql/knex/@postgresql-repositories/UserPostgreSQLRepository";
import { objectFactory } from "@domain/@utils/objectFactory";

async function main() {
  const userPostgreSQLRepository = UserPostgreSQLRepository.getInstance();

  const factory = objectFactory();


  // create user
  // const user = factory.getUser();
  // const userInstance = userBuilderFactory({ user })
  // const createdUser = await userPostgreSQLRepository.create(userInstance)
  // console.log(createdUser.reflect);

  // const findUserId = await userPostgreSQLRepository.findById('4eec1982-6d27-4d8f-9557-100db5c123e8')
  // console.log(findUserId.reflect);

  // const findUserEmail = await userPostgreSQLRepository.findByEmail('johndoe@email.com')
  // console.log(findUserEmail.reflect);

//  await userPostgreSQLRepository.delete('4eec1982-6d27-4d8f-9557-100db5c123e8')
//  await userPostgreSQLRepository.findById('4eec1982-6d27-4d8f-9557-100db5c123e8')


}

main();
