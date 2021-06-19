import { stories } from "../../../stories";
import type { NextApiRequest, NextApiResponse } from "next";

export default function storiesHandler(
  { query: { id } }: NextApiRequest,
  res: NextApiResponse
) {
  const filtered = stories.filter((s) => s.id === id);

  if (filtered.length > 0) {
    res.status(200).json(filtered[0]);
  } else {
    res.status(404).json({ message: `История с данным id: ${id} не найдена` });
  }
}
