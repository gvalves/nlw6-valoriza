import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { TagsRepository } from '../repositories/TagsRepository';

class ListTagService {
  async execute(): Promise<Tag[]> {
    const tagsRepository = getCustomRepository(TagsRepository);
    const tags = await tagsRepository.find();
    return classToPlain(tags) as Tag[];
  }
}

export { ListTagService };
