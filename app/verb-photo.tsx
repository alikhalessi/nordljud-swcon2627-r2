"use client";

import { useState } from "react";
import catalog from "../visual-content/pilot-action-photos.json";

export function hasVerbPhoto(verb: string, meaning: string): boolean {
  return catalog.entries.some((photo) => photo.verb === verb && photo.meaning === meaning);
}

export default function VerbPhoto({ verb, meaning }: { verb: string; meaning: string }) {
  const [failed, setFailed] = useState(false);
  const photo = catalog.entries.find((item) => item.verb === verb && item.meaning === meaning);

  // Intentional: no misleading fallback image for abstract or unrelated verb meanings.
  if (!photo || failed) return null;

  return (
    <figure className="verb-visual" aria-label={"Visual example of " + verb + " meaning " + meaning}>
      <img
        src={photo.imageUrl}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        width={760}
        height={570}
        onError={() => setFailed(true)}
      />
      <figcaption>
        <span className="visual-caption">Real photo · {photo.description}</span>
        <span className="visual-credits">
          Photo by <a href={photo.photographerUrl} target="_blank" rel="noopener noreferrer">{photo.photographer}</a>
          {" · "}
          <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a>
          {" · "}
          <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a>
        </span>
      </figcaption>
    </figure>
  );
}
