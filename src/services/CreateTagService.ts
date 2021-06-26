import { getCustomRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { CustomError } from '../errors/CustomError';
import { TagsRepository } from '../repositories/TagsRepository';

class CreateTagService {
  async execute(name: string): Promise<Tag> {
    const tagsRepotirory = getCustomRepository(TagsRepository);

    if (!name) {
      throw new CustomError('Invalid name', 400);
    }

    const tagAlreadyExists = await tagsRepotirory.findOne({
      where: {
        name,
      },
    });

    if (tagAlreadyExists) {
      throw new CustomError('Tag already exists', 400);
    }

    const tag = tagsRepotirory.create({
      name,
    });

    await tagsRepotirory.save(tag);

    return tag;
  }
}

export { CreateTagService };
