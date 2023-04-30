import type TagsInterface from "~/interfaces/TagsInterface";

export default interface PostPageInterface {
  slug: string;
  title: string;
  date: string;
  category: string;
  category_id: number;
  preview: string;
  tags: Array<TagsInterface>;
}
