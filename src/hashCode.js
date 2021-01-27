export default string => {
  var hash = 0
  for (var i = 0; i < string.length; i++) {
    hash = ((hash << 5) - hash) + string.charCodeAt(i)
    hash = hash & hash
  }
  return hash;
}
