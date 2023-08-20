export default interface RouterLinkInterface {
  name: string;
  params?: RouterParamsInterface;
}

interface RouterParamsInterface {
  pages?: number;
  slug?: string;
  keyword?: string;
}

