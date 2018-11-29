exports.alterVoteMod = (voteMod, direction) => {
  if (voteMod === 1 || -1) {
    direction === 'up' ? voteMod += 1 : voteMod -= 1
  } else if (voteMod === 0) {
    direction === 'up' ? voteMod = 1 : voteMod = -1
  }
  return voteMod;
}

exports.getDate = (dateObj) => {
  if (typeof dateObj !== 'string') throw new Error('Only numbers please')
  let date = new Date(dateObj)
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  let fullDay = `${day}/${month + 1}/${year}`;
  return fullDay;
}