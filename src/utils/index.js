exports.alterVoteMod = (voteMod, direction) => {
  if (voteMod === 1 || -1) {
    direction === 'up' ? voteMod += 1 : voteMod -= 1
  } else if (voteMod === 0) {
    direction === 'up' ? voteMod = 1 : voteMod = -1
  }
  return voteMod;
}