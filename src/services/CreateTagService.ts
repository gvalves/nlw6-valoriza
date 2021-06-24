import { getCustomRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { TagsRepository } from '../repositories/TagsRepository';

class CreateTagService {
  async execute(name: string): Promise<Tag> {
    const tagsRepotirory = getCustomRepository(TagsRepository);

    if (!name) {
      throw new Error('Invalid name');
    }

    const tagAlreadyExists = await tagsRepotirory.findOne({
      where: {
        name,
      },
    });

    if (tagAlreadyExists) {
      throw new Error('Tag already exists');
    }

    const tag = tagsRepotirory.create({
      name,
    });

    tagsRepotirory.save(tag);

    return tag;
  }
}

export { CreateTagService };
