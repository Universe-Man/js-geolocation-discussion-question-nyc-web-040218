//https://developer.mozilla.org/en-US/docs/Web/API/Position

navigator.geolocation.getCurrentPosition(pos => console.log(pos.coords))


let me = [40.704814, -74.01336]

const friendObj = {
  pos2: [40.779437, -73.963244],
  pos3: [40.738527, -74.005363],
  pos4: [40.729975, -73.980926]
}

function getDist(me, friend) {

  let lat1 = me[0]
  let lon1 = me[1]
  let lat2 = friend[0]
  let lon2 = friend[1]

  return Math.sqrt((lat2 - lat1)**2 + (lon2-lon1)**2)

}

function getAllDistances(me, friendObj) {
  distObj = {}
  for (let friend in friendObj) {
    dist = getDist(me, friendObj[friend])
    distObj[friend] = dist
  }

  return distObj
}

function getLeastDistance(distObj) {
  let sortedD = Object.values(distObj).sort(((a,b) => {
    return a - b
  }))

  let target = sortedD[0]

  let friend = Object.keys(distObj).find( friend => target === distObj[friend])

  return `Friend: ${friend}, Distance: ${target}`

}

function getGreatestDistance(distObj) {
  let sortedD = Object.values(distObj).sort(((a,b) => {
    return a - b
  }))

  let target = sortedD[sortedD.length - 1]

  let friend = Object.keys(distObj).find( friend => target === distObj[friend])

  return `Friend: ${friend}, Distance: ${target}`

}

function ynCentroid(me, friendObj) {
  let friendDists = Object.values(friendObj)

  let allXValues = [me[0]]
  let allYValues = [me[1]]

  friendDists.forEach(el => allXValues.push(el[0]))
  friendDists.forEach(el => allYValues.push(el[1]))

  totalX = (allXValues.reduce( (accumulator, currentValue) => accumulator + currentValue ))
  totalY = (allYValues.reduce( (accumulator, currentValue) => accumulator + currentValue ))

  avgX = totalX / allXValues.length
  avgY = totalY / allYValues.length

  return [avgX, avgY]
}
