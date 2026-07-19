import { useRef, useState } from "react";
import { Button, Stack, Text } from "@sanity/ui";
import {
  insert,
  setIfMissing,
  useClient,
  type ArrayOfObjectsInputProps,
} from "sanity";

export function BatchImagesInput(props: ArrayOfObjectsInputProps) {
  const client = useClient({ apiVersion: "2025-01-01" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<string | null>(null);

  const uploadFiles = async (files: File[]) => {
    props.onChange(setIfMissing([]));
    let done = 0;
    for (let start = 0; start < files.length; start += 5) {
      const batch = files.slice(start, start + 5);
      const assets = await Promise.all(
        batch.map((file) =>
          client.assets.upload("image", file, { filename: file.name })
        )
      );
      const items = assets.map((asset) => ({
        _type: "image",
        _key: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        asset: { _type: "reference", _ref: asset._id },
      }));
      props.onChange(insert(items, "after", [-1]));
      done += batch.length;
      setProgress(`Uploading ${done} / ${files.length}…`);
    }
    setProgress(null);
  };

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          if (files.length) uploadFiles(files);
          event.target.value = "";
        }}
      />
      <Button
        text={progress ?? "Upload multiple images"}
        tone="primary"
        mode="ghost"
        disabled={progress !== null}
        onClick={() => inputRef.current?.click()}
      />
      {progress && <Text size={1}>{progress}</Text>}
    </Stack>
  );
}
