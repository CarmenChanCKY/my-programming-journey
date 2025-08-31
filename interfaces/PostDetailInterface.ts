import type TagsInterface from "~/interfaces/TagsInterface";
import type ReferenceInterface from "~/interfaces/ReferenceInterface";

export default interface PostDetailInterface {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  category_id: number;
  tags: Array<TagsInterface>;
  reference: Array<ReferenceInterface>;
}
