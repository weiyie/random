var tag_names = process.argv.splice(2);


const findLatest = (arr) => {
  let versionNumber
  const getLatestVersionNumber = (arr, deep = 0) => {
    if (!versionNumber) {
      versionNumber = arr[0]
    }
    for (let item of arr) {
      if (item[deep] > versionNumber[deep]) {
        versionNumber = item
      }
    }
    if (deep < versionNumber.length) {
      getLatestVersionNumber(arr, deep + 1)
    }
  }

  const vList = (arr).map(_ => {
    return _.replace('v', '').split('.')
  })
  getLatestVersionNumber(vList)
  return `v${versionNumber.join('.')}`
}

const latest = tag_names.length ? findLatest(tag_names) : 'v1.0.0';
const nextVersion = latest.replace(/(.*?)([0-9]+)$/, (a, b, c) => b+(Number(c)+1))

console.log(nextVersion)

