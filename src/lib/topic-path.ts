/** Match a branch and every descendant, independently of the tree depth. */
export function matchesTopicPath(path: string[] = [], prefix: string[] = []) {
  return prefix.every((segment, index) => path[index] === segment);
}

export function childTopics(paths: string[][], prefix: string[] = []) {
  return [
    ...new Set(
      paths
        .filter((path) => matchesTopicPath(path, prefix))
        .map((path) => path[prefix.length])
        .filter((segment): segment is string => Boolean(segment)),
    ),
  ];
}
