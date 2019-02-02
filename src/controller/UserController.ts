import { getManager } from 'typeorm';

import { User } from '../entity/User';

export async function findOrCreate(username: string, name: string): Promise<User> {
  const userRepository = getManager().getRepository(User);
  let user = await userRepository.findOne({ userId: username });
  if (!user) {
    user = await userRepository.create({
      userId: username,
      name,
    });
    user = await userRepository.save(user);
  }
  return user;
}