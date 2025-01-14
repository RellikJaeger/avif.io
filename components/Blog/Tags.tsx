import Link from "@components/Link";
import sortBy from "lodash/sortBy";

export interface TagsProps {
  tags: string[];
}

export default function Tags(props: TagsProps) {
  let tags = props.tags.map((text) => {
    let href = `google.com/search?q=site%3Aavif.io+${text.replace(
      /\s+/g,
      "+"
    )}`;
    return { href, text };
  });
  tags = sortBy(tags, (s) => s.text);

  return (
    <>
      <h5 className="inline-block mt-4 font-bold rounded-md">Tags</h5>
      <ol className="flex flex-wrap gap-1 text-red-700 text-tiny">
        {tags.map((source: any, index: any) => (
          <li key={index} className="py-0 px-1 rounded-md bg-red-1000">
            <Link text={source.text} href={source.href} />
          </li>
        ))}
      </ol>
    </>
  );
}
