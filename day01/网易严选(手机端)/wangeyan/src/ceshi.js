const add = (a, b) => {
  const promise = new Promise((reject) => {
    console.log('bbbb')
    reject('bbb')
  })
  promise.then((value) => {
    console.log(value)
  })
  return a + b
}
export default add