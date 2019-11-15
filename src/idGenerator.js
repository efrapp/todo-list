export default function* indexer(i) {
  let index = i;

  while (true) {
    yield index;
    index += 1;
  }
}
